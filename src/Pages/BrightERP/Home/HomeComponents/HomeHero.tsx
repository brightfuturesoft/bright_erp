import React from 'react';

const HomeHero: React.FC = () => {
    return (
        <div>
            <div className="bg-gray-50 dark:bg-dark hero">
                <section className="py-10 sm:py-16 lg:py-24 z-10">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                            <div>
                                <h1 className="text-4xl font-bold text-dark dark:text-light sm:text-6xl lg:text-7xl">
                                    Optimize your business with
                                    <div className="relative inline-flex">
                                        <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-[#3B82F6] dark:border-[#818CF8]"></span>
                                        <h1 className="relative text-4xl font-bold text-dark md:text-light sm:text-6xl lg:text-7xl dark:text-light">YourERP.</h1>
                                    </div>
                                </h1>

                                <p className="mt-8 text-base text-dark md:text-gray-400 sm:text-xl dark:text-gray-400">
                                    Streamline operations, enhance productivity, and drive growth with our comprehensive ERP solutions.
                                </p>

                                <div className="flex items-center md:mt-8 mt-4 gap-2">
                                    <a
                                        href="#"
                                        title=""
                                        className="inline-flex items-center text-wrap whitespace-nowrap justify-center md:px-10 px-3 md:w-auto w-full h-[50px] text-base font-semibold text-white transition-all duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
                                        role="button"
                                    >
                                        Start exploring
                                    </a>

                                    <a
                                        href="#"
                                        title=""
                                        className="inline-flex items-center text-wrap whitespace-nowrap justify-center md:px-7 sm:w-auto w-full px-3 h-[50px] text-base font-semibold transition-all duration-200 border hover:bg-blue-500 hover:text-white border-blue-500 text-blue-500 hover:border-blue-600 focus:border-blue-600 dark:border-blue-800 dark:hover:bg-blue-900 dark:hover:text-white dark:hover:border-blue-900"
                                    >
                                        <svg
                                            className="w-10 h-10 mr-3 text-blue-500 dark:text-blue-800"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Watch video
                                    </a>
                                </div>
                            </div>

                            <div>
                                <img
                                    className="w-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomeHero;
