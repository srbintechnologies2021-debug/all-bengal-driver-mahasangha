import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "../components/register/PersonalInfo";
import ContactInfo from "../components/register/ContactInfo";
import AddressInfo from "../components/register/AddressInfo";
import DriverInfo from "../components/register/DriverInfo";
import AccountInfo from "../components/register/AccountInfo";
import RegisterProgress from "../components/register/RegisterProgress";
import ReviewInfo from "../components/register/ReviewInfo";
import PaymentInfo from "../components/register/PaymentInfo";

function Register() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({

        // Personal

        name: "",
        fatherName: "",
        dob: "",
        gender: "",
        bloodGroup: "",

        // Contact

        phone: "",
        email: "",
        alternatePhone: "",
        emergencyContact: "",

        // Address

        address: "",
        district: "",
        block: "",
        policeStation: "",
        pinCode: "",
        state: "West Bengal",

        // Driver

        licenceNo: "",
        licenceExpiry: "",
        vehicleType: "",
        vehicleNo: "",
        experience: "",
        driverCategory: "",

        // Account

        password: "",
        confirmPassword: "",
        acceptTerms: false,
        // Membership

        membershipType: "Driver",
        membershipStatus: "Pending",
        paymentStatus: "Pending",
        memberId: "",
        registeredAt: null,

    });


    const [message, setMessage] = useState("");



    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({

            ...formData,

            [name]: type === "checkbox" ? checked : value

        });

    };





    const handleRegister = async (e) => {

        if (e) e.preventDefault();

        // Password Match Check
        if (formData.password !== formData.confirmPassword) {
            setMessage("❌ Password and Confirm Password do not match.");
            return;
        }

        // Terms Check
        if (!formData.acceptTerms) {
            setMessage("❌ Please accept the Terms & Conditions.");
            return;
        }


        try {

            setMessage("Creating Membership...");

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

            const user = userCredential.user;

            await sendEmailVerification(user);

            const memberId = `ABDM${Date.now()}`;

            await setDoc(
                doc(db, "members", user.uid),
                {
                    ...formData,

                    memberId,

                    membershipType: "Driver",
                    membershipStatus: "Pending",
                    paymentStatus: "Pending",

                    registeredAt: serverTimestamp(),
                    createdAt: serverTimestamp(),

                    uid: user.uid
                }
            );

            setMessage(
                "✅ Registration Successful. Verification email has been sent."
            );

            setTimeout(() => {
                navigate("/login");
            }, 3000);

        } catch (error) {

            console.error(error);

            setMessage(error.message);

        }

    };
    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "30px auto",
                padding: "20px"
            }}
        >

            <h2 className="mb-4">
                🚗 ABDM Driver Membership Registration
            </h2>

            <RegisterProgress step={step} />

            {step === 1 && (
                <PersonalInfo
                    formData={formData}
                    handleChange={handleChange}
                    setStep={setStep}
                />
            )}

            {step === 2 && (
                <ContactInfo
                    formData={formData}
                    handleChange={handleChange}
                    setStep={setStep}
                />
            )}

            {step === 3 && (
                <AddressInfo
                    formData={formData}
                    handleChange={handleChange}
                    setStep={setStep}
                />
            )}

            {step === 4 && (
                <DriverInfo
                    formData={formData}
                    handleChange={handleChange}
                    setStep={setStep}
                />
            )}

            {step === 5 && (
                <AccountInfo
                    formData={formData}
                    handleChange={handleChange}
                    setStep={setStep}
                />
            )}

            {step === 6 && (
                <ReviewInfo
                    formData={formData}
                    setStep={setStep}
                />
            )}

            {step === 7 && (
                <PaymentInfo
                    formData={formData}
                    handleRegister={handleRegister}
                    setStep={setStep}
                />
            )}

            {message && (
                <div className="alert alert-info mt-4">
                    {message}
                </div>
            )}

        </div>

    );


    <p>
        {message}
    </p>


        </div >

    );

}


export default Register;