// App.js
import React, { useState } from 'react';
import EmotionalMap from './pages/EmotionalMap';
import Dashboard from './pages/Dashboard';
import TherapyChat from './pages/TherapyChat';
import ComparisonWeb from './pages/ComparisonWeb';
import CompatibilityView from './pages/CompatibilityView';
import GlobalComparison from './pages/GlobalComparison';

const App = () => {
  const [currentPage, setCurrentPage] = useState('emotional-map');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);

  const navigateToPage = (page, data = {}) => {
    setCurrentPage(page);
    if (data.topic) setSelectedTopic(data.topic);
    if (data.friend) setSelectedFriend(data.friend);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'emotional-map':
        return <EmotionalMap onNavigate={navigateToPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateToPage} />;
      case 'therapy-chat':
        return <TherapyChat topic={selectedTopic} onNavigate={navigateToPage} />;
      case 'comparison-web':
        return <ComparisonWeb onNavigate={navigateToPage} />;
      case 'compatibility-view':
        return <CompatibilityView friend={selectedFriend} onNavigate={navigateToPage} />;
      case 'global-comparison':
        return <GlobalComparison onNavigate={navigateToPage} />;
      default:
        return <EmotionalMap onNavigate={navigateToPage} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
};

export default App;