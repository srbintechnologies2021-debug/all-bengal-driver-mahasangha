import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function NoticeForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pinned, setPinned] = useState(false);
    const [published, setPublished] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setMessage("❌ Please fill all required fields.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from("notices").insert([
                {
                    title: title.trim(),
                    description: description.trim(),
                    pinned,
                    published,
                },
            ]);

            if (error) throw error;

            setMessage("✅ Notice Published Successfully.");
            setTitle("");
            setDescription("");
            setPinned(false);
            setPublished(true);
        } catch (error) {
            console.error("Publish Notice Error:", error);
            setMessage(`❌ Failed to publish notice: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">📢 Publish Notice</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Notice Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Notice Title"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            rows="5"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write Notice..."
                            required
                        />
                    </div>
                    <div className="form-check mb-2">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={pinned}
                            onChange={(e) => setPinned(e.target.checked)}
                        />
                        <label className="form-check-label">Pin this Notice</label>
                    </div>
                    <div className="form-check mb-4">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                        />
                        <label className="form-check-label">Publish Immediately</label>
                    </div>
                    <button className="btn btn-success" type="submit" disabled={loading}>
                        {loading ? "Publishing..." : "Publish Notice"}
                    </button>
                </form>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
}

export default NoticeForm;
