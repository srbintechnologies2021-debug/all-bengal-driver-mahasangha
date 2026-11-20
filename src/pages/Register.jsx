import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import Navbar from "../components/Navbar";
import {
  ABDM_FEES,
  validateContactAndLicence,
  checkDuplicateMember,
  generateDeterministicMemberId,
} from "../utils/abdmRules";

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
  const [generatedMemberId, setGeneratedMemberId] = useState("");
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
    licencePhotoUrl: "",
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
    registrationFee: ABDM_FEES.REGISTRATION,
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

    if (!formData.name || formData.name.trim().length < 2) {
      setMessage("❌ অনুগ্রহ করে সঠিক পূর্ণ নাম লিখুন।");
      return;
    }

    const identityCheck = validateContactAndLicence({
      email: formData.email,
      phone: formData.phone,
      licenceNo: formData.licenceNo,
    });

    if (!identityCheck.isValid) {
      const firstError =
        identityCheck.errors.email ||
        identityCheck.errors.phone ||
        identityCheck.errors.licenceNo;
      setMessage(`❌ ${firstError}`);
      return;
    }

    if (!formData.password || formData.password !== formData.confirmPassword) {
      setMessage("❌ Password এবং Confirm Password এক হতে হবে।");
      return;
    }

    if (!formData.acceptTerms) {
      setMessage("❌ অনুগ্রহ করে Terms & Conditions গ্রহণ করুন।");
      return;
    }

    setLoading(true);
    try {
      setMessage("🔍 ইমেইল, মোবাইল ও ড্রাইভিং লাইসেন্স যাচাই করা হচ্ছে...");

      const dupCheck = await checkDuplicateMember(identityCheck.clean);
      if (dupCheck.blocked) {
        setMessage(`❌ ${dupCheck.reason}`);
        setLoading(false);
        return;
      }

      const deterministicId = generateDeterministicMemberId(
        identityCheck.clean.email,
        identityCheck.clean.phone
      );

      setMessage("📝 মেম্বার প্রোফাইল ও ইউনিক ID প্রস্তুত করা হচ্ছে...");

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: identityCheck.clean.email,
        password: formData.password,
      });

      if (authError) throw authError;
      const user = authData.user;
      if (!user) throw new Error("User creation failed. Please try again.");

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        member_id: deterministicId,
        full_name: formData.name.trim(),
        father_name: formData.fatherName,
        dob: formData.dob || null,
        gender: formData.gender,
        blood_group: formData.bloodGroup,
        phone: identityCheck.clean.phone,
        email: identityCheck.clean.email,
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
        license_number: identityCheck.clean.licenceNo,
        licence_expiry: formData.licenceExpiry || null,
        licence_photo_url: formData.licencePhotoUrl || "",
        vehicle_type: formData.vehicleType,
        vehicle_no: formData.vehicleNo,
        experience: formData.experience,
        driver_category: formData.driverCategory,
        member_photo_url: formData.memberPhotoUrl,
        aadhaar_number: formData.aadhaarNumber,
        aadhaar_photo_url: formData.aadhaarPhotoUrl,
        membership_type: "Driver",
        membership_status: "Active",
        payment_status: "Pending_Phase2_Easebuzz",
        registration_fee: ABDM_FEES.REGISTRATION,
        role: "driver",
      });

      if (profileError) throw profileError;

      setGeneratedMemberId(deterministicId);
      setMessage(
        `✅ রেজিস্ট্রেশন সম্পন্ন হয়েছে! আপনার ইউনিক Member ID: ${deterministicId} (Registration Fee: ₹${ABDM_FEES.REGISTRATION})। এবার এই ID Number ও Name দিয়ে Logo (₹100) ও ID Card (₹100) পারচেজ করতে পারবেন।`
      );
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
      <div style={{ maxWidth: "740px", margin: "24px auto", padding: "20px" }}>
        <div
          className="d-flex align-items-center justify-content-between gap-3 mb-4 p-3 rounded-4"
          style={{
            backdropFilter: "blur(14px)",
            background: "rgba(255, 255, 255, 0.78)",
            border: "1px solid rgba(13, 71, 161, 0.16)",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <img
              src="/logo.png"
              alt="ABDM Transparent Logo"
              style={{
                width: "54px",
                height: "54px",
                objectFit: "contain",
                background: "transparent",
              }}
            />
            <div>
              <h2 className="mb-0 fw-bold text-primary">
                ABDM Driver Membership Registration
              </h2>
              <small className="text-muted">
                Registration Fee: ₹{ABDM_FEES.REGISTRATION} • Logo: ₹{ABDM_FEES.LOGO_PURCHASE} • ID Card: ₹{ABDM_FEES.ID_CARD_PURCHASE}
              </small>
            </div>
          </div>
        </div>

        <RegisterProgress step={step} />

        {step === 1 && <PersonalInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
        {step === 2 && <ContactInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
        {step === 3 && <AddressInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
        {step === 4 && <DriverInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
        {step === 5 && <AccountInfo formData={formData} handleChange={handleChange} setStep={setStep} />}
        {step === 6 && <ReviewInfo formData={formData} setStep={setStep} />}
        {step === 7 && (
          <PaymentInfo
            formData={formData}
            handleRegister={handleRegister}
            setStep={setStep}
            loading={loading}
          />
        )}

        {message && <div className="alert alert-info mt-4">{message}</div>}

        {generatedMemberId && (
          <div className="mt-3 d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/member-dashboard")}
            >
              Go to Member Dashboard →
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => navigate("/logo-purchase")}
            >
              Buy Logo (₹100)
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => navigate("/id-card-purchase")}
            >
              Buy ID Card (₹100)
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
