import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Title from '../../../../Hooks/Title';
const Banefits = () => {
    const benefits = [
        {
            title: 'All-in-One Platform',
            description:
                'No need to juggle multiple tools. Manage sales, inventory, accounts, HR, and support from one simple dashboard.',
            icon: '🛠️',
        },
        {
            title: 'Save Time',
            description:
                'Automated processes reduce repetitive work like stock updates and invoicing, giving you more time to focus on growing your business.',
            icon: '⏱️',
        },
        {
            title: 'Cost-Effective',
            description:
                'A powerful ERP at a fraction of the cost of big enterprise systems—built to fit the budget of small and medium businesses.',
            icon: '💰',
        },
        {
            title: 'Easy to Use',
            description:
                'Our system is designed for everyone, not just tech experts. Simple navigation and clear workflows mean you can get started right away.',
            icon: '👌',
        },
        {
            title: 'Scalable Solution',
            description:
                'Start small and grow big. Whether you add more products, employees, or outlets, the system adapts with your business.',
            icon: '📈',
        },
        {
            title: 'Customer Ownership',
            description:
                'You own your customer data—emails, phone numbers, and order history—without being dependent on social media platforms.',
            icon: '👥',
        },
        {
            title: 'Secure & Reliable',
            description:
                'Your business data is always protected with encrypted storage and daily backups, ensuring peace of mind.',
            icon: '🔒',
        },
        {
            title: 'Access Anywhere',
            description:
                'Work on the go. Access your dashboard, check sales, or update products from any device, anytime.',
            icon: '🌐',
        },
    ];
    return _jsx('section', {
        className:
            'py-10 bg-gray-50 banifite-bg-content dark:bg-dark sm:py-16 lg:py-24',
        children: _jsxs('div', {
            className: 'px-4 mx-auto max-w-7xl sm:px-6 lg:px-8',
            children: [
                _jsx('div', {
                    className: 'text-center',
                    children: _jsx(Title, {
                        subtitle: 'Benefits',
                        title: '3,583 Customers are using Celebration',
                    }),
                }),
                _jsx('div', {
                    className:
                        'px-5 py-8 mt-12 rounded-md dark:bg-light-dark bg-white dark:text-white text-black lg:mt-20 lg:p-16',
                    children: _jsx('div', {
                        className:
                            'grid grid-cols-1 gap-12 lg:gap-16 sm:grid-cols-2',
                        children: benefits.map((benefit, index) =>
                            _jsxs(
                                'div',
                                {
                                    className: 'flex items-start',
                                    children: [
                                        _jsx('span', {
                                            className:
                                                'flex-shrink-0 text-3xl text-fuchsia-600',
                                            children: benefit.icon,
                                        }),
                                        _jsxs('div', {
                                            className: 'ml-5',
                                            children: [
                                                _jsx('h3', {
                                                    className:
                                                        'text-lg font-semibold  ',
                                                    children: benefit.title,
                                                }),
                                                _jsx('p', {
                                                    className:
                                                        'mt-4 text-base dark:text-gray-400 text-gray-600',
                                                    children:
                                                        benefit.description,
                                                }),
                                            ],
                                        }),
                                    ],
                                },
                                index
                            )
                        ),
                    }),
                }),
            ],
        }),
    });
};
export default Banefits;
