import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

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


    /* Load Gallery */

    useEffect(() => {

        const unsubscribe = onSnapshot(
            collection(db, "gallery"),

            (snapshot) => {

                const data = snapshot.docs
                    .map((item) => ({
                        id: item.id,
                        ...item.data(),
                    }))
                    .sort((a, b) => {

                        const dateA =
                            a.createdAt?.toMillis?.() || 0;

                        const dateB =
                            b.createdAt?.toMillis?.() || 0;

                        return dateB - dateA;

                    });

                setGallery(data);

            },

            (error) => {

                console.error(
                    "Gallery Firestore Error:",
                    error
                );

            }
        );

        return () => unsubscribe();

    }, []);


    /* Add / Update Gallery */

    const saveGallery = async (e) => {

        e.preventDefault();

        if (!title.trim()) {

            alert(
                "Please enter gallery title."
            );

            return;

        }

        if (!imageUrl.trim()) {

            alert(
                "Please enter image URL."
            );

            return;

        }

        if (imageError) {

            alert(
                "Please enter a valid image URL."
            );

            return;

        }

        try {

            setSaving(true);

            if (editingId) {

                await updateDoc(
                    doc(db, "gallery", editingId),
                    {
                        title: title.trim(),
                        description: description.trim(),
                        imageUrl: imageUrl.trim(),
                        status: status,
                    }
                );

                alert(
                    "Gallery item updated successfully."
                );

            } else {

                await addDoc(
                    collection(db, "gallery"),
                    {
                        title: title.trim(),
                        description: description.trim(),
                        imageUrl: imageUrl.trim(),
                        status: status,
                        createdAt: serverTimestamp(),
                    }
                );

                alert(
                    "Gallery item added successfully."
                );

            }

            resetForm();

        } catch (error) {

            console.error(
                "Save Gallery Error:",
                error
            );

            alert(
                "Failed to save gallery item: " +
                error.message
            );

        } finally {

            setSaving(false);

        }

    };


    /* Edit Gallery */

    const editGallery = (item) => {

        setEditingId(item.id);

        setTitle(item.title || "");

        setDescription(
            item.description || ""
        );

        setImageUrl(
            item.imageUrl || ""
        );

        setStatus(
            item.status || "published"
        );

        setImageError(false);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    /* Cancel Edit */

    const cancelEdit = () => {

        resetForm();

    };


    /* Reset Form */

    const resetForm = () => {

        setEditingId(null);

        setTitle("");

        setDescription("");

        setImageUrl("");

        setStatus("published");

        setImageError(false);

    };


    /* Delete Gallery */

    const deleteGallery = async (galleryId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this gallery item?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDoc(
                doc(db, "gallery", galleryId)
            );

            if (editingId === galleryId) {

                resetForm();

            }

        } catch (error) {

            console.error(
                "Delete Gallery Error:",
                error
            );

            alert(
                "Failed to delete gallery item."
            );

        }

    };


    return (

        <section className="gallery-management">

            {/* Header */}

            <div className="gallery-header">

                <h2>
                    🖼️ Gallery Management
                </h2>

                <p>
                    Add and manage ABDM gallery photos
                </p>

            </div>


            {/* Form */}

            <form
                className="gallery-form"
                onSubmit={saveGallery}
            >

                {/* Title */}

                <div className="gallery-form-group">

                    <label>
                        Gallery Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Example: Driver Meeting 2026"
                    />

                </div>


                {/* Description */}

                <div className="gallery-form-group">

                    <label>
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        placeholder="Enter gallery description"
                        rows="3"
                    />

                </div>


                {/* Image URL */}

                <div className="gallery-form-group">

                    <label>
                        Image URL
                    </label>

                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => {

                            setImageUrl(
                                e.target.value
                            );

                            setImageError(false);

                        }}
                        placeholder="https://example.com/image.jpg"
                    />

                </div>


                {/* Live Image Preview */}

                {imageUrl.trim() && (

                    <div className="gallery-live-preview">

                        <p className="gallery-preview-label">
                            👁️ Image Preview
                        </p>


                        {!imageError && (

                            <img
                                src={imageUrl}
                                alt="Gallery Preview"
                                onLoad={() => {
                                    setImageError(false);
                                }}
                                onError={() => {
                                    setImageError(true);
                                }}
                            />

                        )}


                        {imageError && (

                            <div className="gallery-preview-error">

                                ❌ Image URL is not valid
                                or image could not be loaded.

                            </div>

                        )}

                    </div>

                )}


                {/* Status */}

                <div className="gallery-form-group">

                    <label>
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                    >

                        <option value="published">
                            Published
                        </option>

                        <option value="hidden">
                            Hidden
                        </option>

                    </select>

                </div>


                {/* Buttons */}

                <div className="gallery-form-buttons">

                    <button
                        type="submit"
                        className="gallery-add-btn"
                        disabled={
                            saving ||
                            imageError
                        }
                    >

                        {saving
                            ? "Saving..."
                            : editingId
                                ? "💾 Update Gallery"
                                : "➕ Add Gallery"}

                    </button>


                    {editingId && (

                        <button
                            type="button"
                            className="gallery-cancel-btn"
                            onClick={cancelEdit}
                        >
                            ✕ Cancel
                        </button>

                    )}

                </div>

            </form>


            {/* Gallery List */}

            <div className="gallery-list">

                <h3>
                    Published Gallery
                </h3>


                {gallery.length === 0 ? (

                    <div className="gallery-empty">
                        No gallery items found.
                    </div>

                ) : (

                    <div className="gallery-grid">

                        {gallery.map((item) => (

                            <div
                                className="gallery-item"
                                key={item.id}
                            >

                                {/* Image */}

                                <img
                                    src={item.imageUrl}
                                    alt={
                                        item.title ||
                                        "ABDM Gallery"
                                    }
                                />


                                {/* Content */}

                                <div className="gallery-item-body">

                                    <h4>
                                        {item.title}
                                    </h4>

                                    <p>
                                        {item.description}
                                    </p>


                                    {/* Status */}

                                    <span
                                        className={
                                            item.status ===
                                                "published"
                                                ? "gallery-status"
                                                : "gallery-status gallery-hidden-status"
                                        }
                                    >
                                        {item.status}
                                    </span>


                                    {/* Actions */}

                                    <div className="gallery-actions">

                                        <button
                                            type="button"
                                            className="gallery-edit-btn"
                                            onClick={() =>
                                                editGallery(
                                                    item
                                                )
                                            }
                                        >
                                            ✏️ Edit
                                        </button>


                                        <button
                                            type="button"
                                            className="gallery-delete-btn"
                                            onClick={() =>
                                                deleteGallery(
                                                    item.id
                                                )
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

        </section>

    );

}

export default GalleryForm;