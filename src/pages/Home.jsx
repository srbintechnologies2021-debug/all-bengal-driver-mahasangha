import { Link } from "react-router-dom";

function Home() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>🚗 All Bengal Driver Mahasangha</h1>
            <h2>Welcome to ABDM Website</h2>

            <Link to="/register">
                <button>Join Membership</button>
            </Link>
        </div>
    );
}

export default Home;