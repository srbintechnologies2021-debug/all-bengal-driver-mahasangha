import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberIDCard from "../components/member/MemberIDCard";
import { auth, db } from "../firebase/firebaseConfig";

import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

import {
    doc,
    getDoc
} from "firebase/firestore";
import QRCodeCard from "../components/member/QRCodeCard";
{/* <MemberIDCard member={member} /> */ }
function Dashboard() {

    const navigate = useNavigate();

    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {

            if (!user) {
                navigate("/login");
                return;
            }

            try {

                const docRef = doc(db, "members", user.uid);
                const docSnap = await getDoc(docRef);
                console.log("Current UID:", user.uid);
                console.log("Document Exists:", docSnap.exists());

                if (docSnap.exists()) {
                    console.log("Firestore Data:", docSnap.data());
                }

                if (docSnap.exists()) {

                    console.log("Firestore Data:", docSnap.data());
                    setMember(docSnap.data());

                } else {

                    console.log("Member document not found.");

                }

            } catch (error) {

                console.error("Dashboard Error:", error);

            }

            setLoading(false);

        });

        return () => unsubscribe();

    }, [navigate]);

    const handleLogout = async () => {

        await signOut(auth);

        navigate("/login");

    };

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <h4>Loading Dashboard...</h4>

            </div>

        );

    }

    return (

        <div className="container py-5">

            <div className="card shadow border-0">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">
                        🚗 ABDM Member Dashboard
                    </h3>

                </div>

                <div className="card-body">

                    <h4 className="text-success">
                        Welcome, {member?.name || "Member"}
                    </h4>

                    <hr />

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th width="220">Member ID</th>
                                <td>{member?.memberId || "-"}</td>
                            </tr>

                            <tr>
                                <th>Full Name</th>
                                <td>{member?.name || "-"}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{member?.email || "-"}</td>
                            </tr>

                            <tr>
                                <th>Phone</th>
                                <td>{member?.phone || "-"}</td>
                            </tr>

                            <tr>
                                <th>Membership Type</th>
                                <td>{member?.membershipType || "-"}</td>
                            </tr>

                            <tr>
                                <th>Membership Status</th>
                                <td>{member?.membershipStatus || "-"}</td>
                            </tr>

                            <tr>
                                <th>Payment Status</th>
                                <td>{member?.paymentStatus || "-"}</td>
                            </tr>

                        </tbody>

                    </table>

                    <QRCodeCard member={member} />

                    <div className="mt-4">

                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;