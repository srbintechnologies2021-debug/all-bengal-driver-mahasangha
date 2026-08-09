import { useState } from "react";

import { db } from "../../firebase/firebaseConfig";

import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

function NoticeForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pinned, setPinned] = useState(false);
    const [published, setPublished] = useState(true);

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            setMessage("❌ Please fill all required fields.");
            return;
        }

        try {

            await addDoc(collection(db, "notices"), {

                title,
                description,

                pinned,
                published,

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()

            });

            setMessage("✅ Notice Published Successfully.");

            setTitle("");
            setDescription("");
            setPinned(false);
            setPublished(true);

        } catch (error) {

            console.error(error);

            setMessage("❌ Failed to publish notice.");

        }

    };

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                    📢 Publish Notice
                </h4>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Notice Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Notice Title"
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write Notice..."
                        />

                    </div>

                    <div className="form-check mb-2">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={pinned}
                            onChange={(e) => setPinned(e.target.checked)}
                        />

                        <label className="form-check-label">
                            Pin this Notice
                        </label>

                    </div>

                    <div className="form-check mb-4">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                        />

                        <label className="form-check-label">
                            Publish Immediately
                        </label>

                    </div>

                    <button
                        className="btn btn-success"
                        type="submit"
                    >
                        Publish Notice
                    </button>

                </form>

                {
                    message && (
                        <div className="alert alert-info mt-3">
                            {message}
                        </div>
                    )
                }

            </div>

        </div>

    );

}

export default NoticeForm;