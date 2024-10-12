// src/components/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; 
//const apiUrl = "https://obscure-badlands-67498-8ccc889a168e.herokuapp.com/api/";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://127.0.0.1:8000/api/login/', { email, password })
            .then(response => {
                if (response.data.success) {
                    navigate('/tree'); 
                } else {
                    setError(response.data.message); 
                }
            })
            .catch(error => {
                console.error("Error logging in:", error);
                setError("Error logging in. Please try again.");
            });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>Log In</button>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
