'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useParams } from 'react-router-dom';
import { Card, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
const DirectSaleDetails = () => {
    const { id } = useParams();
    const { user } = useContext(Erp_context);
    const [details, setDetails] = useState(null);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}sale/direct_sale/get-direct-sales`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${user?._id}`,
                            workspace_id: `${user?.workspace_id}`,
                        },
                    }
                );
                const data = await res.json();
                if (!data.error) {
                    const order = data.data.find(sale => sale._id === id);
                    setDetails(order || null);
                }
            } catch (err) {
                console.error('Failed to fetch details', err);
            }
        };
        if (id) fetchDetails();
    }, [id, user]);
    if (!details)
        return _jsx('p', {
            className: 'text-gray-600 dark:text-gray-300',
            children: 'Loading...',
        });
    return _jsxs('div', {
        className: 'p-5 bg-gray-50 dark:bg-gray-900 min-h-screen',
        children: [
            _jsxs(Card, {
                className:
                    'mb-5 border-gray-600   bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg',
                children: [
                    _jsxs('p', {
                        className:
                            'mb-5 text-2xl font-bold bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg',
                        children: ['Order Details - $', details.order_number],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Customer:' }),
                            ' ',
                            details.customer?.name,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Phone:' }),
                            ' ',
                            details.customer?.phone,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Email:' }),
                            ' ',
                            details.customer?.email,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Sales Person:' }),
                            ' ',
                            details.sales_person?.name || 'N/A',
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Status:' }),
                            ' ',
                            details.order_status,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Grand Total:' }),
                            ' \u09F3 ',
                            details.grand_total?.toFixed(2),
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Paid:' }),
                            ' \u09F3 ',
                            details.paid_amount.toFixed(2),
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Due:' }),
                            ' \u09F3 ',
                            details.due_amount.toFixed(2),
                        ],
                    }),
                ],
            }),
            _jsxs(Card, {
                className:
                    'bg-white border-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md rounded-lg',
                children: [
                    _jsx('p', {
                        className:
                            'mb-5 text-2xl font-bold bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg',
                        children: 'Items',
                    }),
                    _jsx(Table, {
                        columns: [
                            {
                                title: 'Item Name',
                                dataIndex: 'item_name',
                                key: 'item_name',
                            },
                            {
                                title: 'Brand',
                                dataIndex: 'brand',
                                key: 'brand',
                            },
                            {
                                title: 'Category',
                                dataIndex: 'category',
                                key: 'category',
                            },
                            {
                                title: 'Qty',
                                dataIndex: 'quantity',
                                key: 'quantity',
                            },
                            {
                                title: 'Price',
                                dataIndex: 'price',
                                key: 'price',
                                render: val => `৳ ${val?.toFixed(2)}`,
                            },
                            {
                                title: 'Total',
                                dataIndex: 'total',
                                key: 'total',
                                render: val => `৳ ${val?.toFixed(2)}`,
                            },
                        ],
                        dataSource: details.items,
                        rowKey: record => record.item_name + record.price,
                        pagination: false,
                        className: 'dark:text-gray-200',
                        bordered: true,
                    }),
                ],
            }),
        ],
    });
};
export default DirectSaleDetails;
