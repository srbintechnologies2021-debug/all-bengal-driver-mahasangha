import { INDIA_STATES_DISTRICTS, INDIA_STATES_LIST } from "../../data/indiaAllStatesDistricts";

function AddressInfo({ formData, handleChange, setStep }) {
  const selectedState = formData.state || "";
  const districtOptions = INDIA_STATES_DISTRICTS[selectedState] || [];

  const handleStateChange = (e) => {
    const newState = e.target.value;
    handleChange(e);
    handleChange({ target: { name: "district", value: "" } });
  };

  return (
    <div
      className="card shadow-sm border-0"
      style={{
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "18px",
      }}
    >
      <div className="card-header bg-primary text-white" style={{ borderRadius: "18px 18px 0 0" }}>
        <h4 className="mb-0">📍 Address Information (All India States & Districts)</h4>
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
              value={selectedState}
              onChange={handleStateChange}
              required
            >
              <option value="">-- Select State / UT --</option>
              {INDIA_STATES_LIST.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">District (সমস্ত জেলার ড্রপডাউন) *</label>
            <select
              className="form-select"
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!selectedState}
              required
            >
              <option value="">
                {selectedState ? "-- Select District --" : "-- আগে State সিলেক্ট করুন --"}
              </option>
              {districtOptions.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">Block (ব্লক)</label>
            <input
              type="text"
              className="form-control"
              name="block"
              value={formData.block || ""}
              onChange={handleChange}
              placeholder="Enter Block"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">Anchal (অঞ্চল / Gram Panchayat)</label>
            <input
              type="text"
              className="form-control"
              name="anchal"
              value={formData.anchal || ""}
              onChange={handleChange}
              placeholder="Enter Anchal"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label fw-semibold">Municipality (মিউনিসিপালিটি)</label>
            <input
              type="text"
              className="form-control"
              name="municipality"
              value={formData.municipality || ""}
              onChange={handleChange}
              placeholder="Enter Municipality"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Police Station *</label>
            <input
              type="text"
              className="form-control"
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              placeholder="Enter Police Station"
              required
            />
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
