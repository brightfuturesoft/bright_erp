import React from 'react';
import Title from '../../../Hooks/Title';
import team from '@/assets/images/team.png';

const About: React.FC = () => {
    return (
        <div
            className="dark:bg-light-dark bg-white"
            style={{ minHeight: '100vh' }}
        >
            <section className="py-12 dark:bg-light-dark bg-white sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid items-center grid-cols-1 gap-y-8 sm:gap-y-12 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-32">
                        <div className="lg:order-2">
                            <img
                                className="w-full rounded filter drop-shadow-2xl"
                                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-overview/4/product-1.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col justify-between lg:order-1">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold dark:text-light text-black sm:text-4xl">
                                    Bright ERP: Powering Your Business with
                                    Intelligent Software
                                </h2>
                                <p className="mt-6 text-base font-normal leading-7 text-gray-600">
                                    Bright ERP, powered by Bright Future Soft,
                                    delivers smart, simple, and scalable ERP
                                    solutions designed for modern businesses.
                                    From inventory to finance, sales to HR, we
                                    bring everything under one roof so you can
                                    focus on growing your business, not managing
                                    tools.
                                </p>
                            </div>
                            <div className="grid max-w-xs grid-cols-1 mt-10 gap-y-6 sm:max-w-none sm:grid-cols-2 sm:gap-x-8 xl:mt-20 md:gap-x-16 lg:gap-x-8 xl:gap-x-16">
                                <div>
                                    <div className="w-24 h-px bg-gray-200" />
                                    <h3 className="text-lg font-bold dark:text-light text-black mt-7">
                                        Comprehensive ERP Suite
                                    </h3>
                                    <p className="mt-4 text-sm font-normal text-gray-600">
                                        Our all-in-one platform combines
                                        inventory, sales, finance, HR, and
                                        reporting modules into a single
                                        dashboard. No need for multiple apps
                                        everything you need is built in.
                                    </p>
                                </div>
                                <div>
                                    <div className="w-24 h-px bg-gray-200" />
                                    <h3 className="text-lg font-bold dark:text-light text-black mt-7">
                                        Customizable Solutions
                                    </h3>
                                    <p className="mt-4 text-sm font-normal text-gray-600">
                                        Every business is unique. That’s why
                                        Bright ERP is flexible and tailored to
                                        your workflows. Whether you’re a small
                                        seller or a growing enterprise, the
                                        system adapts to your needs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <Title subtitle='About' title='About Us' /> */}

            <section className="py-12 dark:bg-light-dark bg-white sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid items-center grid-cols-1 sm:grid-cols-2 sm:gap-y-12 sm:gap-x-12 gap-y-6 lg:grid-cols-3 lg:gap-x-16">
                        <div className="lg:order-2 sm:col-span-2 lg:col-span-1">
                            <img
                                className="object-cover w-full h-full rounded-xl"
                                src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-overview/2/product-1.png"
                                alt=""
                            />
                        </div>
                        <div className="mt-4 lg:order-1 sm:mt-0">
                            <ul className="space-y-6 sm:space-y-12 xl:space-y-16">
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-gray-200">
                                            Streamlined Operations
                                        </h3>
                                        <p className="mt-5 text-sm font-normal text-gray-500">
                                            Automate daily tasks like billing,
                                            stock tracking, and order management
                                            to save time and reduce errors.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                        />
                                    </svg>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-gray-200">
                                            Easy-to-Use Design
                                        </h3>
                                        <p className="mt-5 text-sm font-normal text-gray-500">
                                            No IT background needed. The clean
                                            and simple interface helps you get
                                            started within minutes.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                        />
                                    </svg>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-gray-200">
                                            Secure Cloud Platform
                                        </h3>
                                        <p className="mt-5 text-sm font-normal text-gray-500">
                                            Your data is encrypted, backed up
                                            daily, and accessible anywhere,
                                            anytime.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:order-3">
                            <ul className="space-y-6 sm:space-y-12 xl:space-y-16">
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
                                        />
                                    </svg>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-gray-200">
                                            Scalable Growth
                                        </h3>
                                        <p className="mt-5 text-sm font-normal text-gray-500">
                                            Start small and expand as you
                                            grow—add more products, outlets, or
                                            team members without hassle.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-gray-200">
                                            Real-Time Insights
                                        </h3>
                                        <p className="mt-5 text-sm font-normal text-gray-500">
                                            Get instant reports on sales,
                                            expenses, and inventory so you can
                                            make informed decisions quickly.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg
                                        className="flex-shrink-0 w-6 h-6 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                                        />
                                    </svg>
                                    <div className="ml-6">
                                        <h3 className="text-lg font-bold text-gray-200">
                                            Customer-Centric Approach
                                        </h3>
                                        <p className="mt-5 text-sm font-normal text-gray-500">
                                            Build stronger customer
                                            relationships with built-in CRM,
                                            order tracking, and support tools.
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden dark:bg-light-dark bg-white ">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-x-16">
                        <div className="pt-10 pb-12 sm:pt-16 lg:py-20 xl:py-24">
                            <div className="text-center lg:self-center lg:text-left">
                                <h2 className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                                    Empowering businesses with innovative ERP
                                    solutions
                                </h2>
                                <p className="mt-8 text-lg font-normal text-gray-400">
                                    Amet minim mollit non deserunt ullamco est
                                    sit aliqua dolor do amet sint. Velit officia
                                    consequat duis enim velit mollit.
                                </p>
                                <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                                    <div className="absolute transition-all duration-200 rounded-md -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50" />
                                    <a
                                        href="#"
                                        title=""
                                        className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-md"
                                        role="button"
                                    >
                                        Learn More About Bright ERP
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="-mt-6 aspect-w-5 py-20 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                            <img
                                className="object-cover "
                                src={team}
                                alt="App screenshot"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
