function ContactInfo({

    formData,
    handleChange,
    setStep

}) {

    return (

        <div className="card shadow-sm border-0">

            <div className="card-body">

                <h4 className="mb-4">

                    📞 Contact Information

                </h4>


                <div className="mb-3">

                    <label className="form-label">

                        Mobile Number *

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter Mobile Number"
                        required
                    />

                </div>


                <div className="mb-3">

                    <label className="form-label">

                        Email Address *

                    </label>

                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email Address"
                        required
                    />

                </div>


                <div className="mb-3">

                    <label className="form-label">

                        Alternate Mobile Number

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        placeholder="Optional"
                    />

                </div>


                <div className="mb-4">

                    <label className="form-label">

                        Emergency Contact Number

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        placeholder="Emergency Contact"
                    />

                </div>


                <div className="d-flex justify-content-between">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(1)}
                    >

                        ← Back

                    </button>


                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(3)}
                    >

                        Next →

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ContactInfo;