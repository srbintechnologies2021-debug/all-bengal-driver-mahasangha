import { Link } from "react-router-dom";
import { FaHome, FaUserPlus, FaSignInAlt, FaIdCard } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        backgroundColor: "rgba(13, 71, 161, 0.86)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo.png"
            alt="All Bengal Driver Mahasangha Transparent Logo"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
              backgroundColor: "transparent",
            }}
          />
          <span className="fw-bold ms-2">All Bengal Driver Mahasangha</span>
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FaUserPlus className="me-1" /> Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/member-dashboard">
                <FaIdCard className="me-1" /> Member Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FaSignInAlt className="me-1" /> Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
