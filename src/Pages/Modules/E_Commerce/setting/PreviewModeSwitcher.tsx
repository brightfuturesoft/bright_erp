'use client';
import React from 'react';

interface PreviewModeSwitcherProps {
    mode: string;
    setMode: (mode: string) => void;
}

const PreviewModeSwitcher: React.FC<PreviewModeSwitcherProps> = ({
    mode,
    setMode,
}) => (
    <div className="flex gap-3">
        <button
            onClick={() => setMode('phone')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                mode === 'phone'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border text-gray-700'
            }`}
        >
            📱 Phone
        </button>
        <button
            onClick={() => setMode('tablet')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                mode === 'tablet'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border text-gray-700'
            }`}
        >
            📱 Tablet
        </button>
        <button
            onClick={() => setMode('desktop')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                mode === 'desktop'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border text-gray-700'
            }`}
        >
            🖥️ Desktop
        </button>
    </div>
);

export default PreviewModeSwitcher;
