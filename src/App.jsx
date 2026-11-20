import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/watermark.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MemberDashboard from "./pages/MemberDashboard";

import Membership from "./pages/Membership";
import LogoPurchase from "./pages/LogoPurchase";
import IDCardPurchase from "./pages/IDCardPurchase";

import {
  AboutUsPage,
  ContactUsPage,
  PrivacyPolicyPage,
  TermsAndConditionsPage,
  RefundPolicyPage,
} from "./pages/legal/CompliancePages";
import AbdmComplianceFooter from "./components/AbdmComplianceFooter";

function App() {
  return (
    <BrowserRouter>
      <div className="app-watermark"></div>
      <div className="min-h-screen flex flex-col justify-between">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/member-dashboard" element={<MemberDashboard />} />

            <Route path="/membership" element={<Membership />} />
            <Route path="/logo-purchase" element={<LogoPurchase />} />
            <Route path="/id-card-purchase" element={<IDCardPurchase />} />

            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <AbdmComplianceFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
