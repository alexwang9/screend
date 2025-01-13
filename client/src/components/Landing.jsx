import Header from "./Header";
import "../styles/laptop.css";
import {useState} from "react";
import InformationPrompts from "./InformationPrompts";

const Landing = () => {
    const [selectedOption, setSelectedOption] = useState("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0");
    const [showPrompts, setShowPrompts] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowPrompts(true);
    }

    return (
        <div className = "tupperware">
            <Header className = "header" selectedOption = {selectedOption} handleOptionSelect = {handleOptionSelect} />
            <div className="laptop">
                <div className="screen"> 
                    {showPrompts && <InformationPrompts selectedOption = {selectedOption} />}
                </div>
                <div className="base"></div>
                <div className="stand"></div>
            </div>
        </div>
    );
};

export default Landing;



