function AddressInfo({ formData, handleChange, setStep }) {

    return (

        <div className="card shadow-sm border-0">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                    📍 Address Information
                </h4>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label className="form-label">
                        Full Address *
                    </label>

                    <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Full Address"
                        required
                    />

                </div>


                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            District *
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
                        />

                    </div>

                </div>


                <div className="row">

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


                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            PIN Code
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleChange}
                            placeholder="PIN"
                            maxLength={6}
                        />

                    </div>


                    <div className="col-md-3 mb-3">

                        <label className="form-label">
                            State
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            readOnly
                        />

                    </div>

                </div>


                <div className="d-flex justify-content-between mt-4">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(2)}
                    >
                        ← Back
                    </button>


                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setStep(4)}
                    >
                        Next →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddressInfo;