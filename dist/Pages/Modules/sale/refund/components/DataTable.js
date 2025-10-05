import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import Status from '@/Pages/Modules/common/components/Status';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { tableData } from '../refund.demo';
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
            onClick: () => console.log('Cancel  clicked'),
            children: 'Cancel',
        }),
    },
];
const tableHead = [
    {
        title: 'REFUND ID',
        dataIndex: 'refundId',
        key: 'refundId',
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
        render: text => text,
    },
    {
        title: 'CUSTOMER',
        key: 'customer',
        render: (_, record) =>
            _jsxs(_Fragment, {
                children: [
                    _jsx('p', {
                        className: 'font-medium',
                        children: record.customer.name,
                    }),
                    _jsx('p', {
                        className: 'text-gray-500 text-sm',
                        children: record.customer.phone,
                    }),
                ],
            }),
    },
    {
        title: 'INVOICE',
        dataIndex: ['invoice', 'invoiceId'],
        key: 'invoiceId',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'REFUND AMOUNT',
        key: 'refundAmount',
        align: 'right',
        render: (_, record) =>
            _jsxs('span', {
                children: [
                    _jsx('span', {
                        className: 'kalpurush-font text-lg',
                        children: '\u09F3',
                    }),
                    ' ',
                    record.invoice.refundAmount.toFixed(2),
                ],
            }),
    },
    {
        title: 'METHOD',
        dataIndex: 'method',
        key: 'method',
    },
    {
        title: 'REASON',
        dataIndex: 'reason',
        key: 'reason',
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
        render: (_, record) =>
            _jsx(Space, {
                size: 'middle',
                children: _jsx(Dropdown, {
                    menu: {
                        items: [
                            {
                                key: 'view',
                                label: _jsx('span', {
                                    onClick: () =>
                                        alert(`Viewing ${record.refundId}`),
                                    children: 'View Details',
                                }),
                            },
                            {
                                key: 'approve',
                                label: _jsx('span', {
                                    onClick: () =>
                                        alert(
                                            `Approving refund ${record.refundId}`
                                        ),
                                    children: 'Approve',
                                }),
                            },
                            {
                                key: 'print',
                                label: _jsx('span', {
                                    onClick: () =>
                                        alert(
                                            `Printing receipt for ${record.refundId}`
                                        ),
                                    children: 'Print Receipt',
                                }),
                            },
                        ],
                    },
                    trigger: ['click'],
                    children: _jsx('a', {
                        onClick: e => e.preventDefault(),
                        children: _jsx(EllipsisVertical, {
                            className: 'hover:cursor-pointer',
                        }),
                    }),
                }),
            }),
    },
];
const DataTable = () =>
    _jsx(Table, {
        columns: tableHead,
        dataSource: tableData,
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            position: ['bottomRight'],
            className: 'custom-antd-pagination',
        },
    });
export default DataTable;
