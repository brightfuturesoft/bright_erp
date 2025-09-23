import React from 'react';
import Title from '../../../../Hooks/Title';

const Banefits: React.FC = () => {
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

    return (
        <section className="py-10 bg-gray-50 banifite-bg-content dark:bg-dark sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <Title
                        subtitle="Benefits"
                        title="3,583 Customers are using Celebration"
                    />
                </div>

                <div className="px-5 py-8 mt-12 rounded-md dark:bg-light-dark bg-white dark:text-white text-black lg:mt-20 lg:p-16">
                    <div className="grid grid-cols-1 gap-12 lg:gap-16 sm:grid-cols-2">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-start"
                            >
                                <span className="flex-shrink-0 text-3xl text-fuchsia-600">
                                    {benefit.icon}
                                </span>
                                <div className="ml-5">
                                    <h3 className="text-lg font-semibold  ">
                                        {benefit.title}
                                    </h3>
                                    <p className="mt-4 text-base dark:text-gray-400 text-gray-600">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banefits;
