import "../../styles/Leaders.css";

import presidentPhoto from "../../assets/leadership/president.jpg";
import vicePresidentPhoto from "../../assets/leadership/vice-president.jpg";


function Leaders() {

    const leaders = [
        {
            name: "Balaram Das Tudu",
            post: "President",
            phone: "",
            image: presidentPhoto
        },
        {
            name: "Ganesh Mahato",
            post: "Vice-President",
            phone: "",
            image: vicePresidentPhoto
        }
    ];


    return (

        <section className="leaders-section">

            <div className="container">

                {/* Heading */}

                <div className="text-center mb-5">

                    <h2 className="leaders-title">
                        Our Leadership
                    </h2>

                    <p className="leaders-subtitle">
                        All Bengal Driver Mahasangha Executive Committee
                    </p>

                </div>


                {/* Leaders */}

                <div className="row g-4 justify-content-center">

                    {leaders.map((leader, index) => (

                        <div
                            className="col-12 col-md-6 col-lg-5"
                            key={index}
                        >

                            <div className="leader-card">

                                {/* Real Photo */}

                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="leader-image"
                                />


                                {/* Name */}

                                <h4>
                                    {leader.name}
                                </h4>


                                {/* Designation */}

                                <h6>
                                    {leader.post}
                                </h6>


                                {/* Phone */}

                                {leader.phone && (
                                    <p>
                                        {leader.phone}
                                    </p>
                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}


export default Leaders;