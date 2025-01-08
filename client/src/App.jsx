import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [prompt, setPrompt] = useState('im feeling something scary or like kind of funny scary vibes');
  const [similar, setSimilar] = useState([2,3]);
  const [mediaType, setMediaType] = useState('tv')
  const [titleList, setTitleList] = useState({});

  useEffect(() => {
    // Make a GET request to the Flask server
    axios.get('/api/recommend', {
      params: {
        prompt: prompt,
        similar_id: similar,
        media_type: mediaType
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
