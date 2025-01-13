import Header from "./Header";
import Catalog from "./Catalog";
import InformationPrompts from "./InformationPrompts";
import "../styles/laptop.css";
import {useState} from "react";

const Landing = () => {
    const [selectedOption, setSelectedOption] = useState("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0");
    const [showPrompts, setShowPrompts] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);
    const [recommendations, setRecommendations] = useState([]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowPrompts(true);
        setShowCatalog(false);
    }

    const handleRecommendations = (data) => {
        setRecommendations(data);
        setShowCatalog(true);
    }

    return (
        <div className = "tupperware">
            <Header className = "header" selectedOption = {selectedOption} handleOptionSelect = {handleOptionSelect} />
            {showCatalog ? (<Catalog recommendations = {recommendations} />) : (
            <div className="laptop">
                <div className="screen" > 
                    {showPrompts && <InformationPrompts selectedOption = {selectedOption} setRecommendations={handleRecommendations}/>}
                </div>
                <div className="base"></div>
                <div className="stand"></div>
            </div>
            )}
        </div>
    );
};

export default Landing;



