import React from 'react';
import { Dropdown, Space, Table, TableProps, Tag } from 'antd';

import { tableData } from '../Items.demo';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Items.type';

const items = [
    {
        key: '1',
        label: (
            <div onClick={() => console.log('details clicked')}>Details</div>
        ),
    },
    {
        key: '2',
        label: <div onClick={() => console.log('edit clicked')}>Edit</div>,
    },
    {
        key: '3',
        label: (
            <div onClick={() => console.log('inactive clicked')}>
                Make Inactive
            </div>
        ),
    },
    {
        key: '4',
        label: <div onClick={() => console.log('Delete clicked')}>Delete</div>,
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'CODE',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'CATEGORIES',
        dataIndex: 'categories',
        key: 'categories',
    },
    {
        title: 'TYPE',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'BRAND',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'COLOR',
        dataIndex: 'color',
        key: 'color',
    },
    {
        title: 'SIZE',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'SALE PRICE',
        dataIndex: 'salePrice',
        key: 'salePrice',
    },
    {
        title: 'STOCK',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: (status: boolean) => (
            <Tag color={status ? 'green' : 'red'}>
                {status ? 'Active' : 'Inactive'}
            </Tag>
        ),
    },
    {
        title: 'ACTION',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                >
                    <a>
                        <EllipsisVertical className="hover:cursor-pointer" />
                    </a>
                </Dropdown>
            </Space>
        ),
    },
];

const DataTable: React.FC = () => (
    <Table
        columns={tableHead}
        dataSource={tableData}
    />
);

export default DataTable;
