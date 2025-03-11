import React, { useState } from 'react';
import axios from 'axios';

function Detection() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClassify = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:5000/classify',
        { text: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(response.data);
      setError(null);
    } catch (err) {
      console.error('Error classifying message:', err);
      setError('Failed to classify the message. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Test Spam/Ham</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter a message to test..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <br />
      <button onClick={handleClassify} style={{ padding: '10px 20px' }}>
        Classify
      </button>
      {result && (
  <div style={{ marginTop: '20px' }}>
    <h3>Result</h3>
    <p><strong>Message:</strong> {result.text}</p>
    <p><strong>Classification:</strong> {result.label}</p>
    <p><strong>Confidence Score:</strong> {result.confidence}</p>
  </div>
)}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Detection;
