import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@/Pages/Modules/common/components/Status';
import { tableData } from '../Invoice.demo';
const items = [
    {
        key: '1',
        label: _jsx('div', {
            onClick: () => console.log('Details clicked'),
            children: 'Details',
        }),
    },
    {
        key: '2',
        label: _jsx('div', {
            onClick: () => console.log('Make Payment clicked'),
            children: 'Make Payment',
        }),
    },
    {
        key: '3',
        label: _jsx('div', {
            onClick: () => console.log('Return clicked'),
            children: 'Return',
        }),
    },
    {
        key: '4',
        label: _jsx('div', {
            onClick: () => console.log('Cancel Invoice clicked'),
            children: 'Cancel Invoice',
        }),
    },
];
const tableHead = [
    {
        title: 'INVOICE NUMBER',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'ORDER NUMBER',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'TOTAL',
        dataIndex: 'total',
        key: 'total',
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
        title: 'AMOUNT PAID',
        dataIndex: 'amountPaid',
        key: 'amountPaid',
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
        title: 'DUE AMOUNT',
        dataIndex: 'dueAmount',
        key: 'dueAmount',
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
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: status => _jsx(Status, { status: status }),
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
