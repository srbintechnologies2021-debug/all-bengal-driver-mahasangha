import QRCode from "react-qr-code";

function MemberIDCard({ member }) {

    if (!member) return null;

    return (

        <div
            id="member-id-card"
            className="card shadow-lg border-0 mt-4"
            style={{
                maxWidth: "420px",
                margin: "auto",
                borderRadius: "15px",
                overflow: "hidden"
            }}
        >

            <div
                className="text-center text-white py-3"
                style={{
                    background: "#0d6efd"
                }}
            >

                <h5 className="mb-1">
                    🚗 ALL BENGAL DRIVER MAHASANGHA
                </h5>

                <small>
                    Digital Membership Identity Card
                </small>

            </div>

            <div className="card-body text-center">

                {/* Photo Placeholder */}

                <img
                    src="https://via.placeholder.com/120x120.png?text=Photo"
                    alt="Member"
                    className="rounded-circle border mb-3"
                    width="120"
                    height="120"
                />

                <h4 className="fw-bold">
                    {member.name}
                </h4>

                <p className="text-muted mb-1">
                    {member.membershipType}
                </p>

                <hr />

                <table className="table table-sm">

                    <tbody>

                        <tr>
                            <th>Member ID</th>
                            <td>{member.memberId}</td>
                        </tr>

                        <tr>
                            <th>Phone</th>
                            <td>{member.phone}</td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>{member.membershipStatus}</td>
                        </tr>

                    </tbody>

                </table>

                <div className="mt-3">

                    <QRCode
                        value={member.memberId}
                        size={120}
                    />

                </div>

            </div>

            <div
                className="text-center py-2 text-white"
                style={{
                    background: "#198754"
                }}
            >

                Official Digital Membership Card

            </div>

        </div>

    );

}

export default MemberIDCard;
