import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import Navbar from "../components/Navbar";
import abdmLogo from "../assets/abdm-logo.jpg";

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
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        fatherName: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        email: "",
        alternatePhone: "",
        emergencyContact: "",
        address: "",
        district: "",
        block: "",
        anchal: "",
        municipality: "",
        policeStation: "",
        pinCode: "",
        state: "West Bengal",
        licenceNo: "",
        licenceExpiry: "",
        vehicleType: "",
        vehicleNo: "",
        experience: "",
        driverCategory: "",
        memberPhotoUrl: "",
        aadhaarNumber: "",
        aadhaarPhotoUrl: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        membershipType: "Driver",
        membershipStatus: "Pending",
        paymentStatus: "Pending",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleRegister = async (e) => {
        if (e) e.preventDefault();
        if (loading) return;

        if (formData.password !== formData.confirmPassword) {
            setMessage("❌ Password and Confirm Password do not match.");
            return;
        }
        if (!formData.acceptTerms) {
            setMessage("❌ Please accept the Terms & Conditions.");
            return;
        }

        setLoading(true);
        try {
            setMessage("Creating Membership...");

            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email.trim(),
                password: formData.password,
            });

            if (authError) throw authError;
            const user = authData.user;
            if (!user) throw new Error("User creation failed. Please try again.");

            const { error: profileError } = await supabase.from("profiles").upsert({
                id: user.id,
                member_id: null,
                full_name: formData.name,
                father_name: formData.fatherName,
                dob: formData.dob || null,
                gender: formData.gender,
                blood_group: formData.bloodGroup,
                phone: formData.phone,
                email: formData.email.trim(),
                alternate_phone: formData.alternatePhone,
                emergency_contact: formData.emergencyContact,
                address: formData.address,
                district: formData.district,
                block: formData.block,
                anchal: formData.anchal,
                municipality: formData.municipality,
                police_station: formData.policeStation,
                pin_code: formData.pinCode,
                state: formData.state,
                license_number: formData.licenceNo,
                licence_expiry: formData.licenceExpiry || null,
                vehicle_type: formData.vehicleType,
                vehicle_no: formData.vehicleNo,
                experience: formData.experience,
                driver_category: formData.driverCategory,
                member_photo_url: formData.memberPhotoUrl,
                aadhaar_number: formData.aadhaarNumber,
                aadhaar_photo_url: formData.aadhaarPhotoUrl,
                membership_type: "Driver",
                membership_status: "Pending",
                payment_status: "Pending",
                role: "driver",
            });

            if (profileError) throw profileError;

            setMessage("✅ Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Registration Error:", error);
            setMessage(`❌ ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ maxWidth: "700px", margin: "24px auto", padding: "20px" }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                    <img
                        src={abdmLogo}
                        alt="ABDM Transparent Logo"
                        style={{
                            width: "52px",
                            height: "52px",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            background: "transparent",
                        }}
                    />
                    <h2 className="mb-0 fw-bold text-primary">
                        ABDM Driver Membership Registration
                    </h2>
                </div>

                <RegisterProgress step={step} />

                {step === 1 && <PersonalInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
                {step === 2 && <ContactInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
                {step === 3 && <AddressInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
                {step === 4 && <DriverInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
                {step === 5 && <AccountInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
                {step === 6 && <ReviewInfo formData={formData} setStep={setStep} />}
                {step === 7 && <PaymentInfo formData={formData} handleRegister={handleRegister} setStep={setStep} />}

                {message && <div className="alert alert-info mt-4">{message}</div>}
            </div>
        </>
    );
}

export default Register;
