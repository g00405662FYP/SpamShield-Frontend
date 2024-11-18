import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem('access_token', token); // Save token for later use
      setMessage('Login successful!');
    } catch (err) {
      setMessage('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: '10px', padding: '10px' }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '10px', padding: '10px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px' }}>Log In</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
