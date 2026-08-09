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


    /* ================================
       Load Members
    ================================= */

    useEffect(() => {

        const unsubscribe = onSnapshot(

            collection(db, "members"),

            (snapshot) => {

                const data = snapshot.docs.map((item) => ({
                    id: item.id,
                    ...item.data(),
                }));

                setMembers(data);
                setLoading(false);

            },

            (err) => {

                console.error(
                    "Firestore Error:",
                    err
                );

                setError(err.message);
                setLoading(false);

            }

        );

        return () => unsubscribe();

    }, []);


    /* ================================
       Statistics
    ================================= */

    const statistics = useMemo(() => {

        return {

            total: members.length,

            approved: members.filter(
                (member) =>
                    member.membershipStatus === "Approved"
            ).length,

            pending: members.filter(
                (member) =>
                    member.membershipStatus === "Pending"
            ).length,

            rejected: members.filter(
                (member) =>
                    member.membershipStatus === "Rejected"
            ).length,

        };

    }, [members]);


    /* ================================
       Search
    ================================= */

    const filteredMembers = useMemo(() => {

        const keyword =
            searchTerm.toLowerCase().trim();

        return members.filter((member) => {

            return (

                member.name
                    ?.toLowerCase()
                    .includes(keyword) ||

                member.phone
                    ?.toLowerCase()
                    .includes(keyword) ||

                member.email
                    ?.toLowerCase()
                    .includes(keyword) ||

                member.district
                    ?.toLowerCase()
                    .includes(keyword) ||

                member.block
                    ?.toLowerCase()
                    .includes(keyword) ||

                member.memberId
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    }, [members, searchTerm]);


    /* ================================
       Logout
    ================================= */

    const logout = async () => {

        try {

            await signOut(auth);

            navigate("/admin-login");

        } catch (error) {

            console.error(error);

            alert("Logout Failed");

        }

    };


    /* ================================
       Generate Member ID
    ================================= */

    const generateMemberId = () => {

        const currentYear =
            new Date().getFullYear();

        let highestNumber = 0;

        members.forEach((member) => {

            const existingId =
                member.memberId;

            if (!existingId) {
                return;
            }

            const match =
                existingId.match(
                    /^ABDM-\d{4}-(\d+)$/
                );

            if (match) {

                const number =
                    parseInt(
                        match[1],
                        10
                    );

                if (
                    !isNaN(number) &&
                    number > highestNumber
                ) {

                    highestNumber = number;

                }

            }

        });

        const nextNumber =
            highestNumber + 1;

        return (
            `ABDM-${currentYear}-${String(
                nextNumber
            ).padStart(4, "0")}`
        );

    };


    /* ================================
       Update Member Status
    ================================= */

    const updateMemberStatus = async (
        memberId,
        status
    ) => {

        try {

            setProcessingMember(memberId);


            const member = members.find(
                (item) =>
                    item.id === memberId
            );


            if (!member) {

                alert(
                    "Member not found."
                );

                return;

            }


            /* ============================
               APPROVE
            ============================ */

            if (status === "Approved") {

                /*
                 * If member already has
                 * Member ID, keep it.
                 */

                let memberIdToSave =
                    member.memberId;


                /*
                 * Generate new ID only
                 * if one doesn't exist.
                 */

                if (!memberIdToSave) {

                    memberIdToSave =
                        generateMemberId();

                }


                await updateDoc(

                    doc(
                        db,
                        "members",
                        memberId
                    ),

                    {
                        membershipStatus:
                            "Approved",

                        memberId:
                            memberIdToSave,
                    }

                );


                alert(
                    `Member Approved!\n\nMember ID: ${memberIdToSave}`
                );

            }


            /* ============================
               REJECT
            ============================ */

            else if (status === "Rejected") {

                await updateDoc(

                    doc(
                        db,
                        "members",
                        memberId
                    ),

                    {
                        membershipStatus:
                            "Rejected",
                    }

                );

            }


            /* ============================
               Other Status
            ============================ */

            else {

                await updateDoc(

                    doc(
                        db,
                        "members",
                        memberId
                    ),

                    {
                        membershipStatus:
                            status,
                    }

                );

            }

        } catch (error) {

            console.error(
                "Update Member Status Error:",
                error
            );

            alert(
                "Failed to update member status: " +
                error.message
            );

        } finally {

            setProcessingMember(null);

        }

    };


    /* ================================
       Update Member Information
    ================================= */

    const updateMember = async (
        memberId,
        updatedData
    ) => {

        try {

            await updateDoc(

                doc(
                    db,
                    "members",
                    memberId
                ),

                updatedData

            );


            alert(
                "Member information updated successfully."
            );


            setSelectedMember(null);

        } catch (error) {

            console.error(
                "Update Member Error:",
                error
            );

            alert(
                "Failed to update member: " +
                error.message
            );

        }

    };


    /* ================================
       Loading
    ================================= */

    if (loading) {

        return (

            <div className="admin-loading">

                Loading Members...

            </div>

        );

    }


    /* ================================
       Error
    ================================= */

    if (error) {

        return (

            <div className="admin-error">

                {error}

            </div>

        );

    }


    /* ================================
       Dashboard
    ================================= */

    return (

        <div className="admin-dashboard">


            {/* =========================
                Header
            ========================== */}

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


            {/* =========================
                Statistics
            ========================== */}

            <DashboardCards

                total={
                    statistics.total
                }

                approved={
                    statistics.approved
                }

                pending={
                    statistics.pending
                }

                rejected={
                    statistics.rejected
                }

            />


            {/* =========================
                Search
            ========================== */}

            <SearchBar

                value={
                    searchTerm
                }

                onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                }

            />


            {/* =========================
                Members
            ========================== */}

            <div className="member-list">

                {filteredMembers.length === 0 ? (

                    <div className="empty-box">

                        No Members Found

                    </div>

                ) : (

                    filteredMembers.map(
                        (member) => (

                            <div
                                key={member.id}
                                style={{
                                    opacity:
                                        processingMember ===
                                            member.id
                                            ? 0.6
                                            : 1,
                                    pointerEvents:
                                        processingMember ===
                                            member.id
                                            ? "none"
                                            : "auto",
                                }}
                            >

                                <MemberCard

                                    member={
                                        member
                                    }


                                    onApprove={() =>
                                        updateMemberStatus(
                                            member.id,
                                            "Approved"
                                        )
                                    }


                                    onReject={() =>
                                        updateMemberStatus(
                                            member.id,
                                            "Rejected"
                                        )
                                    }


                                    onView={() =>
                                        setSelectedMember(
                                            member
                                        )
                                    }

                                />

                            </div>

                        )
                    )

                )}

            </div>


            {/* =========================
                Member Modal
            ========================== */}

            <MemberModal

                member={
                    selectedMember
                }


                onClose={() =>
                    setSelectedMember(
                        null
                    )
                }


                onApprove={(memberId) =>
                    updateMemberStatus(
                        memberId,
                        "Approved"
                    )
                }


                onReject={(memberId) =>
                    updateMemberStatus(
                        memberId,
                        "Rejected"
                    )
                }


                onUpdate={
                    updateMember
                }

            />


            {/* =========================
                Notices
            ========================== */}

            <hr className="my-5" />

            <NoticeList />


            {/* =========================
                Gallery
            ========================== */}

            <hr className="my-5" />

            <GalleryForm />


        </div>

    );

}

export default AdminDashboard;