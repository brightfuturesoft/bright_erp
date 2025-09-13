// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { Button, Table, Dropdown, Menu, message, Breakpoint } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
    Info,
    PowerOff,
    PowerOffIcon,
    MessageSquareMore,
    Mail,
    FileText,
    FileX2,
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import CustomerAction from './components/mangedCustomerComponents/CustomerAction';
import SearchBar from '@/common/SearchBar';
import { ColumnsType } from 'antd/es/table';
import { Customer } from './CustomerType';
import { useCustomersData } from './components/data_get_api';

const ManageCustomer: React.FC = () => {
    const [pageSize, setPageSize] = useState<number>(5);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchOn, setSearchOn] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filterCustomerType, setFilterCustomerType] = useState('');
    const [filterCustomerStatus, setFilterCustomerStatus] = useState('');
    const {
        customers: apiCustomers,
        deleteCustomer,
        editCustomer,
    } = useCustomersData();

    // Map API response to Customer type
    const mappedData: Customer[] =
        apiCustomers?.map((c, index) => ({
            key: c._id,
            name: c.full_name,
            email: c.email,
            phone: c.phone_number || 'N/A',
            customerType: c.type || 'Regular',
            customerSince: new Date(c.created_at).toLocaleDateString(),
            customerCode: c._id,
            customerStatus: c.status || 'Active',
        })) || [];

    const data: Customer[] = useMemo(() => {
        return mappedData.filter(item => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.email.toLowerCase().includes(searchText.toLowerCase()) ||
                item.phone.toLowerCase().includes(searchText.toLowerCase());
            const matchesType = filterCustomerType
                ? item.customerType === filterCustomerType
                : true;
            const matchesStatus = filterCustomerStatus
                ? item.customerStatus === filterCustomerStatus
                : true;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [mappedData, searchText, filterCustomerType, filterCustomerStatus]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[]) =>
            setSelectedRowKeys(newSelectedRowKeys),
    };

    const hasSelected = selectedRowKeys.length > 0;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleFilterChange = (type: string, value: string) => {
        if (type === 'customerType') setFilterCustomerType(value);
        else setFilterCustomerStatus(value);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCustomer(id);
            message.success('Customer deleted!');
        } catch (err) {
            message.error('Failed to delete customer!');
        }
    };

    const handleStatusUpdate = async (record: Customer) => {
        try {
            const newStatus =
                record.customerStatus === 'Active' ? 'Inactive' : 'Active';
            await editCustomer({ id: record.key, status: newStatus });
            message.success(`Status updated to ${newStatus}!`);
        } catch (err) {
            message.error('Failed to update status!');
        }
    };

    const menu = (record: Customer) => (
        <Menu className="w-[160px]">
            <Menu.Item
                key="delete"
                onClick={() => handleDelete(record.key)}
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

    const shareMenu = (
        <Menu>
            <Menu.Item key="1">
                <div className="flex items-center gap-1 w-[100px]">
                    <MessageSquareMore
                        size={21}
                        strokeWidth={1}
                    />{' '}
                    SMS
                </div>
            </Menu.Item>
            <Menu.Item key="2">
                <div className="flex items-center gap-1 w-[100px]">
                    <Mail
                        size={21}
                        strokeWidth={1}
                    />{' '}
                    Email
                </div>
            </Menu.Item>
        </Menu>
    );

    const pageSizeMenu = (
        <Menu>
            {[5, 10, 15].map(size => (
                <Menu.Item
                    key={size}
                    onClick={() => setPageSize(size)}
                >
                    {size}
                </Menu.Item>
            ))}
        </Menu>
    );

    const exportMenu = (
        <Menu>
            <Menu.Item
                key="1"
                onClick={() => generatePDF(data, selectedRowKeys)}
            >
                <FileText
                    size={21}
                    strokeWidth={1}
                />{' '}
                PDF
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={() => generateExcel(data, selectedRowKeys)}
            >
                <FileX2
                    size={21}
                    strokeWidth={1}
                />{' '}
                Excel
            </Menu.Item>
        </Menu>
    );

    const generatePDF = (allData: Customer[], selectedKeys: React.Key[]) => {
        const doc = new jsPDF();
        const selectedData = allData.filter(item =>
            selectedKeys.includes(item.key)
        );
        const tableData = selectedData.map(item => [
            item.name,
            item.email,
            item.phone,
            item.customerType,
            item.customerSince,
            item.customerCode,
            item.customerStatus,
        ]);
        const headers = [
            'Name',
            'Email',
            'Phone',
            'Type',
            'Since',
            'Code',
            'Status',
        ];
        doc.autoTable({ head: [headers], body: tableData });
        doc.save('customers.pdf');
    };

    const generateExcel = (allData: Customer[], selectedKeys: React.Key[]) => {
        const selectedData = allData.filter(item =>
            selectedKeys.includes(item.key)
        );
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
        XLSX.writeFile(workbook, 'customers.xlsx');
    };

    const columns: ColumnsType<Customer> = [
        {
            title: 'Name',
            dataIndex: 'name',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'] as Breakpoint[],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'] as Breakpoint[],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'] as Breakpoint[],
        },
        {
            title: 'Customer Since',
            dataIndex: 'customerSince',
            responsive: ['sm', 'md', 'lg', 'xl'] as Breakpoint[],
        },
        {
            title: 'Customer Code',
            dataIndex: 'customerCode',
            responsive: ['sm', 'md', 'lg', 'xl'] as Breakpoint[],
        },
        {
            title: 'Customer Type',
            dataIndex: 'customerType',
            responsive: ['sm', 'md', 'lg', 'xl'] as Breakpoint[],
        },
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
        <div className="dark:text-light text-dark md:w-full w-[90vw] m-auto h-screen">
            <CustomerAction
                searchText={searchText}
                handleSearch={handleSearch}
                filterCustomerType={filterCustomerType}
                handleFilterChange={handleFilterChange}
                filterCustomerStatus={filterCustomerStatus}
                start={() => setLoading(true)}
                loading={loading}
                hasSelected={hasSelected}
                searchOn={searchOn}
                setSearchOn={setSearchOn}
                shareMenu={shareMenu}
                exportMenu={exportMenu}
                pageSizeMenu={pageSizeMenu}
                pageSize={pageSize}
                handlePageSizeChange={setPageSize}
            />

            {searchOn && (
                <div className="relative mt-2">
                    <SearchBar
                        width="100%"
                        searchText={searchText}
                        handleSearch={handleSearch}
                    />
                </div>
            )}

            <div className="top-0 left-0 bottom-0 right-0 max-w-[100%] w-[100%]">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize }}
                    scroll={{ x: '100%' }}
                    className="responsive-table border dark:border-gray-800 mt-4 rounded-lg"
                />
            </div>
        </div>
    );
};

export default ManageCustomer;
