function DashboardCards({
    total,
    pending,
    approved,
    rejected
}) {

    const cardStyle = {
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        flex: 1,
        minWidth: "180px"
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "30px"
            }}
        >
            <div style={cardStyle}>
                <h3>👥 Total Members</h3>
                <h1>{total}</h1>
            </div>

            <div style={cardStyle}>
                <h3>⏳ Pending</h3>
                <h1>{pending}</h1>
            </div>

            <div style={cardStyle}>
                <h3>✅ Approved</h3>
                <h1>{approved}</h1>
            </div>

            <div style={cardStyle}>
                <h3>❌ Rejected</h3>
                <h1>{rejected}</h1>
            </div>
        </div>
    );
}

export default DashboardCards;