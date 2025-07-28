// pages/Dashboard.js
import React from 'react';
import { Home, Heart, Briefcase, Target, HelpCircle, Users } from 'lucide-react';
import Layout from '../components/Layout';

const Dashboard = ({ onNavigate }) => {
    const navigateToTherapyChat = (topic) => {
        onNavigate('therapy-chat', { topic });
    };

    const topicButtons = [
        { label: 'In Life', icon: Home, color: 'text-blue-500', topic: 'Life' },
        { label: 'In Relationships', icon: Heart, color: 'text-red-500', topic: 'Relationships' },
        { label: 'In Work', icon: Briefcase, color: 'text-green-500', topic: 'Work' },
        { label: 'Your Patterns', icon: Target, color: 'text-purple-500', topic: 'Patterns' }
    ];

    return (
        <Layout backgroundGradient="from-purple-50 via-white to-blue-50">
            <div className="text-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-lg font-medium shadow-lg">
                    picture
                </div>
                <h1 className="text-3xl font-light text-gray-800 mb-4">You are the Shy Cat</h1>
                <p className="text-gray-600 leading-relaxed max-w-lg mx-auto">
                    You're naturally introspective and observant, preferring meaningful connections over surface-level interactions.
                    Your gentle nature and thoughtful approach to life makes you a trusted confidant to those lucky enough to know you well.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {topicButtons.map((button, index) => {
                    const IconComponent = button.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => navigateToTherapyChat(button.topic)}
                            className="flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <IconComponent size={20} className={button.color} />
                            <span className="font-medium text-gray-700">{button.label}</span>
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => navigateToTherapyChat('Question')}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-2xl hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 font-medium mb-4 flex items-center justify-center gap-2"
            >
                <HelpCircle size={20} />
                Ask a Question
            </button>

            <button
                onClick={() => onNavigate('comparison-web')}
                className="w-full py-3 text-blue-600 hover:text-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
                <Users size={18} />
                Compare with Friends
            </button>
        </Layout>
    );
};

export default Dashboard;