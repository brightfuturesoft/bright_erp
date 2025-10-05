import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect, useState } from 'react';
import { Flex, Progress } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
const Pos_Order_Report = ({ strokeWidth, strokeColor, trailColor }) => {
    const { user } = useContext(Erp_context);
    const [posOrders, setPosOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
    const totalAmount = posOrders.reduce((acc, order) => {
        const discount = order.discount || 0;
        return acc + ((order.total_amount || 0) - discount);
    }, 0);
    const totalVAT = posOrders.reduce(
        (acc, order) => acc + (order.tax_amount || 0),
        0
    );
    const totalWithTax = totalAmount + totalVAT;
    const maxTarget = 1000000;
    const progressPercent = parseFloat(
        Math.min((totalWithTax / maxTarget) * 100, 100).toFixed(2)
    );
    return _jsxs('div', {
        className:
            'flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400',
        children: [
            _jsxs('div', {
                children: [
                    _jsx('h1', {
                        className: 'font-[200] text-2xl dark:text-gray-300',
                        children: 'POS Sale',
                    }),
                    _jsx('h1', {
                        className: 'text-gray-500 text-md',
                        children: 'This Month',
                    }),
                    _jsxs('p', {
                        className: 'mt-5 font-bold text-green-500',
                        children: [
                            'Total: ',
                            _jsx('span', {
                                className: 'text-red-500',
                                children: totalAmount,
                            }),
                            ' ',
                            'BDT',
                        ],
                    }),
                    _jsxs('p', {
                        className: 'mt-1 text-gray-500',
                        children: [
                            'Total VAT: ',
                            _jsx('span', {
                                className: 'text-blue-500',
                                children: totalVAT,
                            }),
                            ' ',
                            'BDT',
                        ],
                    }),
                    _jsxs('p', {
                        className: 'mt-1 font-semibold',
                        children: [
                            'Total (Including VAT):',
                            ' ',
                            _jsx('span', {
                                className: 'text-purple-500',
                                children: totalWithTax,
                            }),
                            ' BDT',
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
                    percent: progressPercent,
                    size: 'default',
                    strokeWidth: strokeWidth,
                    strokeColor: strokeColor,
                    trailColor: trailColor,
                }),
            }),
        ],
    });
};
export default Pos_Order_Report;
