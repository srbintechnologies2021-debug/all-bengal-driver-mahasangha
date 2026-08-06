function DriverInfo({ formData, handleChange, setStep }) {

    return (

        <div className="card shadow-sm border-0">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                    🚗 Driver Information
                </h4>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label className="form-label">
                        Driving Licence Number *
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="licenceNo"
                        value={formData.licenceNo}
                        onChange={handleChange}
                        placeholder="Enter Driving Licence Number"
                        required
                    />

                </div>


                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Licence Expiry Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="licenceExpiry"
                            value={formData.licenceExpiry}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Driver Category
                        </label>

                        <select
                            className="form-select"
                            name="driverCategory"
                            value={formData.driverCategory}
                            onChange={handleChange}
                        >

                            <option value="">Select Category</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Private">Private</option>
                            <option value="Tourist">Tourist</option>

                        </select>

                    </div>

                </div>


                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Vehicle Type
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            placeholder="Car / Taxi / Bus / Truck"
                        />

                    </div>


                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Vehicle Number
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="vehicleNo"
                            value={formData.vehicleNo}
                            onChange={handleChange}
                            placeholder="WB XX XX XXXX"
                        />

                    </div>

                </div>


                <div className="mb-4">

                    <label className="form-label">
                        Driving Experience (Years)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Years of Experience"
                    />

                </div>


                <div className="d-flex justify-content-between">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(3)}
                    >
                        ← Back
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(5)}
                    >
                        Next →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DriverInfo;