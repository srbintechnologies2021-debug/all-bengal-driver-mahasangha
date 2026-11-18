import IDCardFront from "./IDCardFront";
import IDCardBack from "./IDCardBack";
import "./idcard.css";

function IDCard({ member }) {
    const printIDCard = () => {
        const card = document.getElementById("abdm-id-card");
        if (!card) return window.print();

        const printWindow = window.open("", "_blank", "width=900,height=700");
        if (!printWindow) {
            alert("Please allow pop-ups to print your Digital ID Card.");
            return;
        }

        printWindow.document.write(`
            <html>
                <head>
                    <title>ABDM Digital ID Card - ${member.member_id || ""}</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
                    <style>
                        body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #fff; }
                        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
                    </style>
                </head>
                <body>
                    ${card.outerHTML}
                    <script>window.onload = () => { window.print(); window.close(); };</script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="text-center">
            <div id="abdm-id-card" className="d-flex justify-content-center flex-wrap gap-3 mb-3">
                <IDCardFront member={member} />
                <IDCardBack member={member} />
            </div>
            <button type="button" className="btn btn-primary btn-lg px-4" onClick={printIDCard}>
                🖨️ Print Digital ID Card
            </button>
        </div>
    );
}

export default IDCard;
