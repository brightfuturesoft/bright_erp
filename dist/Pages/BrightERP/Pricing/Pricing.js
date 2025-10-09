import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import Title from '../../../Hooks/Title';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
const PricingCard = ({
    children,
    description,
    price,
    type,
    subscription,
    buttonText,
}) => {
    return _jsx(Link, {
        to: '/payment',
        className: 'px-4  w-full md:w-1/2 lg:w-1/3',
        children: _jsxs('div', {
            className:
                'relative z-10 h-[700px] border-2 border-stroke dark:border-[#5b50ec] bg-white dark:bg-light-dark dark:bg-dark-2 shadow-pricing mb-10 px-8 lg:px-6 py-10 lg:py-10 sm:p-12 xl:p-[50px] rounded-[10px] overflow-hidden group',
            children: [
                _jsx('span', {
                    className: 'block mb-3 font-semibold text-lg text-blue-500',
                    children: type,
                }),
                _jsxs('h2', {
                    className:
                        'mb-5 font-bold text-[42px] text-dark dark:text-light',
                    children: [
                        _jsx('span', {
                            className: 'kalpurush-font',
                            children: '\u09F3',
                        }),
                        price,
                        _jsxs('span', {
                            className:
                                'font-medium text-base text-body-color dark:text-dark-6',
                            children: ['/ ', subscription],
                        }),
                    ],
                }),
                _jsx('p', {
                    className:
                        'border-stroke dark:border-dark-3 mb-8 pb-8 border-b text-base text-body-color text-dark dark:text-gray-400 dark:text-dark-6',
                    children: description,
                }),
                _jsx('div', {
                    className: 'flex flex-col gap-[14px] mb-9',
                    children: children,
                }),
                _jsx(Link, {
                    to: '/payment',
                    className: `block absolute bottom-10 right-5 left-5 mx-auto rounded-md p-3 text-center text-base font-medium transition
                    group-hover:bg-opacity-90 group-hover:bg-primary dark:group-hover:bg-dark dark:bg-gray-700 bg-primary text-light dark:text-light duration-200`,
                    children: buttonText,
                }),
                _jsxs('div', {
                    children: [
                        _jsx('span', {
                            className: 'top-7 right-0 z-[-1] absolute',
                            children: _jsxs('svg', {
                                width: 77,
                                height: 172,
                                viewBox: '0 0 77 172',
                                fill: 'none',
                                xmlns: 'http://www.w3.org/2000/svg',
                                children: [
                                    _jsx('circle', {
                                        cx: 86,
                                        cy: 86,
                                        r: 86,
                                        fill: 'url(#paint0_linear)',
                                    }),
                                    _jsx('defs', {
                                        children: _jsxs('linearGradient', {
                                            id: 'paint0_linear',
                                            x1: 86,
                                            y1: 0,
                                            x2: 86,
                                            y2: 172,
                                            gradientUnits: 'userSpaceOnUse',
                                            children: [
                                                _jsx('stop', {
                                                    stopColor: '#3056D3',
                                                    stopOpacity: '0.09',
                                                }),
                                                _jsx('stop', {
                                                    offset: 1,
                                                    stopColor: '#C4C4C4',
                                                    stopOpacity: 0,
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                        }),
                        _jsx('span', {
                            className: 'top-4 right-4 z-[-1] absolute',
                            children: _jsxs('svg', {
                                width: 41,
                                height: 89,
                                viewBox: '0 0 41 89',
                                fill: 'none',
                                xmlns: 'http://www.w3.org/2000/svg',
                                children: [
                                    Array.from({ length: 8 }, (_, i) =>
                                        _jsx(
                                            'circle',
                                            {
                                                cx: '38.9138',
                                                cy: 87.4849 - i * 12.4978,
                                                r: '1.42021',
                                                transform:
                                                    'rotate(180 38.9138 87.4849)',
                                                fill: '#3056D3',
                                            },
                                            i
                                        )
                                    ),
                                    Array.from({ length: 8 }, (_, i) =>
                                        _jsx(
                                            'circle',
                                            {
                                                cx: '26.4157',
                                                cy: 87.4849 - i * 12.4978,
                                                r: '1.42021',
                                                transform:
                                                    'rotate(180 26.4157 87.4849)',
                                                fill: '#3056D3',
                                            },
                                            i
                                        )
                                    ),
                                    Array.from({ length: 8 }, (_, i) =>
                                        _jsx(
                                            'circle',
                                            {
                                                cx: '13.9177',
                                                cy: 87.4849 - i * 12.4978,
                                                r: '1.42021',
                                                transform:
                                                    'rotate(180 13.9177 87.4849)',
                                                fill: '#3056D3',
                                            },
                                            i
                                        )
                                    ),
                                    Array.from({ length: 8 }, (_, i) =>
                                        _jsx(
                                            'circle',
                                            {
                                                cx: '1.41963',
                                                cy: 87.4849 - i * 12.4978,
                                                r: '1.42021',
                                                transform:
                                                    'rotate(180 1.41963 87.4849)',
                                                fill: '#3056D3',
                                            },
                                            i
                                        )
                                    ),
                                ],
                            }),
                        }),
                    ],
                }),
            ],
        }),
    });
};
const List = ({ children }) => {
    return _jsxs('div', {
        className: 'flex items-center gap-2',
        children: [
            _jsx(CheckCircleOutlined, { className: 'text-success text-xl' }),
            _jsx('p', {
                className: 'text-base text-dark dark:text-light',
                children: children,
            }),
        ],
    });
};
const Pricing = () => {
    const [openModal, setOpenModal] = useState(false);
    const {
        data: pricingPlans = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}admin/subscription/get-all`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch subscriptions');
            const data = await response.json();
            return data.data;
        },
    });
    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openModal]);
    const [selectedRows, setSelectedRows] = useState([]);
    return _jsx('div', {
        className: 'bg-light dark:bg-dark py-16',
        children: _jsxs('section', {
            className:
                'md:flex flex-wrap justify-center items-center md:space-x-4 sm:space-y-0 md:space-y-4 mx-auto mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl',
            children: [
                _jsxs('div', {
                    className: 'mx-auto container',
                    children: [
                        _jsx('div', {
                            className: 'flex flex-wrap -mx-4',
                            children: _jsx('div', {
                                className: 'px-4 w-full',
                                children: _jsx(Title, {
                                    subtitle: 'Pricing',
                                    title: 'Our Pricing',
                                    description:
                                        'Choose a plan that fits your needs. Simple, transparent pricing with everything you need to grow.',
                                }),
                            }),
                        }),
                        _jsx('div', {
                            className:
                                'flex flex-wrap justify-center -mx-4 mt-12',
                            children: pricingPlans.slice(0, 3).map(plan =>
                                _jsx(
                                    PricingCard,
                                    {
                                        type: plan?.type,
                                        price: plan?.price,
                                        subscription: plan?.subscription,
                                        description: plan?.description,
                                        buttonText: plan?.buttonText,
                                        active: plan?.active,
                                        children: _jsx('div', {
                                            className: 'space-y-3 h-full',
                                            children: plan.features.map(
                                                (feature, index) =>
                                                    _jsx(
                                                        List,
                                                        {
                                                            children: feature,
                                                        },
                                                        index
                                                    )
                                            ),
                                        }),
                                    },
                                    plan.type
                                )
                            ),
                        }),
                    ],
                }),
                _jsx('div', {
                    className:
                        'md:block flex justify-center items-center  w-full',
                    children: _jsxs('div', {
                        className:
                            'relative z-10 md:flex justify-between items-center border-2 border-stroke dark:border-[#5b50ec] bg-white dark:bg-light-dark dark:bg-dark-2 shadow-pricing mb-10 px-8 lg:px-6 py-10 lg:py-10 sm:p-12 xl:p-[50px] rounded-[10px] overflow-hidden group',
                        children: [
                            _jsxs('div', {
                                children: [
                                    _jsxs('h2', {
                                        className:
                                            'mb-5 font-bold text-[42px] text-dark dark:text-light',
                                        children: [
                                            _jsx('span', {
                                                className: 'kalpurush-font',
                                                children: '\u09F3',
                                            }),
                                            pricingPlans[3]?.price,
                                            _jsxs('span', {
                                                className:
                                                    'font-medium text-base text-body-color dark:text-dark-6',
                                                children: [
                                                    '/ ',
                                                    pricingPlans[3]
                                                        ?.subscription,
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsx('h2', {
                                        className:
                                            'mb-5 font-bold text-[25px] text-dark dark:text-light',
                                        children: pricingPlans[3]?.type,
                                    }),
                                    _jsx('p', {
                                        className:
                                            'mb-5 text-base text-dark dark:text-light',
                                        children: pricingPlans[3]?.description,
                                    }),
                                ],
                            }),
                            _jsx(Link, {
                                to: '/contact-support',
                                className: `block ml-auto float-end rounded-md p-3 text-center text-base font-medium transition
                    group-hover:bg-opacity-90 group-hover:bg-primary dark:group-hover:bg-dark dark:bg-gray-700 bg-primary text-light dark:text-light duration-200 md:w-[200px] w-full`,
                                children: pricingPlans[3]?.buttonText,
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('span', {
                                        className:
                                            'top-7 right-0 z-[-1] absolute',
                                        children: _jsxs('svg', {
                                            width: 77,
                                            height: 172,
                                            viewBox: '0 0 77 172',
                                            fill: 'none',
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            children: [
                                                _jsx('circle', {
                                                    cx: 86,
                                                    cy: 86,
                                                    r: 86,
                                                    fill: 'url(#paint0_linear)',
                                                }),
                                                _jsx('defs', {
                                                    children: _jsxs(
                                                        'linearGradient',
                                                        {
                                                            id: 'paint0_linear',
                                                            x1: 86,
                                                            y1: 0,
                                                            x2: 86,
                                                            y2: 172,
                                                            gradientUnits:
                                                                'userSpaceOnUse',
                                                            children: [
                                                                _jsx('stop', {
                                                                    stopColor:
                                                                        '#3056D3',
                                                                    stopOpacity:
                                                                        '0.09',
                                                                }),
                                                                _jsx('stop', {
                                                                    offset: 1,
                                                                    stopColor:
                                                                        '#C4C4C4',
                                                                    stopOpacity: 0,
                                                                }),
                                                            ],
                                                        }
                                                    ),
                                                }),
                                            ],
                                        }),
                                    }),
                                    _jsx('span', {
                                        className:
                                            'top-4 right-4 z-[-1] absolute',
                                        children: _jsxs('svg', {
                                            width: 41,
                                            height: 89,
                                            viewBox: '0 0 41 89',
                                            fill: 'none',
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            children: [
                                                Array.from(
                                                    { length: 8 },
                                                    (_, i) =>
                                                        _jsx(
                                                            'circle',
                                                            {
                                                                cx: '38.9138',
                                                                cy:
                                                                    87.4849 -
                                                                    i * 12.4978,
                                                                r: '1.42021',
                                                                transform:
                                                                    'rotate(180 38.9138 87.4849)',
                                                                fill: '#3056D3',
                                                            },
                                                            i
                                                        )
                                                ),
                                                Array.from(
                                                    { length: 8 },
                                                    (_, i) =>
                                                        _jsx(
                                                            'circle',
                                                            {
                                                                cx: '26.4157',
                                                                cy:
                                                                    87.4849 -
                                                                    i * 12.4978,
                                                                r: '1.42021',
                                                                transform:
                                                                    'rotate(180 26.4157 87.4849)',
                                                                fill: '#3056D3',
                                                            },
                                                            i
                                                        )
                                                ),
                                                Array.from(
                                                    { length: 8 },
                                                    (_, i) =>
                                                        _jsx(
                                                            'circle',
                                                            {
                                                                cx: '13.9177',
                                                                cy:
                                                                    87.4849 -
                                                                    i * 12.4978,
                                                                r: '1.42021',
                                                                transform:
                                                                    'rotate(180 13.9177 87.4849)',
                                                                fill: '#3056D3',
                                                            },
                                                            i
                                                        )
                                                ),
                                                Array.from(
                                                    { length: 8 },
                                                    (_, i) =>
                                                        _jsx(
                                                            'circle',
                                                            {
                                                                cx: '1.41963',
                                                                cy:
                                                                    87.4849 -
                                                                    i * 12.4978,
                                                                r: '1.42021',
                                                                transform:
                                                                    'rotate(180 1.41963 87.4849)',
                                                                fill: '#3056D3',
                                                            },
                                                            i
                                                        )
                                                ),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
};
export default Pricing;
