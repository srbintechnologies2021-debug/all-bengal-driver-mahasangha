import { Link } from "react-router-dom";

function Hero() {
    return (
        <section
            className="d-flex align-items-center text-center text-white"
            style={{
                minHeight: "100vh",
                backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url('/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="container">

                <img
                    src="/logo.png"
                    alt="ABDM Logo"
                    style={{
                        width: "170px",
                        height: "170px",
                        borderRadius: "50%",
                        background: "#fff",
                        padding: "12px",
                        boxShadow: "0 0 25px rgba(255,255,255,.5)"
                    }}
                />

                <h1
                    className="fw-bold mt-4"
                    style={{
                        fontSize: "55px"
                    }}
                >
                    🚗 ALL BENGAL DRIVER MAHASANGHA
                </h1>

                <h3 className="mt-3 text-warning">
                    পশ্চিমবঙ্গের সকল চালকদের ঐক্যবদ্ধ সংগঠন
                </h3>

                <p
                    className="mt-4"
                    style={{
                        fontSize: "22px",
                        maxWidth: "900px",
                        margin: "auto",
                    }}
                >
                    Driver Welfare | Digital Membership |
                    Legal Support | Emergency Help |
                    Organization News | Training | Insurance
                </p>

                <div className="mt-5">

                    <Link
                        to="/register"
                        className="btn btn-success btn-lg me-3 px-4"
                    >
                        📝 Register Member
                    </Link>

                    <Link
                        to="/login"
                        className="btn btn-warning btn-lg px-4"
                    >
                        🔐 Member Login
                    </Link>

                </div>

            </div>
        </section>
    );
}

export default Hero;