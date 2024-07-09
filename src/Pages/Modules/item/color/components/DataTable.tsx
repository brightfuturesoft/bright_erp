import React from 'react';
import { Dropdown, Space, Table, TableProps, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';

import { DataType } from '@modules/item/color/Color.type';
import { tableData } from '@modules/item/color/Color.demo';
import ColorBox from '@modules/item/color/components/ColorBox';

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
        label: <div onClick={() => console.log('Delete clicked')}>Delete</div>,
    },
];

const tableHead: TableProps<DataType>['columns'] = [
    {
        title: 'COLOR VIEW',
        dataIndex: 'color',
        key: 'color',
        render: (color: string) => <ColorBox color={color} />,
    },
    {
        title: 'COLOR CODE',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name',
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
