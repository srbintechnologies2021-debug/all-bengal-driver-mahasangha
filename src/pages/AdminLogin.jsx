import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginAdmin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (authError) throw authError;

            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", authData.user.id)
                .single();

            if (profileError || !profile) {
                await supabase.auth.signOut();
                setError("Admin record not found.");
                return;
            }

            if (profile.role === "admin" || profile.role === "superadmin") {
                navigate("/admin");
            } else {
                await supabase.auth.signOut();
                setError("Access denied: Insufficient permissions.");
            }
        } catch (err) {
            setError(err.message || "Failed to login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "420px" }}>
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-white text-center">
                    <h4 className="mb-0">🚗 ABDM ADMIN LOGIN</h4>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={loginAdmin}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Verifying..." : "Login"}
                        </button>
                    </form>
                    {error && <div className="alert alert-danger mt-3 mb-0 py-2">{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
