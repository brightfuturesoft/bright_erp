import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
export default function TimezoneCard() {
    const [timezone, setTimezone] = useState('');
    const [format, setFormat] = useState('12-hour');
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
    const timezones = [
        // 🌏 SARC Countries
        { value: 'Asia/Dhaka', label: '🇧🇩 Bangladesh (GMT+6)' },
        { value: 'Asia/Thimphu', label: '🇧🇹 Bhutan (GMT+6)' },
        { value: 'Asia/Kolkata', label: '🇮🇳 India (GMT+5:30)' },
        { value: 'Indian/Maldives', label: '🇲🇻 Maldives (GMT+5)' },
        { value: 'Asia/Kathmandu', label: '🇳🇵 Nepal (GMT+5:45)' },
        { value: 'Asia/Karachi', label: '🇵🇰 Pakistan (GMT+5)' },
        { value: 'Asia/Colombo', label: '🇱🇰 Sri Lanka (GMT+5:30)' },
        { value: 'Asia/Kabul', label: '🇦🇫 Afghanistan (GMT+4:30)' },
        // 🌍 Major Timezones
        { value: 'America/New_York', label: '🇺🇸 Eastern Time (GMT-5)' },
        { value: 'Europe/London', label: '🇬🇧 London (GMT+0)' },
        { value: 'Europe/Paris', label: '🇫🇷 Paris (GMT+1)' },
        { value: 'Asia/Tokyo', label: '🇯🇵 Tokyo (GMT+9)' },
    ];
    // Automatically change format when timezone changes
    useEffect(() => {
        if (timezone.includes('America') || timezone.includes('Europe')) {
            setFormat('12-hour'); // Western format
        } else if (timezone) {
            setFormat('24-hour'); // Asian format
        }
    }, [timezone]);
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
                                        children: 'Timezone',
                                    }),
                                    _jsx('p', {
                                        className: `text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`,
                                        children: 'Set your preferred timezone',
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
                                children: 'Configure Timezone',
                            }),
                            _jsx('p', {
                                className: `mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`,
                                children: 'Customize your timezone preferences',
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('h3', {
                                        className: `text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`,
                                        children: 'Timezone Settings',
                                    }),
                                    _jsx('p', {
                                        className: `text-sm mb-4 ${
                                            isDarkMode
                                                ? 'text-gray-400'
                                                : 'text-gray-500'
                                        }`,
                                        children:
                                            'Configure your timezone options below',
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
                                                children: 'Default Timezone',
                                            }),
                                            _jsx('select', {
                                                value: timezone,
                                                onChange: e =>
                                                    setTimezone(e.target.value),
                                                className: `w-full border rounded-md p-2 ${
                                                    isDarkMode
                                                        ? 'bg-gray-700 border-gray-600 text-gray-200'
                                                        : 'bg-white border-gray-300 text-gray-700'
                                                }`,
                                                children: timezones.map(tz =>
                                                    _jsx(
                                                        'option',
                                                        {
                                                            value: tz.value,
                                                            children: tz.label,
                                                        },
                                                        tz.value
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
                                                children: 'Time Display Format',
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
                                                            '12-hour (2:30 PM)',
                                                    }),
                                                    _jsx('option', {
                                                        children:
                                                            '24-hour (14:30)',
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
                                                    'Auto-detect timezone from browser',
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
                                                    '\uD83D\uDD52 Save Changes',
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
