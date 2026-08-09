import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

function NoticeList() {

    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = onSnapshot(
            collection(db, "notices"),

            (snapshot) => {

                const noticeData = snapshot.docs.map((item) => ({
                    id: item.id,
                    ...item.data(),
                }));

                setNotices(noticeData);
                setLoading(false);

            },

            (error) => {

                console.error("Notice Error:", error);
                setLoading(false);

            }
        );

        return () => unsubscribe();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this notice?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDoc(
                doc(db, "notices", id)
            );

            alert("Notice deleted successfully.");

        } catch (error) {

            console.error("Delete Notice Error:", error);

            alert(
                "Failed to delete notice: " +
                error.message
            );

        }

    };

    return (

        <div className="card shadow-sm">

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">
                    📢 Published Notices
                </h5>

            </div>

            <div className="card-body">

                {loading ? (

                    <div className="text-center py-4">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                        </div>

                        <p className="mt-2">
                            Loading Notices...
                        </p>

                    </div>

                ) : notices.length === 0 ? (

                    <div className="text-center text-muted py-4">

                        📢 No notices published yet.

                    </div>

                ) : (

                    <div className="row">

                        {notices.map((notice) => (

                            <div
                                className="col-lg-6 mb-4"
                                key={notice.id}
                            >

                                <div className="card h-100 border-0 shadow-sm">

                                    <div className="card-body">

                                        {notice.pinned && (

                                            <span className="badge bg-warning text-dark mb-2">
                                                📌 Pinned
                                            </span>

                                        )}

                                        <h5 className="fw-bold">
                                            {notice.title || "Untitled Notice"}
                                        </h5>

                                        <p className="text-muted">
                                            {notice.description || ""}
                                        </p>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleDelete(notice.id)
                                            }
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