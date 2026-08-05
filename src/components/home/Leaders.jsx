function Leaders() {

    const leaders = [
        {
            name: "সভাপতির নাম",
            post: "রাজ্য সভাপতি",
            phone: "+91 9876543210",
            image: "/president.jpg",
        },
        {
            name: "সহ-সভাপতির নাম",
            post: "রাজ্য সহ-সভাপতি",
            phone: "+91 9876543211",
            image: "/vice-president.jpg",
        },
        {
            name: "সাধারণ সম্পাদকের নাম",
            post: "রাজ্য সাধারণ সম্পাদক",
            phone: "+91 9876543212",
            image: "/secretary.jpg",
        },
    ];

    return (
        <section className="py-5 bg-light">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="fw-bold text-primary">
                        👨‍💼 রাজ্য নেতৃত্ব
                    </h2>

                    <p className="text-muted">
                        অল বেঙ্গল ড্রাইভার মহাসংঘের রাজ্য নেতৃত্ব
                    </p>

                </div>

                <div className="row">

                    {leaders.map((leader, index) => (

                        <div className="col-lg-4 col-md-6 mb-4" key={index}>

                            <div className="card border-0 shadow-lg h-100 text-center">

                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="card-img-top"
                                    style={{
                                        height: "350px",
                                        objectFit: "cover",
                                    }}
                                />

                                <div className="card-body">

                                    <h4 className="fw-bold">
                                        {leader.name}
                                    </h4>

                                    <h5 className="text-primary">
                                        {leader.post}
                                    </h5>

                                    <hr />

                                    <p className="mb-0">
                                        📞 {leader.phone}
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

export default Leaders;