import "./MemberModal.css";

function MemberModal({
    member,
    onClose,
    onApprove,
    onReject
}) {

    if (!member) return null;

    return (
        <div className="modal-overlay">

            <div className="member-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>

                <h2>Member Details</h2>

                <div className="member-info">

                    <p><strong>Name:</strong> {member.fullName}</p>

                    <p><strong>Email:</strong> {member.email}</p>

                    <p><strong>Phone:</strong> {member.phone}</p>

                    <p><strong>Membership ID:</strong> {member.membershipId || "Not Generated"}</p>

                    <p><strong>Status:</strong> {member.status}</p>

                    <hr />

                    <p><strong>Father Name:</strong> {member.fatherName}</p>

                    <p><strong>Mother Name:</strong> {member.motherName}</p>

                    <p><strong>Date of Birth:</strong> {member.dob}</p>

                    <p><strong>Gender:</strong> {member.gender}</p>

                    <hr />

                    <p><strong>Address:</strong> {member.address}</p>

                    <p><strong>District:</strong> {member.district}</p>

                    <p><strong>State:</strong> {member.state}</p>

                    <p><strong>PIN:</strong> {member.pinCode}</p>

                    <hr />

                    <p><strong>Driving License:</strong> {member.licenseNumber}</p>

                    <p><strong>Vehicle Type:</strong> {member.vehicleType}</p>

                    <p><strong>Experience:</strong> {member.experience}</p>

                </div>

                <div className="modal-buttons">

                    <button
                        className="approve-btn"
                        onClick={() => onApprove(member.id)}
                    >
                        Approve
                    </button>

                    <button
                        className="reject-btn"
                        onClick={() => onReject(member.id)}
                    >
                        Reject
                    </button>

                </div>

            </div>

        </div>
    );
}

export default MemberModal;