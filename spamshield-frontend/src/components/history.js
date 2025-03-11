import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:5000/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to fetch history. Please try again.');
      }
    };

    fetchHistory();
  }, []);

  // Prepare data for the chart
  const chartData = history.map((entry) => ({
    message: entry.text.substring(0, 20) + '...', // Shorten message for display
    confidence: entry.confidence,
    label: entry.label,
  }));

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Spam/Ham History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display History in a Table */}
      <table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Message</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Classification</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Confidence</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{entry.text}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{entry.label}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{entry.confidence}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Chart */}
      <h3>Confidence Distribution</h3>
      <BarChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="message" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="confidence" fill="#007bff" />
      </BarChart>
    </div>
  );
}

export default History;