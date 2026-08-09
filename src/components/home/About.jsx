import { Link } from "react-router-dom";
import "../../styles/About.css";

import abdmLogo from "../../assets/abdm-logo.jpg";


function About() {

    return (

        <section className="about-section">

            <div className="container">

                <div className="row align-items-center g-5">


                    {/* =================================
                        LEFT SIDE - OFFICIAL LOGO
                    ================================= */}

                    <div className="col-lg-5 text-center">

                        <img
                            src={abdmLogo}
                            alt="All Bengal Driver Mahasangha Official Logo"
                            className="about-logo img-fluid"
                        />

                    </div>


                    {/* =================================
                        RIGHT SIDE - ABOUT
                    ================================= */}

                    <div className="col-lg-7">

                        <span className="about-subtitle">

                            ABOUT ABDM

                        </span>


                        <h2 className="about-title">

                            All Bengal Driver Mahasangha

                        </h2>


                        <p className="about-description">

                            All Bengal Driver Mahasangha (ABDM) is a
                            professional organization dedicated to the
                            welfare, development, rights, and unity of
                            drivers throughout West Bengal.

                            Our mission is to empower drivers through
                            digital membership, identity cards, legal
                            support, welfare initiatives, and skill
                            development programs.

                        </p>


                        {/* =================================
                            FEATURES
                        ================================= */}

                        <div className="row mt-4">


                            {/* Driver Welfare */}

                            <div className="col-md-4 mb-3">

                                <div className="feature-card">

                                    <div className="feature-icon">
                                        🚗
                                    </div>

                                    <h5>
                                        Driver Welfare
                                    </h5>

                                    <p>
                                        Supporting every registered driver.
                                    </p>

                                </div>

                            </div>


                            {/* Digital ID */}

                            <div className="col-md-4 mb-3">

                                <div className="feature-card">

                                    <div className="feature-icon">
                                        🪪
                                    </div>

                                    <h5>
                                        Digital ID
                                    </h5>

                                    <p>
                                        QR Verified Membership Identity.
                                    </p>

                                </div>

                            </div>


                            {/* Legal Support */}

                            <div className="col-md-4 mb-3">

                                <div className="feature-card">

                                    <div className="feature-icon">
                                        🤝
                                    </div>

                                    <h5>
                                        Legal Support
                                    </h5>

                                    <p>
                                        Help and assistance for members.
                                    </p>

                                </div>

                            </div>


                        </div>


                        {/* =================================
                            BUTTONS
                        ================================= */}

                        <div className="mt-4">

                            <Link
                                to="/membership"
                                className="btn btn-primary btn-lg me-3 mb-2"
                            >

                                Join Membership

                            </Link>


                            <Link
                                to="/contact"
                                className="btn btn-outline-primary btn-lg mb-2"
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