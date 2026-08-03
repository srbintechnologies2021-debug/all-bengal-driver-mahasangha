import { useLocation, useNavigate } from "react-router-dom";


function Review() {

    const location = useLocation();
    const navigate = useNavigate();

    const member = location.state;


    if (!member) {
        return (
            <h2>No registration data found</h2>
        );
    }


    return (

        <div className="container mt-5">

            <h2>🚗 Review Your Details</h2>

            <hr />

            <p><b>Full Name:</b> {member.name}</p>

            <p><b>Email:</b> {member.email}</p>

            <p><b>Phone:</b> {member.phone}</p>

            <p><b>District:</b> {member.district}</p>

            <p><b>Block:</b> {member.block}</p>

            <p><b>Address:</b> {member.address}</p>


            <button
                className="btn btn-success"
                onClick={() => navigate("/payment", {
                    state: member
                })}
            >
                Proceed to Payment
            </button>


        </div>

    );

}


export default Review;