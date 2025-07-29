// pages/GlobalComparison.js
import React from 'react';
import Layout from '../components/Layout';

const GlobalComparison = ({ onNavigate }) => {
    // mock data 
    const archetypeStats = [
        { name: 'Shy Cat', percentage: 15, color: 'bg-purple-400' },
        { name: 'Gentle Explorer', percentage: 22, color: 'bg-blue-400' },
        { name: 'Creative Dreamer', percentage: 18, color: 'bg-green-400' },
        { name: 'Wise Listener', percentage: 20, color: 'bg-yellow-400' },
        { name: 'Brave Heart', percentage: 25, color: 'bg-red-400' }
    ];

    const PieChart = ({ data }) => (
        <div className="relative w-64 h-64">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                {data.map((archetype, index) => {
                    const total = data.reduce((sum, a) => sum + a.percentage, 0);
                    const angle = (archetype.percentage / total) * 360;
                    const startAngle = data.slice(0, index).reduce((sum, a) => sum + (a.percentage / total) * 360, 0);

                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);

                    const largeArcFlag = angle > 180 ? 1 : 0;

                    return (
                        <path
                            key={index}
                            d={`M 50,50 L ${x1},${y1} A 40,40 0 ${largeArcFlag},1 ${x2},${y2} z`}
                            className={`${archetype.color.replace('bg-', 'fill-')} hover:opacity-80 cursor-pointer transition-all duration-300`}
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">You</div>
                    <div className="text-sm text-gray-600">Shy Cat</div>
                </div>
            </div>
        </div>
    );

    const BarChart = ({ data }) => (
        <div className="space-y-4">
            {data.map((archetype, index) => (
                <div key={index} className="group cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-medium">{archetype.name}</span>
                        <span className="text-gray-600">{archetype.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full ${archetype.color} rounded-full transition-all duration-500 group-hover:opacity-80`}
                            style={{ width: `${archetype.percentage}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Layout
            title="How You Compare to the World"
            showBackButton={true}
            onBackClick={() => onNavigate('compatibility-view')}
            backgroundGradient="from-yellow-50 via-white to-orange-50"
            maxWidth="max-w-4xl"
        >
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-medium text-gray-800 mb-6">Archetype Distribution</h3>
                        <BarChart data={archetypeStats} />
                    </div>

                    <div className="flex items-center justify-center">
                        <PieChart data={archetypeStats} />
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p className="text-gray-600 mb-4">
                    You're part of the 15% who identify as Shy Cats - thoughtful observers who value deep connections over wide social circles.
                </p>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                    Explore Similar Types
                </button>
            </div>
        </Layout>
    );
};

export default GlobalComparison;