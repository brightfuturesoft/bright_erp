'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Check, Star } from 'lucide-react';
const ThemeSelector = ({ themes, selectedTheme, setSelectedTheme }) => {
    return _jsxs('div', {
        className:
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8',
        children: [
            themes.map(theme =>
                _jsx(
                    'div',
                    {
                        className: `relative bg-white dark:bg-gray-800 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                            selectedTheme === theme.name
                                ? 'border-blue-500 shadow-lg'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`,
                        onClick: () => setSelectedTheme(theme.name),
                        children: _jsxs('div', {
                            className: 'p-4',
                            children: [
                                _jsx('div', {
                                    className:
                                        'aspect-[3/2] bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden',
                                    children: _jsx('img', {
                                        src:
                                            theme.preview || '/placeholder.svg',
                                        alt: `${theme.name} theme preview`,
                                        className: 'w-full h-full object-cover',
                                    }),
                                }),
                                _jsxs('div', {
                                    className:
                                        'flex items-center justify-between',
                                    children: [
                                        _jsx('span', {
                                            className: `font-medium ${
                                                selectedTheme === theme.name
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-700 dark:text-gray-200'
                                            }`,
                                            children: theme.name,
                                        }),
                                        selectedTheme === theme.name &&
                                            _jsx('div', {
                                                className:
                                                    'w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center',
                                                children: _jsx(Check, {
                                                    className:
                                                        'w-4 h-4 text-white',
                                                }),
                                            }),
                                    ],
                                }),
                            ],
                        }),
                    },
                    theme.name
                )
            ),
            _jsxs('div', {
                className:
                    'bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600 dark:from-blue-600 dark:via-purple-700 dark:to-purple-800 rounded-xl p-6 flex flex-col items-center justify-center text-white min-h-[200px]',
                children: [
                    _jsx(Star, { className: 'w-8 h-8 mb-3' }),
                    _jsx('span', {
                        className: 'font-medium text-center',
                        children: 'More themes coming',
                    }),
                ],
            }),
        ],
    });
};
export default ThemeSelector;
