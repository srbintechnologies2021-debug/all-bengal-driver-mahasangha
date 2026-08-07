import { QRCodeCanvas } from "qrcode.react";

function QRCodeCard({ member }) {

    if (!member) return null;

    return (

        <div
            className="card shadow-sm mt-4 border-0"
        >

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">
                    🆔 Digital Membership QR Code
                </h5>

            </div>

            <div className="card-body text-center">

                <QRCodeCanvas
                    value={member.memberId || ""}
                    size={180}
                    level="H"
                    includeMargin={true}
                />

                <h5 className="mt-3">
                    {member.name}
                </h5>

                <p className="mb-1">
                    <strong>Member ID:</strong> {member.memberId}
                </p>

                <p className="text-muted">
                    Scan this QR Code to verify ABDM Membership
                </p>

            </div>

        </div>

    );

}

export default QRCodeCard;