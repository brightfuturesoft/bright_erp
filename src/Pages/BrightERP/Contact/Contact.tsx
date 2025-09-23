import React from 'react';

const Contact: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 lg:p-12 font-sans">
            <div className="container max-w-7xl lg:px-8  mx-auto items-start grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Section */}
                <div className="flex flex-col justify-center text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                        Come collaborate
                        <br />
                        with <span className="text-blue-600">Bright ERP</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 max-w-md">
                        Need support or have a question? Send us a message, and
                        we'll be in touch. Reach out to us at:
                    </p>
                    <a
                        href="mailto:hello@brightfutresoft.io"
                        className="text-lg sm:text-xl lg:text-2xl text-black dark:text-blue-400 underline font-bold"
                    >
                        hello@brightfutresoft.io
                    </a>
                </div>

                {/* Right Section */}
                <div className="relative flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg">
                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                            Say hello! 👋
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter name"
                                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter contact number"
                                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter message title/subject"
                                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Write a message"
                                    rows={5}
                                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-500 bg-white dark:bg-gray-700 dark:text-white resize-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600  text-white  py-2 px-9  hover:bg-blue-600 transition-colors flex items-center"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
