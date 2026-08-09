import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

function NoticeBoard() {

    const [notices, setNotices] = useState([]);

    useEffect(() => {

        const q = query(
            collection(db, "notices"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setNotices(data);

        });

        return () => unsubscribe();

    }, []);

    return (

        <section className="py-5 bg-light">

            <div className="container">

                <h2 className="text-center fw-bold text-primary mb-5">
                    📢 Latest Notices
                </h2>

                {notices.length === 0 ? (

                    <div className="alert alert-secondary text-center">
                        No notices published yet.
                    </div>

                ) : (

                    notices.map((notice) => (

                        <div
                            key={notice.id}
                            className="card shadow-sm mb-3 border-0"
                        >

                            <div className="card-body">

                                <h5 className="fw-bold">

                                    {notice.pinned && "📌 "}

                                    {notice.title}

                                </h5>

                                <p className="mb-2">
                                    {notice.description}
                                </p>

                                <small className="text-muted">

                                    {notice.createdAt?.toDate
                                        ? notice.createdAt
                                            .toDate()
                                            .toLocaleString()
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