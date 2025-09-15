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

    return (
        <div className="flex flex-col w-full justify-center p-6">
            {/* Small Currency Card */}
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
                        <Clock className="text-blue-500 w-8 h-8" />
                    </div>
                    <div>
                        <h3
                            className={`font-semibold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                        >
                            Currency
                        </h3>
                        <p
                            className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-500'
                            }`}
                        >
                            Set your preferred currency
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
                            Configure Currency
                        </h2>
                        <p
                            className={`mb-6 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                        >
                            Customize your currency preferences
                        </p>

                        <div>
                            <h3
                                className={`text-lg font-semibold ${
                                    isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                                Currency Settings
                            </h3>
                            <p
                                className={`text-sm mb-4 ${
                                    isDarkMode
                                        ? 'text-gray-400'
                                        : 'text-gray-500'
                                }`}
                            >
                                Configure your currency options below
                            </p>

                            {/* Default Currency */}
                            <div className="mb-4">
                                <label
                                    className={`block font-medium mb-1 ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    Default Currency
                                </label>
                                <select
                                    value={currency}
                                    onChange={e => setCurrency(e.target.value)}
                                    className={`w-full border rounded-md p-2 ${
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                            : 'bg-white border-gray-300 text-gray-700'
                                    }`}
                                >
                                    {currencies.map(c => (
                                        <option
                                            key={c.value}
                                            value={c.value}
                                        >
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Currency Format */}
                            <div className="mb-4">
                                <label
                                    className={`block font-medium mb-1 ${
                                        isDarkMode
                                            ? 'text-gray-200'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    Currency Display Format
                                </label>
                                <select
                                    value={format}
                                    onChange={e => setFormat(e.target.value)}
                                    className={`w-full border rounded-md p-2 ${
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-gray-200'
                                            : 'bg-white border-gray-300 text-gray-700'
                                    }`}
                                >
                                    <option>Symbol ($100)</option>
                                    <option>Code (USD 100)</option>
                                    <option>Full (US Dollar 100)</option>
                                </select>
                            </div>

                            {/* Auto-update toggle */}
                            <div className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    checked={autoUpdate}
                                    onChange={e =>
                                        setAutoUpdate(e.target.checked)
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
                                    Auto-update exchange rates
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
                                    💾 Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
