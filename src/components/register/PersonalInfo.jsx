function PersonalInfo({ formData, handleChange }) {
    return (
        <>

            <h3 className="mb-4 text-primary">
                👤 Personal Information
            </h3>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Full Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Father / Husband Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        placeholder="Enter Father / Husband Name"
                        required
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label className="form-label">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-4 mb-3">
                    <label className="form-label">
                        Gender
                    </label>

                    <select
                        className="form-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>
                </div>

                <div className="col-md-4 mb-3">
                    <label className="form-label">
                        Blood Group
                    </label>

                    <select
                        className="form-select"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select Blood Group
                        </option>

                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>

                    </select>
                </div>

            </div>

        </>
    );
}

export default PersonalInfo;
