// pages/EmotionalMap.js
import React from 'react';
import ChatInterface from '../components/ChatInterface';

const EmotionalMap = ({ onNavigate }) => {
    const handleResultsClick = () => {
        onNavigate('dashboard');
    };

    return (
        <ChatInterface
            title="Emotional Map"
            showResultsButton={true}
            onResultsClick={handleResultsClick}
            chatType="emotional_map"
        />
    );
};

export default EmotionalMap;