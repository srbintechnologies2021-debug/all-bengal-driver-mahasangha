function MembershipInfo({ membershipID }) {
    return (
        <>
            <h3 className="mb-4 text-primary">
                💳 Membership Information
            </h3>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Membership ID
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={membershipID || "Auto Generate"}
                        disabled
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Membership Fee
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value="₹100"
                        disabled
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Payment Status
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value="Pending"
                        disabled
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Member Status
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value="Active"
                        disabled
                    />
                </div>

            </div>
        </>
    );
}

export default MembershipInfo;