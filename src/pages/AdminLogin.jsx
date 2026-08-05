import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const loginAdmin = async (e) => {

        e.preventDefault();

        try {

            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const uid = result.user.uid;


            const adminRef =
                doc(db, "admins", uid);


            const adminSnap =
                await getDoc(adminRef);


            if (adminSnap.exists()) {


                const data = adminSnap.data();


                if (
                    data.role === "admin" ||
                    data.role === "superadmin"
                ) {

                    navigate("/admin");

                }
                else {

                    setError(
                        "Access denied"
                    );

                }


            }
            else {

                setError(
                    "Admin record not found"
                );

            }


        }
        catch (error) {

            setError(error.message);

        }

    };



    return (

        <div
            style={{
                textAlign: "center",
                marginTop: "80px"
            }}
        >

            <h1>
                🚗 ABDM ADMIN LOGIN
            </h1>


            <form onSubmit={loginAdmin}>


                <input
                    type="email"
                    placeholder="Email"
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


                <button>
                    Login
                </button>


            </form>


            <p style={{ color: "red" }}>
                {error}
            </p>


        </div>

    );

}


export default AdminLogin;