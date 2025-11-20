import React, { useState } from 'react';
import './StumbleInput.css';

const StumbleInput = ({ onStumble }) => {
    const [topic, setTopic] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onStumble(topic);
    };

    return (
        <form className="stumble-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="stumble-input"
                placeholder="Enter a topic (e.g., tech, art, weird)..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <button type="submit" className="stumble-button">
                Stumble!
            </button>
        </form>
    );
};

export default StumbleInput;
