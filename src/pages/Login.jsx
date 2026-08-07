import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setMessage("❌ Please enter Email and Password.");
            return;
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            setMessage("✅ Login Successful");

            navigate("/dashboard");

        } catch (error) {

            switch (error.code) {

                case "auth/invalid-credential":
                    setMessage("❌ Invalid Email or Password.");
                    break;

                case "auth/invalid-email":
                    setMessage("❌ Invalid Email Address.");
                    break;

                default:
                    setMessage(error.message);

            }

        }

    };
    return (

        <div className="container mt-5" style={{ maxWidth: "450px" }}>

            <h2 className="mb-4 text-center">
                Member Login
            </h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                >
                    Login
                </button>

            </form>

            {message && (
                <div className="alert alert-info mt-3">
                    {message}
                </div>
            )}

        </div>

    );

}

export default Login;