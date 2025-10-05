import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
export default function Currency() {
    const [currency, setCurrency] = useState('');
    const [format, setFormat] = useState('Symbol ($100)');
    const [autoUpdate, setAutoUpdate] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );
    // Listen for theme changes
    useEffect(() => {
        const handleThemeChange = () => {
            setIsDarkMode(localStorage.getItem('theme') === 'dark');
        };
        window.addEventListener('storage', handleThemeChange);
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => {
            window.removeEventListener('storage', handleThemeChange);
            observer.disconnect();
        };
    }, []);
    const currencies = [
        // 🌏 SARC Countries
        { value: 'BD', label: '🇧🇩 Bangladesh' },
        { value: 'BT', label: '🇧🇹 Bhutan' },
        { value: 'IN', label: '🇮🇳 India' },
        { value: 'MV', label: '🇲🇻 Maldives' },
        { value: 'NP', label: '🇳🇵 Nepal' },
        { value: 'PK', label: '🇵🇰 Pakistan' },
        { value: 'LK', label: '🇱🇰 Sri Lanka' },
        { value: 'AF', label: '🇦🇫 Afghanistan' },
        // 💰 Major Currencies
        { value: 'USD', label: '💵 USD - US Dollar' },
        { value: 'EUR', label: '💶 EUR - Euro' },
        { value: 'GBP', label: '💷 GBP - British Pound' },
    ];
    // Automatically change format when currency changes
    useEffect(() => {
        if (currency === 'USD' || currency === 'EUR' || currency === 'GBP') {
            setFormat('Code (USD 100)'); // Major currency format
        } else if (currency) {
            setFormat('Symbol ($100)'); // SARC country format
        }
    }, [currency]);
    return _jsxs('div', {
        className: 'flex flex-col w-full justify-center p-6',
        children: [
            _jsxs('div', {
                className: `shadow-md rounded-lg p-4 flex justify-between w-full ${
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white'
                }`,
                children: [
                    _jsxs('div', {
                        className: 'flex gap-4 cursor-pointer',
                        children: [
                            _jsx('div', {
                                className: `p-2 rounded-md transition ${
                                    isDarkMode
                                        ? 'hover:bg-gray-700'
                                        : 'hover:bg-gray-200'
                                }`,
                                children: _jsx(Clock, {
                                    className: 'text-blue-500 w-8 h-8',
                                }),
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('h3', {
                                        className: `font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
                                        children: 'Currency',
                                    }),
                                    _jsx('p', {
                                        className: `text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`,
                                        children: 'Set your preferred currency',
                                    }),
                                    _jsx('span', {
                                        className: `text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`,
                                        children: 'Not configured',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'flex flex-col items-center gap-3',
                        children: [
                            _jsx('span', {
                                className:
                                    'text-blue-500 cursor-pointer text-lg',
                                children: '>',
                            }),
                            _jsx('button', {
                                onClick: () => setOpenModal(true),
                                className: `px-3 py-1.5 rounded-md transition ${
                                    isDarkMode
                                        ? 'bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600'
                                        : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                                }`,
                                children: 'Configure',
                            }),
                        ],
                    }),
                ],
            }),
            openModal &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
                    children: _jsxs('div', {
                        className: `shadow-xl rounded-lg p-6 w-full max-w-2xl ${
                            isDarkMode
                                ? 'bg-gray-800 border border-gray-700'
                                : 'bg-white'
                        }`,
                        children: [
                            _jsx('h2', {
                                className: `text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
                                children: 'Configure Currency',
                            }),
                            _jsx('p', {
                                className: `mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`,
                                children: 'Customize your currency preferences',
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('h3', {
                                        className: `text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
                                        children: 'Currency Settings',
                                    }),
                                    _jsx('p', {
                                        className: `text-sm mb-4 ${
                                            isDarkMode
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`,
                                        children:
                                            'Configure your currency options below',
                                    }),
                                    _jsxs('div', {
                                        className: 'mb-4',
                                        children: [
                                            _jsx('label', {
                                                className: `block font-medium mb-1 ${
                                                    isDarkMode
                                                        ? 'text-gray-200'
                                                        : 'text-gray-700'
                                                }`,
                                                children: 'Default Currency',
                                            }),
                                            _jsx('select', {
                                                value: currency,
                                                onChange: e =>
                                                    setCurrency(e.target.value),
                                                className: `w-full border rounded-md p-2 ${
                                                    isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                        : 'bg-white border-gray-300 text-gray-700'
                                                }`,
                                                children: currencies.map(c =>
                                                    _jsx(
                                                        'option',
                                                        {
                                                            value: c.value,
                                                            children: c.label,
                                                        },
                                                        c.value
                                                    )
                                                ),
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className: 'mb-4',
                                        children: [
                                            _jsx('label', {
                                                className: `block font-medium mb-1 ${
                                                    isDarkMode
                                                        ? 'text-gray-200'
                                                        : 'text-gray-700'
                                                }`,
                                                children:
                                                    'Currency Display Format',
                                            }),
                                            _jsxs('select', {
                                                value: format,
                                                onChange: e =>
                                                    setFormat(e.target.value),
                                                className: `w-full border rounded-md p-2 ${
                                                    isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                        : 'bg-white border-gray-300 text-gray-700'
                                                }`,
                                                children: [
                                                    _jsx('option', {
                                                        children:
                                                            'Symbol ($100)',
                                                    }),
                                                    _jsx('option', {
                                                        children:
                                                            'Code (USD 100)',
                                                    }),
                                                    _jsx('option', {
                                                        children:
                                                            'Full (US Dollar 100)',
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className: 'flex items-center mb-6',
                                        children: [
                                            _jsx('input', {
                                                type: 'checkbox',
                                                checked: autoUpdate,
                                                onChange: e =>
                                                    setAutoUpdate(
                                                        e.target.checked
                                                    ),
                                                className:
                                                    'w-4 h-4 text-blue-600 border-gray-300 rounded',
                                            }),
                                            _jsx('label', {
                                                className: `ml-2 ${
                                                    isDarkMode
                                                        ? 'text-gray-200'
                                                        : 'text-gray-700'
                                                }`,
                                                children:
                                                    'Auto-update exchange rates',
                                            }),
                                        ],
                                    }),
                                    _jsx('hr', {
                                        className: `mb-4 ${
                                            isDarkMode
                                                ? 'border-gray-600'
                                                : 'border-gray-200'
                                        }`,
                                    }),
                                    _jsxs('div', {
                                        className: 'flex justify-end gap-3',
                                        children: [
                                            _jsx('button', {
                                                onClick: () =>
                                                    setOpenModal(false),
                                                className: `px-4 py-2 rounded-md border transition ${
                                                    isDarkMode
                                                        ? 'border-gray-600 text-gray-200 hover:bg-gray-700'
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                                }`,
                                                children: 'Cancel',
                                            }),
                                            _jsx('button', {
                                                className:
                                                    'px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 flex items-center gap-2',
                                                children:
                                                    '\uD83D\uDCBE Save Changes',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
        ],
    });
}
