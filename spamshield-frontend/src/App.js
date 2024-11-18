import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState(''); // State to hold the message from Flask

  // Fetch the message from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/hello') // Flask backend URL
      .then((response) => {
        setMessage(response.data.message); // Update state with the backend message
      })
      .catch((error) => {
        console.error('Error fetching the message:', error);
        setMessage('Error fetching the message.');
      });
  }, []);

  return (
    <div>
      <h1>Welcome to SpamShield Frontend</h1>
      <p>{message ? message : 'Loading...'}</p> {/* Display the message or a loading indicator */}
    </div>
  );
}

export default App;
