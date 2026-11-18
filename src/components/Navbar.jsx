import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import abdmLogo from "../assets/abdm-logo.jpg";
import "../styles/navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo d-flex align-items-center gap-2" onClick={closeMenu}>
                    <img
                        src={abdmLogo}
                        alt="ABDM Logo"
                        style={{
                            height: "44px",
                            width: "44px",
                            objectFit: "contain",
                            borderRadius: "50%", border: "2px solid #FBBF24",
                            background: "transparent",
                        }}
                    />
                    <span>ABDM</span>
                </Link>

                <button type="button" className="menu-icon" onClick={toggleMenu} aria-label="Toggle navigation menu">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <ul className={menuOpen ? "nav-links active" : "nav-links"}>
                    <li><a href="/#home" onClick={closeMenu}>Home</a></li>
                    <li><a href="/#about" onClick={closeMenu}>About</a></li>
                    <li><a href="/#verify" onClick={closeMenu}>Verify ID</a></li>
                    <li><a href="/#statistics" onClick={closeMenu}>Statistics</a></li>
                    <li><a href="/#leaders" onClick={closeMenu}>Leaders</a></li>
                    <li><a href="/#gallery" onClick={closeMenu}>Gallery</a></li>
                    <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
                </ul>

                <div className="nav-buttons">
                    <Link to="/login" className="login-btn" onClick={closeMenu}>Login</Link>
                    <Link to="/register" className="register-btn" onClick={closeMenu}>Join Membership</Link>
                    <Link to="/admin-login" className="admin-btn" onClick={closeMenu}>
                        <FaUserShield />
                        <span>Admin</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
