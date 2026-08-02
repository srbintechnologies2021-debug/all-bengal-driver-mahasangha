import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2>🚗 ABDM</h2>

            <div>
                <Link style={styles.link} to="/">Home</Link>
                <Link style={styles.link} to="/about">About</Link>
                <Link style={styles.link} to="/membership">Membership</Link>
                <Link style={styles.link} to="/contact">Contact</Link>
                <Link style={styles.link} to="/login">Login</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#0b5ed7",
        color: "#fff",
        padding: "15px 30px",
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        marginLeft: "20px",
        fontWeight: "bold",
    },
};

export default Navbar;