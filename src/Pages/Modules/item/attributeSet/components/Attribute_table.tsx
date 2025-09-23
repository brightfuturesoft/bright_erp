import { Dropdown, Space, Table, TableProps, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../AttributeSet.type';

interface AttributeTableProps {
    tableData: DataType[];
    onEdit: (attribute: DataType) => void;
    onMakeInactive: (attribute: DataType) => void;
    onMakeActive: (attribute: DataType) => void;
    onRemoveDiscount: (attribute: DataType) => void;
    onDelete: (attribute: DataType) => void;
}

const Attribute_table: React.FC<AttributeTableProps> = ({
    tableData,
    onEdit,
    onMakeInactive,
    onMakeActive,
    onRemoveDiscount,
    onDelete,
}) => {
    const tableHead: TableProps<DataType>['columns'] = [
        {
            title: 'ATTRIBUTE SET',
            dataIndex: 'attribute_set',
            key: 'attribute_set',
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
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
                        key: '4',
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

export default Attribute_table;
