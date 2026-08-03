import { Link } from "react-router-dom";

function Home() {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "50px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1>🚗 All Bengal Driver Mahasangha</h1>

            <h2>Welcome to ABDM Membership Portal</h2>

            <p>
                Join our driver community and get your Digital Membership Card.
            </p>

            <div style={{ marginTop: "30px" }}>
                <Link to="/register">
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
                            cursor: "pointer",
                        }}
                    >
                        📝 Register Member
                    </button>
                </Link>

                <Link to="/login">
                    <button
                        style={{
                            padding: "10px 20px",
                            margin: "10px",
                            cursor: "pointer",
                        }}
                    >
                        🔐 Member Login
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;