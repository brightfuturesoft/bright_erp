import React from 'react';
import { Popover, Table, TableProps, Tag } from 'antd';

import { tableData } from '../Items.demo';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Items.type';

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);

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
            <div className="flex justify-center items-center">
                <Popover
                    content={content}
                    title="Title"
                    trigger="click"
                >
                    <EllipsisVertical className="hover:cursor-pointer" />
                </Popover>
            </div>
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
