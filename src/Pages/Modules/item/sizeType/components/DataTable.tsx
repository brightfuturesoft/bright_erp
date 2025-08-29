import { Table, TableProps, Tag, Space, Dropdown } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { DataType } from '../SizeType.type';

interface DataTableProps {
    data: DataType[];
    onEdit?: (size: DataType) => void;
    renderAction?: (size: DataType) => React.ReactNode; // used now
}

const DataTable: React.FC<DataTableProps> = ({ data, renderAction }) => {
    const tableHead: TableProps<DataType>['columns'] = [
        { title: 'SIZE TYPE', dataIndex: 'sizeType', key: 'sizeType' },
        { title: 'ADDED TYPE', dataIndex: 'addedType', key: 'addedType' },
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
            render: (_: any, record: DataType) => (
                <Space size="middle">
                    {renderAction ? renderAction(record) : null}
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={tableHead}
            dataSource={data}
            rowKey="_id"
        />
    );
};

export default DataTable;
