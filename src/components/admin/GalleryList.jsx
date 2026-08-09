import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

function GalleryList() {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onSnapshot(
            collection(db, "gallery"),

            (snapshot) => {

                const galleryData = snapshot.docs.map((item) => ({
                    id: item.id,
                    ...item.data(),
                }));

                setImages(galleryData);
                setLoading(false);

            },

            (error) => {

                console.error("Gallery Error:", error);
                setLoading(false);

            }
        );

        return () => unsubscribe();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDoc(
                doc(db, "gallery", id)
            );

            alert("Gallery image deleted successfully.");

        } catch (error) {

            console.error("Delete Error:", error);

            alert(
                "Failed to delete image: " +
                error.message
            );

        }

    };

    return (

        <div className="card shadow-sm">

            <div className="card-header bg-dark text-white">

                <h5 className="mb-0">
                    📸 Published Gallery Images
                </h5>

            </div>

            <div className="card-body">

                {loading ? (

                    <div className="text-center py-4">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                        </div>

                        <p className="mt-2">
                            Loading Gallery...
                        </p>

                    </div>

                ) : images.length === 0 ? (

                    <div className="text-center text-muted py-4">

                        📷 No gallery images found.

                    </div>

                ) : (

                    <div className="row">

                        {images.map((item) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={item.id}
                            >

                                <div className="card h-100 shadow-sm">

                                    <img
                                        src={item.image}
                                        alt={item.title || "Gallery Image"}
                                        className="card-img-top"
                                        style={{
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div className="card-body">

                                        <h6 className="fw-bold">
                                            {item.title || "Untitled"}
                                        </h6>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            🗑️ Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default GalleryList;