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

    return (
        <div className="flex flex-col w-full justify-center p-6">
            {/* Small Language Card */}
            <div
                className={`shadow-md rounded-lg p-4 flex justify-between w-full ${
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white'
                }`}
            >
                <div className="flex gap-4 cursor-pointer">
                    <div
                        className={`p-2 rounded-md transition ${
                            isDarkMode
                                ? 'hover:bg-gray-700'
                                : 'hover:bg-gray-200'
                        }`}
                    >
                        <Globe className="text-blue-500 w-8 h-8" />
                    </div>
                    <div>
                        <h3
                            className={`font-semibold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                            Language
                        </h3>
                        <p
                            className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                        >
                            Set your preferred language
                        </p>
                        <span
                            className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                        >
                            Not configured
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <span className="text-blue-500 cursor-pointer text-lg">
                        &gt;
                    </span>
                    <button
                        onClick={() => setOpenModal(true)}
                        className={`px-3 py-1.5 rounded-md transition ${
                            isDarkMode
                                ? 'bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600'
                                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Configure
                    </button>
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className={`shadow-xl rounded-lg p-6 w-full max-w-2xl ${
                            isDarkMode
                                ? 'bg-gray-800 border border-gray-700'
                                : 'bg-white'
                        }`}
                    >
                        <h2
                            className={`text-2xl font-bold mb-2 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                            Configure Language
                        </h2>
                        <p
                            className={`mb-6 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                        >
                            Customize your language preferences
                        </p>

                        <div>
                            <h3
                                className={`text-lg font-semibold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                                Language Settings
                            </h3>
                            <p
                                className={`text-sm mb-4 ${
                                    isDarkMode
                                        ? 'text-gray-400'
                                        : 'text-gray-500'
                                }`}
                            >
                                Configure your language options below
                            </p>

                            {/* Default Language */}
                            <div className="mb-4">
                                <label
                                    className={`block font-medium mb-1 ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    Default Language
                                </label>
                                <select
                                    value={language}
                                    onChange={e => setLanguage(e.target.value)}
                                    className={`w-full border rounded-md p-2 ${
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                            : 'bg-white border-gray-300 text-gray-700'
                                    }`}
                                >
                                    {languages.map(lang => (
                                        <option
                                            key={lang.value}
                                            value={lang.value}
                                        >
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Text Direction */}
                            <div className="mb-4">
                                <label
                                    className={`block font-medium mb-1 ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    Text Direction
                                </label>
                                <select
                                    value={direction}
                                    onChange={e => setDirection(e.target.value)}
                                    className={`w-full border rounded-md p-2 ${
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                            : 'bg-white border-gray-300 text-gray-700'
                                    }`}
                                >
                                    <option>LTR (Left to Right)</option>
                                    <option>RTL (Right to Left)</option>
                                </select>
                            </div>

                            {/* Auto-detect toggle */}
                            <div className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    checked={autoDetect}
                                    onChange={e =>
                                        setAutoDetect(e.target.checked)
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label
                                    className={`ml-2 ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    Auto-detect language from browser
                                </label>
                            </div>

                            <hr
                                className={`mb-4 ${
                                    isDarkMode
                                        ? 'border-gray-600'
                                        : 'border-gray-200'
                                }`}
                            />

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className={`px-4 py-2 rounded-md border transition ${
                                        isDarkMode
                                            ? 'border-gray-600 text-gray-200 hover:bg-gray-700'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Cancel
                                </button>
                                <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 flex items-center gap-2">
                                    🌐 Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
