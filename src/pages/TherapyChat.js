// pages/TherapyChat.js
import React from 'react';
import ChatInterface from '../components/ChatInterface';

const TherapyChat = ({ topic, onNavigate }) => {
    // You can customize initial messages based on the topic
    const getInitialMessages = (topic) => {
        const messageMap = {
            'Life': [
                { type: 'question', text: 'Let\'s explore your life journey. What aspect of your daily life brings you the most joy?' }
            ],
            'Relationships': [
                { type: 'question', text: 'Relationships are at the heart of our well-being. What does meaningful connection mean to you?' }
            ],
            'Work': [
                { type: 'question', text: 'Your work life shapes much of your identity. What motivates you most in your professional pursuits?' }
            ],
            'Patterns': [
                { type: 'question', text: 'Understanding our patterns helps us grow. What recurring theme do you notice in your life?' }
            ],
            'Question': [
                { type: 'question', text: 'I\'m here to help with whatever is on your mind. What would you like to explore today?' }
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