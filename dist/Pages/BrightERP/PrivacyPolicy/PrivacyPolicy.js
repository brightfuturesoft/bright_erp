import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import React from 'react';
import { ArrowUp } from 'lucide-react';
export default function PrivacyPolicy() {
    const [showTop, setShowTop] = React.useState(false);
    React.useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 200);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    return _jsxs('div', {
        className:
            'min-h-screen \n      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-200 \n      p-6 sm:p-12 font-sans transition-colors duration-500 relative px-8ya',
        children: [
            _jsxs('div', {
                className:
                    'max-w-7xl mx-auto rounded-3xl \n        bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl \n        border border-white/20 dark:border-slate-700/30 overflow-hidden',
                children: [
                    _jsxs('div', {
                        className:
                            'px-8 py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 \n          dark:from-slate-700 dark:via-indigo-900 dark:to-slate-900 animate-gradient-x \n          rounded-t-3xl shadow-lg',
                        children: [
                            _jsx('h1', {
                                className:
                                    'text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight',
                                children: 'Privacy Policy',
                            }),
                            _jsx('p', {
                                className:
                                    'text-sm opacity-90 text-white font-light',
                                children: 'Last Updated: 22 September, 2025',
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'px-8 py-12 space-y-12',
                        children: [
                            _jsx('p', {
                                className:
                                    'leading-relaxed text-lg text-gray-700 dark:text-gray-300',
                                children:
                                    'We respect your privacy and are committed to protecting your personal information. This policy outlines our practices regarding data collection and use.',
                            }),
                            _jsxs(Section, {
                                title: 'Information We Collect',
                                children: [
                                    _jsx(ListItem, {
                                        children:
                                            '\uD83D\uDC64 Account details: name, email, phone',
                                    }),
                                    _jsx(ListItem, {
                                        children:
                                            '\uD83D\uDED2 Store, product, and order data',
                                    }),
                                    _jsx(ListItem, {
                                        children:
                                            '\uD83D\uDCBB Device/browser/IP information for security and analytics',
                                    }),
                                ],
                            }),
                            _jsxs(Section, {
                                title: 'How We Use Information',
                                children: [
                                    _jsx(ListItem, {
                                        children:
                                            '\u26A1 To provide and improve our services',
                                    }),
                                    _jsx(ListItem, {
                                        children:
                                            '\uD83D\uDD12 To secure your account and prevent fraud',
                                    }),
                                    _jsx(ListItem, {
                                        children:
                                            '\uD83D\uDCCA To analyze platform usage and improve user experience',
                                    }),
                                ],
                            }),
                            _jsx(Section, {
                                title: 'Data Sharing',
                                children: _jsxs('p', {
                                    className:
                                        'text-gray-600 dark:text-gray-400 leading-relaxed',
                                    children: [
                                        'We only share data with trusted third-party service providers (hosting, payment, email) necessary to deliver the service. We',
                                        ' ',
                                        _jsx('span', {
                                            className:
                                                'font-bold text-gray-800 dark:text-gray-200',
                                            children: 'never',
                                        }),
                                        ' ',
                                        'sell your data.',
                                    ],
                                }),
                            }),
                            _jsx(Section, {
                                title: 'Your Rights',
                                children: _jsxs('p', {
                                    className:
                                        'text-gray-600 dark:text-gray-400 leading-relaxed',
                                    children: [
                                        'You have the right to export, correct, or delete your data. To make a request, email',
                                        ' ',
                                        _jsx('a', {
                                            href: 'mailto:privacy@brightfuturesoft.com',
                                            className:
                                                'font-medium text-indigo-500 hover:text-indigo-400 transition-colors duration-300 underline',
                                            children:
                                                'privacy@brightfuturesoft.com',
                                        }),
                                        '.',
                                    ],
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            showTop &&
                _jsx('button', {
                    onClick: scrollToTop,
                    className:
                        'fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white \n          shadow-lg hover:bg-indigo-500 transition-all duration-300',
                    children: _jsx(ArrowUp, { size: 20 }),
                }),
        ],
    });
}
/* Reusable Section Component */
const Section = ({ title, children }) =>
    _jsxs('div', {
        children: [
            _jsxs('h2', {
                className:
                    'text-2xl font-semibold mb-4 text-gray-900 dark:text-white relative pb-2',
                children: [
                    _jsx('span', {
                        className: 'relative z-10',
                        children: title,
                    }),
                    _jsx('span', {
                        className:
                            'absolute left-0 bottom-0 w-14 h-1 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full',
                    }),
                ],
            }),
            _jsx('div', { className: 'space-y-3', children: children }),
        ],
    });
/* Reusable List Item with hover effect */
const ListItem = ({ children }) =>
    _jsx('li', {
        className:
            'flex items-start gap-2 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700/40 transition-colors duration-300',
        children: _jsx('span', { className: 'text-xl', children: children }),
    });
