// components/ChatInterface.js
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = ({
    title,
    placeholder = "Put the input in here",
    showResultsButton = false,
    onResultsClick,
    initialMessages = [],
    resultsButtonText = "See your results",
    chatType = "emotional_map",
}) => {
    const [messages, setMessages] = useState(initialMessages.length > 0 ? initialMessages : [
        { type: 'question', text: 'Welcome to the Emotional Map assessment! We’ll walk through 36 quick questions (rated 1‑5) to discover your core emotional archetype. Type “Ready” when you’d like to begin.' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [archetypeSaved, setArchetypeSaved] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // change this to make archetype status check more generic ( || chatType.startsWith('therapy_'))
    useEffect(() => {
        if (chatType === "emotional_map") {
            const checkArchetypeSaved = async () => {
                try {
                    const response = await fetch('https://9v6m81rv9e.execute-api.us-east-2.amazonaws.com/prod/api/archetype/saved');
                    if (response.ok) {
                        const data = await response.json();
                        setArchetypeSaved(data.archetype_saved);
                    }
                } catch (error) {
                    console.error('Error checking archetype status:', error);
                }
            };
            checkArchetypeSaved();
        }
    }, [chatType]);

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            const userMessage = { type: 'answer', text: inputValue };
            setMessages(prev => [...prev, userMessage]);
            setInputValue('');

            try {
                const conversationHistory = messages.map(msg => ({
                    role: msg.type === 'answer' ? 'user' : 'assistant',
                    content: msg.text
                }));

                // Load archetype if therapy chat
                let emotional_archetype = null;
                if (chatType.startsWith('therapy_')) {
                    const archetypeResponse = await fetch('https://9v6m81rv9e.execute-api.us-east-2.amazonaws.com/prod/api/archetype');
                    if (archetypeResponse.ok) {
                        const archetypeData = await archetypeResponse.json();
                        emotional_archetype = archetypeData.emotional_archetype;
                    }
                }

                const response = await fetch('https://9v6m81rv9e.execute-api.us-east-2.amazonaws.com/prod/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: inputValue,
                        conversation_history: conversationHistory,
                        chat_type: chatType,
                        emotional_archetype: emotional_archetype
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages(prev => [...prev, { type: 'question', text: data.response }]);

                    // Check if archetype was saved after receiving response
                    if (chatType === "emotional_map" && data.response.toLowerCase().includes("archetype_code")) {
                        setArchetypeSaved(true);
                    }
                } else {
                    const errorData = await response.json();
                    setMessages(prev => [...prev, { type: 'question', text: `Error: ${errorData.error || 'Something went wrong'}` }]);
                }
            } catch (error) {
                console.error('Error calling backend:', error);
                setMessages(prev => [...prev, { type: 'question', text: 'Error: Unable to connect to the server' }]);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('https://9v6m81rv9e.execute-api.us-east-2.amazonaws.com/prod/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = response.json();
            if (response.ok) {
                setArchetypeSaved(false);
                setMessages([]);
                setInputValue('');
                console.log('User data deleted successfully');
            } else {
                alert(json.error || 'Delete failed');
            }
        } catch (error) {
            console.error('Error deleting user data', error);
            alert('Error deleting user data');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-light text-gray-800 text-center mb-8">{title}</h1>

                <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 h-144 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.type === 'answer' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 whitespace-pre-wrap ${message.type === 'answer'
                                    ? 'bg-blue-500 text-white rounded-br-md'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                    }`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div ref={chatEndRef} />
                </div>

                <div className="space-y-4">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={placeholder}
                            className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-6 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                        >
                            <Send size={20} />
                        </button>
                    </div>

                    {((showResultsButton && archetypeSaved) || chatType.startsWith('therapy_')) && (
                        <div className="flex gap-3">
                            <button
                                onClick={onResultsClick}
                                className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-medium"
                            >
                                {resultsButtonText}
                            </button>
                            {chatType === "emotional_map" && (
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 py-4 !bg-red-500 text-white rounded-full hover:bg-red-800 transition-all duration-300 transform hover:scale-105 font-medium"
                                >
                                    Delete My Data
                                </button>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ChatInterface;