function Gallery() {

    const images = [
        "/gallery1.jpg",
        "/gallery2.jpg",
        "/gallery3.jpg",
        "/gallery4.jpg",
        "/gallery5.jpg",
        "/gallery6.jpg",
    ];

    return (

        <section className="py-5 bg-light">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="fw-bold text-primary">
                        📸 Photo Gallery
                    </h2>

                    <p className="text-muted">
                        অল বেঙ্গল ড্রাইভার মহাসংঘের বিভিন্ন কার্যক্রমের কিছু মুহূর্ত
                    </p>

                </div>

                <div className="row">

                    {images.map((image, index) => (

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={index}
                        >

                            <div
                                className="card border-0 shadow-lg h-100"
                            >

                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="card-img-top"
                                    style={{
                                        height: "260px",
                                        objectFit: "cover",
                                    }}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}

export default Gallery;