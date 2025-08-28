import React from 'react';
import { Dropdown, Space, Table, TableProps, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import ColorBox from './ColorBox';
import type { DataType } from '../Color.type';

interface DataTableProps {
    data: DataType[];
    loading: boolean;
    onEdit: (record: DataType) => void;
    onToggleStatus: (record: DataType) => void;
    onDeleteToggle: (record: DataType) => void; // delete (true) / restore (false)
}

const DataTable: React.FC<DataTableProps> = ({
    data,
    loading,
    onEdit,
    onToggleStatus,
    onDeleteToggle,
}) => {
    const items = (record: DataType) => [
        { key: '1', label: <div onClick={() => onEdit(record)}>Edit</div> },
        {
            key: '2',
            label: (
                <div onClick={() => onToggleStatus(record)}>
                    {record.status === 'active'
                        ? 'Make Inactive'
                        : 'Make Active'}
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => onDeleteToggle(record)}>
                    {record.deleted ? 'Restore' : 'Delete'}
                </div>
            ),
        },
    ];

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'COLOR VIEW',
            dataIndex: 'color_code',
            key: 'color_code_view',
            render: (color: string) => <ColorBox color={color} />,
            width: 120,
        },
        { title: 'COLOR CODE', dataIndex: 'color_code', key: 'color_code' },
        { title: 'NAME', dataIndex: 'name', key: 'name' },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status === 'active' ? 'Active' : 'Inactive'}
                </Tag>
            ),
            width: 140,
        },
        {
            title: 'DELETED',
            dataIndex: 'deleted',
            key: 'deleted',
            render: (deleted?: boolean) => (
                <Tag color={deleted ? 'red' : 'green'}>
                    {deleted ? 'Yes' : 'No'}
                </Tag>
            ),
            width: 120,
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    <Dropdown
                        menu={{ items: items(record) }}
                        trigger={['click']}
                    >
                        <a>
                            <EllipsisVertical className="hover:cursor-pointer" />
                        </a>
                    </Dropdown>
                </Space>
            ),
            width: 100,
        },
    ];

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: [10, 20, 50],
            }}
        />
    );
};

export default DataTable;
