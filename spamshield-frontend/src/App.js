import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Detection from './components/detection.js';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <nav>
          <Link to="/signup" style={{ margin: '10px' }}>Signup</Link>
          <Link to="/" style={{ margin: '10px' }}>Home</Link>
          <Link to="/Login" style={{ margin: '10px' }}>Login</Link>
          <Link to="/detection" style={{ margin: '10px' }}>Spam Detection</Link>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detection" element={<Detection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
