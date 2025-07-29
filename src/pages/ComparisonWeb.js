// pages/ComparisonWeb.js
import React from 'react';
import Layout from '../components/Layout';

const ComparisonWeb = ({ onNavigate }) => {
    // mock data 
    const friendsData = [
        { id: 1, name: 'Alex', archetype: 'Gentle Explorer', x: 150, y: 100, compatibility: 85 },
        { id: 2, name: 'Sam', archetype: 'Creative Dreamer', x: 300, y: 150, compatibility: 72 },
        { id: 3, name: 'Jordan', archetype: 'Wise Listener', x: 200, y: 250, compatibility: 91 },
        { id: 4, name: 'Casey', archetype: 'Brave Heart', x: 350, y: 200, compatibility: 68 }
    ];

    const handleFriendClick = (friend) => {
        onNavigate('compatibility-view', { friend });
    };

    return (
        <Layout
            title="Friend Connections"
            showBackButton={true}
            onBackClick={() => onNavigate('dashboard')}
            backgroundGradient="from-teal-50 via-white to-blue-50"
            maxWidth="max-w-4xl"
        >
            <div className="bg-white rounded-3xl shadow-lg p-8 relative" style={{ height: '400px' }}>
                <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Center node (user) */}
                    <circle cx="200" cy="200" r="30" fill="#3B82F6" className="drop-shadow-lg" />
                    <text x="200" y="206" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">You</text>

                    {/* friend nodes and connections */}
                    {friendsData.map((friend) => (
                        <g key={friend.id}>
                            <line
                                x1="200" y1="200"
                                x2={friend.x} y2={friend.y}
                                stroke="#E5E7EB"
                                strokeWidth="2"
                                className="hover:stroke-blue-300 transition-all duration-300"
                            />
                            <circle
                                cx={friend.x}
                                cy={friend.y}
                                r="25"
                                fill="#10B981"
                                className="cursor-pointer hover:fill-green-600 transition-all duration-300 drop-shadow-lg"
                                onClick={() => handleFriendClick(friend)}
                            />
                            <text
                                x={friend.x}
                                y={friend.y + 5}
                                textAnchor="middle"
                                fill="white"
                                fontSize="10"
                                fontWeight="bold"
                                className="cursor-pointer"
                                onClick={() => handleFriendClick(friend)}
                            >
                                {friend.name}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>

            <div className="mt-6 text-center">
                <p className="text-gray-600">Click on any friend to see your compatibility details</p>
            </div>
        </Layout>
    );
};

export default ComparisonWeb;