function SearchBar({ search, setSearch }) {

    return (
        <div style={{ marginBottom: "25px" }}>
            <input
                type="text"
                placeholder="🔍 Search by name, email or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "16px"
                }}
            />
        </div>
    );
}

export default SearchBar;