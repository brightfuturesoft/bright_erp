import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Status from '@/Pages/Modules/common/components/Status';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { tableData } from '../Cusiner_debit.demo';
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
            onClick: () => console.log('Cancel clicked'),
            children: 'Cancel',
        }),
    },
];
const tableHead = [
    {
        title: 'CUSTOMER NAME',
        dataIndex: ['customer', 'name'],
        key: 'customerName',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'PHONE',
        dataIndex: ['customer', 'phone'],
        key: 'phone',
    },
    {
        title: 'LAST PAYMENT DATE',
        dataIndex: ['order_info', 'last_payment_date'],
        key: 'lastPaymentDate',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'DUE AMOUNT',
        dataIndex: ['order_info', 'due_amount'],
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
        title: 'LAST INVOICE',
        dataIndex: ['order_info', 'last_invoice'],
        key: 'lastInvoice',
        render: text => _jsx('a', { children: text }),
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
