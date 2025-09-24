import React, { useContext, useState } from 'react';
import logoDark from '../../../../assets/logoDark.png';
import logoLight from '../../../../assets/logoLight.png';
import { Link } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
import { message } from 'antd';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            message.warning('Please enter your email!');
            return;
        }
        try {
            setLoading(true);
            const newsletterData = { email };
            const url = `${import.meta.env.VITE_BASE_URL}home/newsletter/create-newsletter`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsletterData),
            });
            const data = await res.json();
            if (res.ok) {
                message.success('Subscribed successfully 🎉');
                setEmail('');
            } else {
                message.error(data.message || 'You have already subscribed!');
            }
        } catch (error) {
            console.error(error);
            message.error('Server error!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-light dark:bg-dark py-10 sm:pt-16 lg:pt-24">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="gap-x-12 gap-y-16 grid grid-cols-2 lg:grid-cols-6 md:col-span-3">
                    {/* Logo & About */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                        <div>
                            <div className="dark:block flex-shrink-0 hidden">
                                <Link
                                    to="/"
                                    className="flex"
                                >
                                    <img
                                        className="w-[140px]"
                                        src={logoLight}
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div className="block flex-shrink-0 dark:hidden">
                                <Link
                                    to="/"
                                    className="flex"
                                >
                                    <img
                                        className="w-[140px]"
                                        src={logoDark}
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                        </div>

                        <p className="mt-7 text-base text-gray-600 leading-relaxed">
                            Manage smarter, sell faster, and grow bigger all
                            with Bright ERP by your side.
                        </p>

                        {/* Social Icons */}
                        <ul className="flex items-center space-x-3 mt-9">
                            <li>
                                <a
                                    href="#"
                                    className="flex justify-center items-center bg-gray-800 hover:bg-blue-600 focus:bg-blue-600 rounded-full w-7 h-7 text-white transition-all duration-200"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                                    </svg>
                                </a>
                            </li>
                            {/* other social icons ... */}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <p className="font-semibold text-dark text-sm dark:text-light uppercase tracking-widest">
                            Company
                        </p>
                        <ul className="space-y-4 mt-6">
                            <li>
                                <a
                                    href="#"
                                    className="flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/features"
                                    className="flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://www.brightfuturesoft.com/careers"
                                    className="flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200"
                                >
                                    Career
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <p className="font-semibold text-dark text-sm dark:text-light uppercase tracking-widest">
                            Help
                        </p>
                        <ul className="space-y-4 mt-6">
                            <li>
                                <Link
                                    to="/contact-support"
                                    className="flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200"
                                >
                                    Customer Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms-conditions"
                                    className="flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    className="flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                        <p className="font-semibold text-dark text-sm dark:text-light uppercase tracking-widest">
                            Subscribe to newsletter
                        </p>

                        <form
                            onSubmit={handleSubscribe}
                            className="mt-6"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="sr-only"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="block border-gray-200 bg-white dark:bg-gray-800 p-2 border focus:border-blue-600 rounded-md w-full text-black transition-all duration-200 placeholder-gray-500 focus:outline-none caret-blue-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex justify-center items-center bg-blue-600 dark:hover:bg-gray-700 hover:bg-blue-700 focus:bg-blue-700 dark:bg-light-dark mt-3 px-6 py-2 rounded-md font-semibold text-white transition-all duration-200 disabled:opacity-50"
                            >
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>
                    </div>
                </div>

                <hr className="border-gray-200 mt-16 mb-10" />

                <p className="text-center text-gray-600 text-sm">
                    © Copyright {new Date().getFullYear()}, All Rights Reserved
                    by Bright ERP
                </p>
            </div>
        </section>
    );
};

export default Footer;
