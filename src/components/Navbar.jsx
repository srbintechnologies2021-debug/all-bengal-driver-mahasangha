import { Link } from "react-router-dom";
import { useState } from "react";

import {
    FaBars,
    FaTimes,
    FaUserShield,
} from "react-icons/fa";

import "../styles/navbar.css";


function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {
        setMenuOpen((previous) => !previous);
    };


    const closeMenu = () => {
        setMenuOpen(false);
    };


    return (

        <nav className="navbar">

            <div className="nav-container">


                {/* =====================================
                    LOGO
                ====================================== */}

                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >

                    🚗

                    <span>
                        ABDM
                    </span>

                </Link>


                {/* =====================================
                    MOBILE MENU BUTTON
                ====================================== */}

                <button
                    type="button"
                    className="menu-icon"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >

                    {menuOpen
                        ? <FaTimes />
                        : <FaBars />
                    }

                </button>


                {/* =====================================
                    NAVIGATION
                ====================================== */}

                <ul
                    className={
                        menuOpen
                            ? "nav-links active"
                            : "nav-links"
                    }
                >

                    <li>
                        <a
                            href="/#home"
                            onClick={closeMenu}
                        >
                            Home
                        </a>
                    </li>


                    <li>
                        <a
                            href="/#about"
                            onClick={closeMenu}
                        >
                            About
                        </a>
                    </li>


                    <li>
                        <a
                            href="/#statistics"
                            onClick={closeMenu}
                        >
                            Statistics
                        </a>
                    </li>


                    <li>
                        <a
                            href="/#leaders"
                            onClick={closeMenu}
                        >
                            Leaders
                        </a>
                    </li>


                    <li>
                        <a
                            href="/#gallery"
                            onClick={closeMenu}
                        >
                            Gallery
                        </a>
                    </li>


                    <li>
                        <a
                            href="/#contact"
                            onClick={closeMenu}
                        >
                            Contact
                        </a>
                    </li>

                </ul>


                {/* =====================================
                    RIGHT SIDE BUTTONS
                ====================================== */}

                <div className="nav-buttons">


                    {/* MEMBER LOGIN */}

                    <Link
                        to="/login"
                        className="login-btn"
                        onClick={closeMenu}
                    >
                        Login
                    </Link>


                    {/* JOIN MEMBERSHIP */}

                    <Link
                        to="/register"
                        className="register-btn"
                        onClick={closeMenu}
                    >
                        Join Membership
                    </Link>


                    {/* ADMIN LOGIN */}

                    <Link
                        to="/admin-login"
                        className="admin-btn"
                        onClick={closeMenu}
                    >

                        <FaUserShield />

                        <span>
                            Admin
                        </span>

                    </Link>


                </div>

            </div>

        </nav>
    );
}


export default Navbar;