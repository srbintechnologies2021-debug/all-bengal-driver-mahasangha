function AddressInfo({ formData, handleChange }) {
    return (
        <>
            <h3 className="mb-4 text-primary">
                📍 Address Information
            </h3>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        District
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Enter District"
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Block
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="block"
                        value={formData.block}
                        onChange={handleChange}
                        placeholder="Enter Block"
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Police Station
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="policeStation"
                        value={formData.policeStation}
                        onChange={handleChange}
                        placeholder="Enter Police Station"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        PIN Code
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter PIN Code"
                        maxLength="6"
                        required
                    />
                </div>

                <div className="col-12 mb-3">
                    <label className="form-label">
                        Full Address
                    </label>

                    <textarea
                        className="form-control"
                        rows="4"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Full Address"
                        required
                    />
                </div>

            </div>
        </>
    );
}

export default AddressInfo;
