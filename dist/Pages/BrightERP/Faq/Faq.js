import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Link } from 'react-router-dom';
export function Faq() {
    return _jsx('section', {
        className: 'bg-gray-50 dark:bg-gray-900',
        children: _jsxs('div', {
            className:
                'mx-auto flex w-full max-w-7xl flex-col items-center py-16 px-8 md:py-20',
            children: [
                _jsxs('div', {
                    className:
                        'mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10',
                    children: [
                        _jsx('p', {
                            className:
                                'font-inter mb-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300',
                            children: 'Help (FAQ)',
                        }),
                        _jsx('h2', {
                            className:
                                'mx-auto text-center font-bold text-black dark:text-white text-2xl sm:text-3xl lg:text-5xl',
                            children: 'Frequently Asked Questions',
                        }),
                        _jsx('p', {
                            className:
                                'font-inter mt-4 max-w-xl px-5 text-center text-base font-light text-gray-500 dark:text-gray-400 lg:max-w-lg',
                            children:
                                'We understand that starting with a new platform may raise questions. Here are some of the most common ones:',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className:
                        'mt-10 flex w-full flex-col divide-y divide-gray-200 dark:divide-gray-700',
                    children: [
                        _jsxs('div', {
                            className: 'relative py-8 px-6 lg:px-12',
                            children: [
                                _jsx('h2', {
                                    className:
                                        'font-bold text-black dark:text-white text-xl',
                                    children: '1) How do I launch my store?',
                                }),
                                _jsx('p', {
                                    className:
                                        'font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300',
                                    children:
                                        'Simply sign up with your email, business name, and logo. Our system will automatically create your store and give you a unique subdomain. You can start adding products immediately.',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'relative py-8 px-6 lg:px-12',
                            children: [
                                _jsx('h2', {
                                    className:
                                        'font-bold text-black dark:text-white text-xl',
                                    children:
                                        '2) Can I use my own domain name?',
                                }),
                                _jsx('p', {
                                    className:
                                        'font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300',
                                    children:
                                        'Yes! Basic plan and above allow you to connect your own domain for a fully branded store.',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'relative py-8 px-6 lg:px-12',
                            children: [
                                _jsx('h2', {
                                    className:
                                        'font-bold text-black dark:text-white text-xl',
                                    children: '3) How do payments work?',
                                }),
                                _jsx('p', {
                                    className:
                                        'font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300',
                                    children:
                                        'Initially, you can accept Cash on Delivery (COD) and manual bank transfer. Soon, we will integrate with payment gateways such as SSLCOMMERZ, Stripe, and bKash/Nagad.',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'relative py-8 px-6 lg:px-12',
                            children: [
                                _jsx('h2', {
                                    className:
                                        'font-bold text-black dark:text-white text-xl',
                                    children:
                                        '4) How does inventory get updated?',
                                }),
                                _jsx('p', {
                                    className:
                                        'font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300',
                                    children:
                                        'Every time a paid order is confirmed, your stock quantity automatically decreases. You can also manually adjust stock for damaged or returned items.',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'relative py-8 px-6 lg:px-12',
                            children: [
                                _jsx('h2', {
                                    className:
                                        'font-bold text-black dark:text-white text-xl',
                                    children: '5) How do I download invoices?',
                                }),
                                _jsx('p', {
                                    className:
                                        'font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300',
                                    children:
                                        'Go to Sales \u2192 Order Details \u2192 click \u201CGenerate Invoice (PDF).\u201D It will include your store logo, product details, tax, and totals.',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'relative py-8 px-6 lg:px-12',
                            children: [
                                _jsx('h2', {
                                    className:
                                        'font-bold text-black dark:text-white text-xl',
                                    children: '6) How can I contact support?',
                                }),
                                _jsxs('p', {
                                    className:
                                        'font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300',
                                    children: [
                                        'You can open a support ticket inside your dashboard, send us an email at',
                                        ' ',
                                        _jsx('a', {
                                            href: 'mailto:support@brightfuturesoft.com',
                                            className:
                                                'text-black dark:text-blue-400 font-bold underline',
                                            children:
                                                'support@brightfuturesoft.com',
                                        }),
                                        ', or call our support line during business hours.',
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('p', {
                    className:
                        'font-inter mx-auto mt-12 text-center text-base text-gray-600 dark:text-gray-400',
                    children: [
                        'Can\u2019t find the answer you\u2019re looking for? Reach out to our',
                        ' ',
                        _jsx(Link, {
                            to: '/contact-support',
                            className:
                                'text-black dark:text-blue-400 font-bold underline',
                            children: 'customer support team.',
                        }),
                    ],
                }),
            ],
        }),
    });
}
