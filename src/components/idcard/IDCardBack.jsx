function IDCardBack({ member }) {

    return (

        <div className="id-card back">

            <div className="card-header-custom">

                <img
                    src="/logo.png"
                    alt="ABDM Logo"
                    className="id-logo"
                />

                <div>
                    <h5 className="mb-0">
                        ALL BENGAL DRIVER
                    </h5>

                    <small>
                        MAHASANGHA
                    </small>
                </div>

            </div>

            <hr />

            <div className="back-content">

                <h6 className="text-primary fw-bold">
                    Member Information
                </h6>

                <p>
                    <strong>Member ID:</strong><br />
                    {member?.memberId}
                </p>

                <p>
                    <strong>Address:</strong><br />
                    {member?.address}, {member?.block}
                </p>

                <p>
                    {member?.district}, {member?.state} - {member?.pinCode}
                </p>

                <hr />

                <p>
                    <strong>Emergency Contact</strong><br />
                    {member?.emergencyContact}
                </p>

                <p>
                    <strong>Email</strong><br />
                    {member?.email}
                </p>

                <hr />

                <small className="text-muted d-block">
                    If this card is found, please contact
                    <br />
                    All Bengal Driver Mahasangha.
                </small>

                <div className="signature-section">

                    <div className="signature-line"></div>

                    <small>
                        President
                    </small>

                </div>

            </div>

        </div>

    );

}

export default IDCardBack;