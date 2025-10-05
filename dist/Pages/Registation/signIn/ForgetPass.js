import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Lottie from 'lottie-react';
import forget_pass from '../../../assets/lottie/forget_pass.json';
const ForgetPass = () => {
    const onSubmitHandler = async e => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.target));
    };
    return _jsx('div', {
        children: _jsxs('section', {
            className:
                'relative py-12 overflow-hidden bg-black sm:py-16 lg:py-20 xl:py-24',
            children: [
                _jsx('div', {
                    className:
                        'absolute bottom-0 left-0 transform -translate-x-12 translate-y-80 lg:translate-x-0',
                    children: _jsxs('svg', {
                        className: 'blur-3xl filter',
                        style: { filter: 'blur(64px)' },
                        width: 835,
                        height: 525,
                        viewBox: '0 0 835 525',
                        fill: 'none',
                        xmlns: 'http://www.w3.org/2000/svg',
                        children: [
                            _jsx('path', {
                                d: 'M215.676 295.092C107.631 187.047 -91.9978 228.999 50.4835 86.5174C192.965 -55.9639 705.222 -1.77906 813.267 106.266C921.312 214.311 584.231 335.302 441.75 477.783C299.268 620.265 323.722 403.137 215.676 295.092Z',
                                fill: 'url(#paint0_linear_537_1369)',
                            }),
                            _jsx('defs', {
                                children: _jsxs('linearGradient', {
                                    id: 'paint0_linear_537_1369',
                                    x1: '861.287',
                                    y1: '154.286',
                                    x2: '295.051',
                                    y2: '576.839',
                                    gradientUnits: 'userSpaceOnUse',
                                    children: [
                                        _jsx('stop', {
                                            offset: '0%',
                                            style: {
                                                stopColor:
                                                    'var(--color-cyan-500)',
                                            },
                                        }),
                                        _jsx('stop', {
                                            offset: '100%',
                                            style: {
                                                stopColor:
                                                    'var(--color-purple-500)',
                                            },
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    }),
                }),
                _jsx('div', {
                    className: 'absolute inset-0',
                    children: _jsx('img', {
                        className: 'object-cover w-full h-full opacity-50',
                        src: 'https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png',
                        alt: '',
                    }),
                }),
                _jsx('div', {
                    className:
                        'relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl',
                    children: _jsxs('div', {
                        className:
                            'grid items-center max-w-md grid-cols-1 mx-auto gap-y-8 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24 lg:max-w-6xl',
                        children: [
                            _jsx('div', {
                                className:
                                    'overflow-hidden bg-base-900 rounded-xl',
                                children: _jsxs('div', {
                                    className: 'p-6 sm:py-8 sm:px-9',
                                    children: [
                                        _jsx('h2', {
                                            className:
                                                'text-2xl font-normal text-white sm:text-3xl lg:text-4xl',
                                            children: 'Forget Password',
                                        }),
                                        _jsx('p', {
                                            className:
                                                'mt-4 text-lg font-normal text-gray-400',
                                            children:
                                                'An email with instructions to reset your password has been sent. Please check your inbox.',
                                        }),
                                        _jsxs('form', {
                                            onSubmit: onSubmitHandler,
                                            className: 'mt-8 space-y-4',
                                            children: [
                                                _jsxs('div', {
                                                    children: [
                                                        _jsxs('label', {
                                                            htmlFor: '',
                                                            className:
                                                                'sr-only',
                                                            children: [
                                                                ' ',
                                                                'Email address',
                                                                ' ',
                                                            ],
                                                        }),
                                                        _jsx('div', {
                                                            children: _jsx(
                                                                'input',
                                                                {
                                                                    type: 'email',
                                                                    name: 'email',
                                                                    id: 'email',
                                                                    placeholder:
                                                                        'Email address',
                                                                    className:
                                                                        'block w-full px-5 py-4 text-base text-white placeholder-gray-500 bg-black rounded-md border-white ring-1 ring-white',
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                }),
                                                _jsx('div', {
                                                    children: _jsx('button', {
                                                        type: 'submit',
                                                        className:
                                                            'inline-flex items-center justify-center w-full px-5 py-4 text-base text-black transition-all duration-200 bg-white border border-transparent rounded-md hover:opacity-80',
                                                        children:
                                                            'Forget Password',
                                                    }),
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                            _jsx('div', {
                                className:
                                    'grid grid-cols-1 gap-4 xl:px-12 xl:gap-6',
                                children: _jsx(Lottie, {
                                    className: 'w-full h-[500px] pt-20',
                                    animationData: forget_pass,
                                    loop: true,
                                }),
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
};
export default ForgetPass;
