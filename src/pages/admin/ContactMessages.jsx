import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

function ContactMessages() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const loadMessages = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate("/admin-login");
                return;
            }

            const { data, error } = await supabase
                .from("contact_messages")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (err) {
            console.error("Contact messages loading error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const markAsRead = async (id) => {
        const { error } = await supabase
            .from("contact_messages")
            .update({ status: "read" })
            .eq("id", id);

        if (!error) {
            setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "read" } : m)));
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        const { error } = await supabase.from("contact_messages").delete().eq("id", id);
        if (!error) {
            setMessages((prev) => prev.filter((m) => m.id !== id));
        }
    };

    const filtered = messages.filter((m) =>
        [m.name, m.email, m.phone, m.subject, m.message].some((field) =>
            field?.toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0">📩 Contact Messages</h3>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/admin")}>
                    ← Back to Admin
                </button>
            </div>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search by name, phone, email, or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <div className="text-center py-5">Loading messages...</div>
            ) : filtered.length === 0 ? (
                <div className="alert alert-info">No contact messages found.</div>
            ) : (
                <div className="row g-3">
                    {filtered.map((msg) => (
                        <div className="col-md-6" key={msg.id}>
                            <div className={`card shadow-sm h-100 ${msg.status === "new" ? "border-primary" : "border-0"}`}>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="fw-bold mb-0">{msg.subject || "No Subject"}</h5>
                                        <span className={`badge ${msg.status === "new" ? "bg-primary" : "bg-secondary"}`}>
                                            {msg.status || "new"}
                                        </span>
                                    </div>
                                    <p className="mb-2">{msg.message}</p>
                                    <small className="text-muted d-block mb-3">
                                        👤 {msg.name} | 📞 {msg.phone} | ✉️ {msg.email}
                                    </small>
                                    <div className="d-flex gap-2">
                                        {msg.status === "new" && (
                                            <button className="btn btn-sm btn-success" onClick={() => markAsRead(msg.id)}>
                                                ✓ Mark Read
                                            </button>
                                        )}
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteMessage(msg.id)}>
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ContactMessages;
