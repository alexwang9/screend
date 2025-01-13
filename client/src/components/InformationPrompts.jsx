import "../styles/laptop.css"
import Considerations from "./Considerations"

const InformationPrompts = ({selectedOption}) => {
    const margin = selectedOption.toLowerCase() === "manga" ? "186" : "75";
  
    return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#f8f9fa",
        padding: "42px",
        height: "100%",
        borderRadius: "15px 15px 0 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label className="form-label"> What vibe are you feeling? </label>
      <input type="text" className ="form-control mb-4"
          placeholder="I want something lighter and funny that'll cheer me up!" />

      {selectedOption.toLowerCase() !== "manga" && <Considerations selectedOption = {selectedOption}/>}

      <div class = "button-container" >
        <button className="btn btn-custom" style = {{marginTop: `${margin}px`}} >Give me recommendations!</button>
      </div>
    </div>
    );
};

export default InformationPrompts;