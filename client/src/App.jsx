import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make a GET request to the Flask server
    axios.get('/api/shows')
      .then((response) => {
        setMessage(response.data.shows);
      })
      .catch((error) => {
        console.error('Error fetching data from server:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>React + Flask Example</h1>
      <p>Message from Flask: {message}</p>
    </div>
  );
}

export default App;
