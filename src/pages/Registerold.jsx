import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";


import { auth, db } from "../firebase/firebaseConfig";


import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "firebase/auth";


import {
    doc,
    setDoc
} from "firebase/firestore";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        // Personal
        fullName: "",
        fatherName: "",
        dob: "",
        gender: "",

        // Contact
        email: "",
        phone: "",
        alternatePhone: "",

        // Address
        district: "",
        block: "",
        address: "",
        pincode: "",

        // Driver
        licenceNumber: "",
        vehicleNumber: "",
        aadhaarNumber: "",
        bloodGroup: "",

    });


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };
    const generateMembershipID = () => {
        const handleSubmit = async (e) => {

            e.preventDefault();


            try {


                const userCredential =
                    await createUserWithEmailAndPassword(

                        auth,

                        formData.email,

                        formData.phone

                    );


                const user = userCredential.user;


                await sendEmailVerification(user);


                const membershipID =
                    generateMembershipID();



                await setDoc(

                    doc(
                        db,
                        "members",
                        membershipID
                    ),

                    {

                        membershipID,

                        uid: user.uid,

                        ...formData,

                        membershipFee: 100,

                        paymentStatus: "Pending",

                        status: "Active",

                        createdAt: new Date()

                    }

                );


                alert(
                    "Registration Successful. Please verify your email."
                );


                navigate("/dashboard");


            }

            catch (error) {

                alert(error.message);

            }

        };

        const year = new Date().getFullYear();

        const random =
            Math.floor(
                100000 + Math.random() * 900000
            );


        return `ABDM${year}${random}`;

    };


    return (

        <div className="register-container">


            <h1>
                🚗 ABDM Member Registration
            </h1>


            <form onSubmit={handleSubmit}>


                {/* Personal Information */}

                <h2>👤 Personal Information</h2>


                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="fatherName"
                    placeholder="Father / Husband Name"
                    value={formData.fatherName}
                    onChange={handleChange}
                />


                <label>Date of Birth</label>

                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />


                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >

                    <option value="">
                        Select Gender
                    </option>

                    <option>
                        Male
                    </option>

                    <option>
                        Female
                    </option>

                    <option>
                        Other
                    </option>


                </select>



                {/* Contact */}

                <h2>📞 Contact Information</h2>


                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="alternatePhone"
                    placeholder="Alternate Phone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                />



                {/* Address */}

                <h2>📍 Address Information</h2>


                <input
                    type="text"
                    name="district"
                    placeholder="District"
                    value={formData.district}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="block"
                    placeholder="Block"
                    value={formData.block}
                    onChange={handleChange}
                />


                <textarea

                    name="address"

                    placeholder="Full Address"

                    value={formData.address}

                    onChange={handleChange}

                />


                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                />



                {/* Driver Information */}

                <h2>🚗 Driver Information</h2>


                <input
                    type="text"
                    name="licenceNumber"
                    placeholder="Driving Licence Number"
                    value={formData.licenceNumber}
                    onChange={handleChange}





                />


                <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="aadhaarNumber"
                    placeholder="Aadhaar Number"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="bloodGroup"
                    placeholder="Blood Group"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                />



                {/* Membership */}

                <h2>💳 Membership</h2>


                <input

                    type="text"

                    value="Auto Generated"

                    disabled

                />


                <input

                    type="text"

                    value="₹100"

                    disabled

                />


                <input

                    type="text"

                    value="Pending"

                    disabled

                />



                <button type="submit">

                    📝 Register Member

                </button>


            </form>


            <br />


            <Link to="/">

                Back Home

            </Link>


        </div>

    );

}


export default Register;