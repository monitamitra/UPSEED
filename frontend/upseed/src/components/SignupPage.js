// src/components/SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [formData, setFormData] = useState({
        displayName: '',
        username: '',
        password: '',
        startupName: '',
        startupDescription: '',
        profilePic: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data)); 
                navigate('/profile'); 
            } else {
                throw new Error('Failed to sign up.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="displayName"
                    placeholder="Display Name"
                    value={formData.displayName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="startupName"
                    placeholder="Startup Name"
                    value={formData.startupName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="startupDescription"
                    placeholder="Startup Description"
                    value={formData.startupDescription}
                    onChange={handleChange}
                    required
                />
                {/* Optionally include a file input for profilePic */}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;
