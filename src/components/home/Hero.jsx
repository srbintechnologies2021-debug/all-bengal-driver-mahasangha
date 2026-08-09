import { Link } from "react-router-dom";
import "../../styles/hero.css";

import abdmLogo from "../../assets/abdm-logo.jpg";


function Hero() {

    return (

        <section className="hero-section">

            <div className="hero-overlay">

                <div className="container">

                    <div className="row align-items-center min-vh-100">


                        {/* =================================
                            LEFT SIDE
                        ================================= */}

                        <div
                            className="col-lg-7 text-white"
                            data-aos="fade-right"
                        >

                            <span className="hero-badge">

                                🚗 Official Website

                            </span>


                            <h1 className="hero-title mt-3">

                                ALL BENGAL DRIVER
                                <br />
                                MAHASANGHA

                            </h1>


                            <h4 className="hero-subtitle">

                                পশ্চিমবঙ্গের সকল চালকদের
                                ঐক্যবদ্ধ সংগঠন

                            </h4>


                            <p className="hero-description">

                                Driver Welfare • Digital Membership •
                                Legal Support • Emergency Help •
                                Organization News • Driver Training •
                                Insurance & Social Welfare

                            </p>


                            {/* Buttons */}

                            <div className="mt-4">

                                <Link
                                    to="/register"
                                    className="btn btn-warning btn-lg me-3 mb-2"
                                >

                                    <i className="bi bi-person-plus-fill me-2"></i>

                                    Join Membership

                                </Link>


                                <Link
                                    to="/login"
                                    className="btn btn-outline-light btn-lg mb-2"
                                >

                                    <i className="bi bi-box-arrow-in-right me-2"></i>

                                    Member Login

                                </Link>

                            </div>

                        </div>


                        {/* =================================
                            RIGHT SIDE
                        ================================= */}

                        <div
                            className="col-lg-5 mt-5 mt-lg-0"
                            data-aos="fade-left"
                        >

                            <div className="hero-card text-center">


                                {/* Official ABDM Logo */}

                                <img
                                    src={abdmLogo}
                                    alt="All Bengal Driver Mahasangha Official Logo"
                                    className="hero-logo"
                                />


                                <h3 className="mt-3">

                                    All Bengal Driver Mahasangha

                                </h3>


                                <p className="text-muted">

                                    Digital Membership Portal

                                </p>


                                <hr />


                                {/* Statistics */}

                                <div className="row text-center">


                                    <div className="col-4">

                                        <h4 className="text-primary">
                                            23
                                        </h4>

                                        <small>
                                            Districts
                                        </small>

                                    </div>


                                    <div className="col-4">

                                        <h4 className="text-success">
                                            500+
                                        </h4>

                                        <small>
                                            Members
                                        </small>

                                    </div>


                                    <div className="col-4">

                                        <h4 className="text-warning">
                                            24×7
                                        </h4>

                                        <small>
                                            Support
                                        </small>

                                    </div>


                                </div>


                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </section>

    );

}


export default Hero;