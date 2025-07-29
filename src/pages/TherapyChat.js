// pages/TherapyChat.js
import React from 'react';
import ChatInterface from '../components/ChatInterface';

const TherapyChat = ({ topic, onNavigate }) => {
    // customize initial messages based on the therapy chat topic
    const getInitialMessages = (topic) => {
        const messageMap = {
            'Life': [
                { type: 'question', text: 'This space is for exploring everyday life—habits, energy, purpose. To start, tell me one part of your daily routine that feels either great or draining.' }
            ],
            'Relationships': [
                { type: 'question', text: 'Here we focus on your relationships and connection style. Begin by sharing a snapshot of your closest relationship—just a sentence or two is perfect.' }
            ],
            'Work': [
                { type: 'question', text: 'Use this chat to look at work or study challenges, motivation, and growth. Kick things off by mentioning what\'s most on your mind about your job or classes today.' }
            ],
            'Patterns': [
                { type: 'question', text: 'This conversation digs into recurring patterns and early influences. Start by naming a childhood rule or role you think still affects you now.' }
            ],
            'General': [
                { type: 'question', text: 'A flexible chat for anything that doesn\'t fit the other topics. Simply describe what you\'d like to talk about, and we\'ll take it from there.' }
            ]
        };

        return messageMap[topic] || [
            { type: 'question', text: 'How can I support you today?' }
        ];
    };
    const handleResultsClick = () => {
        onNavigate('dashboard');
    };

    return (
        <>
            <ChatInterface
                title={`Therapy Chat: ${topic}`}
                initialMessages={getInitialMessages(topic)}
                showResultsButton={true}
                onResultsClick={() => onNavigate('dashboard')}
                resultsButtonText="Back to Dashboard"
                chatType={`therapy_${topic.toLowerCase()}`}
            />

        </>

    );
};

export default TherapyChat;