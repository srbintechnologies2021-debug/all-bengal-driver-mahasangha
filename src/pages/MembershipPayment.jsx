import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MembershipPayment() {

    const navigate = useNavigate();

    const membershipFee = 100;

    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {

        try {

            setLoading(true);

            // Razorpay integration will be connected here
            // after Firebase Cloud Function deployment.

            alert("Razorpay payment setup is ready for the next step.");

        } catch (error) {

            console.error("Payment Error:", error);

            alert("Unable to start payment.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                padding: "30px"
            }}
        >

            <div className="card shadow border-0">

                <div className="card-header bg-success text-white">

                    <h3 className="mb-0">
                        💳 Membership Payment
                    </h3>

                </div>

                <div className="card-body">

                    <div className="text-center mb-4">

                        <h5>
                            All Bengal Driver Mahasangha
                        </h5>

                        <p className="text-muted">
                            Membership Registration Fee
                        </p>

                    </div>

                    <div
                        className="alert alert-info text-center"
                    >

                        <strong>
                            Membership Fee
                        </strong>

                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold"
                            }}
                        >
                            ₹{membershipFee}
                        </div>

                    </div>

                    <button
                        type="button"
                        className="btn btn-success btn-lg w-100"
                        onClick={handlePayment}
                        disabled={loading}
                    >

                        {loading
                            ? "Processing..."
                            : "💳 Pay ₹100"
                        }

                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mt-3"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        ← Go Back
                    </button>

                    <p className="text-muted text-center mt-4 mb-0">
                        🔒 Secure payment powered by Razorpay
                    </p>

                </div>

            </div>

        </div>

    );
}

export default MembershipPayment;