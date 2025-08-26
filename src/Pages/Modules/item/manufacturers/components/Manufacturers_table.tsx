import { Dropdown, Space, Table, TableProps, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../Manufacturers.type';

interface ManufacturersTableProps {
    tableData: DataType[];
    onEdit: (manufacturer: DataType) => void;
    onMakeInactive: (manufacturer: DataType) => void;
    onMakeActive: (manufacturer: DataType) => void;
    onRemoveDiscount: (manufacturer: DataType) => void;
    onDelete: (manufacturer: DataType) => void;
}

const Manufacturers_table: React.FC<ManufacturersTableProps> = ({
    tableData,
    onEdit,
    onMakeInactive,
    onMakeActive,
    onRemoveDiscount,
    onDelete,
}) => {
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
            render: (discount: any) =>
                discount === 'N/A' ? (
                    <Tag color="default">N/A</Tag>
                ) : (
                    <Tag color="blue">{discount}%</Tag>
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
                            <div>
                                <div onClick={() => onRemoveDiscount(record)}>
                                    Remove Discount
                                </div>
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

export default Manufacturers_table;
