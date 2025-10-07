import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Lottie from 'lottie-react';
import hero_animation from '../../../../assets/images/hero1_animation.json';
import { Link } from 'react-router-dom';
const HomeHero = () => {
    const [open, setOpen] = useState(false);
    return _jsxs('div', {
        children: [
            _jsx('div', {
                className: 'bg-gray-50 dark:bg-dark hero',
                children: _jsx('section', {
                    className: 'z-10 py-10 sm:py-16 lg:py-24',
                    children: _jsx('div', {
                        className: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
                        children: _jsxs('div', {
                            className:
                                'items-center gap-12 grid grid-cols-1 lg:grid-cols-2',
                            children: [
                                _jsxs('div', {
                                    children: [
                                        _jsxs('h1', {
                                            className:
                                                'font-bold text-4xl text-dark sm:text-6xl lg:text-7xl dark:text-light my-5',
                                            children: [
                                                'Optimize your business with',
                                                _jsxs('div', {
                                                    className:
                                                        'inline-flex relative',
                                                    children: [
                                                        _jsx('span', {
                                                            className:
                                                                'bottom-0 absolute inset-x-0 border-blue-500 dark:border-blue-500  border-b-[30px]',
                                                        }),
                                                        _jsx('h1', {
                                                            className:
                                                                'relative font-bold text-4xl text-dark sm:text-6xl lg:text-7xl dark:text-light',
                                                            children: 'Orybiz.',
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        _jsx('p', {
                                            className:
                                                'mt-8 text-base text-dark sm:text-xl md:text-gray-400 dark:text-gray-400',
                                            children:
                                                'Streamline operations, enhance productivity, and drive growth with our comprehensive ERP solutions.',
                                        }),
                                        _jsxs('div', {
                                            className:
                                                'flex items-center gap-2 mt-4 md:mt-8',
                                            children: [
                                                _jsx(Link, {
                                                    to: '/workspace',
                                                    title: '',
                                                    className:
                                                        'inline-flex justify-center items-center bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-900 focus:bg-blue-600 dark:focus:bg-blue-900 dark:bg-blue-800 px-3 md:px-10 w-full md:w-auto h-[50px] font-semibold text-base text-white text-wrap whitespace-nowrap transition-all duration-200',
                                                    role: 'button',
                                                    children: 'Start exploring',
                                                }),
                                                _jsxs('a', {
                                                    href: '#',
                                                    onClick: e => {
                                                        e.preventDefault();
                                                        setOpen(true);
                                                    },
                                                    title: '',
                                                    className:
                                                        'inline-flex justify-center items-center hover:bg-blue-500 dark:hover:bg-blue-900 px-3 md:px-7 border border-blue-500 hover:border-blue-600 dark:hover:border-blue-900 focus:border-blue-600 dark:border-blue-800 w-full sm:w-auto h-[50px] font-semibold text-base text-blue-500 text-wrap group hover:text-white dark:hover:text-white whitespace-nowrap transition-all duration-200',
                                                    children: [
                                                        _jsxs('svg', {
                                                            className:
                                                                'mr-3 w-10 h-10 group-hover:text-white text-blue-500 dark:text-blue-800',
                                                            xmlns: 'http://www.w3.org/2000/svg',
                                                            fill: 'none',
                                                            viewBox:
                                                                '0 0 24 24',
                                                            stroke: 'currentColor',
                                                            children: [
                                                                _jsx('path', {
                                                                    strokeLinecap:
                                                                        'round',
                                                                    strokeLinejoin:
                                                                        'round',
                                                                    strokeWidth:
                                                                        '2',
                                                                    d: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
                                                                }),
                                                                _jsx('path', {
                                                                    strokeLinecap:
                                                                        'round',
                                                                    strokeLinejoin:
                                                                        'round',
                                                                    strokeWidth:
                                                                        '1.5',
                                                                    d: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                                                                }),
                                                            ],
                                                        }),
                                                        'Watch video',
                                                    ],
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                _jsx('div', {
                                    children: _jsx(Lottie, {
                                        animationData: hero_animation,
                                    }),
                                }),
                            ],
                        }),
                    }),
                }),
            }),
            open &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50',
                    children: _jsxs('div', {
                        className:
                            'bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 max-w-3xl w-full relative',
                        children: [
                            _jsx('button', {
                                onClick: () => setOpen(false),
                                className:
                                    'absolute top-2 right-2 text-red-500 font-bold text-xl',
                                children: '\u2715',
                            }),
                            _jsx('div', {
                                className: 'aspect-video',
                                children: _jsx('iframe', {
                                    className: 'w-full h-full rounded-lg',
                                    src: 'https://www.youtube.com/embed/tjOXyiv-OKE?autoplay=1',
                                    title: 'YouTube video player',
                                    frameBorder: '0',
                                    allow: 'autoplay; encrypted-media',
                                    allowFullScreen: true,
                                }),
                            }),
                        ],
                    }),
                }),
        ],
    });
};
export default HomeHero;
