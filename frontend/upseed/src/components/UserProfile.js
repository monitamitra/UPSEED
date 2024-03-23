import React from 'react';
import { useAuth } from '../context/UserAuthContext';

function UserProfile() {
    const { currentUser } = useAuth();

    if (!currentUser) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Display Name: {currentUser.displayName}</p>
            <p>Username: {currentUser.username}</p>
            <p>Startup Name: {currentUser.startupName}</p>
            <p>Startup Description: {currentUser.startupDescription}</p>
            {currentUser.profilePic && <img src={currentUser.profilePic} alt="Profile" />}
        </div>
    );
}

export default UserProfile;