import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './styles.css';
import { MdWarning, MdCheckCircle, MdThumbUp, MdThumbDown } from 'react-icons/md';


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
      const raw = reader.result;

      // Try to extract plain text content
      const match = raw.match(/Content-Type: text\/plain[^]*?charset="UTF-8"[^]*?\r?\n\r?\n([^]*?)--/);
      const messageOnly = match ? match[1].trim() : raw;

      setMessage(messageOnly);
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
        `${process.env.REACT_APP_BACKEND_URL}/classify`,
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
      <h2>Check Your Message for Spam</h2>

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

      {result && (
        <div
          className={`alert ${result.label === 'Spam' ? 'alert-danger' : 'alert-success'}`}
          role="alert"
          style={{ fontSize: '1.1rem', marginTop: '20px', borderRadius: '8px' }}
        >
          <h4 className="alert-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {result.label === 'Spam' ? (
              <>
                <MdWarning style={{ color: '#842029', fontSize: '1.5em' }} />
                Spam Detected
              </>
            ) : (
              <>
                <MdCheckCircle style={{ color: '#0f5132', fontSize: '1.5em' }} />
                Safe Message
              </>
            )}
          </h4>

          <p><strong>Message:</strong> {result.text}</p>
          <hr />
          <p><strong>Confidence Score:</strong> {(result.confidence * 100).toFixed(2)}%</p>

          {result.label === 'Spam' && (
            <div style={{ marginTop: '10px', color: '#842029', fontWeight: 'bold' }}>
              ⚠️ This message appears to be spam. Do not click on any links or respond.
            </div>
          )}

          {/* Feedback buttons */}
          <div style={{ marginTop: '20px' }}>
            <p>Was this classification correct?</p>

            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem('access_token'); // you already get this for classify
                  await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/feedback`,
                    {
                      id: result.id,                          // Pass the ID of the classified message
                      is_classification_correct: true         // User says it was correct
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,     // Send JWT so Flask knows you're authenticated
                      }
                    }
                  );
                  alert('Thanks for your feedback!');
                } catch (err) {
                  console.error('Feedback error:', err);
                  alert('Error submitting feedback.');
                }
              }}
              style={{
                marginRight: '10px',
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <MdThumbUp />
              Yes
            </button>

            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem('access_token');
                  await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/feedback`,
                    {
                      id: result.id,
                      is_classification_correct: false
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      }
                    }
                  );
                  alert('Thanks for your feedback!');
                } catch (err) {
                  console.error('Feedback error:', err);
                  alert('Error submitting feedback.');
                }
              }}
              style={{
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <MdThumbDown />
              No
            </button>
          </div>
        </div>
      )}



      {/* Display Error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Detection;