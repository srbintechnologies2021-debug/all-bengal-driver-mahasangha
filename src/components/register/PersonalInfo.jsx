function PersonalInfo({ formData, handleChange, setStep }) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                    👤 Personal Information
                </h4>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Full Name *
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Father's Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                        />

                    </div>

                </div>


                <div className="row">

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
                        >

                            <option value="">
                                Select
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
                                Select
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>

                    </div>

                </div>


                <div className="d-flex justify-content-end mt-4">

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(2)}
                    >
                        Next →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default PersonalInfo;