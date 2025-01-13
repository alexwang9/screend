
const Catalog = ({ recommendations }) => {
    return (
        <div style = {{display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {recommendations.map((item) => (
                <div key = {item.id} style = {{width: "150px"}}>
                    <img
                        src={item.poster_path || item.coverImage}
                        alt={item.title || item.name}
                        style={{ width: "100%", borderRadius: "5px" }}
                    />
                    <p style={{ textAlign: "center" }}> {item.title || item.name} </p>
                </div>
            ))}
        </div>
    )
}

export default Catalog;