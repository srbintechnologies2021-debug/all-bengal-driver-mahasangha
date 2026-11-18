import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

import QRCodeCard from "../components/member/QRCodeCard";
import IDCard from "../components/idcard/IDCard";
import MemberProfile from "../components/member/MemberProfile";

function Dashboard() {
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();

                if (authError || !user) {
                    navigate("/login");
                    return;
                }

                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (error && error.code !== "PGRST116") {
                    throw error;
                }

                setMember(data || null);
            } catch (err) {
                console.error("Dashboard Load Error:", err.message);
                setErrorMsg("Unable to load member data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMemberData();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status" />
                <h4 className="mt-3">Loading Dashboard...</h4>
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger text-center">
                    <h5>{errorMsg}</h5>
                    <button className="btn btn-primary mt-2" onClick={handleLogout}>Back to Login</button>
                </div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning text-center">
                    <h4>Member Information Not Found</h4>
                    <p>Your account is logged in, but membership profile is not created yet.</p>
                    <button className="btn btn-primary" onClick={handleLogout}>Back to Login</button>
                </div>
            </div>
        );
    }

    const membershipStatus = member.membership_status || "Pending";

    const getStatusClass = () => {
        if (membershipStatus === "Approved") return "bg-success";
        if (membershipStatus === "Rejected") return "bg-danger";
        return "bg-warning text-dark";
    };

    return (
        <div className="container py-5">
            <div className="card shadow border-0">
                <div className="card-header bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <h3 className="mb-0">🚗 ABDM Member Dashboard</h3>
                        <span className="badge bg-light text-primary">Member Portal</span>
                    </div>
                </div>

                <div className="card-body">
                    <div className="mb-4">
                        <h4 className="text-success">Welcome, {member.full_name || member.name || "Member"}</h4>
                        <p className="text-muted mb-0">All Bengal Driver Mahasangha</p>
                    </div>

                    <div className="alert alert-primary d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <small className="text-muted d-block">YOUR MEMBERSHIP ID</small>
                            <strong className="fs-4">{member.member_id || "Not Assigned"}</strong>
                        </div>
                        <div>
                            <span className={`badge ${getStatusClass()} fs-6`}>
                                {membershipStatus === "Approved"
                                    ? "✅ Approved"
                                    : membershipStatus === "Rejected"
                                    ? "❌ Rejected"
                                    : "⏳ Pending"}
                            </span>
                        </div>
                    </div>

                    <hr />

                    <h5 className="text-primary mb-3">👤 Membership Information</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th width="220">Member ID</th>
                                    <td><strong>{member.member_id || "-"}</strong></td>
                                </tr>
                                <tr>
                                    <th>Full Name</th>
                                    <td>{member.full_name || member.name || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{member.email || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{member.phone || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Membership Type</th>
                                    <td>{member.membership_type || "Driver"}</td>
                                </tr>
                                <tr>
                                    <th>Membership Status</th>
                                    <td><span className={`badge ${getStatusClass()}`}>{membershipStatus}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr className="my-5" />
                    <h4 className="text-primary mb-4">📱 My Membership QR Code</h4>
                    <QRCodeCard member={member} />
                    <MemberProfile member={member} />

                    <hr className="my-5" />
                    <h4 className="text-primary mb-4">🪪 My Digital ID Card</h4>
                    {membershipStatus === "Approved" ? (
                        <IDCard member={member} />
                    ) : (
                        <div className="alert alert-info">
                            🕐 Your Digital ID Card will become available after your membership is approved.
                        </div>
                    )}

                    <div className="mt-5">
                        <button className="btn btn-danger" onClick={handleLogout}>🚪 Logout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
