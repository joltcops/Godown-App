// src/components/SignUpPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; 
//const apiUrl = "https://obscure-badlands-67498-8ccc889a168e.herokuapp.com/api/";


const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        axios.post('http://127.0.0.1:8000/api/signup/', { email, password })
            .then(response => {
                if (response.data.success) {
                    setSuccessMessage('Successfully registered! Redirecting to login...');
                    setTimeout(() => {
                        navigate('/login'); 
                    }, 2000);
                } else {
                    setError(response.data.message);
                }
            })
            .catch(error => {
                console.error("Error signing up:", error);
                setError("Error signing up. Please try again.");
            });
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <p>
                Already have an account? <a href="/login">Log In</a>
            </p>
        </div>
    );
};

export default SignUpPage;
