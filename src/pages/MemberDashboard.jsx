import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MemberDashboard() {
    const navigate = useNavigate();

    // ================= MEMBERSHIP PLANS =================

    const membershipPlans = [
        {
            id: "monthly",
            name: "Monthly",
            icon: "🗓️",
            amount: 100,
            duration: "1 Month",
        },
        {
            id: "quarterly",
            name: "Quarterly",
            icon: "📅",
            amount: 300,
            duration: "3 Months",
        },
        {
            id: "half-yearly",
            name: "Half-Yearly",
            icon: "📆",
            amount: 600,
            duration: "6 Months",
        },
        {
            id: "annual",
            name: "Annual",
            icon: "⭐",
            amount: 1200,
            duration: "12 Months",
        },
    ];


    // ================= SELECTED PLAN =================

    const [selectedPlan, setSelectedPlan] = useState(null);


    // ================= SELECT PLAN =================

    const handleSelectPlan = (plan) => {

        setSelectedPlan(plan);

    };


    // ================= PAYMENT =================

    const handlePayment = () => {

        if (!selectedPlan) {

            alert("Please select a membership plan first.");

            return;

        }


        navigate("/membership-payment", {

            state: {
                selectedPlan: selectedPlan
            }

        });

    };


    return (

        <div className="container py-5">


            {/* ================= HEADER ================= */}

            <div className="text-center mb-5">

                <h1 className="fw-bold text-primary">
                    🚗 ABDM Member Dashboard
                </h1>

                <p className="text-muted">
                    All Bengal Driver Mahasangha
                </p>

            </div>


            {/* ================= WELCOME ================= */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h3 className="fw-bold">
                        Welcome, Member
                    </h3>

                    <p className="text-muted mb-0">
                        Welcome to your All Bengal Driver
                        Mahasangha Member Portal.
                    </p>

                </div>

            </div>


            {/* ================= MEMBERSHIP INFORMATION ================= */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-primary text-white">

                    <h5 className="mb-0">
                        👤 Membership Information
                    </h5>

                </div>


                <div className="card-body">

                    <div className="row">


                        {/* MEMBER ID */}

                        <div className="col-md-6 mb-3">

                            <strong>
                                Member ID
                            </strong>

                            <p className="text-muted mb-0">
                                ABDMXXXXXXXX
                            </p>

                        </div>


                        {/* MEMBERSHIP TYPE */}

                        <div className="col-md-6 mb-3">

                            <strong>
                                Membership Type
                            </strong>

                            <p className="text-muted mb-0">
                                Driver
                            </p>

                        </div>


                        {/* MEMBERSHIP STATUS */}

                        <div className="col-md-6 mb-3">

                            <strong>
                                Membership Status
                            </strong>

                            <p className="mb-0">

                                <span className="badge bg-success">
                                    ✅ Approved
                                </span>

                            </p>

                        </div>


                        {/* PAYMENT STATUS */}

                        <div className="col-md-6 mb-3">

                            <strong>
                                Payment Status
                            </strong>

                            <p className="mb-0">

                                <span className="badge bg-warning text-dark">
                                    ⏳ Pending
                                </span>

                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= MEMBERSHIP PLANS ================= */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-success text-white">

                    <h5 className="mb-0">
                        💳 Choose Membership Plan
                    </h5>

                </div>


                <div className="card-body">

                    <p className="text-muted">
                        আপনার পছন্দের Membership Plan নির্বাচন করুন।
                    </p>


                    <div className="row">


                        {membershipPlans.map((plan) => (

                            <div
                                className="col-lg-3 col-md-6 mb-4"
                                key={plan.id}
                            >

                                <div
                                    className={
                                        selectedPlan?.id === plan.id
                                            ? "card h-100 text-center border-primary shadow"
                                            : "card h-100 text-center border"
                                    }
                                >

                                    <div className="card-body">

                                        {/* ICON */}

                                        <div
                                            style={{
                                                fontSize: "35px"
                                            }}
                                        >
                                            {plan.icon}
                                        </div>


                                        {/* PLAN NAME */}

                                        <h5 className="fw-bold mt-2">
                                            {plan.name}
                                        </h5>


                                        {/* AMOUNT */}

                                        <h2 className="text-primary fw-bold">
                                            ₹{plan.amount.toLocaleString("en-IN")}
                                        </h2>


                                        {/* DURATION */}

                                        <p className="text-muted">
                                            Valid for {plan.duration}
                                        </p>


                                        {/* SELECT BUTTON */}

                                        <button
                                            className={
                                                selectedPlan?.id === plan.id
                                                    ? "btn btn-success w-100"
                                                    : "btn btn-primary w-100"
                                            }
                                            onClick={() =>
                                                handleSelectPlan(plan)
                                            }
                                        >

                                            {selectedPlan?.id === plan.id
                                                ? "✅ Selected"
                                                : "Select Plan"}

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>


            {/* ================= SELECTED PLAN ================= */}

            {selectedPlan && (

                <div className="card shadow border-primary mb-4">

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">
                            💳 Selected Membership Plan
                        </h5>

                    </div>


                    <div className="card-body">

                        <div className="row align-items-center">


                            {/* PLAN */}

                            <div className="col-md-4 mb-3">

                                <small className="text-muted">
                                    Selected Plan
                                </small>

                                <h4 className="fw-bold">
                                    {selectedPlan.icon}{" "}
                                    {selectedPlan.name}
                                </h4>

                            </div>


                            {/* AMOUNT */}

                            <div className="col-md-4 mb-3">

                                <small className="text-muted">
                                    Membership Fee
                                </small>

                                <h4 className="text-success fw-bold">
                                    ₹{selectedPlan.amount.toLocaleString("en-IN")}
                                </h4>

                            </div>


                            {/* VALIDITY */}

                            <div className="col-md-4 mb-3">

                                <small className="text-muted">
                                    Validity
                                </small>

                                <h4 className="fw-bold">
                                    {selectedPlan.duration}
                                </h4>

                            </div>

                        </div>


                        <hr />


                        {/* PAYMENT BUTTON */}

                        <div className="text-center">

                            <button
                                className="btn btn-success btn-lg px-5"
                                onClick={handlePayment}
                            >
                                💳 Proceed to Payment
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* ================= DIGITAL ID ================= */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-dark text-white">

                    <h5 className="mb-0">
                        🪪 Digital Membership ID
                    </h5>

                </div>


                <div className="card-body text-center">

                    <p className="text-muted">
                        Your Digital ID Card will be available
                        after successful membership payment.
                    </p>

                    <button
                        className="btn btn-secondary"
                        disabled
                    >
                        🪪 Digital ID Card
                    </button>

                </div>

            </div>


            {/* ================= QR CODE ================= */}

            <div className="card shadow-sm border-0">

                <div className="card-header bg-info text-white">

                    <h5 className="mb-0">
                        📱 Membership QR Code
                    </h5>

                </div>


                <div className="card-body text-center">

                    <p className="text-muted">
                        Your Membership QR Code will be activated
                        after successful payment.
                    </p>

                    <button
                        className="btn btn-secondary"
                        disabled
                    >
                        📱 QR Code
                    </button>

                </div>

            </div>


        </div>

    );

}


export default MemberDashboard;