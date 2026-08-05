function ContactInfo({ formData, handleChange }) {
    return (
        <>
            <h3 className="mb-4 text-primary">
                📞 Contact Information
            </h3>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Email Address
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Mobile Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                        maxLength="10"
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Alternate Mobile Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        placeholder="Enter Alternate Mobile Number"
                        maxLength="10"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create Password"
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Confirm Password
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

            </div>
        </>
    );
}

export default ContactInfo;
