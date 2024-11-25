import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      localStorage.setItem('access_token', data.session.access_token);
      setMessage('Login successful!');
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <p>{message}</p>
    </form>
  );
}

export default Login;
