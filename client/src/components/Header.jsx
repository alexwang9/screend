
const Header = ({selectedOption, handleOptionSelect}) => {

  const optionColor = {
    Show: "#5DA58B",
    Movie: "#5D73A5",
    Manga: "#E5A5C2",
    Anime: "#A58B5D",
  };
    
  return (
    <header className="text-center py-4" style = {{backgroundColor: "#f3f3f3"}}>
      <h1 className="fw-bold" style={{ color: "#735DA5" }}>
        Screen’d
      </h1>
      <p className="fw-bold mb-4" style = {{color: "#D3C5E5"}}> Discover your next</p>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button"  id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"
          style={{
            backgroundColor: "#f4f4f4",
            color: optionColor[selectedOption] || "#000000",
            border: "1px solid ${optionColor[selectedOption]}",
          }}> {selectedOption}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li> 
              <button className="dropdown-item" href="#" style={{color: "#5DA58B",}}
              onClick = {() => handleOptionSelect("Show")}> 
                Show 
              </button> 
          </li>
          <li> 
              <button className="dropdown-item" href="#" style={{color: "#5D73A5",}}
              onClick = {() => handleOptionSelect("Movie")}> 
                Movie 
              </button> 
          </li>
          <li> 
              <button className="dropdown-item" href="#" style={{color: "#E5A5C2",}}
              onClick = {() => handleOptionSelect("Manga")}> 
                Manga 
              </button> 
          </li>
          <li> 
              <button className="dropdown-item" href="#" style={{color: "#A58B5D",}}
              onClick = {() => handleOptionSelect("Anime")}> 
                Anime 
              </button> 
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
