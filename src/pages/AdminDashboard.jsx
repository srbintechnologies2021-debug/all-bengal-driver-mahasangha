import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebaseConfig";

import DashboardCards from "../components/DashboardCards";
import SearchBar from "../components/SearchBar";
import MemberCard from "../components/MemberCard";
import MemberModal from "../components/admin/MemberModal";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");

    const [error, setError] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);
    //--------------------------------------------------

    useEffect(() => {

        const unsubscribe = onSnapshot(

            collection(db, "members"),

            (snapshot) => {

                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMembers(data);

                setLoading(false);

            },

            (err) => {

                console.error("Firestore Error:", err);

                alert(err.message);

                setError(err.message);

                setLoading(false);

            }

        );

        return () => unsubscribe();

    }, []);

    //--------------------------------------------------

    const statistics = useMemo(() => {

        return {

            total: members.length,

            approved: members.filter(
                m => m.membershipStatus === "Approved"
            ).length,

            pending: members.filter(
                m => m.membershipStatus === "Pending"
            ).length,

            rejected: members.filter(
                m => m.membershipStatus === "Rejected"
            ).length,

            paid: members.filter(
                m => m.paymentStatus === "Paid"
            ).length,

        };

    }, [members]);

    //--------------------------------------------------

    const filteredMembers = useMemo(() => {

        return members.filter((member) => {

            const keyword = searchTerm.toLowerCase();

            return (

                member.name?.toLowerCase().includes(keyword) ||

                member.phone?.toLowerCase().includes(keyword) ||

                member.email?.toLowerCase().includes(keyword) ||

                member.district?.toLowerCase().includes(keyword) ||

                member.block?.toLowerCase().includes(keyword) ||

                member.memberId?.toLowerCase().includes(keyword)

            );

        });

    }, [members, searchTerm]);

    //--------------------------------------------------

    const logout = async () => {

        try {

            await signOut(auth);

            navigate("/admin-login");

        } catch (error) {

            console.error(error);

            alert("Logout Failed");

        }

    };
    //--------------------------------------------------
    const updateMemberStatus = async (memberId, status) => {

        try {

            await updateDoc(
                doc(db, "members", memberId),
                {
                    membershipStatus: status,
                }
            );

        } catch (error) {

            console.error(error);

            alert("Failed to update member status.");

        }

    };

    if (loading) {

        return (

            <div className="admin-loading">

                Loading Members...

            </div>

        );

    }

    if (error) {

        return (

            <div className="admin-error">

                {error}

            </div>

        );

    }

    return (

        <div className="admin-dashboard">

            <div className="admin-header">

                <div>

                    <h1>

                        🚗 ABDM Admin Dashboard

                    </h1>

                    <p>

                        All Bengal Driver Mahasangha

                    </p>

                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            <DashboardCards

                total={statistics.total}

                approved={statistics.approved}

                pending={statistics.pending}

                rejected={statistics.rejected}



            />

            <SearchBar

                value={searchTerm}

                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }

            />

            <div className="member-list">

                {filteredMembers.length === 0 ? (

                    <div className="empty-box">

                        No Members Found

                    </div>

                ) : (

                    filteredMembers.map((member) => (

                        <MemberCard
                            key={member.id}
                            member={member}
                            onApprove={() =>
                                updateMemberStatus(member.id, "Approved")
                            }
                            onReject={() =>
                                updateMemberStatus(member.id, "Rejected")
                            }
                            onView={() =>
                                setSelectedMember(member)
                            }
                        />

                    ))

                )}

            </div>
            <MemberModal
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
                onApprove={(memberId) =>
                    updateMemberStatus(memberId, "Approved")
                }
                onReject={(memberId) =>
                    updateMemberStatus(memberId, "Rejected")
                }
            />

        </div>

    );

}

export default AdminDashboard;