import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

function MemberSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const { data, error } = await supabase.rpc("verify_member_public", {
                search_query: query.trim(),
            });
            if (error) throw error;
            setResults(data || []);
        } catch (err) {
            console.error("Member Search Error:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="verify" className="py-5">
            <div className="container" style={{ maxWidth: "850px" }}>
                <div className="card border-0 shadow-sm p-4">
                    <h3 className="text-center fw-bold text-primary mb-2">
                        🔍 Member Verification & Search
                    </h3>
                    <p className="text-center text-muted mb-4">
                        Enter Member ID (e.g., ABDM-2026-0001) or Full Name to verify membership status
                    </p>

                    <form onSubmit={handleSearch} className="d-flex gap-2 mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Search by Member ID or Member Name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary btn-lg px-4" disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </form>

                    {searched && !loading && results.length === 0 && (
                        <div className="alert alert-warning text-center mb-0">
                            No member found matching "{query}".
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="row g-3">
                            {results.map((m, idx) => (
                                <div className="col-md-6" key={m.member_id || idx}>
                                    <div className="card border h-100">
                                        <div className="card-body d-flex align-items-center gap-3">
                                            <img
                                                src={m.member_photo_url || "/default-avatar.png"}
                                                alt={m.full_name}
                                                style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }}
                                            />
                                            <div>
                                                <h6 className="fw-bold mb-1">{m.full_name}</h6>
                                                <div className="small text-primary fw-bold">
                                                    ID: {m.member_id || "Pending Assignment"}
                                                </div>
                                                <div className="small text-muted">
                                                    {m.district}, {m.state} • {m.vehicle_type || "Driver"}
                                                </div>
                                                <span className={`badge mt-1 ${m.membership_status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}>
                                                    {m.membership_status || "Pending"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default MemberSearch;
