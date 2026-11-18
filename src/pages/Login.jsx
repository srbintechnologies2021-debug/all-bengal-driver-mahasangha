import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });
            if (error) throw error;
            navigate("/dashboard");
        } catch (error) {
            setMessage(`❌ ${error.message || "Invalid Email or Password."}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "450px" }}>
            <div className="card shadow border-0">
                <div className="card-header bg-primary text-white text-center">
                    <h4 className="mb-0">🚗 ABDM Member Login</h4>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleLogin}>
                        <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    {message && <div className="alert alert-danger mt-3 mb-0">{message}</div>}
                    <div className="text-center mt-3">
                        <small>Don't have an account? <Link to="/register">Register here</Link></small>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
