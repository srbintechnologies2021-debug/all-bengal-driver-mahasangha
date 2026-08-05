function MemberCard({ member, onApprove, onReject }) {

    const statusColor = {
        Pending: "#ff9800",
        Approved: "#4caf50",
        Rejected: "#f44336",
    };

    return (

        <div
            className="member-card"
        >

            <h2>
                👤 {member.fullName || member.name || "Not Provided"}
            </h2>

            <p>
                🆔 <b>Membership ID:</b>{" "}
                {member.membershipId || "-"}
            </p>

            <p>
                📧 <b>Email:</b>{" "}
                {member.email || "-"}
            </p>

            <p>
                📱 <b>Phone:</b>{" "}
                {member.phone || "-"}
            </p>

            <p>
                🏛 <b>District:</b>{" "}
                {member.district || "-"}
            </p>

            <p>
                🏠 <b>Block:</b>{" "}
                {member.block || "-"}
            </p>

            <p>
                💳 <b>Payment:</b>{" "}
                {member.paymentStatus || "Pending"}
            </p>

            <p>
                👥 <b>Membership:</b>{" "}
                {member.membershipType || "General"}
            </p>

            <p>
                <b>Status:</b>

                <span
                    style={{
                        color: statusColor[member.status] || "#666",
                        fontWeight: "bold",
                        marginLeft: "8px",
                    }}
                >
                    {member.status || "Pending"}
                </span>
            </p>

            <div className="card-buttons">

                <button
                    className="approve-btn"
                    onClick={onApprove}
                >
                    ✅ Approve
                </button>

                <button
                    className="reject-btn"
                    onClick={onReject}
                >
                    ❌ Reject
                </button>

                <button
                    className="view-btn"
                    onClick={() =>
                        alert(
                            `Member: ${member.fullName || member.name}\nMembership ID: ${member.membershipId || "-"}`
                        )
                    }
                >
                    👁 View
                </button>

            </div>

        </div>

    );

}

export default MemberCard;