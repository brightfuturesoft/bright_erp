import { Dropdown, Space, Table, TableProps, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Color.type';

interface ColorTableProps {
    tableData: DataType[];
    onEdit: (manufacturer: DataType) => void;
    onMakeInactive: (manufacturer: DataType) => void;
    onMakeActive: (manufacturer: DataType) => void;
    onDelete: (manufacturer: DataType) => void;
}

const Color_table: React.FC<ColorTableProps> = ({
    tableData,
    onEdit,
    onMakeInactive,
    onMakeActive,
    onDelete,
}) => {
    const tableHead: TableProps<DataType>['columns'] = [
        {
            title: 'COLOR NAME',
            dataIndex: 'color_name',
            key: 'color_name',
        },
        {
            title: 'COLOR',
            dataIndex: 'code',
            key: 'code',
            render: (text: string) => (
                <div
                    className="size-8 border border-gray-700 p-1 rounded"
                    style={{ backgroundColor: text }}
                />
            ),
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: (status: string | boolean) => (
                <Tag
                    color={
                        status === true || status === 'active' ? 'green' : 'red'
                    }
                >
                    {status === true || status === 'active'
                        ? 'Active'
                        : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_: any, record: DataType) => {
                const items = [
                    {
                        key: '1',
                        label: <div onClick={() => onEdit(record)}>Edit</div>,
                    },
                    {
                        key: '2',
                        label: (
                            <div>
                                {record.status === 'active' ? (
                                    <div onClick={() => onMakeInactive(record)}>
                                        Make Inactive
                                    </div>
                                ) : (
                                    <div onClick={() => onMakeActive(record)}>
                                        Make Active
                                    </div>
                                )}
                            </div>
                        ),
                    },
                    {
                        key: '3',
                        label: (
                            <div onClick={() => onDelete(record)}>Delete</div>
                        ),
                    },
                ];
                return (
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
                );
            },
        },
    ];

    return (
        <Table
            columns={tableHead}
            dataSource={tableData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default Color_table;
