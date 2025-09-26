'use client';
import React from 'react';
import { Check } from 'lucide-react';

interface BuyNowToggleProps {
    enabled: boolean;
    setEnabled: (val: boolean) => void;
}

const BuyNowToggle: React.FC<BuyNowToggleProps> = ({ enabled, setEnabled }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4">
            Enable Buy Now Button
        </h3>
        <div className="flex gap-2">
            <button
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                    enabled
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setEnabled(true)}
            >
                Yes
                {enabled && <Check className="w-4 h-4" />}
            </button>
            <button
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    !enabled
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => setEnabled(false)}
            >
                No
            </button>
        </div>
    </div>
);

export default BuyNowToggle;
