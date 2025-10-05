'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const PreviewModeSwitcher = ({ mode, setMode }) =>
    _jsxs('div', {
        className: 'flex gap-3',
        children: [
            _jsx('button', {
                onClick: () => setMode('phone'),
                className: `px-4 py-2 rounded-lg transition-colors duration-200 ${
                    mode === 'phone'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border text-gray-700'
                }`,
                children: '\uD83D\uDCF1 Phone',
            }),
            _jsx('button', {
                onClick: () => setMode('tablet'),
                className: `px-4 py-2 rounded-lg transition-colors duration-200 ${
                    mode === 'tablet'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border text-gray-700'
                }`,
                children: '\uD83D\uDCF1 Tablet',
            }),
            _jsx('button', {
                onClick: () => setMode('desktop'),
                className: `px-4 py-2 rounded-lg transition-colors duration-200 ${
                    mode === 'desktop'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border text-gray-700'
                }`,
                children: '\uD83D\uDDA5\uFE0F Desktop',
            }),
        ],
    });
export default PreviewModeSwitcher;
