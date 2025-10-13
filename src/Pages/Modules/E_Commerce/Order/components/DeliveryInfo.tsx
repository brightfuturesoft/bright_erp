import React, { useState } from 'react';
import { ChevronUp, Send, CheckCircle2 } from 'lucide-react';
import { message, Modal } from 'antd';

const couriers = [
    {
        name: 'Steadfast',
        logo: 'https://merchant.zatiqeasy.com/assets/steadfast.png',
    },
    {
        name: 'Pathao',
        logo: 'https://merchant.zatiqeasy.com/assets/pathao.png',
    },
    {
        name: 'RedX',
        logo: 'https://merchant.zatiqeasy.com/assets/redx.png',
    },
    {
        name: 'Paperfly',
        logo: 'https://merchant.zatiqeasy.com/assets/paperfly.png',
    },
];

const DeliveryInfo: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleExpand = () => setIsExpanded(prev => !prev);

    const handleSendToDeliveryClick = () => {
        if (selectedCourier) {
            setIsModalVisible(true);
        } else {
            message.error('Please select a courier service before sending!');
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 flex items-start justify-center p-4 sm:p-0 mb-6 font-inter transition-colors duration-300">
            <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl">
                {/* Header */}
                <div
                    className="flex justify-between items-center p-5 sm:p-6 cursor-pointer select-none"
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
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-transform duration-300"
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
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded
                            ? 'max-h-[600px] opacity-100 p-5 sm:p-6 pt-0'
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="space-y-6">
                        {/* Courier Options */}
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                Choose your preferred courier service
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {couriers.map(courier => (
                                    <div
                                        key={courier.name}
                                        onClick={() =>
                                            setSelectedCourier(courier.name)
                                        }
                                        className={`cursor-pointer rounded-xl px-5 py-4 border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 ${
                                            selectedCourier === courier.name
                                                ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30 shadow-md'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-violet-400 hover:shadow-md'
                                        }`}
                                    >
                                        <img
                                            src={courier.logo}
                                            alt={courier.name}
                                            className="w-20 h-14 object-contain"
                                        />
                                        <span
                                            className={`font-medium text-sm sm:text-base ${
                                                selectedCourier === courier.name
                                                    ? 'text-violet-700 dark:text-violet-300'
                                                    : 'text-gray-700 dark:text-gray-200'
                                            }`}
                                        >
                                            {courier.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info Text */}
                        <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/40 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                            💡 Before proceeding, please ensure you’ve saved
                            your current order changes.
                        </div>

                        {/* Send Button */}
                        <div className="flex justify-center sm:justify-start">
                            <button
                                onClick={handleSendToDeliveryClick}
                                className="flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto text-white font-semibold text-base bg-violet-600 rounded-lg shadow-lg hover:bg-violet-700 hover:shadow-xl focus:ring-4 focus:ring-violet-300 transition"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send to Delivery</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <Modal
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                centered
                className="dark:bg-gray-800"
            >
                <div className="flex flex-col items-center justify-center py-6 text-center">
                    <CheckCircle2 className="w-14 h-14 text-green-500 mb-3 animate-bounce" />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Successfully Sent!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Your order has been successfully sent to{' '}
                        <b>{selectedCourier}</b> courier service.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default DeliveryInfo;
