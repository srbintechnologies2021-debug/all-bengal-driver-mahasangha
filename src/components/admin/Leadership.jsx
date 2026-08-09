import presidentPhoto from "../assets/leadership/president.jpg";
import vicePresidentPhoto from "../assets/leadership/vice-president.jpg";

function Leadership() {

    const leaders = [
        {
            name: "Balaram Das Tudu",
            designation: "President",
            image: presidentPhoto,
        },
        {
            name: "Ganesh Mahato",
            designation: "Vice-President",
            image: vicePresidentPhoto,
        },
    ];

    return (
        <section
            id="leadership"
            className="py-5 bg-light"
        >

            <div className="container">

                {/* Heading */}

                <div className="text-center mb-5">

                    <h2 className="fw-bold text-primary">
                        Our Leadership
                    </h2>

                    <p className="text-muted">
                        Leadership of All Bengal Driver Mahasangha
                    </p>

                </div>


                {/* Leadership Cards */}

                <div className="row justify-content-center g-4">

                    {leaders.map((leader) => (

                        <div
                            className="col-12 col-md-6 col-lg-5"
                            key={leader.name}
                        >

                            <div className="card h-100 border-0 shadow-sm overflow-hidden">

                                {/* Photo */}

                                <div
                                    style={{
                                        height: "420px",
                                        backgroundColor: "#f8f9fa",
                                    }}
                                >

                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-100 h-100"
                                        style={{
                                            objectFit: "cover",
                                            objectPosition: "center top",
                                        }}
                                    />

                                </div>


                                {/* Information */}

                                <div className="card-body text-center py-4">

                                    <h4 className="fw-bold mb-2">
                                        {leader.name}
                                    </h4>

                                    <p className="text-primary fw-semibold mb-0">
                                        {leader.designation}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Leadership;