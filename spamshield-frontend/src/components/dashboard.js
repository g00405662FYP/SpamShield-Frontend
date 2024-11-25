import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabase';

function Dashboard() {
  const [user, setUser] = useState(null); // State to store the user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession(); // Retrieve session
      setUser(session?.user || null); // Set the user if available
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching the user
  }

  // Redirect to login if the user is not authenticated
  if (!user) {
    return <Navigate to="/Login" />;
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
