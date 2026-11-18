import { useState } from "react";
import { Link } from "react-router-dom";
import abdmLogo from "../../assets/abdm-logo.jpg";

function Footer() {
    const [compact, setCompact] = useState(false);

    return (
        <footer
            className="bg-dark text-light border-top border-secondary"
            style={{
                fontSize: "clamp(0.82rem, 1.5vw, 0.95rem)",
                paddingTop: compact ? "1.25rem" : "2.5rem",
                paddingBottom: compact ? "1rem" : "1.75rem",
                transition: "all 0.25s ease",
                position: "relative",
                zIndex: 2,
            }}
        >
            <div className="container">
                {/* Top Header & Size Adjust Toggle */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 pb-3 mb-3 border-bottom border-secondary">
                    <div className="d-flex align-items-center gap-2">
                        <img
                            src={abdmLogo}
                            alt="ABDM Logo"
                            style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                        <div>
                            <h6 className="mb-0 fw-bold text-white" style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}>
                                All Bengal Driver Mahasangha
                            </h6>
                            <small className="text-warning fw-semibold">
                                ABDM • Reg No: IV-224/24
                            </small>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setCompact((prev) => !prev)}
                        style={{ fontSize: "0.75rem", padding: "3px 10px" }}
                    >
                        {compact ? "⤢ Expand Footer" : "⤡ Compact Footer"}
                    </button>
                </div>

                {/* Adjustable Content Area */}
                {!compact && (
                    <div className="row g-3 mb-3">
                        {/* About */}
                        <div className="col-12 col-md-4">
                            <p className="fw-semibold text-white mb-1">
                                United for the Welfare of Drivers Across West Bengal
                            </p>
                            <p className="text-secondary mb-0" style={{ lineHeight: 1.5 }}>
                                Supporting drivers through membership, welfare, digital identity, legal support and social initiatives.
                            </p>
                        </div>

                        {/* Quick Links (2-column grid on mobile) */}
                        <div className="col-12 col-md-4">
                            <h6 className="fw-bold text-white mb-2">Quick Links</h6>
                            <div className="row g-1">
                                <div className="col-6">
                                    <a href="/#home" className="text-decoration-none text-light d-block py-1">🏠 Home</a>
                                    <a href="/#about" className="text-decoration-none text-light d-block py-1">ℹ️ About Us</a>
                                    <Link to="/register" className="text-decoration-none text-light d-block py-1">🪪 Join Membership</Link>
                                </div>
                                <div className="col-6">
                                    <Link to="/login" className="text-decoration-none text-light d-block py-1">🔐 Member Login</Link>
                                    <a href="/#gallery" className="text-decoration-none text-light d-block py-1">🖼️ Gallery</a>
                                    <a href="/#contact" className="text-decoration-none text-light d-block py-1">📞 Contact Us</a>
                                </div>
                            </div>
                        </div>

                        {/* Official Contact */}
                        <div className="col-12 col-md-4">
                            <h6 className="fw-bold text-white mb-2">Official Contact</h6>
                            <p className="text-light mb-1">
                                📍 Sarenga, Madhupur, Hariyatara (Near Kalaikunda Petrol Pump), West Bengal - 721804
                            </p>
                            <p className="text-light mb-1">
                                📞 <a href="tel:+918144290180" className="text-light text-decoration-none">8144290180</a> /{" "}
                                <a href="tel:+919749532348" className="text-light text-decoration-none">97495 32348</a>
                            </p>
                            <p className="text-light mb-0 text-break">
                                ✉️ <a href="mailto:drivermahasanghaallbengal@gmail.com" className="text-light text-decoration-none">drivermahasanghaallbengal@gmail.com</a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Bottom Copyright Bar */}
                <div className="text-center text-secondary pt-2 border-top border-secondary" style={{ fontSize: "0.78rem" }}>
                    © {new Date().getFullYear()} All Bengal Driver Mahasangha (ABDM). All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
