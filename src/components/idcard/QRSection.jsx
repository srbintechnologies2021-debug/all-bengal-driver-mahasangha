import QRCode from "react-qr-code";

function QRSection({ member }) {

    return (

        <div className="qr-section">

            <QRCode
                value={member?.memberId || "ABDM"}
                size={110}
            />

            <p className="mt-2 mb-0 fw-semibold">
                Scan to Verify
            </p>

        </div>

    );

}

export default QRSection;