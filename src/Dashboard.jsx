import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const [member, setMember] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;

        if (!user) {
            navigate("/login");
            return;
        }

        const loadMember = async () => {
            try {
                const docRef = doc(db, "members", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setMember(docSnap.data());
                } else {
                    alert("Member data not found.");
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadMember();
    }, [navigate]);

    const logoutUser = async () => {
        await signOut(auth);
        alert("Logged out successfully");
        navigate("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🚗 ABDM Member Dashboard</h1>

            <hr />

            <p>Name: {member?.fullName}</p>

            <p>Member ID: {member?.memberId}</p>

            <p>Email: {member?.email}</p>

            <p>Phone: {member?.phone}</p>

            <p>District: {member?.district}</p>

            <p>Block: {member?.block}</p>

            <p>Status: {member?.status}</p>

            <p>Membership Type: {member?.membershipType}</p>

            <br />

            <button onClick={logoutUser}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;