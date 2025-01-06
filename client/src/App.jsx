import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [prompt, setPrompt] = useState('horror');
  const [similar, setSimilar] = useState([]);
  const [titleList, setTitleList] = useState({});

  /*
  THE CODE WORKS, IT'S JUST THAT WHEN YOU TYPE IN A PROMPT, 
  IT HAS TO HIT KEYWORDS FOR ACTUAL MOVIES OR ELSE TMDB WON'T RETURN ANYTHING.
  WILL PROBABLY HAVE TO CALL THE OPENAI API TO GET LISTS OF MOVIES
  */

  useEffect(() => {
    // Make a GET request to the Flask server
    axios.get('/api/recommend_shows', {
      params: {
        prompt: prompt,
        similar_ids: similar
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from server:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recommended Shows</h1>
    </div>
  );
}

export default App;
