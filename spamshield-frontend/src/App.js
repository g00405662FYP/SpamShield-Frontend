import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHome, FaUserPlus, FaSignInAlt, FaShieldAlt, FaHistory, FaSignOutAlt, FaUser } from 'react-icons/fa';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Detection from './components/detection';
import History from './components/history';
import './components/styles.css';

// Page Transition Animation
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const pageTransition = {
  type: 'tween',
  duration: 0.5,
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Signup />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Dashboard />
            </motion.div>
          }
        />
        <Route
          path="/detection"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Detection />
            </motion.div>
          }
        />
        <Route
          path="/history"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <History />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const isLoggedIn = localStorage.getItem('access_token'); // Check if the user is logged in
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-link"><FaHome style={{ marginRight: '10px' }} />Home</Link>
          {!isLoggedIn && (
            <>
              <Link to="/signup" className="nav-link"><FaUserPlus style={{ marginRight: '8px' }} />Signup</Link>
              <Link to="/login" className="nav-link"><FaSignInAlt style={{ marginRight: '8px' }} />Login</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/detection" className="nav-link"><FaShieldAlt style={{ marginRight: '8px' }} />Spam Detection</Link>
              <Link to="/history" className="nav-link"><FaHistory style={{ marginRight: '8px' }} />History</Link>
              <button onClick={handleLogout} className="nav-link logout-button">
                <FaSignOutAlt style={{ marginRight: '8px' }} />Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Page Routes with Transitions */}
      <div className="main-container">
        <AnimatedRoutes />
      </div>
    </div>
  );
}

export default App;