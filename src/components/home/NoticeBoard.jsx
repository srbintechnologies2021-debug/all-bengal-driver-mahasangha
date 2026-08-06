function NoticeBoard() {

    const notices = [
        {
            id: 1,
            title: "🚗 সদস্য নিবন্ধন (Membership Registration) শুরু হয়েছে",
            description: "অল বেঙ্গল ড্রাইভার মহাসংঘের অনলাইন সদস্য নিবন্ধন এখন চালু হয়েছে। সকল পেশাদার চালকদের আবেদন করার জন্য অনুরোধ করা হচ্ছে।",
            date: "০৪ আগস্ট ২০২৬",
            important: true,
        },
        {
            id: 2,
            title: "🇮🇳 রাজ্য কমিটির সভা - ১৫ আগস্ট ২০২৬",
            description: "১৫ আগস্ট সকাল ১১টায় রাজ্য কমিটির গুরুত্বপূর্ণ সভা অনুষ্ঠিত হবে। সকল জেলা প্রতিনিধিদের উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে।",
            date: "১৫ আগস্ট ২০২৬",
            important: false,
        },
        {
            id: 3,
            title: "🏥 ড্রাইভার কল্যাণ ও স্বাস্থ্য শিবির",
            description: "ড্রাইভারদের জন্য বিনামূল্যে স্বাস্থ্য পরীক্ষা ও চিকিৎসা পরামর্শ শিবির খুব শীঘ্রই আয়োজন করা হবে।",
            date: "২৫ আগস্ট ২০২৬",
            important: false,
        },
    ];

    return (
        <section id="notice" className="py-5 bg-light">

            <div className="container">

                <div className="text-center mb-5">
                    <h2 className="fw-bold text-primary">
                        📢 সর্বশেষ নোটিশ
                    </h2>

                    <p className="text-muted">
                        অল বেঙ্গল ড্রাইভার মহাসংঘের গুরুত্বপূর্ণ ঘোষণা
                    </p>
                </div>

                <div className="row">

                    {notices.map((notice) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={notice.id}
                        >

                            <div className="card shadow-lg border-0 h-100">

                                <div className="card-body d-flex flex-column">

                                    {notice.important && (
                                        <span className="badge bg-danger align-self-start mb-3">
                                            গুরুত্বপূর্ণ
                                        </span>
                                    )}

                                    <h5 className="fw-bold">
                                        {notice.title}
                                    </h5>

                                    <p className="text-muted flex-grow-1">
                                        {notice.description}
                                    </p>

                                    <hr />

                                    <div className="d-flex justify-content-between align-items-center">

                                        <small className="text-secondary">
                                            📅 {notice.date}
                                        </small>

                                        <button className="btn btn-outline-primary btn-sm">
                                            বিস্তারিত
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default NoticeBoard;