import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import logoDark from '../../../../assets/logo/white_logo.png';
import logoLight from '../../../../assets/logo/logo.png';
import { Link } from 'react-router-dom';
import { message } from 'antd';
const Footer = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubscribe = async e => {
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
    return _jsx('section', {
        className: 'bg-light dark:bg-dark py-10 sm:pt-16 lg:pt-24',
        children: _jsxs('div', {
            className: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
            children: [
                _jsxs('div', {
                    className:
                        'gap-x-12 gap-y-16 grid grid-cols-2 lg:grid-cols-6 md:col-span-3',
                    children: [
                        _jsxs('div', {
                            className:
                                'col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8',
                            children: [
                                _jsxs('div', {
                                    children: [
                                        _jsx('div', {
                                            className:
                                                'dark:block flex-shrink-0 hidden',
                                            children: _jsx(Link, {
                                                to: '/',
                                                className: 'flex',
                                                children: _jsx('img', {
                                                    className: 'w-[140px]',
                                                    src: logoLight,
                                                    alt: 'logo',
                                                }),
                                            }),
                                        }),
                                        _jsx('div', {
                                            className:
                                                'block flex-shrink-0 dark:hidden',
                                            children: _jsx(Link, {
                                                to: '/',
                                                className: 'flex',
                                                children: _jsx('img', {
                                                    className: 'w-[140px]',
                                                    src: logoDark,
                                                    alt: 'logo',
                                                }),
                                            }),
                                        }),
                                    ],
                                }),
                                _jsx('p', {
                                    className:
                                        'mt-7 text-base text-gray-600 leading-relaxed',
                                    children:
                                        'Manage smarter, sell faster, and grow bigger all with Orybiz by your side.',
                                }),
                                _jsxs('ul', {
                                    className:
                                        'flex items-center space-x-3 mt-9',
                                    children: [
                                        _jsx('li', {
                                            children: _jsx('a', {
                                                href: '#',
                                                className:
                                                    'flex justify-center items-center bg-blue-800 hover:bg-blue-600 rounded-full w-7 h-7 text-white transition-all duration-200',
                                                children: _jsx('svg', {
                                                    className: 'w-4 h-4',
                                                    xmlns: 'http://www.w3.org/2000/svg',
                                                    viewBox: '0 0 24 24',
                                                    fill: 'currentColor',
                                                    children: _jsx('path', {
                                                        d: 'M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z',
                                                    }),
                                                }),
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx('a', {
                                                href: '#',
                                                className:
                                                    'flex justify-center items-center bg-blue-600 hover:bg-blue-500 rounded-full w-7 h-7 text-white transition-all duration-200',
                                                children: _jsx('svg', {
                                                    className: 'w-4 h-4',
                                                    xmlns: 'http://www.w3.org/2000/svg',
                                                    viewBox: '0 0 24 24',
                                                    fill: 'currentColor',
                                                    children: _jsx('path', {
                                                        d: 'M22 12a10 10 0 1 0-11.5 9.95v-7.05h-2.7v-2.9h2.7V9.8c0-2.66 1.58-4.14 4-4.14 1.16 0 2.38.2 2.38.2v2.62h-1.34c-1.32 0-1.73.82-1.73 1.66v2h2.95l-.47 2.9h-2.48V22A10 10 0 0 0 22 12z',
                                                    }),
                                                }),
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx('a', {
                                                href: '#',
                                                className:
                                                    'flex justify-center items-center bg-pink-500 hover:bg-pink-400 rounded-full w-7 h-7 text-white transition-all duration-200',
                                                children: _jsx('svg', {
                                                    className: 'w-4 h-4',
                                                    xmlns: 'http://www.w3.org/2000/svg',
                                                    viewBox: '0 0 24 24',
                                                    fill: 'currentColor',
                                                    children: _jsx('path', {
                                                        d: 'M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.402a4.92 4.92 0 0 1 1.77 1.036 4.92 4.92 0 0 1 1.036 1.77c.162.46.346 1.26.402 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.402 2.43a4.92 4.92 0 0 1-1.036 1.77 4.92 4.92 0 0 1-1.77 1.036c-.46.162-1.26.346-2.43.402-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.402a4.92 4.92 0 0 1-1.77-1.036 4.92 4.92 0 0 1-1.036-1.77c-.162-.46-.346-1.26-.402-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.402-2.43a4.92 4.92 0 0 1 1.036-1.77 4.92 4.92 0 0 1 1.77-1.036c.46-.162 1.26-.346 2.43-.402C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.735 0 8.332.012 7.052.07 5.782.128 4.842.308 4.042.573a7.1 7.1 0 0 0-2.565 1.65A7.1 7.1 0 0 0 .573 4.042c-.265.8-.445 1.74-.503 3.01C.012 8.332 0 8.735 0 12s.012 3.668.07 4.948c.058 1.27.238 2.21.503 3.01a7.1 7.1 0 0 0 1.65 2.565 7.1 7.1 0 0 0 2.565 1.65c.8.265 1.74.445 3.01.503C8.332 23.988 8.735 24 12 24s3.668-.012 4.948-.07c1.27-.058 2.21-.238 3.01-.503a7.1 7.1 0 0 0 2.565-1.65 7.1 7.1 0 0 0 1.65-2.565c.265-.8.445-1.74.503-3.01.058-1.28.07-1.683.07-4.948s-.012-3.668-.07-4.948c-.058-1.27-.238-2.21-.503-3.01a7.1 7.1 0 0 0-1.65-2.565 7.1 7.1 0 0 0-2.565-1.65c-.8-.265-1.74-.445-3.01-.503C15.668.012 15.265 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.998 3.998 0 1 1 0-7.996 3.998 3.998 0 0 1 0 7.996zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z',
                                                    }),
                                                }),
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx('a', {
                                                href: '#',
                                                className:
                                                    'flex justify-center items-center bg-blue-700 hover:bg-blue-500 rounded-full w-7 h-7 text-white transition-all duration-200',
                                                children: _jsx('svg', {
                                                    className: 'w-4 h-4',
                                                    xmlns: 'http://www.w3.org/2000/svg',
                                                    viewBox: '0 0 24 24',
                                                    fill: 'currentColor',
                                                    children: _jsx('path', {
                                                        d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.036-1.851-3.036-1.852 0-2.136 1.446-2.136 2.939v5.666h-3.554v-11.5h3.413v1.569h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.368 4.267 5.451v6.33zM5.337 9.452c-1.144 0-2.067-.926-2.067-2.067 0-1.144.923-2.067 2.067-2.067 1.143 0 2.067.923 2.067 2.067 0 1.141-.924 2.067-2.067 2.067zm1.777 11h-3.554v-11.5h3.554v11.5zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.206 24 24 23.226 24 22.271V1.729C24 .774 23.206 0 22.225 0z',
                                                    }),
                                                }),
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            children: [
                                _jsx('p', {
                                    className:
                                        'font-semibold text-dark text-sm dark:text-light uppercase tracking-widest',
                                    children: 'Company',
                                }),
                                _jsxs('ul', {
                                    className: 'space-y-4 mt-6',
                                    children: [
                                        _jsx('li', {
                                            children: _jsx('a', {
                                                href: '#',
                                                className:
                                                    'flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200',
                                                children: 'About',
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx(Link, {
                                                to: '/features',
                                                className:
                                                    'flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200',
                                                children: 'Features',
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx(Link, {
                                                to: 'https://www.brightfuturesoft.com/careers',
                                                className:
                                                    'flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200',
                                                children: 'Career',
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            children: [
                                _jsx('p', {
                                    className:
                                        'font-semibold text-dark text-sm dark:text-light uppercase tracking-widest',
                                    children: 'Help',
                                }),
                                _jsxs('ul', {
                                    className: 'space-y-4 mt-6',
                                    children: [
                                        _jsx('li', {
                                            children: _jsx(Link, {
                                                to: '/contact-support',
                                                className:
                                                    'flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200',
                                                children: 'Customer Support',
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx(Link, {
                                                to: '/terms-conditions',
                                                className:
                                                    'flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200',
                                                children: 'Terms & Conditions',
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx(Link, {
                                                to: '/privacy-policy',
                                                className:
                                                    'flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200',
                                                children: 'Privacy Policy',
                                            }),
                                        }),
                                        _jsx('li', {
                                            children: _jsx(Link, {
                                                to: '/faq',
                                                className:
                                                    'flex text-base text-black dark:hover:text-blue-500 hover:text-blue-600 focus:text-blue-600 dark:text-light transition-all duration-200',
                                                children: 'FAQ',
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className:
                                'col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8',
                            children: [
                                _jsx('p', {
                                    className:
                                        'font-semibold text-dark text-sm dark:text-light uppercase tracking-widest',
                                    children: 'Subscribe to newsletter',
                                }),
                                _jsxs('form', {
                                    onSubmit: handleSubscribe,
                                    className: 'mt-6',
                                    children: [
                                        _jsxs('div', {
                                            children: [
                                                _jsx('label', {
                                                    htmlFor: 'email',
                                                    className: 'sr-only',
                                                    children: 'Email',
                                                }),
                                                _jsx('input', {
                                                    type: 'email',
                                                    name: 'email',
                                                    id: 'email',
                                                    value: email,
                                                    onChange: e =>
                                                        setEmail(
                                                            e.target.value
                                                        ),
                                                    placeholder:
                                                        'Enter your email',
                                                    className:
                                                        'block border-gray-200 bg-white dark:bg-gray-800 p-2 border focus:border-blue-600 rounded-md w-full text-black transition-all duration-200 placeholder-gray-500 focus:outline-none caret-blue-600',
                                                }),
                                            ],
                                        }),
                                        _jsx('button', {
                                            type: 'submit',
                                            disabled: loading,
                                            className:
                                                'inline-flex justify-center items-center bg-blue-600 dark:hover:bg-gray-700 hover:bg-blue-700 focus:bg-blue-700 dark:bg-light-dark mt-3 px-6 py-2 rounded-md font-semibold text-white transition-all duration-200 disabled:opacity-50',
                                            children: loading
                                                ? 'Subscribing...'
                                                : 'Subscribe',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                _jsx('hr', { className: 'border-gray-200 mt-16 mb-10' }),
                _jsxs('p', {
                    className: 'text-center text-gray-600 text-sm',
                    children: [
                        '\u00A9 Copyright ',
                        new Date().getFullYear(),
                        ', All Rights Reserved by Orybiz',
                    ],
                }),
            ],
        }),
    });
};
export default Footer;
