import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./../styles/navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            <div className="nav-container">

                {/* Logo */}
                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >
                    🚗 <span>ABDM</span>
                </Link>

                {/* Mobile Menu Button */}
                <div
                    className="menu-icon"
                    onClick={toggleMenu}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Navigation */}
                <ul className={menuOpen ? "nav-links active" : "nav-links"}>

                    <li>
                        <a href="#home" onClick={closeMenu}>
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="#about" onClick={closeMenu}>
                            About
                        </a>
                    </li>

                    <li>
                        <a href="#statistics" onClick={closeMenu}>
                            Statistics
                        </a>
                    </li>

                    <li>
                        <a href="#leaders" onClick={closeMenu}>
                            Leaders
                        </a>
                    </li>

                    <li>
                        <a href="#gallery" onClick={closeMenu}>
                            Gallery
                        </a>
                    </li>

                    <li>
                        <a href="#contact" onClick={closeMenu}>
                            Contact
                        </a>
                    </li>

                </ul>

                {/* Right Buttons */}
                <div className="nav-buttons">

                    <Link
                        to="/login"
                        className="login-btn"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="register-btn"
                    >
                        Join Membership
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;