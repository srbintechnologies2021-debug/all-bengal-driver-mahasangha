import "../../styles/Statistics.css";
import { FaUsers, FaUserCheck, FaClock, FaBuilding } from "react-icons/fa";

function Statistics() {
    const transparentCardStyle = {
        background: "transparent",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "none",
    };

    return (
        <section id="statistics" className="statistics-section" style={{ background: "transparent" }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="statistics-title">ABDM Live Statistics</h2>
                    <p className="statistics-subtitle">
                        Real-time membership statistics of All Bengal Driver Mahasangha
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card" style={transparentCardStyle}>
                            <FaUsers className="stats-icon" />
                            <h3>1,250</h3>
                            <p>Total Members</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card" style={transparentCardStyle}>
                            <FaUserCheck className="stats-icon" />
                            <h3>1,010</h3>
                            <p>Approved Members</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card" style={transparentCardStyle}>
                            <FaClock className="stats-icon" />
                            <h3>240</h3>
                            <p>Pending Approval</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card" style={transparentCardStyle}>
                            <FaBuilding className="stats-icon" />
                            <h3>23</h3>
                            <p>District Committees</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Statistics;
