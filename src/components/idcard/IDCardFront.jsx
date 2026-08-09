function IDCardFront({ member }) {

    return (

        <div
            className="abdm-id-card"
            id="abdm-id-card"
        >

            {/* Header */}

            <div className="abdm-id-header">

                <div className="abdm-logo-box">
                    🚗
                </div>

                <div>

                    <h3>
                        ALL BENGAL
                    </h3>

                    <h2>
                        DRIVER MAHASANGHA
                    </h2>

                    <small>
                        DIGITAL MEMBERSHIP CARD
                    </small>

                </div>

            </div>


            {/* Body */}

            <div className="abdm-id-body">


                {/* Member Photo */}

                <div className="abdm-member-photo">

                    {member?.photoURL ? (

                        <img
                            src={member.photoURL}
                            alt={
                                member?.name ||
                                "Member"
                            }
                        />

                    ) : (

                        <div className="abdm-photo-placeholder">
                            👤
                        </div>

                    )}

                </div>


                {/* Member Information */}

                <div className="abdm-member-info">

                    <h3>
                        {member?.name ||
                            "Member Name"}
                    </h3>

                    <p>
                        <strong>
                            Member ID:
                        </strong>{" "}
                        {member?.memberId ||
                            "-"}
                    </p>

                    <p>
                        <strong>
                            Membership:
                        </strong>{" "}
                        {member?.membershipType ||
                            "Driver"}
                    </p>

                    <p>
                        <strong>
                            Phone:
                        </strong>{" "}
                        {member?.phone ||
                            "-"}
                    </p>

                    <p>
                        <strong>
                            District:
                        </strong>{" "}
                        {member?.district ||
                            "-"}
                    </p>

                </div>

            </div>


            {/* Status */}

            <div className="abdm-id-status">

                <span>
                    MEMBERSHIP STATUS
                </span>

                <strong>
                    {member?.membershipStatus ||
                        "Pending"}
                </strong>

            </div>


            {/* Footer */}

            <div className="abdm-id-footer">

                <span>
                    All Bengal Driver Mahasangha
                </span>

                <span>
                    Valid Membership Card
                </span>

            </div>

        </div>

    );

}

export default IDCardFront;