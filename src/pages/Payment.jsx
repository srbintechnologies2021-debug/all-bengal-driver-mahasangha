import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";


function Payment() {

    const location = useLocation();
    const navigate = useNavigate();

    const member = location.state;

    const membershipFee = 100;


    if (!member) {

        return (
            <div>
                <h2>No Member Data Found</h2>
            </div>
        );

    }


    const confirmPayment = async () => {

        try {

            const membershipId = "ABDM" + Date.now();


            await setDoc(
                doc(db, "members", member.email),
                {
                    name: member.name || "",
                    email: member.email || "",
                    phone: member.phone || "",
                    district: member.district || "",
                    block: member.block || "",
                    address: member.address || "",

                    membershipId: membershipId,
                    membershipFee: membershipFee,
                    paymentStatus: "Paid",
                    createdAt: new Date()
                }
            );


            alert("Payment Successful!");


            navigate("/dashboard", {
                state: {
                    email: member.email
                }
            });


        } catch (error) {

            console.log(error);

            alert(
                "Payment Error: " + error.message
            );

        }

    };


    return (

        <div className="container mt-5">

            <h2>
                🚗 ABDM Membership Payment
            </h2>


            <hr />


            <h4>
                Member Details
            </h4>


            <p>
                <b>নাম:</b> {member.name}
            </p>


            <p>
                <b>Email:</b> {member.email}
            </p>


            <p>
                <b>Phone:</b> {member.phone}
            </p>


            <p>
                <b>District:</b> {member.district}
            </p>


            <p>
                <b>Block:</b> {member.block}
            </p>


            <p>
                <b>Address:</b> {member.address}
            </p>


            <h4>
                Membership Fee
            </h4>


            <h3>
                ₹{membershipFee}
            </h3>


            <button
                className="btn btn-success"
                onClick={confirmPayment}
            >
                Confirm Payment
            </button>


        </div>

    );

}


export default Payment;