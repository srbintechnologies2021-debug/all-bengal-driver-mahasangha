function ReviewInfo({ formData, setStep }) {

    return (

        <div className="card shadow-sm border-0">

            <div className="card-header bg-success text-white">

                <h4 className="mb-0">
                    📋 Review Your Information
                </h4>

            </div>

            <div className="card-body">

                {/* Personal */}

                <h5 className="text-primary">👤 Personal Information</h5>

                <table className="table table-bordered">

                    <tbody>

                        <tr>
                            <th>Full Name</th>
                            <td>{formData.name}</td>
                        </tr>

                        <tr>
                            <th>Father's Name</th>
                            <td>{formData.fatherName}</td>
                        </tr>

                        <tr>
                            <th>Date of Birth</th>
                            <td>{formData.dob}</td>
                        </tr>

                        <tr>
                            <th>Gender</th>
                            <td>{formData.gender}</td>
                        </tr>

                        <tr>
                            <th>Blood Group</th>
                            <td>{formData.bloodGroup}</td>
                        </tr>

                    </tbody>

                </table>


                {/* Contact */}

                <h5 className="text-primary mt-4">📞 Contact Information</h5>

                <table className="table table-bordered">

                    <tbody>

                        <tr>
                            <th>Phone</th>
                            <td>{formData.phone}</td>
                        </tr>

                        <tr>
                            <th>Email</th>
                            <td>{formData.email}</td>
                        </tr>

                        <tr>
                            <th>Alternate Phone</th>
                            <td>{formData.alternatePhone}</td>
                        </tr>

                        <tr>
                            <th>Emergency Contact</th>
                            <td>{formData.emergencyContact}</td>
                        </tr>

                    </tbody>

                </table>


                {/* Address */}

                <h5 className="text-primary mt-4">📍 Address Information</h5>

                <table className="table table-bordered">

                    <tbody>

                        <tr>
                            <th>Address</th>
                            <td>{formData.address}</td>
                        </tr>

                        <tr>
                            <th>District</th>
                            <td>{formData.district}</td>
                        </tr>

                        <tr>
                            <th>Block</th>
                            <td>{formData.block}</td>
                        </tr>

                        <tr>
                            <th>Police Station</th>
                            <td>{formData.policeStation}</td>
                        </tr>

                        <tr>
                            <th>PIN Code</th>
                            <td>{formData.pinCode}</td>
                        </tr>

                        <tr>
                            <th>State</th>
                            <td>{formData.state}</td>
                        </tr>

                    </tbody>

                </table>


                {/* Driver */}

                <h5 className="text-primary mt-4">🚗 Driver Information</h5>

                <table className="table table-bordered">

                    <tbody>

                        <tr>
                            <th>Licence Number</th>
                            <td>{formData.licenceNo}</td>
                        </tr>

                        <tr>
                            <th>Licence Expiry</th>
                            <td>{formData.licenceExpiry}</td>
                        </tr>

                        <tr>
                            <th>Driver Category</th>
                            <td>{formData.driverCategory}</td>
                        </tr>

                        <tr>
                            <th>Vehicle Type</th>
                            <td>{formData.vehicleType}</td>
                        </tr>

                        <tr>
                            <th>Vehicle Number</th>
                            <td>{formData.vehicleNo}</td>
                        </tr>

                        <tr>
                            <th>Experience</th>
                            <td>{formData.experience} Years</td>
                        </tr>

                    </tbody>

                </table>


                {/* Account */}

                <h5 className="text-primary mt-4">🔐 Account Information</h5>

                <table className="table table-bordered">

                    <tbody>

                        <tr>
                            <th>Email</th>
                            <td>{formData.email}</td>
                        </tr>

                        <tr>
                            <th>Password</th>
                            <td>••••••••</td>
                        </tr>

                    </tbody>

                </table>


                <div className="d-flex justify-content-between mt-4">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(5)}
                    >
                        ← Back
                    </button>

                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setStep(7)}
                    >
                        Confirm & Continue →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ReviewInfo;