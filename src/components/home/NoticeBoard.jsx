function NoticeBoard() {

    const notices = [
        {
            title: "🚗 সদস্য নিবন্ধন (Membership Registration) শুরু হয়েছে",
            date: "০৪ আগস্ট ২০২৬",
        },
        {
            title: "🇮🇳 রাজ্য কমিটির সভা - ১৫ আগস্ট ২০২৬",
            date: "১৫ আগস্ট ২০২৬",
        },
        {
            title: "🏥 ড্রাইভার কল্যাণ ও স্বাস্থ্য শিবির শীঘ্রই অনুষ্ঠিত হবে",
            date: "২৫ আগস্ট ২০২৬",
        },
    ];

    return (
        <section className="py-5 bg-white">

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

                    {notices.map((notice, index) => (

                        <div className="col-lg-4 col-md-6 mb-4" key={index}>

                            <div className="card shadow-lg border-0 h-100">

                                <div className="card-body">

                                    <span className="badge bg-danger mb-3">
                                        নতুন
                                    </span>

                                    <h5 className="fw-bold">
                                        {notice.title}
                                    </h5>

                                    <hr />

                                    <p className="text-muted mb-0">
                                        📅 {notice.date}
                                    </p>

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