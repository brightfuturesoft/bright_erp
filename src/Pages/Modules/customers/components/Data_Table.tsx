import React from 'react';
import { Table, Dropdown, Button, Breakpoint, Menu } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Customer } from '../Customer_Type';
import { Info, PowerOff, PowerOffIcon } from 'lucide-react';

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

    const menu = (record: Customer) => (
        <Menu className="w-[160px]">
            <Menu.Item
                key="delete"
                onClick={() => handleDelete(record)}
            >
                <div className="flex items-center gap-1">
                    <DeleteOutlined /> Delete
                </div>
            </Menu.Item>
            <Menu.Item key="status">
                <div className="flex items-center gap-1 cursor-pointer">
                    {record.customerStatus === 'Active' ? (
                        <span
                            onClick={() => handleStatusUpdate(record)}
                            className="flex items-center gap-1 text-red-600"
                        >
                            <PowerOffIcon
                                className="text-red-700"
                                size={17}
                            />{' '}
                            Inactive
                        </span>
                    ) : (
                        <span
                            onClick={() => handleStatusUpdate(record)}
                            className="flex items-center gap-1 text-green-600"
                        >
                            <PowerOff
                                className="text-green-700"
                                size={17}
                            />{' '}
                            Active
                        </span>
                    )}
                </div>
            </Menu.Item>
            <Menu.Item key="details">
                <Link
                    to={`/dashboard/e-commerce/customer-details/${record.key}`}
                    className="flex items-center gap-1"
                >
                    <Info size={17} /> Details
                </Link>
            </Menu.Item>
        </Menu>
    );

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
                    className={`status-badge px-2 pt-0.5 flex items-center justify-center pb-0.5 !w-[70px] shape-z ${
                        status === 'Active'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}
                >
                    {status}
                </div>
            ),
            responsive: ['sm', 'md', 'lg', 'xl'] as Breakpoint[],
        },

        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <Dropdown
                    overlay={menu(record)}
                    trigger={['click']}
                >
                    <Button
                        className="dark:text-light text-dark dark:bg-gray-700 dark:hover:!bg-gray-600 bg-gray-50"
                        icon={
                            <MoreOutlined className="dark:text-light text-dark" />
                        }
                    />
                </Dropdown>
            ),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'] as Breakpoint[],
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
