import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import HistoryList from './HistoryList';
import './UserMenu.css';

const UserMenu = () => {
    const { currentUser, signInWithGoogle, logout } = useAuth();
    const [showHistory, setShowHistory] = useState(false);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Failed to log in", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setShowHistory(false);
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className="user-menu">
            {currentUser ? (
                <div className="user-profile">
                    <button
                        className={`history-btn ${showHistory ? 'active' : ''}`}
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        History
                    </button>
                    <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName}
                        className="user-avatar"
                    />
                    <div className="user-info">
                        <span className="user-name">{currentUser.displayName}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Sign Out
                        </button>
                    </div>
                    {showHistory && <HistoryList onClose={() => setShowHistory(false)} />}
                </div>
            ) : (
                <button onClick={handleLogin} className="login-btn">
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default UserMenu;
