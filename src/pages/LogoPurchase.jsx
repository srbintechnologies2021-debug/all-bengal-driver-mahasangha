import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebaseConfig";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";


function LogoPurchase() {

    const navigate = useNavigate();

    // --------------------------------
    // Logo Price
    // --------------------------------

    const logoPrice = 100;


    // --------------------------------
    // State
    // --------------------------------

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);


    // --------------------------------
    // Total Amount
    // --------------------------------

    const totalAmount = logoPrice * quantity;


    // --------------------------------
    // Create Logo Order
    // --------------------------------

    const handlePurchase = async () => {

        try {

            // Check Login
            const user = auth.currentUser;


            if (!user) {

                alert(
                    "Please login before purchasing the logo."
                );

                navigate("/login");

                return;
            }


            setLoading(true);


            // --------------------------------
            // Order Data
            // --------------------------------

            const orderData = {

                userId: user.uid,

                userEmail: user.email || "",

                productType: "logo",

                productName:
                    "All Bengal Driver Mahasangha Logo",

                quantity: quantity,

                pricePerLogo: logoPrice,

                totalAmount: totalAmount,

                currency: "INR",

                paymentStatus: "pending",

                orderStatus: "pending",

                paymentMethod: "razorpay",

                createdAt: serverTimestamp(),

            };


            // --------------------------------
            // Save to Firestore
            // --------------------------------

            const orderRef = await addDoc(
                collection(db, "logoOrders"),
                orderData
            );


            console.log(
                "Logo Order Created:",
                orderRef.id
            );


            alert(
                `Logo Order Created Successfully!\n\n` +
                `Order ID: ${orderRef.id}\n` +
                `Quantity: ${quantity}\n` +
                `Price per Logo: ₹${logoPrice}\n` +
                `Total: ₹${totalAmount}\n\n` +
                `Payment integration will be connected next.`
            );


        } catch (error) {

            console.error(
                "Logo Order Error:",
                error
            );


            // Show actual Firebase error
            alert(
                `Unable to create logo order.\n\n` +
                `Error: ${error.message}`
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "40px auto",
                padding: "20px",
            }}
        >

            <div className="card shadow border-0">

                {/* Header */}

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">
                        🏷️ Purchase ABDM Logo
                    </h3>

                </div>


                <div className="card-body text-center">


                    {/* Logo */}

                    <div
                        className="mb-4"
                        style={{
                            fontSize: "80px",
                        }}
                    >
                        🚗
                    </div>


                    {/* Product */}

                    <h4>
                        All Bengal Driver Mahasangha Logo
                    </h4>


                    <p className="text-muted">
                        Official Membership Logo
                    </p>


                    {/* Price */}

                    <div className="alert alert-info">

                        <strong>
                            Price per Logo
                        </strong>

                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                            }}
                        >
                            ₹{logoPrice}
                        </div>

                    </div>


                    {/* Quantity */}

                    <div className="mb-4 text-start">

                        <label className="form-label fw-bold">

                            Quantity

                        </label>


                        <select
                            className="form-select"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    Number(e.target.value)
                                )
                            }
                            disabled={loading}
                        >

                            <option value={1}>
                                1 Logo
                            </option>

                            <option value={2}>
                                2 Logos
                            </option>

                            <option value={3}>
                                3 Logos
                            </option>

                            <option value={4}>
                                4 Logos
                            </option>

                            <option value={5}>
                                5 Logos
                            </option>

                        </select>

                    </div>


                    {/* Total */}

                    <div className="mb-4">

                        <h5>
                            Total Amount
                        </h5>

                        <h2 className="text-success">
                            ₹{totalAmount}
                        </h2>

                    </div>


                    {/* Purchase */}

                    <button
                        className="btn btn-primary btn-lg w-100"
                        onClick={handlePurchase}
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Order..."
                            : `🛒 Purchase Logo – ₹${totalAmount}`
                        }

                    </button>


                    {/* Back */}

                    <button
                        className="btn btn-outline-secondary w-100 mt-3"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >

                        ← Back

                    </button>


                    {/* Payment */}

                    <p className="text-muted mt-4 mb-0">

                        🔒 Secure payment powered by Razorpay

                    </p>

                </div>

            </div>

        </div>

    );

}


export default LogoPurchase;