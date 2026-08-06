import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
    return (
        <section id="contact" className="py-5 bg-light">
            <div className="container">

                <div className="text-center mb-5">
                    <h2 className="fw-bold text-primary">
                        Contact Us
                    </h2>

                    <p className="text-muted">
                        Get in touch with All Bengal Driver Mahasangha
                    </p>
                </div>

                <div className="row">

                    <div className="col-md-4 text-center mb-4">
                        <FaPhone size={35} className="text-primary mb-3" />
                        <h5>Phone</h5>
                        <p>+91 9876543210</p>
                    </div>

                    <div className="col-md-4 text-center mb-4">
                        <FaEnvelope size={35} className="text-danger mb-3" />
                        <h5>Email</h5>
                        <p>info@abdm.org</p>
                    </div>

                    <div className="col-md-4 text-center mb-4">
                        <FaMapMarkerAlt size={35} className="text-success mb-3" />
                        <h5>Office</h5>
                        <p>Kolkata, West Bengal</p>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Contact;