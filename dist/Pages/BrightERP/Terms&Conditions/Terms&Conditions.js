import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
export default function TermsAndConditions() {
    return _jsx('section', {
        className:
            'min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 md:px-12 py-12 transition-colors duration-500',
        children: _jsxs('div', {
            className: 'max-w-7xl mx-auto lg:px-8',
            children: [
                _jsxs('div', {
                    className:
                        'mb-10 border-b border-gray-200 dark:border-gray-700 pb-8',
                    children: [
                        _jsx('h1', {
                            className: 'text-3xl md:text-5xl font-bold mb-4',
                            children: 'Terms & Conditions',
                        }),
                        _jsx('p', {
                            className:
                                'text-sm text-gray-600 dark:text-gray-400',
                            children:
                                'By accessing and using our services, you agree to the following terms:',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'space-y-8',
                    children: [
                        _jsx(Term, {
                            number: '1',
                            title: 'Accounts & Security',
                            content:
                                'You are responsible for keeping your login credentials confidential. Any unauthorized use of your account is your responsibility.',
                        }),
                        _jsx(Term, {
                            number: '2',
                            title: 'Subscription & Billing',
                            content:
                                'All subscriptions are billed in advance on a monthly or annual basis. Refunds are not provided for partial months of service.',
                        }),
                        _jsx(Term, {
                            number: '3',
                            title: 'Use of Service',
                            content:
                                'You may not use the platform for illegal, fraudulent, or harmful activities. Violation may result in account suspension.',
                        }),
                        _jsx(Term, {
                            number: '4',
                            title: 'Content & Ownership',
                            content:
                                'You retain full ownership of the data you upload (products, customer info, sales). We only process and store data for providing the service.',
                        }),
                        _jsx(Term, {
                            number: '5',
                            title: 'Uptime & Maintenance',
                            content:
                                'We aim for 99.5% uptime. Scheduled maintenance may cause short interruptions, which will be announced in advance.',
                        }),
                        _jsx(Term, {
                            number: '6',
                            title: 'Limitation of Liability',
                            content:
                                'We are not responsible for indirect or incidental damages. Our maximum liability is limited to the subscription fees paid in the last 3 months.',
                        }),
                        _jsx(Term, {
                            number: '7',
                            title: 'Changes to Terms',
                            content:
                                'We may update these Terms occasionally. Updates will be posted here with a new \u201CLast Updated\u201D date.',
                        }),
                        _jsx(Term, {
                            number: '8',
                            title: 'Governing Law',
                            content:
                                'These terms are governed by the laws of Bangladesh.',
                        }),
                    ],
                }),
                _jsx('div', {
                    className:
                        'mt-12 pt-8 border-t border-gray-200 dark:border-gray-700',
                    children: _jsxs('p', {
                        className: 'text-sm text-gray-600 dark:text-gray-400',
                        children: [
                            'Last Updated:',
                            ' ',
                            _jsx('span', {
                                className: 'font-medium',
                                children: '22 September, 2025',
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
}
const Term = ({ number, title, content }) =>
    _jsxs('div', {
        children: [
            _jsxs('h2', {
                className: 'text-xl font-semibold flex items-center gap-2 mb-2',
                children: [
                    _jsxs('span', {
                        className:
                            'text-indigo-500 dark:text-indigo-400 font-bold',
                        children: [number, '.'],
                    }),
                    ' ',
                    title,
                ],
            }),
            _jsx('p', {
                className: 'text-gray-700 dark:text-gray-300 leading-relaxed',
                children: content,
            }),
        ],
    });
