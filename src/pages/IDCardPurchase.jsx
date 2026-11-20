import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase/supabaseClient";
import { ABDM_FEES, calculateNinetyDayWindow } from "../utils/abdmRules";

function IDCardPurchase() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardPrice = ABDM_FEES.ID_CARD_PURCHASE;

  const [memberId, setMemberId] = useState(location.state?.memberId || "");
  const [fullName, setFullName] = useState(location.state?.fullName || "");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handlePurchase = async (e) => {
    e.preventDefault();
    const cleanId = memberId.trim().toUpperCase();
    const cleanName = fullName.trim();

    if (!cleanId || !cleanName) {
      setStatusMsg({
        type: "danger",
        text: "❌ আগে রেজিস্ট্রেশন করে প্রাপ্ত ID Number এবং আপনার নাম লিখুন।",
      });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const { data: profiles, error: lookupError } = await supabase
        .from("profiles")
        .select("id, member_id, full_name, email, phone")
        .eq("member_id", cleanId)
        .limit(1);

      if (lookupError) throw lookupError;
      const member = profiles?.[0];

      if (!member) {
        setStatusMsg({
          type: "danger",
          text: "❌ এই ID Number পাওয়া যায়নি। অনুগ্রহ করে আগে রেজিস্ট্রেশন সম্পন্ন করে ID Number নিন।",
        });
        setLoading(false);
        return;
      }

      if (member.full_name.trim().toLowerCase() !== cleanName.toLowerCase()) {
        setStatusMsg({
          type: "danger",
          text: "❌ ID Number-এর সাথে দেওয়া নাম মিলছে না। সঠিক রেজিস্টার্ড নাম লিখুন।",
        });
        setLoading(false);
        return;
      }

      const txnid = `IDCARD_${Date.now()}`;
      const windowInfo = calculateNinetyDayWindow(new Date());

      const { error: orderError } = await supabase.from("id_card_orders").insert([
        {
          txnid,
          user_id: member.id,
          member_id: member.member_id,
          user_email: member.email || "",
          amount: cardPrice,
          payment_method: "pending_easebuzz",
          payment_status: "pending",
          order_status: "confirmed",
          collection_deadline: windowInfo.deadlineIso.split("T")[0],
        },
      ]);

      if (orderError) throw orderError;

      setConfirmedOrder({
        txnid,
        memberId: member.member_id,
        fullName: member.full_name,
        amount: cardPrice,
        windowInfo,
      });

      setStatusMsg({
        type: "success",
        text: `✅ আইডি কার্ড পারচেজ রিকোয়েস্ট সম্পন্ন হয়েছে (Order ID: ${txnid}, ফি: ₹${cardPrice})। ${windowInfo.bnNotice}`,
      });
    } catch (error) {
      setStatusMsg({
        type: "danger",
        text: `❌ আইডি কার্ড পারচেজ করতে সমস্যা হয়েছে: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: "620px" }}>
        <div
          className="card shadow-sm border-0 rounded-4"
          style={{
            backdropFilter: "blur(14px)",
            background: "rgba(255, 255, 255, 0.88)",
          }}
        >
          <div className="card-header bg-dark text-white d-flex align-items-center gap-3 rounded-top-4">
            <img
              src="/logo.png"
              alt="ABDM Transparent Logo"
              style={{ width: "44px", height: "44px", objectFit: "contain", background: "transparent" }}
            />
            <div>
              <h4 className="mb-0">🪪 Official PVC ID Card Purchase</h4>
              <small>ID Card Purchase Fee: ₹{cardPrice}</small>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="alert alert-light border small mb-3">
              রেজিস্ট্রেশনের পর প্রাপ্ত আপনার <strong>ID Number</strong> ও <strong>Name</strong> দিয়ে অফিশিয়াল আইডি কার্ড পারচেজ করুন। পারচেজের পর <strong>৯০ দিনের মধ্যে</strong> কার্যালয় থেকে আইডি কার্ড সংগ্রহ/পারচেজ করতে পারবেন।
            </div>

            {statusMsg.text && (
              <div className={`alert alert-${statusMsg.type}`}>{statusMsg.text}</div>
            )}

            <form onSubmit={handlePurchase}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Member ID Number *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="যেমন: ABDM-XXXXXXX"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Registered Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="আপনার পুরো নাম লিখুন"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="p-3 rounded-3 bg-light border mb-3 d-flex justify-content-between align-items-center">
                <span className="fw-semibold">ID Card Fee:</span>
                <span className="fs-5 fw-bold text-dark">₹{cardPrice}</span>
              </div>

              <button
                type="submit"
                className="btn btn-dark btn-lg w-100 fw-bold"
                disabled={loading}
              >
                {loading ? "Processing..." : `Confirm ID Card Purchase (₹${cardPrice})`}
              </button>
            </form>

            {confirmedOrder && (
              <div className="mt-4 p-3 rounded-3 bg-success bg-opacity-10 border border-success">
                <h6 className="fw-bold text-success mb-1">⏳ ৯০ দিনের সংগ্রহ/পারচেজ সময়সীমা সক্রিয়</h6>
                <p className="mb-0 small">{confirmedOrder.windowInfo.bnNotice}</p>
              </div>
            )}

            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-3"
              onClick={() => navigate("/member-dashboard")}
            >
              ← Back to Member Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default IDCardPurchase;
