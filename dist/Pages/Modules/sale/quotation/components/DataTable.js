import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@/Pages/Modules/common/components/Status';
import { tableData } from '../Quotation.demo';
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
            children: 'Create Order',
        }),
    },
    {
        key: '3',
        label: _jsx('div', {
            onClick: () => console.log('Edit clicked'),
            children: 'Edit',
        }),
    },
    {
        key: '4',
        label: _jsx('div', {
            onClick: () => console.log('Approve clicked'),
            children: 'Approve',
        }),
    },
    {
        key: '5',
        label: _jsx('div', {
            onClick: () => console.log('Delete clicked'),
            children: 'Delete',
        }),
    },
];
const tableHead = [
    {
        title: 'QUOTATION NUMBER',
        dataIndex: 'quotationNumber',
        key: 'quotationNumber',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'QUOTATION DATE',
        dataIndex: 'quotationDate',
        key: 'quotationDate',
    },
    {
        title: 'VALID TILL DATE',
        dataIndex: 'validTillDate',
        key: 'validTillDate',
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'CREATED BY',
        dataIndex: 'createdBy',
        key: 'createdBy',
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        key: 'amount',
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
