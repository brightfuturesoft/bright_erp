import React from 'react';
import Title from '../../../../Hooks/Title';

const Banefits: React.FC = () => {
    const benefits = [
        {
            title: 'Lifetime free basic usage',
            description:
                'Using our free GST accounting and billing software, you can seamlessly create custom invoices. Further, you can manage your dashboard and track inventory items. The free access provides you use many other useful features.',
            icon: '🔒',
        },
        {
            title: 'Track your business status',
            description:
                'Vyapar business dashboard makes the entire management process seamless. You can check business cash flow, inventory status, open orders, and payment updates in one place.',
            icon: '📊',
        },
        {
            title: 'Manage cashflow seamlessly',
            description:
                'GST billing & accounting software allows businesses to record transactions. It helps track payments. Over 1 crore businesses have tried out our free billing management software features. Cashflow management is widely used for their billing, accounting, and many more.',
            icon: '💵',
        },
        {
            title: 'Online/Offline billing',
            description:
                'Using our billing tool, you need not stop business operations due to weak internet connectivity. You can use the offline billing features in the app to generate bills.',
            icon: '💻',
        },
        {
            title: 'Provide multiple payment options',
            description:
                'Your customers are less likely to default on the payments if you provide multiple payment options for convenience. You can provide choices like UPI, QR, NEFT, IMPS, e-wallet, and credit/debit cards.',
            icon: '💳',
        },
        {
            title: 'Keep data safe with backups',
            description:
                'Using our free GST software for billing in India, you can set up an automatic data backup, allowing you to safeguard the data stored in the app. For additional safety, you can create a local backup too.',
            icon: '💾',
        },
        {
            title: 'Build a positive brand image',
            description:
                'Providing professional quotes and estimates during negotiation builds a positive brand image. Further, you can provide complete disclosure about the deal to build trust.',
            icon: '🏆',
        },
        {
            title: 'Plan your inventory space',
            description:
                'Using our GST billing software, you can keep track of available items in your store. It can help you set up low inventory alerts to place advance orders and detect possible theft.',
            icon: '📦',
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
