const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");

const Razorpay = require("razorpay");


// ==================================================
// GLOBAL SETTINGS
// ==================================================

setGlobalOptions({
    region: "asia-south1",
});


// ==================================================
// RAZORPAY SECRETS
// ==================================================

const razorpayKeyId =
    defineSecret("RAZORPAY_KEY_ID");

const razorpayKeySecret =
    defineSecret("RAZORPAY_KEY_SECRET");


// ==================================================
// RAZORPAY INSTANCE
// ==================================================

function getRazorpay() {

    return new Razorpay({

        key_id: razorpayKeyId.value(),

        key_secret: razorpayKeySecret.value(),

    });

}


// ==================================================
// MEMBERSHIP ORDER
// ==================================================

exports.createRazorpayOrder = onRequest(

    {
        secrets: [
            razorpayKeyId,
            razorpayKeySecret,
        ],

        cors: true,
    },

    async (req, res) => {

        try {

            // Only POST

            if (req.method !== "POST") {

                return res.status(405).json({

                    success: false,

                    message:
                        "Method not allowed",

                });

            }


            // Fixed membership fee

            const membershipFee = 100;


            const razorpay =
                getRazorpay();


            const order =
                await razorpay.orders.create({

                    amount:
                        membershipFee * 100,

                    currency: "INR",

                    receipt:
                        `ABDM_MEMBERSHIP_${Date.now()}`,

                });


            return res.status(200).json({

                success: true,

                order: {

                    id: order.id,

                    amount: order.amount,

                    currency:
                        order.currency,

                },

                amount:
                    membershipFee,

            });


        } catch (error) {

            console.error(
                "Membership Order Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to create membership order",

            });

        }

    }

);


// ==================================================
// LOGO ORDER
// ==================================================

exports.createLogoOrder = onRequest(

    {
        secrets: [
            razorpayKeyId,
            razorpayKeySecret,
        ],

        cors: true,
    },

    async (req, res) => {

        try {

            // Only POST

            if (req.method !== "POST") {

                return res.status(405).json({

                    success: false,

                    message:
                        "Method not allowed",

                });

            }


            // Get quantity

            const {
                quantity
            } = req.body;


            // Validate quantity

            if (
                !Number.isInteger(quantity) ||
                quantity < 1 ||
                quantity > 5
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid logo quantity",

                });

            }


            // IMPORTANT:
            // Logo price = ₹100

            const pricePerLogo = 100;


            // Server-side calculation

            const totalAmount =
                pricePerLogo * quantity;


            const razorpay =
                getRazorpay();


            // Create Razorpay order

            const order =
                await razorpay.orders.create({

                    amount:
                        totalAmount * 100,

                    currency: "INR",

                    receipt:
                        `ABDM_LOGO_${Date.now()}`,

                });


            return res.status(200).json({

                success: true,

                order: {

                    id: order.id,

                    amount:
                        order.amount,

                    currency:
                        order.currency,

                },

                quantity:

                    quantity,

                pricePerLogo:

                    pricePerLogo,

                totalAmount:

                    totalAmount,

            });


        } catch (error) {

            console.error(
                "Logo Order Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to create logo order",

            });

        }

    }

);