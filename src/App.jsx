import React, { useState } from 'react';
import StumbleInput from './components/StumbleInput';
import UserMenu from './components/UserMenu';
import { sites } from './data/sites';
import { AuthProvider, useAuth } from './context/AuthContext';
import { saveVisit } from './services/historyService';
import './App.css';

function AppContent() {
  const [lastSite, setLastSite] = useState(null);
  const [message, setMessage] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const { currentUser } = useAuth();

  const handleStumble = (topic) => {
    let category = 'random';
    let searchTopic = topic.toLowerCase().trim();

    if (searchTopic && sites[searchTopic]) {
      category = searchTopic;
    } else if (searchTopic) {
      // Try to find partial match
      const foundKey = Object.keys(sites).find(key => key.includes(searchTopic) || searchTopic.includes(key));
      if (foundKey) {
        category = foundKey;
      } else {
        setMessage(`We don't have a curated list for "${topic}" yet, but here's something random!`);
        setTimeout(() => setMessage(''), 3000);
      }
    }

    const list = sites[category];
    const randomSite = list[Math.floor(Math.random() * list.length)];

    setLastSite(randomSite);
    window.open(randomSite, '_blank');

    if (currentUser) {
      saveVisit(currentUser.uid, randomSite, category);
    }
  };

  const handleTagClick = (tag) => {
    setCurrentTopic(tag);
  };

  return (
    <div className="app-container">
      <UserMenu />
      <div className="content">
        <h1 className="title">Stumble<span className="highlight">Upon</span> 2.0</h1>
        <p className="subtitle">Discover the weird, wonderful, and small web.</p>

        <div className="input-container">
          <StumbleInput
            onStumble={handleStumble}
            topic={currentTopic}
            setTopic={setCurrentTopic}
          />
        </div>

        {message && <div className="message">{message}</div>}

        <div className="tags">
          <p>Popular topics:</p>
          <div className="tag-list">
            {Object.keys(sites).filter(k => k !== 'random').map(tag => (
              <span
                key={tag}
                className={`tag ${currentTopic === tag ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="background-orb orb-1"></div>
      <div className="background-orb orb-2"></div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
