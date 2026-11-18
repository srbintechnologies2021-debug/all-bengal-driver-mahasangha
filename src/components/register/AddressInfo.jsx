const INDIA_STATES_UTS = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const WB_DISTRICTS = [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
    "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur",
    "Purulia", "South 24 Parganas", "Uttar Dinajpur"
];

function AddressInfo({ formData, handleChange, setStep }) {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">📍 Address Information (All India)</h4>
            </div>

            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label fw-semibold">Full Address *</label>
                    <textarea
                        className="form-control"
                        rows="2"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Village / Street / House No."
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">State / Union Territory *</label>
                        <select
                            className="form-select"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select State / UT --</option>
                            {INDIA_STATES_UTS.map((st) => (
                                <option key={st} value={st}>{st}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">District *</label>
                        <input
                            list="district-options"
                            className="form-control"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            placeholder="Select or Type District"
                            required
                        />
                        <datalist id="district-options">
                            {WB_DISTRICTS.map((dist) => (
                                <option key={dist} value={dist} />
                            ))}
                        </datalist>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-semibold">Block</label>
                        <input
                            list="block-options"
                            className="form-control"
                            name="block"
                            value={formData.block}
                            onChange={handleChange}
                            placeholder="Select / Enter Block"
                        />
                        <datalist id="block-options">
                            <option value="Kharagpur-I" />
                            <option value="Kharagpur-II" />
                            <option value="Debra" />
                            <option value="Midnapore Sadar" />
                            <option value="Keshiary" />
                            <option value="Narayangarh" />
                        </datalist>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-semibold">Anchal (Gram Panchayat)</label>
                        <input
                            list="anchal-options"
                            className="form-control"
                            name="anchal"
                            value={formData.anchal || ""}
                            onChange={handleChange}
                            placeholder="Select / Enter Anchal"
                        />
                        <datalist id="anchal-options">
                            <option value="Hariyatara" />
                            <option value="Kalaikunda" />
                            <option value="Barkola" />
                            <option value="Arjuni" />
                        </datalist>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label fw-semibold">Municipality / Corp.</label>
                        <input
                            list="municipality-options"
                            className="form-control"
                            name="municipality"
                            value={formData.municipality || ""}
                            onChange={handleChange}
                            placeholder="Select / Enter Municipality"
                        />
                        <datalist id="municipality-options">
                            <option value="Not Applicable (Rural)" />
                            <option value="Kharagpur Municipality" />
                            <option value="Midnapore Municipality" />
                            <option value="Kolkata Municipal Corporation" />
                            <option value="Howrah Municipal Corporation" />
                        </datalist>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Police Station *</label>
                        <input
                            list="ps-options"
                            className="form-control"
                            name="policeStation"
                            value={formData.policeStation}
                            onChange={handleChange}
                            placeholder="Select / Enter Police Station"
                            required
                        />
                        <datalist id="ps-options">
                            <option value="Kharagpur (Local)" />
                            <option value="Kharagpur (Town)" />
                            <option value="Debra" />
                            <option value="Kotwali" />
                            <option value="Keshiary" />
                        </datalist>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">PIN Code *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="pinCode"
                            value={formData.pinCode}
                            onChange={handleChange}
                            placeholder="6-digit PIN"
                            maxLength={6}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                        ← Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(4)}>
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddressInfo;
