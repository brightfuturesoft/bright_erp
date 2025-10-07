import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { useState, useEffect, useCallback, useContext } from 'react';
import { ArrowLeft, Sun, Moon, Trash2, Save, Plus } from 'lucide-react';
import { COURIERS } from './data';
import { Banner } from './components/Banner';
import { CustomCollapse } from './components/CustomCollapse';
import { CustomRadio } from './components/CustomRadio';
import { PasswordInput } from './components/PasswordInput';
import { Erp_context } from '@/provider/ErpContext';
import { message } from 'antd';
export default function Shiping_Setting() {
    const { user } = useContext(Erp_context);
    if (!user) {
        return 'Loading';
    }
    const [darkMode, setDarkMode] = useState(true);
    const [selectedCourier, setSelectedCourier] = useState('RX');
    const [isDeliveryServiceOpen, setIsDeliveryServiceOpen] = useState(false);
    const [isIntegrateServicesOpen, setIsIntegrateServicesOpen] =
        useState(true);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    // Fetch saved shipping settings
    const fetchSettings = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/get-couriers`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            const data = await res.json();
            if (!data.error && data.data.length > 0) {
                // যদি courier data থাকে
                setSelectedCourier('STEADFAST');
                setApiKey(data.data[0].apiKey || '');
                setApiSecret(data.data[0].apiSecret || '');
            } else {
                setSelectedCourier('RX');
                setApiKey('');
                setApiSecret('');
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to fetch shipping settings!');
        }
    };
    useEffect(() => {
        fetchSettings();
    }, []);
    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);
    const handleCourierSelect = useCallback(id => {
        setSelectedCourier(id);
        if (COURIERS.find(c => c.id === id)?.canConfigure) {
            if (id === 'STEADFAST') setIsIntegrateServicesOpen(true);
        }
    }, []);
    const recommendedCourier = COURIERS.find(c => c.id === 'STEADFAST');
    const otherCouriers = COURIERS.filter(c => c.id !== 'RX');
    const isSteadFastConfigured = selectedCourier === 'STEADFAST';
    // Save / Update settings API
    const handleSave = async () => {
        try {
            const payload = {
                selectedCourier,
                apiKey: isSteadFastConfigured ? apiKey : null,
                apiSecret: isSteadFastConfigured ? apiSecret : null,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/update-courier`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();
            if (!data.error) {
                message.success('Settings updated successfully!');
                fetchSettings();
            } else {
                message.error(data.error);
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to update settings!');
        }
    };
    const handleRemove = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/delete-courier`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            setApiKey('');
            setApiSecret('');
            message.success('SteadFast integration removed!');
        } catch (err) {
            console.error(err);
            message.error('Failed to remove integration!');
        }
    };
    // Create new courier
    const handleCreate = async () => {
        if (!apiKey || !apiSecret) {
            message.warning('Please enter API Key and Secret!');
            return;
        }
        try {
            const payload = {
                workspace_id: user?.workspace_id,
                apiKey,
                apiSecret,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/create-courier`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();
            if (!data.error) {
                message.success('Courier configured successfully!');
                fetchSettings(); // Refresh after creation
            } else {
                message.error(data.error);
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to configure courier!');
        }
    };
    return _jsx('div', {
        className: darkMode ? 'dark' : '',
        children: _jsxs('div', {
            className:
                'min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors p-4 sm:p-8',
            children: [
                _jsxs('header', {
                    className: 'flex items-center justify-between mb-6',
                    children: [
                        _jsxs('div', {
                            className: 'flex items-center',
                            children: [
                                _jsx('button', {
                                    className:
                                        'p-2 mr-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors',
                                    children: _jsx(ArrowLeft, {
                                        className: 'w-6 h-6',
                                    }),
                                }),
                                _jsx('h1', {
                                    className:
                                        'text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white',
                                    children: 'Delivery Support',
                                }),
                            ],
                        }),
                        _jsx('button', {
                            onClick: () => setDarkMode(!darkMode),
                            className:
                                'p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors',
                            children: darkMode
                                ? _jsx(Sun, { className: 'w-6 h-6' })
                                : _jsx(Moon, { className: 'w-6 h-6' }),
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'max-w-4xl mx-auto',
                    children: [
                        _jsx(Banner, {}),
                        _jsx(CustomCollapse, {
                            title: 'Delivery Service',
                            defaultOpen: isDeliveryServiceOpen,
                            children: _jsx('div', {
                                className:
                                    'text-sm text-gray-600 dark:text-gray-400',
                                children:
                                    'You can view the list of delivery services available for your region here.',
                            }),
                        }),
                        _jsxs(CustomCollapse, {
                            title: 'Integrate Delivery Services',
                            defaultOpen: isIntegrateServicesOpen,
                            children: [
                                recommendedCourier &&
                                    _jsx(CustomRadio, {
                                        courier: recommendedCourier,
                                        isSelected:
                                            selectedCourier ===
                                            recommendedCourier.id,
                                        onSelect: handleCourierSelect,
                                    }),
                                _jsx('h3', {
                                    className:
                                        'text-lg font-medium text-gray-800 dark:text-white mt-6 mb-3',
                                    children: 'Other Courier Services:',
                                }),
                                _jsx('div', {
                                    className:
                                        'flex flex-wrap gap-4 sm:gap-6 justify-start',
                                    children: otherCouriers.map(c =>
                                        _jsx(
                                            CustomRadio,
                                            {
                                                courier: c,
                                                isSelected:
                                                    selectedCourier === c.id,
                                                onSelect: handleCourierSelect,
                                                otherServices: true,
                                            },
                                            c.id
                                        )
                                    ),
                                }),
                                _jsxs('div', {
                                    className:
                                        'mt-8 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-inner',
                                    children: [
                                        _jsxs('h3', {
                                            className:
                                                'text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center',
                                            children: [
                                                _jsx(Plus, {
                                                    className: 'w-5 h-5 mr-2',
                                                }),
                                                'Add / Configure Courier',
                                            ],
                                        }),
                                        _jsxs('div', {
                                            className:
                                                'flex flex-col sm:flex-row gap-4 mb-6',
                                            children: [
                                                _jsx(PasswordInput, {
                                                    label: 'API Key',
                                                    value: apiKey,
                                                    onChange: setApiKey,
                                                }),
                                                _jsx(PasswordInput, {
                                                    label: 'API Secret',
                                                    value: apiSecret,
                                                    onChange: setApiSecret,
                                                }),
                                            ],
                                        }),
                                        _jsx('div', {
                                            className: 'flex justify-end gap-4',
                                            children:
                                                apiKey || apiSecret
                                                    ? _jsxs(_Fragment, {
                                                          children: [
                                                              _jsxs('button', {
                                                                  onClick:
                                                                      handleRemove,
                                                                  className:
                                                                      'flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg dark:shadow-red-900/50',
                                                                  children: [
                                                                      _jsx(
                                                                          Trash2,
                                                                          {
                                                                              className:
                                                                                  'w-4 h-4 mr-2',
                                                                          }
                                                                      ),
                                                                      'Remove',
                                                                  ],
                                                              }),
                                                              _jsxs('button', {
                                                                  onClick:
                                                                      handleSave,
                                                                  className:
                                                                      'flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg dark:shadow-green-900/50',
                                                                  children: [
                                                                      _jsx(
                                                                          Save,
                                                                          {
                                                                              className:
                                                                                  'w-4 h-4 mr-2',
                                                                          }
                                                                      ),
                                                                      'Update',
                                                                  ],
                                                              }),
                                                          ],
                                                      })
                                                    : _jsxs('button', {
                                                          onClick: handleCreate,
                                                          className:
                                                              'flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg',
                                                          children: [
                                                              _jsx(Save, {
                                                                  className:
                                                                      'w-4 h-4 mr-2',
                                                              }),
                                                              'Save',
                                                          ],
                                                      }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                _jsx('div', { className: 'h-16' }),
            ],
        }),
    });
}
