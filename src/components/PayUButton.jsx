import { useState } from "react";

function PayUButton({ memberId, amount, firstname, email, phone, purpose = "ABDM Welfare Donation" }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const res = await fetch(`${apiBase}/api/payments/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, amount, firstname, email, phone, purpose }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Donation initialization failed");

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.actionUrl;

      Object.entries(data.payload).forEach(([key, val]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = val;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      alert("Donation Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={loading}
      className="btn btn-primary fw-bold px-4 py-2"
    >
      {loading ? "Redirecting to PayU..." : `Donate Now (₹${amount})`}
    </button>
  );
}

export default PayUButton;
