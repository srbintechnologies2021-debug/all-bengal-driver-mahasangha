import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const logoutUser = async () => {
        await signOut(auth);
        alert("Logged out successfully");
        navigate("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>

            <h1>🚗 ABDM Member Dashboard</h1>

            <p>Welcome to All Bengal Driver Mahasangha</p>

            <h3>Membership Status: Active</h3>

            <button onClick={logoutUser}>
                Logout
            </button>

        </div>
    );
}

export default Dashboard;