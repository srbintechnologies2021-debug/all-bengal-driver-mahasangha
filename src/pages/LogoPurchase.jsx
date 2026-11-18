import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

function LogoPurchase() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const logoPrice = 100;

    const [profile, setProfile] = useState(null);
    const [checkingMember, setCheckingMember] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

    const totalAmount = logoPrice * quantity;

    const getCollectionDeadline = () => {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 90);
        return deadline.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    };

    useEffect(() => {
        const paymentStatus = searchParams.get("payment");
        const returnedTxn = searchParams.get("txnid");
        if (paymentStatus === "success") {
            setStatusMsg({
                type: "success",
                text: `✅ Logo Payment Successful! Order ID: ${returnedTxn}. Collect from ABDM Office (Sarenga, Madhupur, Hariyatara, WB - 721804) by ${getCollectionDeadline()}.`,
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
                text: "❌ Direct purchase is disabled. An Approved ABDM Member ID is required to purchase the official logo.",
            });
            return;
        }

        setStatusMsg({ type: "", text: "" });
        setLoading(true);

        try {
            const txnid = `LOGO_${Date.now()}`;
            const deadlineDate = new Date();
            deadlineDate.setDate(deadlineDate.getDate() + 90);

            const { error: orderError } = await supabase.from("logo_orders").insert([
                {
                    txnid,
                    user_id: profile.id,
                    member_id: profile.member_id,
                    user_email: profile.email || "",
                    product_type: "logo",
                    product_name: "All Bengal Driver Mahasangha Logo",
                    quantity,
                    price_per_logo: logoPrice,
                    total_amount: totalAmount,
                    currency: "INR",
                    payment_method: "payu",
                    payment_status: "pending",
                    order_status: "pending",
                    collection_deadline: deadlineDate.toISOString().split("T")[0],
                },
            ]);

            if (orderError) throw orderError;

            const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
            const res = await fetch(`${apiBase}/api/payments/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    txnid,
                    userId: profile.id,
                    quantity,
                    firstname: profile.full_name || "ABDM Member",
                    email: profile.email || "",
                    phone: profile.phone || "9999999999",
                    productType: "LOGO",
                    productinfo: `ABDM Official Logo (x${quantity})`,
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
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">🏷️ Purchase ABDM Logo</h4>
                </div>
                <div className="card-body text-center p-4">
                    <div className="mb-3" style={{ fontSize: "64px" }}>🚗</div>
                    <h5>All Bengal Driver Mahasangha Official Logo</h5>
                    <p className="text-muted">Price per Logo: <strong>₹{logoPrice}</strong></p>

                    {statusMsg.text && (
                        <div className={`alert alert-${statusMsg.type} text-start`}>{statusMsg.text}</div>
                    )}

                    {!isEligible ? (
                        <div className="alert alert-warning">
                            ⚠️ Only Approved Members with an active Member ID can purchase the official logo.
                        </div>
                    ) : (
                        <>
                            <div className="mb-3 text-start">
                                <label className="form-label fw-bold">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    className="form-control"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                />
                            </div>
                            <div className="alert alert-info">
                                Total Payable: <strong>₹{totalAmount}</strong>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary btn-lg w-100"
                                onClick={handlePurchase}
                                disabled={loading}
                            >
                                {loading ? "Redirecting to PayU..." : `❤️ Donate Now (₹${totalAmount})`}
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

export default LogoPurchase;
