import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function NoticeList() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotices = async () => {
        const { data, error } = await supabase
            .from("notices")
            .select("*")
            .order("pinned", { ascending: false })
            .order("created_at", { ascending: false });

        if (error) console.error("Notice Error:", error);
        else setNotices(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notice?")) return;

        try {
            const { error } = await supabase.from("notices").delete().eq("id", id);
            if (error) throw error;
            setNotices((prev) => prev.filter((n) => n.id !== id));
            alert("Notice deleted successfully.");
        } catch (error) {
            alert("Failed to delete notice: " + error.message);
        }
    };

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">📢 Published Notices</h5>
            </div>
            <div className="card-body">
                {loading ? (
                    <div className="text-center py-4">
                        <div className="spinner-border text-primary" role="status" />
                        <p className="mt-2">Loading Notices...</p>
                    </div>
                ) : notices.length === 0 ? (
                    <div className="text-center text-muted py-4">📢 No notices published yet.</div>
                ) : (
                    <div className="row">
                        {notices.map((notice) => (
                            <div className="col-lg-6 mb-4" key={notice.id}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body">
                                        {notice.pinned && (
                                            <span className="badge bg-warning text-dark mb-2">📌 Pinned</span>
                                        )}
                                        <h5 className="fw-bold">{notice.title || "Untitled Notice"}</h5>
                                        <p className="text-muted">{notice.description || ""}</p>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(notice.id)}
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

export default NoticeList;
