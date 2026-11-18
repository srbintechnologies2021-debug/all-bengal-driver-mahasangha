import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "./Gallery.css";

function Gallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadGallery = async () => {
            const { data, error } = await supabase
                .from("gallery")
                .select("*")
                .eq("status", "published")
                .order("created_at", { ascending: false });

            if (!error && data) setImages(data);
        };
        loadGallery();
    }, []);

    return (
        <section id="gallery" className="py-5">
            <div className="container">
                <h2 className="text-center fw-bold text-primary mb-5">🖼️ Photo Gallery</h2>
                {images.length === 0 ? (
                    <div className="alert alert-secondary text-center">No gallery photos available yet.</div>
                ) : (
                    <div className="row g-4">
                        {images.map((item) => (
                            <div className="col-md-4 col-sm-6" key={item.id}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <img
                                        src={item.image_url}
                                        className="card-img-top"
                                        alt={item.title || "ABDM Gallery"}
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{item.title}</h5>
                                        {item.description && <p className="card-text text-muted">{item.description}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Gallery;
