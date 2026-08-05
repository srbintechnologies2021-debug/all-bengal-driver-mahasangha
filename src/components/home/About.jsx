function About() {
    return (
        <section className="py-5 bg-light">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="fw-bold text-primary">
                        🚗 All Bengal Driver Mahasangha
                    </h2>

                    <h4 className="text-dark">
                        পশ্চিমবঙ্গের সকল চালকদের ঐক্যবদ্ধ সংগঠন
                    </h4>

                    <hr className="w-25 mx-auto" />

                </div>

                <div className="row align-items-center">

                    <div className="col-lg-6 mb-4">

                        <img
                            src="/about.jpg"
                            alt="ABDM"
                            className="img-fluid rounded shadow-lg"
                        />

                    </div>

                    <div className="col-lg-6">

                        <h3 className="text-success mb-3">
                            🎯 আমাদের লক্ষ্য (Mission)
                        </h3>

                        <p className="fs-5">

                            অল বেঙ্গল ড্রাইভার মহাসংঘ পশ্চিমবঙ্গের সকল
                            পেশাদার চালকদের অধিকার রক্ষা, কল্যাণ,
                            প্রশিক্ষণ, সামাজিক নিরাপত্তা এবং ডিজিটাল
                            সদস্যপদ প্রদানের জন্য কাজ করে।

                        </p>

                        <h3 className="text-danger mt-4">
                            👁️ আমাদের ভিশন (Vision)
                        </h3>

                        <p className="fs-5">

                            পশ্চিমবঙ্গের প্রতিটি চালককে একটি
                            শক্তিশালী, নিরাপদ ও আধুনিক সংগঠনের
                            আওতায় এনে তাদের জীবনযাত্রার মান
                            উন্নয়ন করা।

                        </p>

                        <div className="row mt-4">

                            <div className="col-md-6">

                                <ul className="list-group">

                                    <li className="list-group-item">
                                        ✅ ডিজিটাল মেম্বারশিপ
                                    </li>

                                    <li className="list-group-item">
                                        ✅ Driver Welfare
                                    </li>

                                    <li className="list-group-item">
                                        ✅ Legal Support
                                    </li>

                                    <li className="list-group-item">
                                        ✅ Emergency Help
                                    </li>

                                </ul>

                            </div>

                            <div className="col-md-6">

                                <ul className="list-group">

                                    <li className="list-group-item">
                                        ✅ Government Updates
                                    </li>

                                    <li className="list-group-item">
                                        ✅ Training Program
                                    </li>

                                    <li className="list-group-item">
                                        ✅ Insurance Awareness
                                    </li>

                                    <li className="list-group-item">
                                        ✅ State Driver Network
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default About;