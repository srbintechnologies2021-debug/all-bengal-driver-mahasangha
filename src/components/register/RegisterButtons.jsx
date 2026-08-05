import { Link } from "react-router-dom";

function RegisterButtons({ loading, onReset }) {
    return (
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">

            <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                        ></span>
                        Registering...
                    </>
                ) : (
                    "📝 Register Member"
                )}
            </button>

            <button
                type="button"
                className="btn btn-warning btn-lg"
                onClick={onReset}
            >
                🔄 Reset Form
            </button>

            <Link
                to="/"
                className="btn btn-secondary btn-lg"
            >
                🏠 Back Home
            </Link>

        </div>
    );
}

export default RegisterButtons;