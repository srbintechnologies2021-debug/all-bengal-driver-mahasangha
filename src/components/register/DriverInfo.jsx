import { useRef, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function DriverInfo({ formData, handleChange, setStep }) {
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [uploadingAadhaar, setUploadingAadhaar] = useState(false);
    const [selfieMode, setSelfieMode] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const uploadAsset = async (file, folder) => {
        const ext = file.name?.split(".").pop() || "jpg";
        const filePath = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("member-assets").upload(filePath, file);
        if (error) throw error;
        const { data } = supabase.storage.from("member-assets").getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleMemberPhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
            alert("Only JPG and PNG formats are allowed.");
            return;
        }
        try {
            setUploadingPhoto(true);
            const url = await uploadAsset(file, "member-photos");
            handleChange({ target: { name: "memberPhotoUrl", value: url } });
        } catch (err) {
            alert("Photo upload failed: " + err.message);
        } finally {
            setUploadingPhoto(false);
        }
    };

    const startSelfieCamera = async () => {
        try {
            setSelfieMode(true);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            });
            streamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
            setSelfieMode(false);
            alert("Camera access denied or unavailable: " + err.message);
        }
    };

    const stopSelfieCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        setSelfieMode(false);
    };

    const captureSelfie = async () => {
        if (!videoRef.current) return;
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth || 400;
        canvas.height = videoRef.current.videoHeight || 400;
        canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
            if (!blob) return;
            try {
                setUploadingPhoto(true);
                const file = new File([blob], `selfie_${Date.now()}.jpg`, { type: "image/jpeg" });
                const url = await uploadAsset(file, "member-photos");
                handleChange({ target: { name: "memberPhotoUrl", value: url } });
                stopSelfieCamera();
            } catch (err) {
                alert("Selfie upload failed: " + err.message);
            } finally {
                setUploadingPhoto(false);
            }
        }, "image/jpeg", 0.9);
    };

    const handleAadhaarPhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setUploadingAadhaar(true);
            const url = await uploadAsset(file, "aadhaar-docs");
            handleChange({ target: { name: "aadhaarPhotoUrl", value: url } });
        } catch (err) {
            alert("Aadhaar photo upload failed: " + err.message);
        } finally {
            setUploadingAadhaar(false);
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Driver, Photo & Identity Information</h4>
            </div>

            <div className="card-body">
                {/* Member ID Card Photo (JPG / PNG / Selfie Mode) */}
                <div className="p-3 mb-4 bg-light rounded border">
                    <label className="form-label fw-bold d-block">
                        📸 Member Photo for ID Card (JPG, PNG or Live Selfie) *
                    </label>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <label className="btn btn-outline-primary btn-sm mb-0">
                            {uploadingPhoto ? "Uploading..." : "📁 Upload JPG / PNG"}
                            <input
                                type="file"
                                accept="image/jpeg,image/png"
                                hidden
                                onChange={handleMemberPhotoUpload}
                                disabled={uploadingPhoto}
                            />
                        </label>

                        {!selfieMode ? (
                            <button type="button" className="btn btn-outline-success btn-sm" onClick={startSelfieCamera}>
                                🤳 Selfie Mode
                            </button>
                        ) : (
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={stopSelfieCamera}>
                                ✕ Close Camera
                            </button>
                        )}
                    </div>

                    {selfieMode && (
                        <div className="text-center mb-3">
                            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "280px", borderRadius: "10px" }} />
                            <div className="mt-2">
                                <button type="button" className="btn btn-success btn-sm" onClick={captureSelfie} disabled={uploadingPhoto}>
                                    {uploadingPhoto ? "Saving Selfie..." : "📷 Capture & Use Selfie"}
                                </button>
                            </div>
                        </div>
                    )}

                    {formData.memberPhotoUrl && (
                        <div className="mt-2">
                            <img
                                src={formData.memberPhotoUrl}
                                alt="Member Preview"
                                style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "8px", border: "2px solid #0d6efd" }}
                            />
                            <span className="badge bg-success ms-2">✓ Photo Attached</span>
                        </div>
                    )}
                </div>

                {/* Aadhaar Number or Photo */}
                <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label fw-semibold">🪪 Aadhaar Number (12 Digits)</label>
                        <input
                            type="text"
                            className="form-control"
                            name="aadhaarNumber"
                            value={formData.aadhaarNumber || ""}
                            onChange={handleChange}
                            placeholder="Enter 12-digit Aadhaar Number"
                            maxLength={12}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">📄 Or Upload Aadhaar Photo (JPG/PNG)</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/jpeg,image/png"
                            onChange={handleAadhaarPhotoUpload}
                            disabled={uploadingAadhaar}
                        />
                        {formData.aadhaarPhotoUrl && (
                            <small className="text-success fw-bold">✓ Aadhaar Document Uploaded</small>
                        )}
                    </div>
                </div>

                {/* Licence Info */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Driving Licence Number *</label>
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
                        <label className="form-label fw-semibold">Licence Expiry Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="licenceExpiry"
                            value={formData.licenceExpiry}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Driver Category</label>
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

                {/* Vehicle Type Dropdown: LMV / HMV / Other Vehicle */}
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Vehicle Type *</label>
                        <select
                            className="form-select"
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Vehicle Type --</option>
                            <option value="LMV">LMV (Light Motor Vehicle)</option>
                            <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                            <option value="Other Vehicle">Other Vehicle</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Vehicle Number</label>
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
                    <label className="form-label fw-semibold">Driving Experience (Years)</label>
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
                    <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>
                        ← Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(5)}>
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DriverInfo;
