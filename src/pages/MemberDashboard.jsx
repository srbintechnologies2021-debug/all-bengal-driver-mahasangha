import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase/supabaseClient";
import { ABDM_FEES, calculateNinetyDayWindow } from "../utils/abdmRules";

function MemberDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [memberRecord, setMemberRecord] = useState(null);
  const [searching, setSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    if (!q) {
      setErrorMsg("অনুগ্রহ করে Member ID, Full Name, Phone বা Driving Licence নম্বর দিন।");
      return;
    }

    setSearching(true);
    setErrorMsg("");
    setMemberRecord(null);

    try {
      const upperQ = q.toUpperCase();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`member_id.eq.${upperQ},phone.eq.${q},license_number.eq.${upperQ},full_name.ilike.%${q}%`)
        .limit(1);

      if (error) throw error;
      if (!data || data.length === 0) {
        setErrorMsg("কোনো মেম্বার রেকর্ড পাওয়া যায়নি। আগে রেজিস্ট্রেশন সম্পন্ন করুন।");
      } else {
        setMemberRecord(data[0]);
      }
    } catch (err) {
      setErrorMsg(`সার্চ করতে সমস্যা হয়েছে: ${err.message}`);
    } finally {
      setSearching(false);
    }
  };

  const windowInfo = calculateNinetyDayWindow(memberRecord?.updated_at || new Date());

  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: "820px" }}>
        <div
          className="p-4 rounded-4 shadow-sm mb-4"
          style={{
            backdropFilter: "blur(14px)",
            background: "rgba(255, 255, 255, 0.85)",
            border: "1px solid rgba(13, 71, 161, 0.16)",
          }}
        >
          <div className="d-flex align-items-center gap-3 mb-3">
            <img
              src="/logo.png"
              alt="ABDM Transparent Logo"
              style={{ width: "48px", height: "48px", objectFit: "contain", background: "transparent" }}
            />
            <div>
              <h3 className="mb-0 fw-bold text-primary">Member Dashboard & Search</h3>
              <small className="text-muted">
                আপনার ID Number ও Name দিয়ে Logo (₹{ABDM_FEES.LOGO_PURCHASE}) এবং ID Card (₹{ABDM_FEES.ID_CARD_PURCHASE}) পারচেজ করুন
              </small>
            </div>
          </div>

          <form onSubmit={handleSearch} className="d-flex flex-column sm:flex-row gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Member ID (e.g. ABDM-...), Name, Phone বা DL No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary px-4" disabled={searching}>
              {searching ? "Searching..." : "Search"}
            </button>
          </form>

          {errorMsg && <div className="alert alert-warning mt-3 mb-0">{errorMsg}</div>}
        </div>

        {memberRecord && (
          <div
            className="card border-0 shadow-sm rounded-4 p-4"
            style={{
              backdropFilter: "blur(14px)",
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 border-bottom pb-3 mb-3">
              <div className="d-flex align-items-center gap-3">
                {memberRecord.member_photo_url && (
                  <img
                    src={memberRecord.member_photo_url}
                    alt={memberRecord.full_name}
                    style={{
                      width: "72px",
                      height: "88px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "2px solid #0d6efd",
                    }}
                  />
                )}
                <div>
                  <h4 className="mb-1 fw-bold">{memberRecord.full_name}</h4>
                  <div className="badge bg-primary fs-6">ID: {memberRecord.member_id || "Pending ID"}</div>
                  <div className="text-muted small mt-1">
                    {memberRecord.district || ""}{memberRecord.state ? `, ${memberRecord.state}` : ""} • {memberRecord.vehicle_type || ""}
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-info mb-4">
              {windowInfo.bnNotice}
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 border rounded-3 bg-light h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold">🏷️ Logo Purchase</h5>
                    <p className="text-muted small mb-2">Fee: ₹{ABDM_FEES.LOGO_PURCHASE} • ID Number ও Name দিয়ে পারচেজ</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-warning w-100 fw-semibold"
                    onClick={() =>
                      navigate("/logo-purchase", {
                        state: { memberId: memberRecord.member_id, fullName: memberRecord.full_name },
                      })
                    }
                  >
                    Purchase Logo (₹{ABDM_FEES.LOGO_PURCHASE})
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 border rounded-3 bg-light h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold">🪪 ID Card Purchase</h5>
                    <p className="text-muted small mb-2">Fee: ₹{ABDM_FEES.ID_CARD_PURCHASE} • ID Number ও Name দিয়ে পারচেজ</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark w-100 fw-semibold"
                    onClick={() =>
                      navigate("/id-card-purchase", {
                        state: { memberId: memberRecord.member_id, fullName: memberRecord.full_name },
                      })
                    }
                  >
                    Purchase ID Card (₹{ABDM_FEES.ID_CARD_PURCHASE})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MemberDashboard;
