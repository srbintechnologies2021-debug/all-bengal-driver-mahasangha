import "../../styles/Statistics.css";
import { FaUsers, FaUserCheck, FaClock, FaBuilding } from "react-icons/fa";

function Statistics() {
    return (
        <section className="statistics-section">
            <div className="container">

                <div className="text-center mb-5">
                    <h2 className="statistics-title">
                        ABDM Live Statistics
                    </h2>

                    <p className="statistics-subtitle">
                        Real-time membership statistics of All Bengal Driver Mahasangha
                    </p>
                </div>

                <div className="row g-4">

                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card">
                            <FaUsers className="stats-icon" />
                            <h3>1,250</h3>
                            <p>Total Members</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card">
                            <FaUserCheck className="stats-icon" />
                            <h3>1,010</h3>
                            <p>Approved Members</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card">
                            <FaClock className="stats-icon" />
                            <h3>240</h3>
                            <p>Pending Approval</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="stats-card">
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