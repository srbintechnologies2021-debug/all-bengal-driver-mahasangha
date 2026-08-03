import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";


function Dashboard() {

    const location = useLocation();

    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchMember = async () => {

            try {

                const email = location.state?.email;


                if (!email) {

                    setLoading(false);
                    return;

                }


                const memberRef = doc(
                    db,
                    "members",
                    email
                );


                const memberSnap = await getDoc(memberRef);


                if (memberSnap.exists()) {

                    setMember(memberSnap.data());

                }
                else {

                    console.log("Member not found");

                }


            }
            catch (error) {

                console.log(error);

            }


            setLoading(false);

        };


        fetchMember();


    }, [location.state]);


    if (loading) {

        return (

            <h2 className="container mt-5">
                Loading Member Profile...
            </h2>

        );

    }


    if (!member) {

        return (

            <h2 className="container mt-5">
                Member Profile Not Found
            </h2>

        );

    }


    return (

        <div className="container mt-5">


            <h2>
                🚗 ABDM Member Dashboard
            </h2>


            <hr />


            <p>
                <b>Membership ID:</b> {member.membershipId}
            </p>


            <p>
                <b>Name:</b> {member.name}
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


            <p>
                <b>Payment Status:</b> {member.paymentStatus}
            </p>


            <p>
                <b>Membership Fee:</b> ₹{member.membershipFee}
            </p>


        </div>

    );

}


export default Dashboard;