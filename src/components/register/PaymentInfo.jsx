function PaymentInfo({ formData, handleRegister, setStep }) {

    return (

        <div className="card shadow-lg border-0">

            <div className="card-header bg-success text-white">

                <h3 className="mb-0">
                    💳 Membership Payment
                </h3>

            </div>

            <div className="card-body">

                <div className="text-center mb-4">

                    <h5>Registration Fee</h5>

                    <h1 className="text-success fw-bold">
                        ₹100
                    </h1>

                </div>


                <ul className="list-group mb-4">

                    <li className="list-group-item">
                        ✅ ABDM Membership Registration
                    </li>

                    <li className="list-group-item">
                        ✅ Digital Membership ID
                    </li>

                    <li className="list-group-item">
                        ✅ QR Code
                    </li>

                    <li className="list-group-item">
                        ✅ Member Dashboard Access
                    </li>

                </ul>


                <div className="d-flex justify-content-between">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(6)}
                    >
                        ← Back
                    </button>


                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleRegister}
                    >
                        Development Mode Continue →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default PaymentInfo;