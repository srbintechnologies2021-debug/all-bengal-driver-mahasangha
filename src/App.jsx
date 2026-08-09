
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import "./styles/watermark.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import MemberDashboard from "./pages/MemberDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContactMessages from "./pages/admin/ContactMessages";

import Membership from "./pages/Membership";
import MembershipPayment from "./pages/MembershipPayment";
import LogoPurchase from "./pages/LogoPurchase";
import IDCardPurchase from "./pages/IDCardPurchase";


function App() {

    return (

        <BrowserRouter>

            {/* ABDM GLOBAL LOGO WATERMARK */}

            <div className="app-watermark"></div>


            <Routes>

                {/* ==========================================
                    HOME
                ========================================== */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* ==========================================
                    MEMBER REGISTRATION
                ========================================== */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ==========================================
                    MEMBER LOGIN
                ========================================== */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ==========================================
                    MEMBER DASHBOARD
                ========================================== */}

                <Route
                    path="/dashboard"
                    element={<MemberDashboard />}
                />


                {/* ==========================================
                    ADMIN LOGIN
                ========================================== */}

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />


                {/* ==========================================
                    ADMIN DASHBOARD
                ========================================== */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />


                {/* ==========================================
                    ADMIN CONTACT MESSAGES
                ========================================== */}

                <Route
                    path="/admin/contact-messages"
                    element={<ContactMessages />}
                />


                {/* ==========================================
                    MEMBERSHIP
                ========================================== */}

                <Route
                    path="/membership"
                    element={<Membership />}
                />


                {/* ==========================================
                    MEMBERSHIP PAYMENT
                ========================================== */}

                <Route
                    path="/membership-payment"
                    element={<MembershipPayment />}
                />


                {/* ==========================================
                    LOGO PURCHASE
                ========================================== */}

                <Route
                    path="/logo-purchase"
                    element={<LogoPurchase />}
                />


                {/* ==========================================
                    ID CARD PURCHASE
                ========================================== */}

                <Route
                    path="/id-card-purchase"
                    element={<IDCardPurchase />}
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;

