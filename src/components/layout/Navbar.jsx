import { Link } from "react-router-dom";

import {
    FaHome,
    FaUserPlus,
    FaSignInAlt,
    FaUserShield,
} from "react-icons/fa";

import abdmLogo from "../assets/abdm-logo.jpg";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">

            <div className="container">

                {/* ================================
                    BRAND
                ================================= */}

                <Link
                    className="navbar-brand d-flex align-items-center"
                    to="/"
                >

                    <img
                        src={abdmLogo}
                        alt="All Bengal Driver Mahasangha Logo"
                        style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "contain",
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            padding: "2px",
                        }}
                    />

                    <span className="fw-bold ms-2">
                        All Bengal Driver Mahasangha
                    </span>

                </Link>


                {/* ================================
                    MOBILE TOGGLER
                ================================= */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                {/* ================================
                    NAVIGATION
                ================================= */}

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto">

                        {/* HOME */}

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/"
                            >
                                <FaHome className="me-1" />
                                Home
                            </Link>
                        </li>


                        {/* REGISTER */}

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/register"
                            >
                                <FaUserPlus className="me-1" />
                                Register
                            </Link>
                        </li>


                        {/* MEMBER LOGIN */}

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/login"
                            >
                                <FaSignInAlt className="me-1" />
                                Login
                            </Link>
                        </li>


                        {/* ADMIN LOGIN */}

                        <li className="nav-item">
                            <Link
                                className="nav-link admin-nav-link"
                                to="/admin-login"
                            >
                                <FaUserShield className="me-1" />
                                Admin
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;