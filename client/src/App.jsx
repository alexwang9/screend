import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [prompt, setPrompt] = useState('something similar to sousou no frieren');
  const [similar, setSimilar] = useState([]);
  const [mediaType, setMediaType] = useState('manga')
  const [titleList, setTitleList] = useState([]);

  useEffect(() => {
    // Make a GET request to the Flask server
    axios.get('/api/recommend', {
      params: {
        prompt: prompt,
        similar_ids: similar,
        media_type: mediaType
      }
    })
      .then((response) => {
        setTitleList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from server:', error);
      });
  }, []);

  // titleList.forEach((manga, index) => {
  //   console.log(manga.title);
  // });

  return (
    <div style={{ padding: '20px' }}>
      {/* <h1>Recommended Shows</h1>
      {titleList.length > 0 ? (
        <ul>
          {titleList.map((show, index) => (
            <li key={show.id}>
              <strong>{show.title}</strong>
              {show.vote_average && ` - Rating: ${show.vote_average}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading recommendations...</p>
      )} */}
      <h1>Recommended Manga</h1>
      {titleList.length > 0 ? (
        <ul>
          {titleList.map((manga, index) => (
            <li key={manga.id}>
              <strong>{manga.title}</strong>
              {manga.averageScore && ` - Rating: ${manga.averageScore}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading recommendations...</p>
      )}
    </div>
  );
}

export default App;
