import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
export default function Language() {
    const [language, setLanguage] = useState('');
    const [direction, setDirection] = useState('LTR');
    const [autoDetect, setAutoDetect] = useState(false);
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
    const languages = [
        // 🌏 SARC Countries
        { value: 'bn', label: '🇧🇩 Bengali (বাংলা)' },
        { value: 'dz', label: '🇧🇹 Dzongkha (རྫོང་ཁ)' },
        { value: 'hi', label: '🇮🇳 Hindi (हिन्दी)' },
        { value: 'dv', label: '🇲🇻 Dhivehi (ދިވެހި)' },
        { value: 'ne', label: '🇳🇵 Nepali (नेपाली)' },
        { value: 'ur', label: '🇵🇰 Urdu (اردو)' },
        { value: 'si', label: '🇱🇰 Sinhala (සිංහල)' },
        { value: 'ps', label: '🇦🇫 Pashto (پښتو)' },
        // 🌍 Major Languages
        { value: 'en', label: '🇺🇸 English' },
        { value: 'es', label: '🇪🇸 Spanish (Español)' },
        { value: 'fr', label: '🇫🇷 French (Français)' },
        { value: 'de', label: '🇩🇪 German (Deutsch)' },
        { value: 'ar', label: '🇸🇦 Arabic (العربية)' },
    ];
    // Automatically change direction when language changes
    useEffect(() => {
        if (
            language === 'ar' ||
            language === 'ur' ||
            language === 'ps' ||
            language === 'dv'
        ) {
            setDirection('RTL'); // Right-to-left languages
        } else if (language) {
            setDirection('LTR'); // Left-to-right languages
        }
    }, [language]);
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
                                children: _jsx(Globe, {
                                    className: 'text-blue-500 w-8 h-8',
                                }),
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('h3', {
                                        className: `font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
                                        children: 'Language',
                                    }),
                                    _jsx('p', {
                                        className: `text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`,
                                        children: 'Set your preferred language',
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
                                children: 'Configure Language',
                            }),
                            _jsx('p', {
                                className: `mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`,
                                children: 'Customize your language preferences',
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('h3', {
                                        className: `text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
                                        children: 'Language Settings',
                                    }),
                                    _jsx('p', {
                                        className: `text-sm mb-4 ${
                                            isDarkMode
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`,
                                        children:
                                            'Configure your language options below',
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
                                                children: 'Default Language',
                                            }),
                                            _jsx('select', {
                                                value: language,
                                                onChange: e =>
                                                    setLanguage(e.target.value),
                                                className: `w-full border rounded-md p-2 ${
                                                    isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                        : 'bg-white border-gray-300 text-gray-700'
                                                }`,
                                                children: languages.map(lang =>
                                                    _jsx(
                                                        'option',
                                                        {
                                                            value: lang.value,
                                                            children:
                                                                lang.label,
                                                        },
                                                        lang.value
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
                                                children: 'Text Direction',
                                            }),
                                            _jsxs('select', {
                                                value: direction,
                                                onChange: e =>
                                                    setDirection(
                                                        e.target.value
                                                    ),
                                                className: `w-full border rounded-md p-2 ${
                                                    isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                        : 'bg-white border-gray-300 text-gray-700'
                                                }`,
                                                children: [
                                                    _jsx('option', {
                                                        children:
                                                            'LTR (Left to Right)',
                                                    }),
                                                    _jsx('option', {
                                                        children:
                                                            'RTL (Right to Left)',
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
                                                checked: autoDetect,
                                                onChange: e =>
                                                    setAutoDetect(
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
                                                    'Auto-detect language from browser',
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
                                                    '\uD83C\uDF10 Save Changes',
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
