import {useState} from "react";

const Considerations = ({selectedOption}) => {
    const [considerations, setConsiderations] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
          setConsiderations((prev) => [...prev, inputValue.trim()]); // Add item to array
          setInputValue(""); // Clear input field
        }
    };

    const removeConsideration = (itemToRemove) => {
        setConsiderations((prev) => prev.filter((item) => item !== itemToRemove)); // Remove item
    };

    const article = selectedOption.toLowerCase() === "anime" ? "an" : "a";
    
    return (
    <>
      <label className="form-label" style = {{paddingTop: "15px"}}> Any similar {selectedOption.toLowerCase()}s you want us to consider? </label>
      <input type="text" className ="form-control" 
          placeholder= {`Enter ${article} ${selectedOption.toLowerCase()} and hit return`} 
          value = {inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
          onKeyDown = {handleKeyPress} 
        />
    
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {considerations.map((item, index) => (
            <div
                key={index}
                style={{
                display: "flex",
                alignItems: "center",
                padding: "5px 10px",
                marginTop: "7px",
                borderRadius: "5px",
                backgroundColor: "#d1d1d1",
                fontSize: "14px",
                }}
                >
                {item}
                <button
                style={{
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
                onClick={() => removeConsideration(item)} // Remove item
                >
                ✕
                </button>
            </div>
            ))}
        </div>
    </>
    );
};

export default Considerations