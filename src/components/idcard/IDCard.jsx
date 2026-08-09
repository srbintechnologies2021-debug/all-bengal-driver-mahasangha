import IDCardFront from "./IDCardFront";
import "./IDCard.css";

function IDCard({ member }) {

    const printIDCard = () => {

        window.print();

    };


    const downloadIDCard = async () => {

        const card =
            document.getElementById("abdm-id-card");

        if (!card) {

            alert("ID Card not found.");

            return;

        }

        try {

            const html =
                card.outerHTML;

            const printWindow =
                window.open(
                    "",
                    "_blank",
                    "width=900,height=700"
                );

            if (!printWindow) {

                alert(
                    "Please allow pop-ups to download the ID Card."
                );

                return;

            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>

                    <title>
                        ABDM ID Card - ${member?.name || "Member"
                }
                    </title>

                    <style>

                        * {
                            box-sizing: border-box;
                        }

                        body {
                            margin: 0;
                            padding: 30px;
                            background: #ffffff;
                            font-family: Arial, sans-serif;
                        }

                        .abdm-id-card {
                            width: 430px;
                            max-width: 100%;
                            min-height: 270px;
                            margin: 20px auto;
                            background: #ffffff;
                            border-radius: 18px;
                            overflow: hidden;
                            box-shadow:
                                0 10px 30px
                                rgba(0, 0, 0, 0.18);
                            border:
                                1px solid #dee2e6;
                        }

                        .abdm-id-header {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            padding: 16px;
                            background: #0d6efd;
                            color: #ffffff;
                        }

                        .abdm-logo-box {
                            width: 55px;
                            height: 55px;
                            border-radius: 50%;
                            background: #ffffff;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 28px;
                        }

                        .abdm-id-header h3 {
                            margin: 0;
                            font-size: 15px;
                        }

                        .abdm-id-header h2 {
                            margin: 2px 0;
                            font-size: 19px;
                        }

                        .abdm-id-header small {
                            font-size: 9px;
                        }

                        .abdm-id-body {
                            display: flex;
                            gap: 18px;
                            padding: 20px;
                        }

                        .abdm-member-photo {
                            width: 95px;
                            height: 115px;
                            flex-shrink: 0;
                            border:
                                2px solid #0d6efd;
                            border-radius: 8px;
                            overflow: hidden;
                            background: #f1f3f5;
                        }

                        .abdm-member-photo img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }

                        .abdm-photo-placeholder {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 42px;
                        }

                        .abdm-member-info {
                            flex: 1;
                        }

                        .abdm-member-info h3 {
                            margin: 0 0 8px;
                            font-size: 21px;
                            color: #212529;
                        }

                        .abdm-member-info p {
                            margin: 5px 0;
                            font-size: 13px;
                            color: #495057;
                        }

                        .abdm-id-status {
                            display: flex;
                            justify-content:
                                space-between;
                            align-items: center;
                            margin:
                                0 20px 15px;
                            padding: 9px 12px;
                            border-radius: 8px;
                            background: #e9f7ef;
                            color: #198754;
                        }

                        .abdm-id-status span {
                            font-size: 10px;
                            font-weight: 600;
                        }

                        .abdm-id-status strong {
                            font-size: 13px;
                        }

                        .abdm-id-footer {
                            display: flex;
                            justify-content:
                                space-between;
                            padding: 10px 16px;
                            background: #f8f9fa;
                            border-top:
                                1px solid #dee2e6;
                            font-size: 10px;
                            color: #6c757d;
                        }

                    </style>

                </head>

                <body>

                    ${html}

                </body>

                </html>
            `);

            printWindow.document.close();

            printWindow.focus();

            setTimeout(() => {

                printWindow.print();

            }, 500);

        } catch (error) {

            console.error(
                "ID Card Download Error:",
                error
            );

            alert(
                "Unable to download ID Card."
            );

        }

    };


    return (

        <div className="id-card-container">

            {/* ID Card */}

            <IDCardFront
                member={member}
            />


            {/* Buttons */}

            <div
                className="id-card-actions"
            >

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={downloadIDCard}
                >
                    📥 Download ID Card
                </button>


                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={printIDCard}
                >
                    🖨️ Print ID Card
                </button>

            </div>

        </div>

    );

}

export default IDCard;