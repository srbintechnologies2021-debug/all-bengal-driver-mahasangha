function SearchBar({ value, onChange }) {

    return (

        <div style={{ marginBottom: "25px" }}>

            <input
                type="text"
                placeholder="🔍 Search by Name, Email, Phone or Member ID..."
                value={value}
                onChange={onChange}
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
