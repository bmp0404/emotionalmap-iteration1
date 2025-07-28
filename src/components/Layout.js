// components/Layout.js
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Layout = ({
    children,
    title,
    showBackButton = false,
    onBackClick,
    backgroundGradient = "from-blue-50 via-white to-purple-50",
    maxWidth = "max-w-2xl"
}) => {
    return (
        <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} p-6`}>
            <div className={`${maxWidth} mx-auto`}>
                {(showBackButton || title) && (
                    <div className="flex items-center justify-between mb-8">
                        {showBackButton ? (
                            <button
                                onClick={onBackClick}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                            >
                                <ArrowLeft size={20} />
                                Back
                            </button>
                        ) : (
                            <div></div>
                        )}
                        {title && <h1 className="text-3xl font-light text-gray-800">{title}</h1>}
                        <div></div>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Layout;