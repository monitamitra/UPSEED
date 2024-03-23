import React, { createContext, useContext, useState, useEffect } from 'react';

const UserAuthContext = createContext();

export const useAuth = () => useContext(UserAuthContext);

export const UserAuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (username, password) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            setCurrentUser(data.user);
            localStorage.setItem('token', data.token);
        } else {
            throw new Error(data.message || 'Unable to login');
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch the current user's profile using the token
            fetch('/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => response.json())
                .then(data => setCurrentUser(data.user))
                .catch(logout); // if token is invalid, logout
        }
    }, []);

    return (
        <UserAuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
};