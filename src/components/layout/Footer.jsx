import { Link } from "react-router-dom";

import abdmLogo from "../../assets/abdm-logo.jpg";


function Footer() {

    return (

        <footer className="bg-dark text-white pt-5 pb-3">

            <div className="container">

                <div className="row g-4">


                    {/* =================================
                        ORGANIZATION
                    ================================= */}

                    <div className="col-lg-4 col-md-6">

                        <div className="d-flex align-items-center mb-3">

                            <img
                                src={abdmLogo}
                                alt="All Bengal Driver Mahasangha Official Logo"
                                style={{
                                    width: "75px",
                                    height: "75px",
                                    objectFit: "contain",
                                    borderRadius: "50%",
                                    backgroundColor: "#ffffff",
                                    padding: "3px",
                                }}
                            />

                            <div className="ms-3">

                                <h5 className="mb-1">
                                    All Bengal Driver Mahasangha
                                </h5>

                                <small className="text-light">
                                    ABDM
                                </small>

                            </div>

                        </div>


                        <p className="text-light">
                            United for the Welfare of Drivers
                            Across West Bengal
                        </p>


                        <p className="text-secondary">
                            Supporting drivers through membership,
                            welfare, digital identity, legal support
                            and social initiatives.
                        </p>


                        {/* Registration */}

                        <p className="mb-0">

                            <strong>
                                Registration No:
                            </strong>

                            <br />

                            <span className="text-light">
                                IV-224/24
                            </span>

                        </p>

                    </div>


                    {/* =================================
                        QUICK LINKS
                    ================================= */}

                    <div className="col-lg-3 col-md-6">

                        <h5 className="mb-3">
                            Quick Links
                        </h5>


                        <ul className="list-unstyled">


                            <li className="mb-2">

                                <Link
                                    to="/"
                                    className="text-light text-decoration-none"
                                >
                                    🏠 Home
                                </Link>

                            </li>


                            <li className="mb-2">

                                <Link
                                    to="/about"
                                    className="text-light text-decoration-none"
                                >
                                    ℹ️ About Us
                                </Link>

                            </li>


                            <li className="mb-2">

                                <Link
                                    to="/register"
                                    className="text-light text-decoration-none"
                                >
                                    🪪 Join Membership
                                </Link>

                            </li>


                            <li className="mb-2">

                                <Link
                                    to="/login"
                                    className="text-light text-decoration-none"
                                >
                                    🔐 Member Login
                                </Link>

                            </li>


                            <li className="mb-2">

                                <Link
                                    to="/contact"
                                    className="text-light text-decoration-none"
                                >
                                    📞 Contact Us
                                </Link>

                            </li>


                            <li>

                                <Link
                                    to="/gallery"
                                    className="text-light text-decoration-none"
                                >
                                    🖼️ Gallery
                                </Link>

                            </li>


                        </ul>

                    </div>


                    {/* =================================
                        OFFICIAL CONTACT
                    ================================= */}

                    <div className="col-lg-5">

                        <h5 className="mb-3">
                            Official Contact
                        </h5>


                        {/* Address */}

                        <p className="mb-3">

                            📍 <strong>Address</strong>

                            <br />

                            <span className="ms-4 text-light">

                                Sarenga, Madhupur,
                                <br />

                                Hariyatara
                                (near Kalaikunda Petrol Pump),
                                <br />

                                West Bengal - 721804

                            </span>

                        </p>


                        {/* Phone */}

                        <p className="mb-3">

                            📞 <strong>Phone</strong>

                            <br />

                            <span className="ms-4">

                                <a
                                    href="tel:8144290180"
                                    className="text-light text-decoration-none"
                                >
                                    8144290180
                                </a>

                                {" / "}

                                <a
                                    href="tel:9749532348"
                                    className="text-light text-decoration-none"
                                >
                                    97495 32348
                                </a>

                            </span>

                        </p>


                        {/* Email */}

                        <p className="mb-0">

                            📧 <strong>Email</strong>

                            <br />

                            <span className="ms-4">

                                <a
                                    href="mailto:drivermahasanghaallbengal@gmail.com"
                                    className="text-light text-decoration-none"
                                >
                                    drivermahasanghaallbengal@gmail.com
                                </a>

                            </span>

                        </p>

                    </div>

                </div>


                {/* =================================
                    DIVIDER
                ================================= */}

                <hr className="mt-4" />


                {/* =================================
                    COPYRIGHT
                ================================= */}

                <div className="text-center">

                    <p className="mb-1">

                        © 2026 All Bengal Driver Mahasangha.
                        All Rights Reserved.

                    </p>


                    <small className="text-secondary">

                        Official Digital Membership Portal

                    </small>

                </div>

            </div>

        </footer>

    );

}


export default Footer;