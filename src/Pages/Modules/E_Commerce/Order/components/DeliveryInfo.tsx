import React, { useState } from 'react';
import { ChevronUp, Clock, Send } from 'lucide-react';

const DeliveryInfo: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const handleSteadfastClick = () => {
        console.log('Steadfast button clicked');
    };

    const handleSendToDeliveryClick = () => {
        console.log('Send to Delivery button clicked');
    };

    const toggleExpand = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div className=" bg-gray-50 dark:bg-gray-900 flex items-start justify-center p-4 sm:p-0 mb-5 font-inter transition-colors duration-300">
            <div className="w-full  bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                {/* Header */}
                <div
                    className="flex justify-between items-center p-4 sm:p-6 cursor-pointer"
                    onClick={toggleExpand}
                >
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Delivery Information
                    </h2>

                    <button
                        onClick={e => {
                            e.stopPropagation();
                            toggleExpand();
                        }}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform duration-300"
                    >
                        <ChevronUp
                            className={`w-6 h-6 transform transition-transform duration-300 ${
                                isExpanded ? 'rotate-0' : 'rotate-180'
                            }`}
                        />
                    </button>
                </div>

                {/* Content */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                            ? 'max-h-[500px] opacity-100 p-4 sm:p-6 pt-0'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="space-y-6">
                        {/* Steadfast Button */}
                        <button
                            onClick={handleSteadfastClick}
                            className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto text-white font-medium bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition"
                        >
                            <Clock className="w-5 h-5" />
                            <span>Steadfast</span>
                        </button>

                        {/* Info Text */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Before proceeding, save the current changes.
                        </p>

                        {/* Send Button */}
                        <button
                            onClick={handleSendToDeliveryClick}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-white font-bold text-base bg-violet-600 rounded-lg shadow-lg hover:bg-violet-700 focus:ring-4 focus:ring-violet-300 transition"
                        >
                            <Send className="w-5 h-5" />
                            <span>Send to Delivery</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryInfo;
