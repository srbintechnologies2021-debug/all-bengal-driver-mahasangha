import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

import DashboardCards from "../components/DashboardCards";
import SearchBar from "../components/SearchBar";
import MemberCard from "../components/MemberCard";
import MemberModal from "../components/admin/MemberModal";
import NoticeList from "../components/admin/NoticeList";
import GalleryForm from "../components/admin/GalleryForm";

import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);
    const [processingMember, setProcessingMember] = useState(null);

    const normalizeMember = (row) => ({
        ...row,
        name: row.full_name || row.name || "",
        memberId: row.member_id || "",
        membershipStatus: row.membership_status || "Pending",
        membershipType: row.membership_type || "Driver",
        paymentStatus: row.payment_status || "Pending",
    });

    const fetchMembers = async () => {
        try {
            const { data: { user }, error: authErr } = await supabase.auth.getUser();
            if (authErr || !user) {
                navigate("/admin-login");
                return;
            }

            const { data: adminProfile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .single();

            if (!adminProfile || (adminProfile.role !== "admin" && adminProfile.role !== "superadmin")) {
                await supabase.auth.signOut();
                navigate("/admin-login");
                return;
            }

            const { data, error: fetchErr } = await supabase
                .from("profiles")
                .select("*")
                .neq("role", "admin")
                .neq("role", "superadmin")
                .order("created_at", { ascending: false });

            if (fetchErr) throw fetchErr;
            setMembers((data || []).map(normalizeMember));
        } catch (err) {
            console.error("Admin Load Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [navigate]);

    const statistics = useMemo(() => ({
        total: members.length,
        approved: members.filter((m) => m.membershipStatus === "Approved").length,
        pending: members.filter((m) => m.membershipStatus === "Pending").length,
        rejected: members.filter((m) => m.membershipStatus === "Rejected").length,
    }), [members]);

    const filteredMembers = useMemo(() => {
        const keyword = searchTerm.toLowerCase().trim();
        return members.filter((member) =>
            member.name?.toLowerCase().includes(keyword) ||
            member.phone?.toLowerCase().includes(keyword) ||
            member.email?.toLowerCase().includes(keyword) ||
            member.district?.toLowerCase().includes(keyword) ||
            member.block?.toLowerCase().includes(keyword) ||
            member.memberId?.toLowerCase().includes(keyword)
        );
    }, [members, searchTerm]);

    const logout = async () => {
        await supabase.auth.signOut();
        navigate("/admin-login");
    };

    const generateMemberId = () => {
        const currentYear = new Date().getFullYear();
        let highestNumber = 0;

        members.forEach((member) => {
            const existingId = member.memberId;
            if (!existingId) return;

            const match = existingId.match(/^ABDM-\d{4}-(\d+)$/);
            if (match) {
                const number = parseInt(match[1], 10);
                if (!isNaN(number) && number > highestNumber) {
                    highestNumber = number;
                }
            }
        });

        const nextNumber = highestNumber + 1;
        return `ABDM-${currentYear}-${String(nextNumber).padStart(4, "0")}`;
    };

    const updateMemberStatus = async (memberId, status) => {
        try {
            setProcessingMember(memberId);
            const member = members.find((item) => item.id === memberId);
            if (!member) return;

            if (status === "Approved") {
                const memberIdToSave = member.memberId || generateMemberId();

                const { error: updateErr } = await supabase
                    .from("profiles")
                    .update({
                        membership_status: "Approved",
                        member_id: memberIdToSave,
                    })
                    .eq("id", memberId);

                if (updateErr) throw updateErr;

                setMembers((prev) =>
                    prev.map((m) =>
                        m.id === memberId
                            ? { ...m, membershipStatus: "Approved", membership_status: "Approved", memberId: memberIdToSave, member_id: memberIdToSave }
                            : m
                    )
                );
                alert(`Member Approved!\n\nMember ID: ${memberIdToSave}`);
            } else {
                const { error: updateErr } = await supabase
                    .from("profiles")
                    .update({ membership_status: status })
                    .eq("id", memberId);

                if (updateErr) throw updateErr;

                setMembers((prev) =>
                    prev.map((m) =>
                        m.id === memberId
                            ? { ...m, membershipStatus: status, membership_status: status }
                            : m
                    )
                );
            }
        } catch (err) {
            console.error("Update Member Status Error:", err);
            alert("Failed to update member status: " + err.message);
        } finally {
            setProcessingMember(null);
        }
    };

    const updateMember = async (memberId, updatedData) => {
        try {
            const payload = {
                full_name: updatedData.name ?? updatedData.full_name,
                phone: updatedData.phone,
                district: updatedData.district,
                block: updatedData.block,
                vehicle_no: updatedData.vehicle_no ?? updatedData.vehicleNo,
                license_number: updatedData.license_number ?? updatedData.licenceNo,
            };

            const { error: updateErr } = await supabase
                .from("profiles")
                .update(payload)
                .eq("id", memberId);

            if (updateErr) throw updateErr;

            await fetchMembers();
            alert("Member information updated successfully.");
            setSelectedMember(null);
        } catch (err) {
            console.error("Update Member Error:", err);
            alert("Failed to update member: " + err.message);
        }
    };

    if (loading) return <div className="admin-loading">Loading Members...</div>;
    if (error) return <div className="admin-error">{error}</div>;

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div>
                    <h1>🚗 ABDM Admin Dashboard</h1>
                    <p>All Bengal Driver Mahasangha</p>
                </div>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>

            <DashboardCards
                total={statistics.total}
                approved={statistics.approved}
                pending={statistics.pending}
                rejected={statistics.rejected}
            />

            <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="member-list">
                {filteredMembers.length === 0 ? (
                    <div className="empty-box">No Members Found</div>
                ) : (
                    filteredMembers.map((member) => (
                        <div
                            key={member.id}
                            style={{
                                opacity: processingMember === member.id ? 0.6 : 1,
                                pointerEvents: processingMember === member.id ? "none" : "auto",
                            }}
                        >
                            <MemberCard
                                member={member}
                                onApprove={() => updateMemberStatus(member.id, "Approved")}
                                onReject={() => updateMemberStatus(member.id, "Rejected")}
                                onView={() => setSelectedMember(member)}
                            />
                        </div>
                    ))
                )}
            </div>

            <MemberModal
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                onApprove={(memberId) => updateMemberStatus(memberId, "Approved")}
                onReject={(memberId) => updateMemberStatus(memberId, "Rejected")}
                onSave={updateMember}
            />

            <NoticeList />
            <GalleryForm />
        </div>
    );
}

export default AdminDashboard;
