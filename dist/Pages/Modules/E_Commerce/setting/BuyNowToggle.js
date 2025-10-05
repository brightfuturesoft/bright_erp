'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Check } from 'lucide-react';
const BuyNowToggle = ({ enabled, setEnabled }) =>
    _jsxs('div', {
        className:
            'bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700',
        children: [
            _jsx('h3', {
                className:
                    'font-semibold text-gray-900 dark:text-gray-200 mb-4',
                children: 'Enable Buy Now Button',
            }),
            _jsxs('div', {
                className: 'flex gap-2',
                children: [
                    _jsxs('button', {
                        className: `px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                            enabled
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`,
                        onClick: () => setEnabled(true),
                        children: [
                            'Yes',
                            enabled && _jsx(Check, { className: 'w-4 h-4' }),
                        ],
                    }),
                    _jsx('button', {
                        className: `px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                            !enabled
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`,
                        onClick: () => setEnabled(false),
                        children: 'No',
                    }),
                ],
            }),
        ],
    });
export default BuyNowToggle;
