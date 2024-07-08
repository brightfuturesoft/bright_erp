import React from 'react';
import { Dropdown, Space, Table, TableProps, Tag } from 'antd';

import { tableData } from '../Manufacturers.demo';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Manufacturers.type';

const items = [
    {
        key: '1',
        label: <div onClick={() => console.log('edit clicked')}>Edit</div>,
    },
    {
        key: '2',
        label: (
            <div onClick={() => console.log('inactive clicked')}>
                Make Inactive
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div onClick={() => console.log('inactive clicked')}>
                Remove Discount
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
        title: 'MANUFACTURER',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
    },
    {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'DISCOUNT',
        dataIndex: 'discount',
        key: 'discount',
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
