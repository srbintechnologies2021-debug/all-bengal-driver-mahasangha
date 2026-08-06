import "../../styles/Leaders.css";

function Leaders() {

    const leaders = [
        {
            name: "President Name",
            post: "President",
            phone: "+91 9876543210",
            image: "/leaders/president.jpg"
        },
        {
            name: "Working President",
            post: "Working President",
            phone: "+91 9876543211",
            image: "/leaders/working-president.jpg"
        },
        {
            name: "Vice President",
            post: "Vice President",
            phone: "+91 9876543212",
            image: "/leaders/vice-president.jpg"
        },
        {
            name: "General Secretary",
            post: "General Secretary",
            phone: "+91 9876543213",
            image: "/leaders/general-secretary.jpg"
        }
    ];

    return (

        <section className="leaders-section">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="leaders-title">
                        Our Leadership
                    </h2>

                    <p className="leaders-subtitle">
                        All Bengal Driver Mahasangha Executive Committee
                    </p>

                </div>

                <div className="row g-4">

                    {
                        leaders.map((leader, index) => (

                            <div
                                className="col-lg-3 col-md-6"
                                key={index}
                            >

                                <div className="leader-card">

                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="leader-image"
                                    />

                                    <h4>{leader.name}</h4>

                                    <h6>{leader.post}</h6>

                                    <p>{leader.phone}</p>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default Leaders;