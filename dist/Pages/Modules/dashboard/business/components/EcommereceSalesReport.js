import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect, useState } from 'react';
import { Flex, Progress } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
const EcommereceSalesReport = ({ strokeWidth, strokeColor, trailColor }) => {
    const { user } = useContext(Erp_context);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
                setOrders(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [user]);
    if (isLoading) return _jsx('p', { children: 'Loading...' });
    const totalReducedAmount = orders.reduce((acc, order) => {
        return acc + (order.total_amount || 0);
    }, 0);
    const totalVATAmount = orders.reduce((acc, order) => {
        return acc + (order.tax_amount || 0);
    }, 0);
    const maxTarget = 1000000;
    const averageProgressPercent = parseFloat(
        Math.min((totalReducedAmount / maxTarget) * 100, 100).toFixed(2)
    );
    return _jsxs('div', {
        className:
            'flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400',
        children: [
            _jsxs('div', {
                children: [
                    _jsx('h1', {
                        className: 'font-[200] text-2xl dark:text-gray-300',
                        children: 'E-Commerce Sale',
                    }),
                    _jsx('h1', {
                        className: 'text-gray-500 text-md',
                        children: 'This Month',
                    }),
                    _jsxs('p', {
                        className: 'mt-5 font-bold text-green-500',
                        children: [
                            'Total:',
                            ' ',
                            _jsx('span', {
                                className: 'text-red-500',
                                children: totalReducedAmount,
                            }),
                            ' ',
                            'BDT',
                        ],
                    }),
                    _jsxs('p', {
                        className: 'mt-1 text-gray-500',
                        children: [
                            'Total VAT:',
                            ' ',
                            _jsx('span', {
                                className: 'text-blue-500',
                                children: totalVATAmount,
                            }),
                            ' BDT',
                        ],
                    }),
                    _jsxs('p', {
                        className: 'mt-1 font-semibold',
                        children: [
                            'Total (Including VAT):',
                            ' ',
                            _jsx('span', {
                                className: 'text-purple-500',
                                children: totalReducedAmount + totalVATAmount,
                            }),
                            ' ',
                            'BDT',
                        ],
                    }),
                ],
            }),
            _jsx(Flex, {
                align: 'center',
                wrap: true,
                gap: 0,
                children: _jsx(Progress, {
                    type: 'circle',
                    percent: averageProgressPercent,
                    size: 'default',
                    strokeWidth: strokeWidth,
                    strokeColor: strokeColor,
                    trailColor: trailColor,
                }),
            }),
        ],
    });
};
export default EcommereceSalesReport;
