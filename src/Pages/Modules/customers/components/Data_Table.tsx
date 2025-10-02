import React from 'react';
import { Table, Dropdown, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Customer } from '../Customer_Type';

interface Props {
    data: Customer[];
    selectedRowKeys: React.Key[];
    setSelectedRowKeys: (keys: React.Key[]) => void;
    pageSize: number;
    handleStatusUpdate: (record: Customer) => void;
    handleDelete: (record: Customer) => void;
}

const CustomerTable: React.FC<Props> = ({
    data,
    selectedRowKeys,
    setSelectedRowKeys,
    pageSize,
    handleStatusUpdate,
    handleDelete,
}) => {
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
    };

    const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Customer Since', dataIndex: 'customerSince' },
        { title: 'Customer Type', dataIndex: 'customerType' },
        {
            title: 'Status',
            dataIndex: 'customerStatus',
            render: (status: string) => (
                <div
                    className={`px-2 py-0.5 rounded ${
                        status === 'Active'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}
                >
                    {status}
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_: any, record: Customer) => (
                <Dropdown
                    overlay={
                        <div className="flex flex-col gap-1 p-2">
                            <Button
                                type="text"
                                onClick={() => handleStatusUpdate(record)}
                            >
                                {record.customerStatus === 'Active'
                                    ? 'Make Inactive'
                                    : 'Make Active'}
                            </Button>
                            <Button
                                type="text"
                                danger
                                onClick={() => handleDelete(record)}
                            >
                                Delete
                            </Button>
                            <Link
                                to={`/dashboard/e-commerce/customer-details/${record.key}`}
                            >
                                Details
                            </Link>
                        </div>
                    }
                    trigger={['click']}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{ pageSize }}
            scroll={{ x: '100%' }}
        />
    );
};

export default CustomerTable;
