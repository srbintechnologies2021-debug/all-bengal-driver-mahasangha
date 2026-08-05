function DriverInfo({ formData, handleChange }) {
    return (
        <>
            <h3 className="mb-4 text-primary">
                🚗 Driver Information
            </h3>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Driving Licence Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="licenceNumber"
                        value={formData.licenceNumber}
                        onChange={handleChange}
                        placeholder="Enter Driving Licence Number"
                        required
                    />
                </div>

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
                        Vehicle Type
                    </label>

                    <select
                        className="form-select"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                    >
                        <option value="">Select Vehicle Type</option>
                        <option value="Car">Car</option>
                        <option value="Taxi">Taxi</option>
                        <option value="Auto">Auto</option>
                        <option value="Bus">Bus</option>
                        <option value="Truck">Truck</option>
                        <option value="Bike">Bike</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Vehicle Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="vehicleNumber"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        placeholder="WB XX XX XXXX"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Aadhaar Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        placeholder="Enter Aadhaar Number"
                        maxLength="12"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Emergency Contact Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                        placeholder="Emergency Contact Name"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Emergency Contact Number
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleChange}
                        placeholder="Emergency Mobile Number"
                        maxLength="10"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Relationship
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        placeholder="Father / Mother / Wife / Brother"
                    />
                </div>

            </div>
        </>
    );
}

export default DriverInfo;