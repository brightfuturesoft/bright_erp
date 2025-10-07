import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { tableData } from '../Payment.demo';
const items = [
    {
        key: '1',
        label: _jsx('div', {
            onClick: () => console.log('Details clicked'),
            children: 'Details',
        }),
    },
];
const tableHead = [
    {
        title: 'Payment Number',
        dataIndex: 'payment_number',
        key: 'payment_number',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
        render: text => _jsx('p', { children: new Date(text).toDateString() }),
    },
    {
        title: 'INVOICE NUMBER',
        dataIndex: 'invoice_number',
        key: 'invoice_number',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'INVOICE DATE',
        dataIndex: 'invoice_date',
        key: 'invoice_date',
        render: text => _jsx('p', { children: new Date(text).toDateString() }),
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'PAYMENT METHOD',
        dataIndex: 'payment_method',
        key: 'payment_method',
    },
    {
        title: 'TRANSACTION ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
    },
    {
        title: 'PAID AMOUNT',
        dataIndex: 'paidAmount',
        key: 'paidAmount',
        render: amount =>
            _jsxs('p', {
                children: [
                    _jsx('span', {
                        className: 'kalpurush-font text-lg',
                        children: '\u09F3 ',
                    }),
                    ' ',
                    amount,
                ],
            }),
    },
    {
        title: 'DISCOUNT AMOUNT',
        dataIndex: 'discountAmount',
        key: 'discountAmount',
        render: amount =>
            _jsxs('p', {
                children: [
                    _jsx('span', {
                        className: 'kalpurush-font text-lg',
                        children: '\u09F3 ',
                    }),
                    ' ',
                    amount,
                ],
            }),
    },
    {
        title: 'TOTAL AMOUNT',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: amount =>
            _jsxs('p', {
                children: [
                    _jsx('span', {
                        className: 'kalpurush-font text-lg',
                        children: '\u09F3 ',
                    }),
                    ' ',
                    amount,
                ],
            }),
    },
    {
        title: 'ACTION',
        key: 'action',
        render: () =>
            _jsx(Space, {
                size: 'middle',
                children: _jsx(Dropdown, {
                    menu: { items },
                    trigger: ['click'],
                    children: _jsx('a', {
                        children: _jsx(EllipsisVertical, {
                            className: 'hover:cursor-pointer',
                        }),
                    }),
                }),
            }),
    },
];
const DataTable = () =>
    _jsx(Table, { columns: tableHead, dataSource: tableData });
export default DataTable;
