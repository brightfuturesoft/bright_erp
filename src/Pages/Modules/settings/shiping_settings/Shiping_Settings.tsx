import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Sun, Moon, Trash2, Save } from 'lucide-react';
import { COURIERS } from './data';
import { CourierId } from './Data_Type';
import { Banner } from './components/Banner';
import { CustomCollapse } from './components/CustomCollapse';
import { CustomRadio } from './components/CustomRadio';
import { PasswordInput } from './components/PasswordInput';

export default function Shiping_Setting() {
    const [darkMode, setDarkMode] = useState(true);
    const [selectedCourier, setSelectedCourier] = useState<CourierId>('RX');
    const [isDeliveryServiceOpen, setIsDeliveryServiceOpen] = useState(false);
    const [isIntegrateServicesOpen, setIsIntegrateServicesOpen] =
        useState(true);
    const [apiKey, setApiKey] = useState('********************');
    const [apiSecret, setApiSecret] = useState('********************');

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    const handleCourierSelect = useCallback((id: CourierId) => {
        setSelectedCourier(id);
        if (COURIERS.find(c => c.id === id)?.canConfigure) {
            if (id === 'STEADFAST') setIsIntegrateServicesOpen(true);
        }
    }, []);

    const recommendedCourier = COURIERS.find(c => c.id === 'STEADFAST');
    const otherCouriers = COURIERS.filter(c => c.id !== 'RX');
    const isSteadFastConfigured = selectedCourier === 'STEADFAST';

    const handleSave = () => {
        const dataToSave = {
            selectedCourier,
            apiKey: isSteadFastConfigured ? apiKey : null,
            apiSecret: isSteadFastConfigured ? apiSecret : null,
        };
        console.log('Saved Shipping Settings:', dataToSave);
        alert('Settings saved! Check console for data.');
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors p-4 sm:p-8">
                <header className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button className="p-2 mr-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                            Delivery Support
                        </h1>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                    >
                        {darkMode ? (
                            <Sun className="w-6 h-6" />
                        ) : (
                            <Moon className="w-6 h-6" />
                        )}
                    </button>
                </header>

                <div className="max-w-4xl mx-auto">
                    <Banner />
                    <CustomCollapse
                        title="Delivery Service"
                        defaultOpen={isDeliveryServiceOpen}
                    >
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            You can view the list of delivery services available
                            for your region here.
                        </div>
                    </CustomCollapse>

                    <CustomCollapse
                        title="Integrate Delivery Services"
                        defaultOpen={isIntegrateServicesOpen}
                    >
                        {recommendedCourier && (
                            <CustomRadio
                                courier={recommendedCourier}
                                isSelected={
                                    selectedCourier === recommendedCourier.id
                                }
                                onSelect={handleCourierSelect}
                            />
                        )}

                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3">
                            Other Courier Services:
                        </h3>
                        <div className="flex flex-wrap gap-4 sm:gap-6 justify-start">
                            {otherCouriers.map(c => (
                                <CustomRadio
                                    key={c.id}
                                    courier={c}
                                    isSelected={selectedCourier === c.id}
                                    onSelect={handleCourierSelect}
                                    otherServices={true}
                                />
                            ))}
                        </div>

                        {isSteadFastConfigured && (
                            <div className="mt-8 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-inner">
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center">
                                        <img
                                            className="w-40 bg-white p-2 rounded-md"
                                            src="https://merchant.zatiqeasy.com/assets/steadfast.png"
                                            alt=""
                                        />
                                    </div>
                                    <span className="ml-2 text-lg font-medium text-gray-800 dark:text-white">
                                        | Configure Steadfast
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Please provide your Steadfast credentials to
                                    integrate Steadfast
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <PasswordInput
                                        label="SteadFast API Key"
                                        value={apiKey}
                                        onChange={setApiKey}
                                    />
                                    <PasswordInput
                                        label="SteadFast API Secret"
                                        value={apiSecret}
                                        onChange={setApiSecret}
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => {
                                            setApiKey('');
                                            setApiSecret('');
                                            alert(
                                                'Simulated: SteadFast integration removed!'
                                            );
                                        }}
                                        className="flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg dark:shadow-red-900/50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Remove
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg dark:shadow-green-900/50"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}

                        {!isSteadFastConfigured && (
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleSave}
                                    className="flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg dark:shadow-green-900/50"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save
                                </button>
                            </div>
                        )}
                    </CustomCollapse>
                </div>

                <div className="h-16"></div>
            </div>
        </div>
    );
}
