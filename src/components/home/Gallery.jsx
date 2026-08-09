import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

import "./Gallery.css";

function Gallery() {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {

        const unsubscribe = onSnapshot(
            collection(db, "gallery"),

            (snapshot) => {

                const galleryData = snapshot.docs
                    .map((item) => ({
                        id: item.id,
                        ...item.data(),
                    }))
                    .filter(
                        (item) =>
                            item.status?.toLowerCase() === "published"
                    )
                    .sort((a, b) => {

                        const dateA =
                            a.createdAt?.toMillis?.() || 0;

                        const dateB =
                            b.createdAt?.toMillis?.() || 0;

                        return dateB - dateA;

                    });

                setImages(galleryData);
                setLoading(false);

            },

            (error) => {

                console.error(
                    "Gallery Error:",
                    error
                );

                setLoading(false);

            }
        );

        return () => unsubscribe();

    }, []);


    const openImage = (image) => {
        setSelectedImage(image);
    };


    const closeImage = () => {
        setSelectedImage(null);
    };


    const showPrevious = () => {

        if (!selectedImage) {
            return;
        }

        const currentIndex = images.findIndex(
            (item) => item.id === selectedImage.id
        );

        const previousIndex =
            currentIndex === 0
                ? images.length - 1
                : currentIndex - 1;

        setSelectedImage(images[previousIndex]);

    };


    const showNext = () => {

        if (!selectedImage) {
            return;
        }

        const currentIndex = images.findIndex(
            (item) => item.id === selectedImage.id
        );

        const nextIndex =
            currentIndex === images.length - 1
                ? 0
                : currentIndex + 1;

        setSelectedImage(images[nextIndex]);

    };


    return (

        <section
            id="gallery"
            className="gallery-section"
        >

            <div className="container">

                {/* Header */}

                <div className="gallery-heading">

                    <h2>
                        📸 Photo Gallery
                    </h2>

                    <p>
                        অল বেঙ্গল ড্রাইভার মহাসংঘের বিভিন্ন কার্যক্রমের কিছু মুহূর্ত
                    </p>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="gallery-loading">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <p>
                            Loading Gallery...
                        </p>

                    </div>

                )}


                {/* Empty */}

                {!loading && images.length === 0 && (

                    <div className="gallery-empty">

                        <h5>
                            📷 No Gallery Images Available
                        </h5>

                        <p>
                            New photos will appear here soon.
                        </p>

                    </div>

                )}


                {/* Gallery Grid */}

                {!loading && images.length > 0 && (

                    <div className="gallery-grid">

                        {images.map((item) => (

                            <div
                                className="gallery-card"
                                key={item.id}
                                onClick={() =>
                                    openImage(item)
                                }
                            >

                                <div className="gallery-image-wrapper">

                                    <img
                                        src={item.imageUrl}
                                        alt={
                                            item.title ||
                                            "ABDM Gallery"
                                        }
                                        className="gallery-image"
                                        onError={(e) => {

                                            e.currentTarget.style.display =
                                                "none";

                                        }}
                                    />

                                    <div className="gallery-overlay">

                                        <span>
                                            🔍 View Photo
                                        </span>

                                    </div>

                                </div>


                                <div className="gallery-card-content">

                                    <h5>
                                        {item.title ||
                                            "ABDM Activity"}
                                    </h5>

                                    {item.description && (

                                        <p>
                                            {item.description}
                                        </p>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* Lightbox */}

            {selectedImage && (

                <div
                    className="gallery-lightbox"
                    onClick={closeImage}
                >

                    <button
                        className="gallery-close"
                        onClick={closeImage}
                        aria-label="Close"
                    >
                        ✕
                    </button>


                    <button
                        className="gallery-nav gallery-prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrevious();
                        }}
                        aria-label="Previous"
                    >
                        ‹
                    </button>


                    <div
                        className="gallery-lightbox-content"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <img
                            src={selectedImage.imageUrl}
                            alt={
                                selectedImage.title ||
                                "ABDM Gallery"
                            }
                        />

                        <div className="gallery-lightbox-caption">

                            <h4>
                                {selectedImage.title}
                            </h4>

                            {selectedImage.description && (

                                <p>
                                    {selectedImage.description}
                                </p>

                            )}

                        </div>

                    </div>


                    <button
                        className="gallery-nav gallery-next"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        aria-label="Next"
                    >
                        ›
                    </button>

                </div>

            )}

        </section>

    );

}

export default Gallery;