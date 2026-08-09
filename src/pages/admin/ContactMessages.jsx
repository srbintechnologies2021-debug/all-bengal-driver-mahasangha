
import { useEffect, useState } from "react";

import {
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";


function ContactMessages() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedMessage, setSelectedMessage] = useState(null);


    // ==========================================
    // LOAD CONTACT MESSAGES
    // ==========================================

    useEffect(() => {

        const messagesQuery = query(
            collection(db, "contactMessages"),
            orderBy("createdAt", "desc")
        );


        const unsubscribe = onSnapshot(
            messagesQuery,

            (snapshot) => {

                const messageList = snapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                }));

                setMessages(messageList);
                setLoading(false);
            },

            (error) => {

                console.error(
                    "Contact messages loading error:",
                    error
                );

                setLoading(false);
            }
        );


        return () => unsubscribe();

    }, []);


    // ==========================================
    // MARK AS READ
    // ==========================================

    const handleMarkAsRead = async (id) => {

        try {

            await updateDoc(
                doc(db, "contactMessages", id),
                {
                    status: "read",
                }
            );

        } catch (error) {

            console.error(
                "Error marking message as read:",
                error
            );

            alert("Unable to update message status.");
        }
    };


    // ==========================================
    // DELETE MESSAGE
    // ==========================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await deleteDoc(
                doc(db, "contactMessages", id)
            );

            if (selectedMessage?.id === id) {
                setSelectedMessage(null);
            }

        } catch (error) {

            console.error(
                "Error deleting message:",
                error
            );

            alert("Unable to delete message.");
        }
    };


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredMessages = messages.filter((message) => {

        const searchText = search.toLowerCase();

        return (
            (message.name || "")
                .toLowerCase()
                .includes(searchText) ||

            (message.email || "")
                .toLowerCase()
                .includes(searchText) ||

            (message.phone || "")
                .toLowerCase()
                .includes(searchText) ||

            (message.subject || "")
                .toLowerCase()
                .includes(searchText) ||

            (message.message || "")
                .toLowerCase()
                .includes(searchText)
        );
    });


    // ==========================================
    // DATE FORMAT
    // ==========================================

    const formatDate = (timestamp) => {

        if (!timestamp) {
            return "N/A";
        }

        try {

            return timestamp
                .toDate()
                .toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });

        } catch {

            return "N/A";
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="container py-5">

                <div className="text-center">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="mt-3 text-muted">
                        Loading contact messages...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="container-fluid py-4">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        📩 Contact Messages
                    </h2>

                    <p className="text-muted mb-0">
                        Manage messages received from website visitors.
                    </p>

                </div>

                <div>

                    <span className="badge bg-primary fs-6 px-3 py-2">
                        Total: {messages.length}
                    </span>

                    <span className="badge bg-warning text-dark fs-6 px-3 py-2 ms-2">
                        New: {
                            messages.filter(
                                (message) => message.status === "new"
                            ).length
                        }
                    </span>

                </div>

            </div>


            {/* Search */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Search by name, phone, email, subject or message..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>


            {/* Empty State */}

            {filteredMessages.length === 0 ? (

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div className="fs-1 mb-3">
                            📭
                        </div>

                        <h5 className="fw-bold">
                            No Contact Messages Found
                        </h5>

                        <p className="text-muted mb-0">
                            There are no messages matching your search.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light">

                                    <tr>

                                        <th className="px-3">
                                            #
                                        </th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Subject
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th className="text-center">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredMessages.map(
                                        (message, index) => (

                                            <tr key={message.id}>

                                                <td className="px-3">
                                                    {index + 1}
                                                </td>


                                                <td>

                                                    <div className="fw-semibold">
                                                        {message.name}
                                                    </div>

                                                    <small className="text-muted">
                                                        {message.email}
                                                    </small>

                                                </td>


                                                <td>
                                                    {message.phone}
                                                </td>


                                                <td>
                                                    {message.subject}
                                                </td>


                                                <td>

                                                    {message.status === "new" ? (

                                                        <span className="badge bg-warning text-dark">
                                                            NEW
                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-success">
                                                            READ
                                                        </span>

                                                    )}

                                                </td>


                                                <td>
                                                    <small>
                                                        {formatDate(
                                                            message.createdAt
                                                        )}
                                                    </small>
                                                </td>


                                                <td>

                                                    <div className="d-flex justify-content-center gap-1 flex-wrap">

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() =>
                                                                setSelectedMessage(
                                                                    message
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>


                                                        {message.status === "new" && (

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-success"
                                                                onClick={() =>
                                                                    handleMarkAsRead(
                                                                        message.id
                                                                    )
                                                                }
                                                            >
                                                                Read
                                                            </button>

                                                        )}


                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    message.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            )}


            {/* Message Modal */}

            {selectedMessage && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0, 0, 0, 0.5)",
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered modal-lg">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5 className="modal-title fw-bold">
                                    📩 Message Details
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setSelectedMessage(null)
                                    }
                                ></button>

                            </div>


                            <div className="modal-body">

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <strong>
                                            Full Name
                                        </strong>

                                        <p className="mb-0">
                                            {selectedMessage.name}
                                        </p>

                                    </div>


                                    <div className="col-md-6">

                                        <strong>
                                            Phone
                                        </strong>

                                        <p className="mb-0">
                                            {selectedMessage.phone}
                                        </p>

                                    </div>


                                    <div className="col-md-6">

                                        <strong>
                                            Email
                                        </strong>

                                        <p className="mb-0">
                                            {selectedMessage.email}
                                        </p>

                                    </div>


                                    <div className="col-md-6">

                                        <strong>
                                            Subject
                                        </strong>

                                        <p className="mb-0">
                                            {selectedMessage.subject}
                                        </p>

                                    </div>


                                    <div className="col-12">

                                        <strong>
                                            Message
                                        </strong>

                                        <div className="border rounded p-3 mt-2 bg-light">

                                            {selectedMessage.message}

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <strong>
                                            Status
                                        </strong>

                                        <p className="mb-0">

                                            {selectedMessage.status === "new" ? (

                                                <span className="badge bg-warning text-dark">
                                                    NEW
                                                </span>

                                            ) : (

                                                <span className="badge bg-success">
                                                    READ
                                                </span>

                                            )}

                                        </p>

                                    </div>


                                    <div className="col-md-6">

                                        <strong>
                                            Received
                                        </strong>

                                        <p className="mb-0">
                                            {formatDate(
                                                selectedMessage.createdAt
                                            )}
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="modal-footer">

                                {selectedMessage.status === "new" && (

                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {

                                            handleMarkAsRead(
                                                selectedMessage.id
                                            );

                                            setSelectedMessage({
                                                ...selectedMessage,
                                                status: "read",
                                            });

                                        }}
                                    >
                                        Mark as Read
                                    </button>

                                )}


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setSelectedMessage(null)
                                    }
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


export default ContactMessages;

