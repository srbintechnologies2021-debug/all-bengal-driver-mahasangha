import { useNavigate } from "react-router-dom";

function MembershipPayment() {

    const navigate = useNavigate();

    const membershipFee = 500;

    const handlePayment = () => {

        alert("Razorpay Integration Coming Next Step");

        // পরে এখানে Razorpay Payment হবে
    };

    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                padding: "30px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.15)"
            }}
        >

            <h2 style={{ color: "#0d6efd" }}>
                🚗 Membership Fee Payment
            </h2>

            <hr />

            <h3>
                All Bengal Driver Mahasangha
            </h3>

            <p>
                Membership Fee:
            </p>

            <h1 style={{ color: "green" }}>
                ₹ {membershipFee}
            </h1>

            <p>
                এই Payment সফল হলে আপনার Membership Request
                Admin Review-এর জন্য যাবে।
            </p>

            <button
                onClick={handlePayment}
                style={{
                    padding: "12px 30px",
                    background: "#198754",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "18px"
                }}
            >
                💳 Pay Now
            </button>

            <br /><br />

            <button
                onClick={() => navigate("/")}
                style={{
                    padding: "10px 25px"
                }}
            >
                Back Home
            </button>

        </div>

    );

}

export default MembershipPayment;