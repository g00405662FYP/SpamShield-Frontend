import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Make sure this path is correct

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error.message);
        } else {
          setUser(session?.user || null); // Set the user from the session
        }
      } catch (err) {
        console.error('Error fetching user:', err.message);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Your Dashboard</h1>
      <p>Hello, {user.email}!</p>
      <p>This is your personalized space where you can manage your data and view insights.</p>
    </div>
  );
}

export default Dashboard;
