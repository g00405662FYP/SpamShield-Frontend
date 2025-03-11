import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'spam', 'ham'

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:5000/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setHistory(response.data);
        } else {
          setError('Invalid history data format.');
        }
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to fetch history. Please try again.');
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = filter === 'all' ? history : history.filter(entry => entry.label === filter);

  const chartData = filteredHistory.map((entry) => ({
    message: entry.message ? entry.message.substring(0, 20) + '...' : 'No message',
    confidence: entry.confidence || 0,
    label: entry.label || 'Unknown',
  }));

  const summary = {
    total: history.length,
    spam: history.filter(entry => entry.label === 'Spam').length,
    ham: history.filter(entry => entry.label === 'Ham').length,
    averageConfidence: (history.reduce((sum, entry) => sum + (entry.confidence || 0), 0) / history.length).toFixed(2),
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h2>Spam/Ham History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Summary Statistics */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div className="summary-card">
          <h3>Total Messages</h3>
          <p>{summary.total}</p>
        </div>
        <div className="summary-card">
          <h3>Spam</h3>
          <p>{summary.spam}</p>
        </div>
        <div className="summary-card">
          <h3>Ham</h3>
          <p>{summary.ham}</p>
        </div>
        <div className="summary-card">
          <h3>Avg Confidence</h3>
          <p>{summary.averageConfidence}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('Spam')} className={filter === 'Spam' ? 'active' : ''}>Spam</button>
        <button onClick={() => setFilter('Ham')} className={filter === 'Ham' ? 'active' : ''}>Ham</button>
      </div>

      {/* Table */}
      <table className="history-table">
        <thead>
          <tr>
            <th>Message</th>
            <th>Classification</th>
            <th>Confidence</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((entry, index) => (
            <tr key={index}>
              <td>{entry.message || 'No message'}</td>
              <td>{entry.label || 'Unknown'}</td>
              <td>{entry.confidence || 0}</td>
              <td>{entry.created_at ? new Date(entry.created_at).toLocaleString() : 'No timestamp'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart */}
      <h3>Confidence Distribution</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="message" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="confidence" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default History;