import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            console.log("User UID:", user.uid);

            await setDoc(doc(db, "members", user.uid), {
                fullName: fullName,
                email: email,
                status: "Pending",
                membershipType: "General",
                createdAt: new Date(),
            });

            alert("Registration Successful!");

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>

            <h1>🚗 ABDM Member Registration</h1>

            <form onSubmit={registerUser}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Create Account
                </button>

            </form>

        </div>
    );
}

export default Register;