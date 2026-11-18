import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

function MembershipPayment() {
  const navigate = useNavigate();
  const membershipFee = 100;
  const [userId, setUserId] = useState("");
  const [donorName, setDonorName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        setEmail(user.email || "");
        const { data: prof } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("id", user.id)
          .single();
        if (prof) {
          setDonorName(prof.full_name || "");
          setPhone(prof.phone || "");
        }
      }
    });
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const txnid = `MEM_${Date.now()}`;
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/payments/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txnid,
          userId,
          amount: membershipFee,
          quantity: 1,
          firstname: donorName,
          email: email || `${phone}@abdm.org.in`,
          phone,
          productType: "MEMBERSHIP",
          productinfo: "ABDM Membership Registration Fee",
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
      alert(error.message || "Unable to start PayU payment.");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "30px" }}>
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">💳 Membership Payment</h3>
        </div>
        <div className="card-body">
          <div className="text-center mb-4">
            <h5 className="fw-bold">ALL BENGAL DRIVER MAHASANGHA SEVA TRUST</h5>
            <p className="text-muted mb-1">Unit: All Bengal Driver Mahasangha (Reg. No: IV-224/24)</p>
            <small className="text-muted">Membership Registration Fee</small>
          </div>
          <div className="alert alert-info text-center">
            <strong>Membership Fee</strong>
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>₹{membershipFee}</div>
          </div>
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Member Full Name *" value={donorName} onChange={(e) => setDonorName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="tel" className="form-control" placeholder="10-Digit Mobile Number *" pattern="[6-9][0-9]{9}" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-success btn-lg w-100" disabled={loading}>
              {loading ? "Redirecting to PayU..." : `❤️ Pay Now (₹${membershipFee})`}
            </button>
          </form>
          <button type="button" className="btn btn-outline-secondary w-100 mt-3" onClick={() => navigate(-1)} disabled={loading}>← Go Back</button>
          <p className="text-muted text-center mt-4 mb-0">🔒 Secure payment powered by PayU | Trust PAN: AAKTA9607K</p>
        </div>
      </div>
    </div>
  );
}

export default MembershipPayment;
