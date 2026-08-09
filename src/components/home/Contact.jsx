
import { useState } from "react";

import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaClock,
} from "react-icons/fa";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";


function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSuccess("");
        setError("");

        if (
            !formData.name.trim() ||
            !formData.phone.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.message.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        try {

            setLoading(true);

            console.log("Sending contact message...");

            const messageData = {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
                status: "new",
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(
                collection(db, "contactMessages"),
                messageData
            );

            console.log(
                "Contact message saved successfully:",
                docRef.id
            );

            setSuccess(
                "Thank you! Your message has been sent successfully."
            );

            setFormData({
                name: "",
                phone: "",
                email: "",
                subject: "",
                message: "",
            });

        } catch (err) {

            console.error("CONTACT FORM FIREBASE ERROR:", err);

            if (err.code === "permission-denied") {

                setError(
                    "Firebase permission denied. Please check Firestore Rules."
                );

            } else if (err.code === "failed-precondition") {

                setError(
                    "Firestore is not properly configured. Please check Firebase Console."
                );

            } else if (err.code === "unavailable") {

                setError(
                    "Firebase is temporarily unavailable. Please check your internet connection."
                );

            } else {

                setError(
                    `Unable to send message.${err.message || "Unknown Firebase error."} `
                );
            }

        } finally {

            setLoading(false);
        }
    };


    return (
        <section id="contact" className="py-5 bg-light">

            <div className="container">

                {/* Header */}

                <div className="text-center mb-5">

                    <h2 className="fw-bold text-primary">
                        Contact Us
                    </h2>

                    <p className="text-muted mb-0">
                        Get in touch with All Bengal Driver Mahasangha
                    </p>

                </div>


                {/* Contact Cards */}

                <div className="row g-4">

                    {/* Address */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card h-100 border-0 shadow-sm text-center p-4">

                            <FaMapMarkerAlt
                                size={35}
                                className="text-success mb-3 mx-auto"
                            />

                            <h5 className="fw-bold">
                                Official Address
                            </h5>

                            <p className="text-muted mb-3">
                                Sarenga, Madhupur,
                                <br />
                                Hariyatara
                                <br />
                                Near Kalaikunda Petrol Pump
                                <br />
                                West Bengal - 721804
                            </p>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Hariyatara%2C+Madhupur%2C+West+Bengal+721804"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-success btn-sm"
                            >
                                View on Google Maps
                            </a>

                        </div>

                    </div>


                    {/* Phone */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card h-100 border-0 shadow-sm text-center p-4">

                            <FaPhone
                                size={35}
                                className="text-primary mb-3 mx-auto"
                            />

                            <h5 className="fw-bold">
                                Phone
                            </h5>

                            <p className="text-muted mb-3">
                                8144290180
                                <br />
                                97495 32348
                            </p>

                            <div className="d-flex justify-content-center gap-2 flex-wrap">

                                <a
                                    href="tel:+918144290180"
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    Call
                                </a>

                                <a
                                    href="https://wa.me/918144290180"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-sm"
                                >
                                    <FaWhatsapp className="me-1" />
                                    WhatsApp
                                </a>

                            </div>

                        </div>

                    </div>


                    {/* Email */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card h-100 border-0 shadow-sm text-center p-4">

                            <FaEnvelope
                                size={35}
                                className="text-danger mb-3 mx-auto"
                            />

                            <h5 className="fw-bold">
                                Official Email
                            </h5>

                            <p className="text-muted mb-3">
                                drivermahasanghaallbengal
                                <br />
                                @gmail.com
                            </p>

                            <a
                                href="mailto:drivermahasanghaallbengal@gmail.com"
                                className="btn btn-outline-danger btn-sm"
                            >
                                Send Email
                            </a>

                        </div>

                    </div>


                    {/* Office Hours */}

                    <div className="col-md-6 col-lg-3">

                        <div className="card h-100 border-0 shadow-sm text-center p-4">

                            <FaClock
                                size={35}
                                className="text-warning mb-3 mx-auto"
                            />

                            <h5 className="fw-bold">
                                Office Hours
                            </h5>

                            <p className="text-muted mb-3">
                                Monday - Saturday
                                <br />
                                10:00 AM - 6:00 PM
                                <br />
                                Sunday - Closed
                            </p>

                            <span className="badge bg-success">
                                Available
                            </span>

                        </div>

                    </div>

                </div>


                {/* Contact Form */}

                <div className="row justify-content-center mt-5">

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <h4 className="fw-bold">
                                        Send Us a Message
                                    </h4>

                                    <p className="text-muted">
                                        Have a question? Send us a message
                                        and our team will get back to you.
                                    </p>

                                </div>


                                {/* Success Message */}

                                {success && (

                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        {success}
                                    </div>

                                )}


                                {/* Error Message */}

                                {error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {error}
                                    </div>

                                )}


                                <form onSubmit={handleSubmit}>

                                    <div className="row g-3">

                                        {/* Full Name */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="name"
                                                className="form-label fw-semibold"
                                            >
                                                Full Name
                                            </label>

                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter your name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>


                                        {/* Phone */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="phone"
                                                className="form-label fw-semibold"
                                            >
                                                Phone Number
                                            </label>

                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>


                                        {/* Email */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="email"
                                                className="form-label fw-semibold"
                                            >
                                                Email Address
                                            </label>

                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>


                                        {/* Subject */}

                                        <div className="col-md-6">

                                            <label
                                                htmlFor="subject"
                                                className="form-label fw-semibold"
                                            >
                                                Subject
                                            </label>

                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                className="form-control"
                                                placeholder="Enter subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>


                                        {/* Message */}

                                        <div className="col-12">

                                            <label
                                                htmlFor="message"
                                                className="form-label fw-semibold"
                                            >
                                                Message
                                            </label>

                                            <textarea
                                                id="message"
                                                name="message"
                                                className="form-control"
                                                rows="5"
                                                placeholder="Write your message..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>

                                        </div>


                                        {/* Submit Button */}

                                        <div className="col-12 text-center">

                                            <button
                                                type="submit"
                                                className="btn btn-primary px-5"
                                                disabled={loading}
                                            >
                                                {loading
                                                    ? "Sending..."
                                                    : "Send Message"
                                                }
                                            </button>

                                        </div>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Bottom Contact Section */}

                <div className="text-center mt-5">

                    <h4 className="fw-bold">
                        We Are Here to Help
                    </h4>

                    <p className="text-muted">
                        For membership, registration, payment or any
                        other assistance, please contact us.
                    </p>

                    <div className="d-flex justify-content-center gap-2 flex-wrap">

                        <a
                            href="tel:+918144290180"
                            className="btn btn-primary px-4"
                        >
                            <FaPhone className="me-2" />
                            Call Us
                        </a>

                        <a
                            href="mailto:drivermahasanghaallbengal@gmail.com"
                            className="btn btn-danger px-4"
                        >
                            <FaEnvelope className="me-2" />
                            Email Us
                        </a>

                        <a
                            href="https://wa.me/918144290180"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success px-4"
                        >
                            <FaWhatsapp className="me-2" />
                            WhatsApp
                        </a>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Contact;

