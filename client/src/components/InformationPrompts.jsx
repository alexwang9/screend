import "../styles/laptop.css"

const InformationPrompts = ({selectedOption}) => {
    return (<div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "45px",
        height: "100%",
        borderRadius: "10px",
        marginBottom: "3px",
      }}
    >
      <label className="form-label"> What vibe are you feeling? </label>
      <input type="text" className ="form-control mb-3"
          placeholder="I want something lighter and funny that'll cheer me up!" />

      {selectedOption.toLowerCase() !== "manga" && (
      <>
      <label className="form-label" style = {{paddingTop: "15px"}}> Any similar {selectedOption.toLowerCase()}s you want us to consider? </label>
      <input type="text" className ="form-control mb-3" 
          placeholder= {`Enter a ${selectedOption.toLowerCase()} and hit return`} />
      </>)}
      <div class = "button-container" >
        <button className="btn btn-custom" style = {{marginTop: "25px"}} >Give me recommendations!</button>
      </div>
    </div>
    );
};

export default InformationPrompts;