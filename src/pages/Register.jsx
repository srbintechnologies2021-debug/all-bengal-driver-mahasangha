import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebase";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        district: "",
        block: "",
        address: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                form.email,
                form.password
            );

            await sendEmailVerification(userCredential.user);

            alert("Registration Successful! Please verify your email.");

            navigate("/review", {
                state: form,
            });
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("এই Email দিয়ে আগে Registration করা হয়েছে। অন্য Email ব্যবহার করুন।");
            } else if (error.code === "auth/weak-password") {
                alert("Password কমপক্ষে 6 অক্ষরের হতে হবে।");
            } else if (error.code === "auth/invalid-email") {
                alert("সঠিক Email Address দিন।");
            } else {
                alert("Registration Error: " + error.message);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>🚗 ABDM Member Registration</h2>

            <hr />

            <form onSubmit={registerUser}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="form-control mb-3"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control mb-3"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="form-control mb-3"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="district"
                    placeholder="District"
                    className="form-control mb-3"
                    value={form.district}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="block"
                    placeholder="Block / Municipality"
                    className="form-control mb-3"
                    value={form.block}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="address"
                    placeholder="Full Address"
                    className="form-control mb-3"
                    value={form.address}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                >
                    Register & Verify Email
                </button>
            </form>
        </div>
    );
}

export default Register;