import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="navbar"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(13, 71, 161, 0.84)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <div className="nav-container">
        <Link to="/" className="logo d-flex align-items-center gap-2" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt="ABDM Transparent Logo"
            style={{
              height: "46px",
              width: "46px",
              objectFit: "contain",
              background: "transparent",
            }}
          />
          <span>ABDM</span>
        </Link>

        <button
          type="button"
          className="menu-icon"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><a href="/#home" onClick={closeMenu}>Home</a></li>
          <li><a href="/#about" onClick={closeMenu}>About</a></li>
          <li>
            <a href="/#verify" onClick={closeMenu} className="inline-flex items-center gap-1">
              <FaSearch /> Verify / Search ID
            </a>
          </li>
          <li><a href="/#statistics" onClick={closeMenu}>Statistics</a></li>
          <li><a href="/#leaders" onClick={closeMenu}>Leaders</a></li>
          <li><a href="/#gallery" onClick={closeMenu}>Gallery</a></li>
          <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
        </ul>

        <div className="nav-buttons">
          <Link to="/member-dashboard" className="login-btn" onClick={closeMenu}>
            Member Dashboard
          </Link>
          <Link to="/register" className="register-btn" onClick={closeMenu}>
            Join Membership
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
