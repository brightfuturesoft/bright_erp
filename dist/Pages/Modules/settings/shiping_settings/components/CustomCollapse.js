import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
export const CustomCollapse = ({ title, children, defaultOpen }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const Icon = isOpen ? ChevronUp : ChevronDown;
    return _jsxs('div', {
        className:
            'mt-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm',
        children: [
            _jsxs('button', {
                className:
                    'w-full flex justify-between items-center p-4 text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg',
                onClick: () => setIsOpen(!isOpen),
                children: [
                    _jsx('span', { children: title }),
                    _jsx(Icon, { className: 'w-5 h-5 transition-transform' }),
                ],
            }),
            _jsx('div', {
                className: `overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen pt-2' : 'max-h-0'}`,
                children: _jsx('div', {
                    className: 'px-4 pb-4',
                    children: children,
                }),
            }),
        ],
    });
};
