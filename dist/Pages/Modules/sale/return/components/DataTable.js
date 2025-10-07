import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@/Pages/Modules/common/components/Status';
import { tableData } from '../Return.demo';
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
        title: 'RETURN NUMBER',
        dataIndex: 'returnNumber',
        key: 'returnNumber',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'RETURN DATE',
        dataIndex: 'returnDate',
        key: 'returnDate',
    },
    {
        title: 'REFERENCE',
        dataIndex: 'reference',
        key: 'reference',
        render: text => _jsx('a', { children: text }),
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
        title: 'RETURN AMOUNT',
        dataIndex: 'returnAmount',
        key: 'returnAmount',
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
