import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
const TestDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return _jsxs('div', {
        className: 'flex h-screen bg-gray-100 mx',
        children: [
            _jsxs('div', {
                className: `fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 text-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`,
                children: [
                    _jsx('div', {
                        className: 'flex items-center justify-center mt-8',
                        children: _jsx('div', {
                            className: 'flex items-center',
                            children: _jsx('span', {
                                className: 'text-2xl font-semibold',
                                children: 'Dashboard',
                            }),
                        }),
                    }),
                    _jsxs('nav', {
                        className: 'mt-10',
                        children: [
                            _jsx('a', {
                                className:
                                    'block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white',
                                href: '#home',
                                children: 'Home',
                            }),
                            _jsx('a', {
                                className:
                                    'block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white',
                                href: '#services',
                                children: 'Services',
                            }),
                            _jsx('a', {
                                className:
                                    'block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white',
                                href: '#clients',
                                children: 'Clients',
                            }),
                            _jsx('a', {
                                className:
                                    'block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white',
                                href: '#contact',
                                children: 'Contact',
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex-1 flex flex-col overflow-hidden',
                children: [
                    _jsxs('header', {
                        className:
                            'flex items-center justify-between p-4 bg-white shadow-md',
                        children: [
                            _jsx('button', {
                                onClick: () => setIsSidebarOpen(!isSidebarOpen),
                                className:
                                    'text-gray-500 focus:outline-none md:hidden',
                                children: _jsx('svg', {
                                    className: 'w-6 h-6',
                                    fill: 'none',
                                    stroke: 'currentColor',
                                    viewBox: '0 0 24 24',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    children: _jsx('path', {
                                        strokeLinecap: 'round',
                                        strokeLinejoin: 'round',
                                        strokeWidth: '2',
                                        d: 'M4 6h16M4 12h16M4 18h16',
                                    }),
                                }),
                            }),
                            _jsx('h1', {
                                className:
                                    'text-xl font-semibold text-gray-800',
                                children: 'Dashboard...',
                            }),
                            _jsx('button', {
                                className: 'bg-[red]',
                                children: 'Home',
                            }),
                        ],
                    }),
                    _jsxs('main', {
                        className:
                            'flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6',
                        children: [
                            _jsx('h2', {
                                className:
                                    'text-2xl font-semibold text-gray-700',
                                children: 'Dashboard Content',
                            }),
                            _jsx('p', {
                                className: 'mt-4 text-gray-600',
                                children:
                                    'This is a responsive dashboard layout using Tailwind CSS and React.',
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
export default TestDashboardLayout;
