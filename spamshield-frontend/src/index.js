import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your App component
import './index.css'; // Import your global styles

ReactDOM.render(
  <React.StrictMode>
    <Router> {/* Wrap the App component in a Router */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);