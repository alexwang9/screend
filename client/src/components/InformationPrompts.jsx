import "../styles/laptop.css";
import Considerations from "./Considerations";
import {useState} from 'react';

const InformationPrompts = ({selectedOption, setRecommendations}) => {
    const margin = selectedOption.toLowerCase() === "manga" ? "186" : "75";
    const [prompt, setPrompt] = useState("");
    const [considerations, setConsiderations] = useState([]);


    const fetchRecommendations = async () => {
      try {
          const params = new URLSearchParams({
              prompt,
              media_type: selectedOption.toLowerCase(),
          });
          considerations.forEach((item, index) =>
              params.append(`similar_ids[${index}]`, item)
          );

          const response = await fetch(`/recommend?${params.toString()}`);
          const data = await response.json();
          setRecommendations(data); // Update recommendations in Landing.jsx
      } catch (error) {
          console.error("Error fetching recommendations: ", error);
      }
    };


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
      <input type="text" 
            className ="form-control mb-4"
            placeholder="I want something lighter and funny that'll cheer me up!"
            value = {prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

      {selectedOption.toLowerCase() !== "manga" && 
            <Considerations selectedOption = {selectedOption} setConsiderations = {setConsiderations}/>}

      <div class = "button-container" >
        <button className="btn btn-custom" style = {{marginTop: `${margin}px`}} onClick = {fetchRecommendations}>Give me recommendations!</button>
      </div>
    </div>
    );
};

export default InformationPrompts;