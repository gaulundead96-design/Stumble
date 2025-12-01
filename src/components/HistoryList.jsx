import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { subscribeToHistory } from '../services/historyService';
import './HistoryList.css';

const HistoryList = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = subscribeToHistory(currentUser.uid, (data) => {
                setHistory(data);
                setLoading(false);
            });
            return unsubscribe;
        }
    }, [currentUser]);

    return (
        <div className="history-popup">
            <div className="history-header">
                <h3>Recent Stumbles</h3>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
            <div className="history-content">
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : history.length === 0 ? (
                    <p className="empty">No history yet. Start stumbling!</p>
                ) : (
                    <ul className="history-items">
                        {history.map((item) => (
                            <li key={item.id} className="history-item">
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <span className="history-url">{new URL(item.url).hostname}</span>
                                    <span className="history-topic">#{item.topic}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HistoryList;
