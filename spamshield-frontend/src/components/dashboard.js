import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabase';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error.message);
            } else {
                setUser(session?.user || null);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('access_token'); // Remove token (if stored)
        window.location.href = '/login'; // Redirect to the login page
    };

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
            <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>
                Log Out
            </button>
        </div>
    );
}

export default Dashboard;
