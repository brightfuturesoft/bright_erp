import React from 'react';
import Title from '../../../../Hooks/Title';
import { Link } from 'react-router-dom';

const faqData = [
    {
        question: 'Do I need technical skills to use this platform?',
        answer: 'No. Our system is designed to be simple and user-friendly. You don’t need coding or IT knowledge. Everything from adding products to generating invoices can be done with a few clicks.',
    },
    {
        question: 'Can I use the platform for both online and physical stores?',
        answer: 'Yes. The system supports both an online storefront and a built-in POS (Point of Sale) for physical stores. All sales sync automatically, so your stock and reports always stay accurate.',
    },
    {
        question: 'Is my business data safe and secure?',
        answer: 'Absolutely. We use encrypted storage, regular backups, and strict role-based permissions to ensure your business and customer data are always protected.',
    },
    {
        question: 'Can I grow my business with this system in the future?',
        answer: 'Yes. The platform is scalable. You can start with basic modules and later expand by adding more products, employees, or outlets without switching systems.',
    },
];

const Faq: React.FC = () => {
    return (
        <div>
            <section className="bg-light dark:bg-gray-900 py-12 ">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-wrap justify-center items-center space-x-4 space-y-4 mt-16 sm:space-y-0">
                    <div className="max-w-2xl mx-auto text-center">
                        <Title
                            subtitle="FAQ"
                            title="Questions & Answers"
                        />
                        <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-black dark:text-gray-300">
                            Explore the common questions and answers about
                            Celebration
                        </p>
                    </div>

                    <div className="grid grid-cols-1  md:mt-12 md:pt-24 md:grid-cols-2 gap-y-16 gap-x-20">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="flex items-start"
                            >
                                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full">
                                    <span className="text-lg font-semibold text-white">
                                        ?
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-semibold dark:text-light text-black">
                                        {faq.question}
                                    </p>
                                    <p className="mt-4 text-base text-black dark:text-gray-400">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center pt-12 justify-center mt-12 pb-12 md:mt-20">
                        <div className="px-8 py-4 text-center flex text-nowrap whitespace-nowrap bg-gray-800 rounded-full">
                            <p className="text-gray-50 md:text-md text-xs text-wrap whitespace-noWrap">
                                Didn’t find the answer you are looking for?{' '}
                                <Link
                                    to="/contact-support"
                                    title=""
                                    className="text-yellow-300 transition-all duration-200 hover:text-yellow-400 focus:text-yellow-400 hover:underline"
                                >
                                    Contact our support
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faq;
