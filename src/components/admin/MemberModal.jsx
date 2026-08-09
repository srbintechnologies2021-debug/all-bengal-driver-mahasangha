import { useEffect, useState } from "react";

function MemberModal({
    member,
    onClose,
    onApprove,
    onReject,
    onUpdate,
}) {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        bloodGroup: "",
        membershipType: "",
        address: "",
        block: "",
        district: "",
        state: "",
        pinCode: "",
        emergencyContact: "",
        paymentStatus: "",
    });

    useEffect(() => {

        if (member) {

            setFormData({
                name: member.name || "",
                phone: member.phone || "",
                email: member.email || "",
                bloodGroup: member.bloodGroup || "",
                membershipType: member.membershipType || "",
                address: member.address || "",
                block: member.block || "",
                district: member.district || "",
                state: member.state || "",
                pinCode: member.pinCode || "",
                emergencyContact: member.emergencyContact || "",
                paymentStatus: member.paymentStatus || "Pending",
            });

        }

    }, [member]);

    if (!member) {
        return null;
    }

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await onUpdate(member.id, formData);

    };

    return (

        <div
            className="modal d-block"
            style={{
                backgroundColor: "rgba(0,0,0,0.6)",
            }}
        >

            <div className="modal-dialog modal-lg modal-dialog-scrollable">

                <div className="modal-content">

                    <div className="modal-header bg-primary text-white">

                        <h5 className="modal-title">
                            👤 Member Details
                        </h5>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        >
                        </button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="alert alert-light border">

                                <strong>Member ID:</strong>{" "}
                                {member.memberId || member.id}

                                <br />

                                <strong>Status:</strong>{" "}
                                {member.membershipStatus || "Pending"}

                            </div>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Blood Group
                                    </label>

                                    <select
                                        name="bloodGroup"
                                        className="form-select"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                    >

                                        <option value="">
                                            Select Blood Group
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

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Membership Type
                                    </label>

                                    <input
                                        type="text"
                                        name="membershipType"
                                        className="form-control"
                                        value={formData.membershipType}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Emergency Contact
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Payment Status
                                            </label>

                                            <select
                                                name="paymentStatus"
                                                className="form-select"
                                                value={formData.paymentStatus}
                                                onChange={handleChange}
                                            >

                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Paid">
                                                    Paid
                                                </option>

                                                <option value="Failed">
                                                    Failed
                                                </option>

                                                <option value="Refunded">
                                                    Refunded
                                                </option>

                                            </select>

                                        </div>
                                    </label>

                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        className="form-control"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-12 mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows="2"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Block
                                    </label>

                                    <input
                                        type="text"
                                        name="block"
                                        className="form-control"
                                        value={formData.block}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        District
                                    </label>

                                    <input
                                        type="text"
                                        name="district"
                                        className="form-control"
                                        value={formData.district}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        className="form-control"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        PIN Code
                                    </label>

                                    <input
                                        type="text"
                                        name="pinCode"
                                        className="form-control"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() =>
                                    onApprove(member.id)
                                }
                            >
                                ✅ Approve
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() =>
                                    onReject(member.id)
                                }
                            >
                                ❌ Reject
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                💾 Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default MemberModal;