function RegisterProgress({ step }) {

    const steps = [

        "Personal",

        "Contact",

        "Address",

        "Driver",

        "Account",

        "Review",

        "Payment"

    ];

    return (

        <div className="mb-4">

            <div className="progress" style={{ height: "10px" }}>

                <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{
                        width: `${(step / steps.length) * 100}%`
                    }}
                />

            </div>

            <div className="d-flex justify-content-between mt-2">

                {steps.map((item, index) => (

                    <small
                        key={index}
                        style={{
                            fontWeight:
                                step === index + 1
                                    ? "bold"
                                    : "normal",

                            color:
                                step >= index + 1
                                    ? "#198754"
                                    : "#999"
                        }}
                    >
                        {item}
                    </small>

                ))}

            </div>

        </div>

    );

}

export default RegisterProgress;