import { jsx as _jsx } from 'react/jsx-runtime';
import { Dropdown, Space, Table } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import Status from '@/Pages/Modules/common/components/Status';
import { tableData } from '../Delivery.demo';
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
            onClick: () => console.log('Create Invoice clicked'),
            children: 'Create Invoice',
        }),
    },
    {
        key: '3',
        label: _jsx('div', {
            onClick: () => console.log('Cancel clicked'),
            children: 'Cancel',
        }),
    },
    {
        key: '4',
        label: _jsx('div', {
            onClick: () => console.log('Mark as Delivered clicked'),
            children: 'Mark as Delivered',
        }),
    },
];
const tableHead = [
    {
        title: 'DELIVERY NUMBER',
        dataIndex: 'deliveryNumber',
        key: 'deliveryNumber',
        render: text => _jsx('a', { children: text }),
    },
    {
        title: 'DELIVERY DATE',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
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
        title: 'DELIVERY TYPE',
        dataIndex: 'deliveryType',
        key: 'deliveryType',
    },
    {
        title: 'DELIVERY CHARGE',
        dataIndex: 'deliveryCharge',
        key: 'deliveryCharge',
    },
    {
        title: 'DELIVERY CHANNEL',
        dataIndex: 'deliveryChannel',
        key: 'deliveryChannel',
    },
    {
        title: 'CHANNEL CHARGE',
        dataIndex: 'channelCharge',
        key: 'channelCharge',
    },
    {
        title: 'CONSIGNMENT ID',
        dataIndex: 'consignmentId',
        key: 'consignmentId',
    },
    {
        title: 'DELIVERY STATUS',
        dataIndex: 'deliveryStatus',
        key: 'deliveryStatus',
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
