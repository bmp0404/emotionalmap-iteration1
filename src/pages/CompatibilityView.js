// pages/CompatibilityView.js
import React from 'react';
import { Heart } from 'lucide-react';
import Layout from '../components/Layout';

const CompatibilityView = ({ friend, onNavigate }) => {
    const getCompatibilityLevel = (score) => {
        if (score >= 80) return 'High Compatibility';
        if (score >= 60) return 'Good Compatibility';
        if (score >= 40) return 'Moderate Compatibility';
        return 'Low Compatibility';
    };

    const getCompatibilityColor = (score) => {
        if (score >= 80) return 'from-green-400 to-blue-400';
        if (score >= 60) return 'from-blue-400 to-purple-400';
        if (score >= 40) return 'from-yellow-400 to-orange-400';
        return 'from-red-400 to-pink-400';
    };

    return (
        <Layout
            title="Compatibility"
            showBackButton={true}
            onBackClick={() => onNavigate('comparison-web')}
            backgroundGradient="from-pink-50 via-white to-purple-50"
        >
            <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-8 mb-6">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg mb-2">
                            You
                        </div>
                        <p className="text-gray-600 text-sm">Shy Cat</p>
                    </div>
                    <div className="flex items-center">
                        <Heart className="text-red-400" size={24} />
                    </div>
                    <div className="text-center">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg mb-2">
                            {friend?.name || 'Friend'}
                        </div>
                        <p className="text-gray-600 text-sm">{friend?.archetype || 'Friend Type'}</p>
                    </div>
                </div>

                <div className={`bg-gradient-to-r ${getCompatibilityColor(friend?.compatibility || 85)} text-white px-6 py-3 rounded-full inline-block mb-6 shadow-lg`}>
                    {friend?.compatibility || 85}% Compatibility - {getCompatibilityLevel(friend?.compatibility || 85)}
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 max-w-lg mx-auto">
                    You both share a deep appreciation for meaningful conversations and authentic connections.
                    Your complementary approaches to life create a balanced and supportive dynamic that brings out the best in each other.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium text-gray-700">
                    Shared Strengths
                </button>
                <button className="py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium text-gray-700">
                    Growth Areas
                </button>
            </div>

            <button
                onClick={() => onNavigate('global-comparison')}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-medium"
            >
                See who you may vibe with on your campus
            </button>
        </Layout>
    );
};

export default CompatibilityView;