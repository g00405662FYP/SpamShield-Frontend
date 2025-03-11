import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './styles.css'; // Ensure you have styles for the dropzone

function Detection() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/plain': ['.txt', '.eml'], // Accept .txt and .eml files
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      readFileContent(file);
    },
  });

  const readFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setMessage(reader.result); // Set the file content as the message
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
    };
    reader.readAsText(file);
  };

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

      {/* Drag-and-Drop Area */}
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an email file here (.eml or .txt), or click to select a file</p>
        {file && <p>File: {file.name}</p>}
      </div>

      {/* Textarea for Manual Input */}
      <textarea
        rows="4"
        cols="50"
        placeholder="Or enter a message to test..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: '10px', padding: '10px' }}
      />
      <br />

      {/* Classify Button */}
      <button onClick={handleClassify} style={{ padding: '10px 20px' }}>
        Classify
      </button>

      {/* Display Result */}
      {result && (
        <div className="result-container">
          <h3>Result</h3>
          <p><strong>Message:</strong> {result.text}</p>
          <p><strong>Classification:</strong> {result.label}</p>
          <p><strong>Confidence Score:</strong> {result.confidence}</p>
        </div>
      )}

      {/* Display Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Detection;