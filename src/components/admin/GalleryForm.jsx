import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "./GalleryForm.css";

function GalleryForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState("published");

    const [gallery, setGallery] = useState([]);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [imageError, setImageError] = useState(false);

    const fetchGallery = async () => {
        const { data, error } = await supabase
            .from("gallery")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) console.error("Gallery Fetch Error:", error);
        else setGallery(data || []);
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const saveGallery = async (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Please enter gallery title.");
        if (!imageUrl.trim()) return alert("Please enter image URL.");
        if (imageError) return alert("Please enter a valid image URL.");

        try {
            setSaving(true);
            const payload = {
                title: title.trim(),
                description: description.trim(),
                image_url: imageUrl.trim(),
                status,
            };

            if (editingId) {
                const { error } = await supabase
                    .from("gallery")
                    .update(payload)
                    .eq("id", editingId);
                if (error) throw error;
                alert("Gallery item updated successfully.");
            } else {
                const { error } = await supabase
                    .from("gallery")
                    .insert([payload]);
                if (error) throw error;
                alert("Gallery item added successfully.");
            }

            resetForm();
            await fetchGallery();
        } catch (error) {
            console.error("Save Gallery Error:", error);
            alert("Failed to save gallery item: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const editGallery = (item) => {
        setEditingId(item.id);
        setTitle(item.title || "");
        setDescription(item.description || "");
        setImageUrl(item.image_url || "");
        setStatus(item.status || "published");
        setImageError(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDescription("");
        setImageUrl("");
        setStatus("published");
        setImageError(false);
    };

    const deleteGallery = async (galleryId) => {
        if (!window.confirm("Are you sure you want to delete this gallery item?")) return;

        try {
            const { error } = await supabase.from("gallery").delete().eq("id", galleryId);
            if (error) throw error;
            if (editingId === galleryId) resetForm();
            setGallery((prev) => prev.filter((item) => item.id !== galleryId));
        } catch (error) {
            console.error("Delete Gallery Error:", error);
            alert("Failed to delete gallery item.");
        }
    };

    return (
        <section className="gallery-management">
            <div className="gallery-header">
                <h2>🖼️ Gallery Management</h2>
                <p>Add and manage ABDM gallery photos</p>
            </div>

            <form className="gallery-form" onSubmit={saveGallery}>
                <div className="gallery-form-group">
                    <label>Gallery Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Example: Driver Meeting 2026"
                    />
                </div>

                <div className="gallery-form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter gallery description"
                        rows="3"
                    />
                </div>

                <div className="gallery-form-group">
                    <label>Image URL</label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => {
                            setImageUrl(e.target.value);
                            setImageError(false);
                        }}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {imageUrl.trim() && (
                    <div className="gallery-live-preview">
                        <p className="gallery-preview-label">👁️ Image Preview</p>
                        {!imageError ? (
                            <img
                                src={imageUrl}
                                alt="Gallery Preview"
                                onLoad={() => setImageError(false)}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="gallery-preview-error">
                                ❌ Image URL is not valid or image could not be loaded.
                            </div>
                        )}
                    </div>
                )}

                <div className="gallery-form-group">
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="published">Published</option>
                        <option value="hidden">Hidden</option>
                    </select>
                </div>

                <div className="gallery-form-buttons">
                    <button type="submit" className="gallery-add-btn" disabled={saving || imageError}>
                        {saving ? "Saving..." : editingId ? "💾 Update Gallery" : "➕ Add Gallery"}
                    </button>
                    {editingId && (
                        <button type="button" className="gallery-cancel-btn" onClick={resetForm}>
                            ✕ Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="gallery-list">
                <h3>Published Gallery</h3>
                {gallery.length === 0 ? (
                    <div className="gallery-empty">No gallery items found.</div>
                ) : (
                    <div className="gallery-grid">
                        {gallery.map((item) => (
                            <div className="gallery-item" key={item.id}>
                                <img src={item.image_url} alt={item.title || "ABDM Gallery"} />
                                <div className="gallery-item-body">
                                    <h4>{item.title}</h4>
                                    {item.description && <p>{item.description}</p>}
                                    <span className={`badge ${item.status === "published" ? "bg-success" : "bg-secondary"}`}>
                                        {item.status}
                                    </span>
                                    <div className="gallery-item-actions mt-2">
                                        <button type="button" className="btn btn-sm btn-warning me-2" onClick={() => editGallery(item)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteGallery(item.id)}>
                                            Delete
                                        </button>
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

export default GalleryForm;
