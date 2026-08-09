import "./MemberProfile.css";
function MemberProfile({ member }) {

    return (

        <div className="mt-5">

            <h4 className="text-primary mb-4">
                👤 My Profile
            </h4>


            {/* Personal Information */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        👤 Personal Information
                    </h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered mb-0">

                            <tbody>

                                <tr>
                                    <th width="220">
                                        Full Name
                                    </th>
                                    <td>
                                        {member?.name || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Father's Name
                                    </th>
                                    <td>
                                        {member?.fatherName || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Date of Birth
                                    </th>
                                    <td>
                                        {member?.dob || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Gender
                                    </th>
                                    <td>
                                        {member?.gender || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Blood Group
                                    </th>
                                    <td>
                                        {member?.bloodGroup || "-"}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* Contact Information */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-success text-white">
                    <h5 className="mb-0">
                        📞 Contact Information
                    </h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered mb-0">

                            <tbody>

                                <tr>
                                    <th width="220">
                                        Email
                                    </th>
                                    <td>
                                        {member?.email || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Phone
                                    </th>
                                    <td>
                                        {member?.phone || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Alternate Phone
                                    </th>
                                    <td>
                                        {member?.alternatePhone || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Emergency Contact
                                    </th>
                                    <td>
                                        {member?.emergencyContact || "-"}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* Address Information */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-warning">
                    <h5 className="mb-0">
                        🏠 Address Information
                    </h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered mb-0">

                            <tbody>

                                <tr>
                                    <th width="220">
                                        Address
                                    </th>
                                    <td>
                                        {member?.address || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        District
                                    </th>
                                    <td>
                                        {member?.district || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Block
                                    </th>
                                    <td>
                                        {member?.block || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Police Station
                                    </th>
                                    <td>
                                        {member?.policeStation || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        PIN Code
                                    </th>
                                    <td>
                                        {member?.pinCode || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        State
                                    </th>
                                    <td>
                                        {member?.state || "-"}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* Driver Information */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">
                        🚗 Driver Information
                    </h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered mb-0">

                            <tbody>

                                <tr>
                                    <th width="220">
                                        Licence Number
                                    </th>
                                    <td>
                                        {member?.licenceNo || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Licence Expiry
                                    </th>
                                    <td>
                                        {member?.licenceExpiry || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Vehicle Type
                                    </th>
                                    <td>
                                        {member?.vehicleType || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Vehicle Number
                                    </th>
                                    <td>
                                        {member?.vehicleNo || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Driving Experience
                                    </th>
                                    <td>
                                        {member?.experience || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Driver Category
                                    </th>
                                    <td>
                                        {member?.driverCategory || "-"}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>


            {/* Membership Information */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-header bg-info text-white">
                    <h5 className="mb-0">
                        🆔 Membership Information
                    </h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered mb-0">

                            <tbody>

                                <tr>
                                    <th width="220">
                                        Member ID
                                    </th>
                                    <td>
                                        <strong>
                                            {member?.memberId || "-"}
                                        </strong>
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Membership Type
                                    </th>
                                    <td>
                                        {member?.membershipType || "Driver"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Membership Status
                                    </th>
                                    <td>
                                        {member?.membershipStatus || "Pending"}
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        Payment Status
                                    </th>
                                    <td>
                                        {member?.paymentStatus || "Pending"}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default MemberProfile;