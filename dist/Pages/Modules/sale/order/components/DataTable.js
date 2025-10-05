import { jsx as _jsx } from 'react/jsx-runtime';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@/Pages/Modules/common/components/Status';
import { tableData } from '../Order.demo';
// import Status from '@modules/common/components/Status';
// import { tableData } from '@modules/sale/order/Order.demo';
// import { DataType } from '@modules/sale/order/Order.type';
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
            onClick: () => console.log('Edit clicked'),
            children: 'Edit',
        }),
    },
    {
        key: '3',
        label: _jsx('div', {
            onClick: () => console.log('Approve clicked'),
            children: 'Approve',
        }),
    },
    {
        key: '4',
        label: _jsx('div', {
            onClick: () => console.log('Cancel Order clicked'),
            children: 'Cancel Order',
        }),
    },
    {
        key: '5',
        label: _jsx('div', {
            onClick: () => console.log('Create Delivery clicked'),
            children: 'Create Delivery',
        }),
    },
    {
        key: '6',
        label: _jsx('div', {
            onClick: () => console.log('Create Invoice clicked'),
            children: 'Create Invoice',
        }),
    },
    {
        key: '7',
        label: _jsx('div', {
            onClick: () => console.log('Delete clicked'),
            children: 'Delete',
        }),
    },
];
const tableHead = [
    {
        title: 'ORDER NUMBER',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'QUOTATION NUMBER',
        dataIndex: 'quotationNumber',
        key: 'quotationNumber',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer',
        key: 'customer',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'SUB TOTAL',
        dataIndex: 'subTotal',
        key: 'subTotal',
    },
    {
        title: 'TOTAL TAX',
        dataIndex: 'totalTax',
        key: 'totalTax',
    },
    {
        title: 'GRAND TOTAL',
        dataIndex: 'grandTotal',
        key: 'grandTotal',
    },
    {
        title: 'ORDER STATUS',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: status => _jsx(Status, { status: status }),
    },
    {
        title: 'DELIVERY STATUS',
        dataIndex: 'deliveryStatus',
        key: 'deliveryStatus',
        render: status => _jsx(Status, { status: status }),
    },
    {
        title: 'INVOICE STATUS',
        dataIndex: 'invoiceStatus',
        key: 'invoiceStatus',
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
