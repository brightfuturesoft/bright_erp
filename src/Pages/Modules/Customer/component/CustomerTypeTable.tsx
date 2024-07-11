import React, { useState } from 'react';
import { Table, Input, Button, Dropdown, Menu } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import EditCustomerModal from './EditCustomer/EditCustomer';
import EditStatusModal from './EditStatusModal';
import { MoreVertical } from 'lucide-react';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    status: 'active' | 'inactive';
}

interface CustomerTableProps {
    data: DataType[];
    pageCount: number;
}

const CustomerTypeTable: React.FC<CustomerTableProps> = ({
    data,
    pageCount,
}) => {
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [statusModalVisible, setStatusModalVisible] =
        useState<boolean>(false);
    const [statusRecord, setStatusRecord] = useState<DataType | null>(null);
    const [status, setStatus] = useState<'active' | 'inactive'>('active');

    const handleSearch = (
        selectedKeys: React.Key[],
        confirm: () => void,
        dataIndex: string
    ) => {
        confirm();
        setSearchText(selectedKeys[0] as string);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        width: 188,
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <button
                    type="button"
                    onClick={() => handleReset(clearFilters)}
                    style={{ width: 90, marginRight: 8 }}
                >
                    Reset
                </button>
            </div>
        ),
        onFilter: (value: string, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
    });

    const handleEdit = (record: DataType) => {
        setEditingRecord(record);
        setIsEditModalOpen(true);
    };

    const handleEditModalOk = () => {
        // Implement the logic to save the changes
        setIsEditModalOpen(false);
        setEditingRecord(null);
    };

    const handleEditModalCancel = () => {
        setIsEditModalOpen(false);
        setEditingRecord(null);
    };

    const handleStatusModalOk = () => {
        // Implement the logic to update the status
        if (statusRecord) {
            const updatedData = data.map(item =>
                item.key === statusRecord.key ? { ...item, status } : item
            );
            setStatusModalVisible(false);
            setStatusRecord(null);
        }
    };

    const handleStatusModalCancel = () => {
        setStatusModalVisible(false);
        setStatusRecord(null);
    };

    const menu = (record: DataType) => (
        <Menu>
            <Menu.Item onClick={() => handleEdit(record)}>Edit</Menu.Item>
            <Menu.Item onClick={() => handleStatusToggle(record)}>
                {record.status === 'active' ? 'Deactivate' : 'Activate'}
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            // Set a fixed width or use responsive styles for each column
            // width: '25%', // Example of setting fixed width
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: 'active' | 'inactive') =>
                text === 'active' ? 'Active' : 'Inactive',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DataType) => (
                <Dropdown
                    overlay={menu(record)}
                    trigger={['click']}
                >
                    <Button
                        shape="circle"
                        className="w-[35px] h-[35px] p-0"
                    >
                        <MoreVertical size={17} />
                    </Button>
                </Dropdown>
            ),
        },
    ];

    // Pagination configuration
    const pagination: TablePaginationConfig = {
        pageSize: pageCount,
    };

    return (
        <div className="">
            <Table
                className="custom-table"
                columns={columns}
                dataSource={data}
                pagination={pagination}
                // Add responsive properties or use CSS media queries for responsiveness
                // responsive={true}
                // scroll={{ x: '100%' }} // Example of horizontal scrolling
                // size="middle" // Adjust table size if necessary
            />
            {editingRecord && (
                <EditCustomerModal
                    title="Edit Customer"
                    open={isEditModalOpen}
                    onOk={handleEditModalOk}
                    confirmLoading={false}
                    onCancel={handleEditModalCancel}
                    defaultValue={editingRecord.name}
                />
            )}
            {statusRecord && (
                <EditStatusModal
                    visible={statusModalVisible}
                    data={statusRecord}
                    onOk={handleStatusModalOk}
                    onCancel={handleStatusModalCancel}
                />
            )}
        </div>
    );
};

export default CustomerTypeTable;
