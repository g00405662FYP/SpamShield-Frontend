import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <nav>
          <Link to="/" style={{ margin: '10px' }}>Home</Link>
          <Link to="/login" style={{ margin: '10px' }}>Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
