import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function NoticeBoard() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const loadNotices = async () => {
            const { data, error } = await supabase
                .from("notices")
                .select("*")
                .eq("published", true)
                .order("pinned", { ascending: false })
                .order("created_at", { ascending: false });

            if (!error && data) setNotices(data);
        };
        loadNotices();
    }, []);

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center fw-bold text-primary mb-5">📢 Latest Notices</h2>
                {notices.length === 0 ? (
                    <div className="alert alert-secondary text-center">No notices published yet.</div>
                ) : (
                    notices.map((notice) => (
                        <div key={notice.id} className="card shadow-sm mb-3 border-0">
                            <div className="card-body">
                                <h5 className="fw-bold">
                                    {notice.pinned && "📌 "}
                                    {notice.title}
                                </h5>
                                <p className="mb-2">{notice.description}</p>
                                <small className="text-muted">
                                    {notice.created_at
                                        ? new Date(notice.created_at).toLocaleString()
                                        : "Just Now"}
                                </small>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default NoticeBoard;
