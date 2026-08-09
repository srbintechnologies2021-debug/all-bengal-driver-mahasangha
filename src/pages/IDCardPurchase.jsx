import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebaseConfig";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";


function IDCardPurchase() {

    const navigate = useNavigate();

    // ID Card price
    const cardPrice = 100;

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(false);

    const totalAmount = cardPrice * quantity;


    const handlePurchase = async () => {

        try {

            // --------------------------------
            // Check Login
            // --------------------------------

            const user = auth.currentUser;

            if (!user) {

                alert(
                    "Please login before purchasing ID Card."
                );

                navigate("/login");

                return;
            }


            setLoading(true);


            // --------------------------------
            // Create Order Data
            // --------------------------------

            const orderData = {

                userId: user.uid,

                userEmail: user.email || "",

                productType: "id_card",

                productName:
                    "All Bengal Driver Mahasangha ID Card",

                quantity: quantity,

                pricePerCard: cardPrice,

                totalAmount: totalAmount,

                currency: "INR",

                paymentStatus: "pending",

                orderStatus: "pending",

                paymentMethod: "razorpay",

                createdAt: serverTimestamp(),

            };


            // --------------------------------
            // Save Firestore Order
            // --------------------------------

            const orderRef = await addDoc(
                collection(db, "idCardOrders"),
                orderData
            );


            console.log(
                "ID Card Order Created:",
                orderRef.id
            );


            // --------------------------------
            // Temporary Success
            // --------------------------------

            alert(
                `ID Card Order Created Successfully!\n\n` +
                `Order ID: ${orderRef.id}\n` +
                `Quantity: ${quantity}\n` +
                `Price per Card: ₹${cardPrice}\n` +
                `Total: ₹${totalAmount}\n\n` +
                `Razorpay payment will be connected next.`
            );


        } catch (error) {

            console.error(
                "ID Card Order Error:",
                error
            );

            alert(
                `Unable to create ID Card order.\n\n` +
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

                <div className="card-header bg-success text-white">

                    <h3 className="mb-0">
                        🪪 Purchase ABDM ID Card
                    </h3>

                </div>


                <div className="card-body text-center">


                    {/* ID Card Preview */}

                    <div
                        className="mb-4"
                        style={{
                            fontSize: "80px",
                        }}
                    >
                        🪪
                    </div>


                    {/* Product Name */}

                    <h4>
                        All Bengal Driver Mahasangha ID Card
                    </h4>


                    <p className="text-muted">
                        Official Membership Identity Card
                    </p>


                    {/* Price */}

                    <div className="alert alert-info">

                        <strong>
                            Price per ID Card
                        </strong>

                        <div
                            style={{
                                fontSize: "32px",
                                fontWeight: "bold",
                            }}
                        >
                            ₹{cardPrice}
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
                                1 ID Card
                            </option>

                            <option value={2}>
                                2 ID Cards
                            </option>

                            <option value={3}>
                                3 ID Cards
                            </option>

                            <option value={4}>
                                4 ID Cards
                            </option>

                            <option value={5}>
                                5 ID Cards
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


                    {/* Purchase Button */}

                    <button
                        className="btn btn-success btn-lg w-100"
                        onClick={handlePurchase}
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Order..."
                            : `🪪 Purchase ID Card – ₹${totalAmount}`
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


                    {/* Payment Notice */}

                    <p className="text-muted mt-4 mb-0">

                        🔒 Secure payment powered by Razorpay

                    </p>

                </div>

            </div>

        </div>

    );

}


export default IDCardPurchase;