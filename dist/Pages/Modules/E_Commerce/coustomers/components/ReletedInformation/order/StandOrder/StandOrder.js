import {
    jsxs as _jsxs,
    jsx as _jsx,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Table, Button } from 'antd';
import { Fullscreen } from 'lucide-react';
import { Link } from 'react-router-dom';
const StanderdOrder = ({ orders = [], customerId }) => {
    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: text => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            render: text => _jsxs('span', { children: ['\u09F3 ', text] }),
        },
        { title: 'Status', dataIndex: 'order_status', key: 'order_status' },
    ];
    // Total amount calculate
    const totalAmount = orders.reduce(
        (sum, order) => sum + (order.total_amount || 0),
        0
    );
    return _jsxs('div', {
        className: '',
        children: [
            _jsx(Table, {
                columns: columns,
                dataSource: orders,
                pagination: false,
                rowKey: 'id',
                summary: () =>
                    _jsx(_Fragment, {
                        children: _jsxs(Table.Summary.Row, {
                            children: [
                                _jsx(Table.Summary.Cell, {
                                    index: 0,
                                    className: 'font-bold',
                                    children: 'Total',
                                }),
                                _jsx(Table.Summary.Cell, { index: 1 }),
                                _jsxs(Table.Summary.Cell, {
                                    index: 2,
                                    className: 'font-bold',
                                    children: ['\u09F3 ', totalAmount],
                                }),
                                _jsx(Table.Summary.Cell, { index: 3 }),
                            ],
                        }),
                    }),
            }),
            customerId &&
                orders.length > 0 &&
                _jsx(Link, {
                    to: `orders`,
                    children: _jsx(Button, {
                        icon: _jsx(Fullscreen, { size: 16, strokeWidth: 2 }),
                        className:
                            'bg-transparent !rounded-sm border-blue-500 text-primary flex items-center mt-2',
                        children: 'View All...',
                    }),
                }),
        ],
    });
};
export default StanderdOrder;
