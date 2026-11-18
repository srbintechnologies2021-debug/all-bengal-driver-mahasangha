import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

function IDCardPurchase() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cardPrice = 100;

    const [profile, setProfile] = useState(null);
    const [checkingMember, setCheckingMember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

    useEffect(() => {
        const paymentStatus = searchParams.get("payment");
        const returnedTxn = searchParams.get("txnid");
        if (paymentStatus === "success") {
            setStatusMsg({
                type: "success",
                text: `✅ Physical ID Card Order Confirmed! Order ID: ${returnedTxn}. Your PVC ID Card will be processed shortly.`,
            });
        } else if (paymentStatus === "failed") {
            setStatusMsg({ type: "danger", text: `❌ Payment Failed for Order ${returnedTxn}. Please try again.` });
        }
    }, [searchParams]);

    useEffect(() => {
        const verifyMember = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/login");
                return;
            }
            const { data } = await supabase
                .from("profiles")
                .select("id, email, full_name, phone, member_id, membership_status")
                .eq("id", user.id)
                .single();

            setProfile(data || null);
            setCheckingMember(false);
        };
        verifyMember();
    }, [navigate]);

    const handlePurchase = async () => {
        if (!profile?.member_id || profile.membership_status !== "Approved") {
            setStatusMsg({
                type: "danger",
                text: "❌ An Approved ABDM Member ID is required to order a Physical ID Card.",
            });
            return;
        }

        setStatusMsg({ type: "", text: "" });
        setLoading(true);

        try {
            const txnid = `IDCARD_${Date.now()}`;

            const { error: orderError } = await supabase.from("id_card_orders").insert([
                {
                    txnid,
                    user_id: profile.id,
                    member_id: profile.member_id,
                    user_email: profile.email || "",
                    amount: cardPrice,
                    payment_method: "payu",
                    payment_status: "pending",
                    order_status: "pending",
                },
            ]);

            if (orderError) throw orderError;

            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const res = await fetch(`${apiBase}/api/payments/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    txnid,
                    userId: profile.id,
                    quantity: 1,
                    firstname: profile.full_name || "ABDM Member",
                    email: profile.email || "",
                    phone: profile.phone || "9999999999",
                    productType: "ID_CARD",
                    productinfo: "ABDM Official PVC ID Card",
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Unable to initialize PayU");

            const form = document.createElement("form");
            form.method = "POST";
            form.action = data.actionUrl;
            Object.entries(data.payload).forEach(([k, v]) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = k;
                input.value = v;
                form.appendChild(input);
            });
            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            setStatusMsg({ type: "danger", text: `❌ Unable to start payment: ${error.message}` });
            setLoading(false);
        }
    };

    if (checkingMember) {
        return <div className="container py-5 text-center">Verifying Member ID...</div>;
    }

    const isEligible = Boolean(profile?.member_id && profile?.membership_status === "Approved");

    return (
        <div className="container py-5" style={{ maxWidth: "620px" }}>
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">🪪 Order Official PVC ID Card</h4>
                </div>
                <div className="card-body text-center p-4">
                    <div className="mb-3" style={{ fontSize: "64px" }}>🪪</div>
                    <h5>All Bengal Driver Mahasangha Identity Card</h5>
                    <p className="text-muted">Official Laminated / PVC Member ID Card</p>

                    {statusMsg.text && (
                        <div className={`alert alert-${statusMsg.type} text-start`}>{statusMsg.text}</div>
                    )}

                    {!isEligible ? (
                        <div className="alert alert-warning">
                            ⚠️ Only Approved Members can apply for a physical ID Card.
                        </div>
                    ) : (
                        <>
                            <div className="alert alert-info">
                                ID Card Fee: <strong>₹{cardPrice}</strong> (Member ID: <strong>{profile.member_id}</strong>)
                            </div>
                            <button
                                type="button"
                                className="btn btn-dark btn-lg w-100"
                                onClick={handlePurchase}
                                disabled={loading}
                            >
                                {loading ? "Redirecting to PayU..." : `❤️ Donate Now (₹${cardPrice})`}
                            </button>
                        </>
                    )}

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mt-3"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IDCardPurchase;
