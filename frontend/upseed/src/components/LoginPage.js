import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username: username, password: password}),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data)); // Store the token
                navigate('/profile'); // Redirect the user to their profile page
            } else {
                throw new Error('Failed to sign up.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='login-container'>
            <h2 class="login-header">Login</h2>

            <input type="text" className='login-input' placeholder="Username" 
            value={username} onChange={(e) => setUsername(e.target.value)} />

            <input type="password" className = 'login-input' placeholder="Password" 
            value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <div className="input-group">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me"> Remember Me </label>
            </div>

            <button type="submit" className='login-button'>Login</button>
            </div>
        </form>
    );
}

export default LoginPage;