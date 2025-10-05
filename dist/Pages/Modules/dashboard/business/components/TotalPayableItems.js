import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect, useState } from 'react';
import pay from '../../../../../assets/icons/pay.png';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';
const TotalPayableItems = () => {
    const { user } = useContext(Erp_context);
    const [ecommerceOrders, setEcommerceOrders] = useState([]);
    const [posOrders, setPosOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Fetch E-Commerce Orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}ecommerce/orders/get-order`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user?._id || '',
                            workspace_id: user?.workspace_id || '',
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch orders');
                const data = await res.json();
                setEcommerceOrders(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [user]);
    // Fetch POS Orders
    useEffect(() => {
        const fetchPosOrders = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}direct-pos/orders/get-orders`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user?._id || '',
                            workspace_id: user?.workspace_id || '',
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch POS orders');
                const data = await res.json();
                setPosOrders(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosOrders();
    }, [user]);
    if (isLoading) return _jsx('p', { children: 'Loading...' });
    // Get current month start and end
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');
    // Filter current month orders
    const currentMonthEcom = ecommerceOrders.filter(order => {
        const createdAt = dayjs(order.created_at || order.createAt);
        return (
            createdAt.isAfter(startOfMonth) && createdAt.isBefore(endOfMonth)
        );
    });
    const currentMonthPos = posOrders.filter(order => {
        const createdAt = dayjs(order.created_at || order.createAt);
        return (
            createdAt.isAfter(startOfMonth) && createdAt.isBefore(endOfMonth)
        );
    });
    // Calculate totals
    const totalCurrentMonth = [...currentMonthEcom, ...currentMonthPos].reduce(
        (acc, order) =>
            acc + (order.total_amount || 0) + (order.tax_amount || 0),
        0
    );
    const totalOverdue = [
        ...ecommerceOrders.filter(order => !currentMonthEcom.includes(order)),
        ...posOrders.filter(order => !currentMonthPos.includes(order)),
    ].reduce(
        (acc, order) =>
            acc + (order.total_amount || 0) + (order.tax_amount || 0),
        0
    );
    return _jsxs('div', {
        className:
            'dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full',
        children: [
            _jsxs('div', {
                className: 'flex justify-between items-start',
                children: [
                    _jsxs('div', {
                        children: [
                            _jsx('h4', {
                                className:
                                    'font-semibold text-dark text-xl dark:text-gray-400',
                                children: 'TOTAL PAYABLES',
                            }),
                            _jsxs('p', {
                                className: 'text-dark dark:text-gray-500',
                                children: [
                                    _jsx('span', {
                                        className: 'kalpurush-font text-lg',
                                        children: '\u09F3 ',
                                    }),
                                    ' ',
                                    (
                                        totalCurrentMonth + totalOverdue
                                    ).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsx('div', {
                        children: _jsx('img', {
                            src: pay,
                            alt: 'Pay Icon',
                            className: 'w-16 md:w-auto',
                        }),
                    }),
                ],
            }),
            _jsxs('div', {
                className:
                    'md:flex justify-between items-center border-gray-700 mt-5 p-2 border rounded text-dark dark:text-gray-400 overflow-hidden',
                children: [
                    _jsx('div', {
                        className: 'md:w-1/2',
                        children: _jsxs('h3', {
                            className: 'text-xl dark:text-gray-400',
                            children: [
                                _jsxs('p', {
                                    className: 'text-sm',
                                    children: [
                                        'Current ( ',
                                        _jsx('small', {
                                            children: 'This Month',
                                        }),
                                        ' )',
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font text-lg',
                                            children: '\u09F3 ',
                                        }),
                                        totalCurrentMonth.toLocaleString(
                                            'en-US',
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        ),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    _jsx('div', {
                        className:
                            'md:float-end mt-4 md:mt-0 md:w-1/2 md:text-end',
                        children: _jsxs('h3', {
                            className: 'text-xl dark:text-gray-400',
                            children: [
                                _jsxs('p', {
                                    className: 'text-sm',
                                    children: [
                                        'Overdue ( ',
                                        _jsx('small', {
                                            children: 'Previous Months',
                                        }),
                                        ' )',
                                    ],
                                }),
                                _jsxs('p', {
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font text-lg',
                                            children: '\u09F3 ',
                                        }),
                                        totalOverdue.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            }),
        ],
    });
};
export default TotalPayableItems;
