import React from 'react';
import Title from '../../../../Hooks/Title';

const faqData = [
    {
        question: 'How to create an account?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    },
    {
        question: 'How can I make payment?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    },
    {
        question: 'Do you provide discounts?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    },
    {
        question: 'How do you provide support?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
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
                                <a
                                    href="#"
                                    title=""
                                    className="text-yellow-300 transition-all duration-200 hover:text-yellow-400 focus:text-yellow-400 hover:underline"
                                >
                                    Contact our support
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faq;
