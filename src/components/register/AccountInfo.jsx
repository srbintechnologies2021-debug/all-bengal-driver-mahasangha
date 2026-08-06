function AccountInfo({
    formData,
    handleChange,
    setStep
}) {

    return (

        <div className="card shadow-sm border-0">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                    🔐 Account Information
                </h4>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label className="form-label">
                        Password *
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />

                </div>


                <div className="mb-3">

                    <label className="form-label">
                        Confirm Password *
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                    />

                </div>


                <div className="form-check mb-4">

                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="acceptTerms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                    />

                    <label
                        className="form-check-label"
                        htmlFor="acceptTerms"
                    >
                        I agree to the ABDM Membership Terms & Conditions.
                    </label>

                </div>


                <div className="d-flex justify-content-between">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(4)}
                    >
                        ← Back
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(6)}
                    >
                        Next →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AccountInfo;