import { Link } from "react-router-dom";
import "../../styles/About.css";

function About() {
    return (
        <section className="about-section py-5">
            <div className="container">

                <div className="row align-items-center g-5">

                    {/* Left Side */}
                    <div className="col-lg-5 text-center">

                        <img
                            src="/abdm-logo.png"
                            alt="ABDM Logo"
                            className="about-logo img-fluid"
                        />

                    </div>

                    {/* Right Side */}
                    <div className="col-lg-7">

                        <span className="about-subtitle">
                            ABOUT ABDM
                        </span>

                        <h2 className="about-title">
                            All Bengal Driver Mahasangha
                        </h2>

                        <p className="about-description">
                            All Bengal Driver Mahasangha (ABDM) is a professional
                            organization dedicated to the welfare, development,
                            rights, and unity of drivers throughout West Bengal.
                            Our mission is to empower drivers through digital
                            membership, identity cards, legal support, welfare
                            initiatives, and skill development programs.
                        </p>

                        <div className="row mt-4">

                            <div className="col-md-4 mb-3">
                                <div className="feature-card">
                                    <div className="feature-icon">
                                        🚗
                                    </div>
                                    <h5>Driver Welfare</h5>
                                    <p>
                                        Supporting every registered driver.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-3">
                                <div className="feature-card">
                                    <div className="feature-icon">
                                        🪪
                                    </div>
                                    <h5>Digital ID</h5>
                                    <p>
                                        QR Verified Membership Identity.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-3">
                                <div className="feature-card">
                                    <div className="feature-icon">
                                        🤝
                                    </div>
                                    <h5>Legal Support</h5>
                                    <p>
                                        Help and assistance for members.
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-4">

                            <Link
                                to="/membership"
                                className="btn btn-primary btn-lg me-3"
                            >
                                Join Membership
                            </Link>

                            <Link
                                to="/contact"
                                className="btn btn-outline-primary btn-lg"
                            >
                                Contact Us
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default About;