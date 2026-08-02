import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {

            setUser(currentUser);
            setLoading(false);

        });

        return () => unsubscribe();

    }, []);


    if (loading) {
        return <h2>Loading...</h2>;
    }


    if (!user) {
        return <Navigate to="/login" />;
    }


    return children;
}

export default ProtectedRoute;