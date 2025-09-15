import React, { useState, useEffect } from 'react';
import {
    Button,
    Table,
    Input,
    Modal,
    Form,
    Upload,
    Dropdown,
    Menu,
    Select,
    message,
} from 'antd';
import {
    DeleteOutlined,
    MoreOutlined,
    ReloadOutlined,
    SearchOutlined,
    PlusOutlined,
    ShareAltOutlined,
    UploadOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SearchBar from '../../../common/SearchBar';
import {
    ChefHat,
    CirclePower,
    Edit,
    FileDown,
    FileText,
    FileType2,
    FileUp,
    FileX2,
    Info,
    Mail,
    MessageSquareMore,
    PowerOff,
    PowerOffIcon,
} from 'lucide-react';
import DashboardContentHeader from '../../../wraper/DashboardContentHeader';
import DashboardTitle from '../CommonComponents/DashboardTitle';
import EditCustomerModal from './component/EditCustomer/EditCustomer';
import CustomerAction from './component/mangeCustomerComponent/CustomerAction';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import avatarFallback from '@/assets/images/avatar-ali.png';

const { Option } = Select;

interface DataType {
    key: React.Key;
    photo: string;
    name: string;
    email: string;
    phone: string;
    customerType: string;
    customerSince: string;
    customerCode?: string;
    customerStatus?: string;
}

const initialData: DataType[] = [];
for (let i = 0; i < 100; i++) {
    initialData.push({
        key: i,
        photo: avatarFallback,
        name: `Edward King ${i}`,
        email: `edward.king${i}@example.com`,
        phone: `123456789${i}`,
        customerType: i % 2 === 0 ? 'Regular' : 'Premium',
        customerSince: 'https://defaultwebsite.com',
        customerCode: `CODE-${i}`,
        customerStatus: i % 2 === 0 ? 'Active' : 'Inactive',
    });
}

const customerDefaultValue = {
    key: 0,
    photo: avatarFallback,
    name: 'nahid 360',
    email: 'mdnahid360s@gmail.com',
    phone: '01303531371',
    customerType: 'Regular',
    customerSince: 'https://defaultwebsite.com',
};

const ManageCustomer: React.FC = () => {
    const [pageSize, setPageSize] = useState<number>(5);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchOn, setSearchOn] = useState(false);
    const [data, setData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [form] = Form.useForm();
    const [filterCustomerType, setFilterCustomerType] = useState('');
    const [filterCustomerStatus, setFilterCustomerStatus] = useState('');

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        filterData(value, filterCustomerType, filterCustomerStatus);
    };

    const handleFilterChange = (type: string, value: string) => {
        if (type === 'customerType') {
            setFilterCustomerType(value);
        } else {
            setFilterCustomerStatus(value);
        }
        filterData(
            searchText,
            type === 'customerType' ? value : filterCustomerType,
            type === 'customerStatus' ? value : filterCustomerStatus
        );
    };

    const filterData = (
        searchValue: string,
        customerType: string,
        customerStatus: string
    ) => {
        const filteredData = initialData.filter(
            item =>
                (item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.email
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    item.phone.includes(searchValue) ||
                    item.customerType
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    item.customerSince
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) &&
                (customerType ? item.customerType === customerType : true) &&
                (customerStatus ? item.customerStatus === customerStatus : true)
        );
        setData(filteredData);
    };

    const handleEdit = (record: DataType) => {
        setEditingRecord({ ...customerDefaultValue, ...record });
        setIsModalVisible(true);
    };

    const handleDelete = (key: React.Key) => {
        const newData = data.filter(item => item.key !== key);
        setData(newData);
    };

    const handleStatusUpdate = (key: React.Key) => {
        const newData = data.filter(item => item.key !== key);
        setData(newData);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        setEditingRecord(null);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingRecord(null);
    };

    const generatePDF = () => {
        // Initialize jsPDF
        const doc = new jsPDF();

        // Filter data based on selectedRowKeys
        const selectedData = data.filter(item =>
            selectedRowKeys.includes(item.key)
        );

        // Prepare table data for PDF
        const tableData = selectedData.map(item => [
            item.name,
            item.email,
            item.phone,
            item.customerType,
            item.customerSince,
            item.customerCode,
            item.customerStatus,
        ]);

        // Set table headers
        const headers = [
            'Name',
            'Email',
            'Phone',
            'Customer Type',
            'Customer Since',
            'Customer Code',
            'Status',
        ];

        // Use autoTable to generate PDF table
        doc.autoTable({
            head: [headers],
            body: tableData,
        });

        // Save the PDF with a specific name (e.g., customers.pdf)
        doc.save('customers.pdf');

        // Log selected data to console
    };

    const generateExcel = () => {
        const selectedData = data.filter(item =>
            selectedRowKeys.includes(item.key)
        );

        // Prepare data in XLSX format
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

        // Generate a Blob object containing the XLSX workbook
        const blob = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array', // Ensure type is 'array' for Blob compatibility
        });

        // Convert Blob to Buffer
        const buffer = new Blob([blob], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(buffer);

        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customers.xlsx';
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Log selected data to console
    };

    const handleFormSubmit = (values: DataType) => {
        const newData = data.map(item => {
            if (item.key === values.key) {
                return values;
            }
            return item;
        });
        setData(newData);
        form.resetFields();
        handleModalOk();
    };

    useEffect(() => {
        if (editingRecord) {
            form.setFieldsValue(editingRecord);
        }
    }, [editingRecord, form]);

    const menu = (record: DataType) => (
        <Menu className="w-[160px]">
            <Menu.Item
                key="edit"
                onClick={() => handleEdit(record)}
            >
                <Link
                    to={`/dashboard/customer/customer-edit/${record?.name}`}
                    className="flex items-center gap-1"
                >
                    <Edit size={17} /> Edit
                </Link>
            </Menu.Item>

            <Menu.Item
                key="delete"
                onClick={() => handleDelete(record.key)}
            >
                <div className="flex items-center gap-1">
                    <DeleteOutlined /> Delete
                </div>
            </Menu.Item>

            <Menu.Item key="status">
                <div className="flex items-center gap-1">
                    {record?.customerStatus === 'Active' ? (
                        <span
                            onClick={() => handleStatusUpdate(record.key)}
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
                            onClick={() => handleStatusUpdate(record.key)}
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

            <Menu.Item
                key="details"
                onClick={() => handleEdit(record)}
            >
                <Link
                    to={`/dashboard/customer/customer-details/${record?.name}`}
                    className="flex items-center gap-1"
                >
                    <Info size={17} /> Details
                </Link>
            </Menu.Item>
        </Menu>
    );

    const handleMenuClick = e => {
        message.info('Click on menu item.');
    };

    const shareMenu = (
        <Menu onClick={handleMenuClick}>
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
            <Menu.Item key="1">
                <div
                    onClick={() => setPageSize(5)}
                    className="flex items-center gap-1 w-[100px]"
                >
                    5
                </div>
            </Menu.Item>
            <Menu.Item key="2">
                <div
                    onClick={() => setPageSize(10)}
                    className="flex items-center gap-1 w-[100px]"
                >
                    10
                </div>
            </Menu.Item>
            <Menu.Item key="3">
                <div
                    onClick={() => setPageSize(15)}
                    className="flex items-center gap-1 w-[100px]"
                >
                    15
                </div>
            </Menu.Item>
        </Menu>
    );

    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    };

    const exportMenu = (
        <Menu>
            <Menu.Item key="1">
                <div
                    onClick={generatePDF}
                    className="flex items-center gap-1 w-[100px]"
                >
                    <FileText
                        size={21}
                        strokeWidth={1}
                    />{' '}
                    Pdf
                </div>
            </Menu.Item>

            <Menu.Item key="2">
                <div
                    onClick={() => generateExcel()}
                    className="flex items-center gap-1 w-[100px]"
                >
                    <FileX2
                        size={21}
                        strokeWidth={1}
                    />{' '}
                    Excel
                </div>
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: photo => (
                <img
                    src={photo}
                    alt="Photo"
                    className="md:w-12 md:h-12 w-10 h-10  object-cover rounded"
                    onError={e => {
                        e.currentTarget.src = avatarFallback;
                    }}
                />
            ),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Customer Since',
            dataIndex: 'customerSince',
            responsive: ['sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Customer Code',
            dataIndex: 'customerCode',
            responsive: ['sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Customer Type',
            dataIndex: 'customerType',
            responsive: ['sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Status',
            dataIndex: 'customerStatus',
            render: status => (
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
            responsive: ['sm', 'md', 'lg', 'xl'],
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
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
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
                start={start}
                loading={loading}
                hasSelected={hasSelected}
                searchOn={searchOn}
                setSearchOn={setSearchOn}
                shareMenu={shareMenu}
                exportMenu={exportMenu}
                pageSizeMenu={pageSizeMenu}
                pageSize={pageSize}
                handlePageSizeChange={handlePageSizeChange}
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

            <div className=" top-0 left-0  bottom-0 right-0  max-w-[100%] w-[100%]">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: pageSize }}
                    scroll={{ x: '100%' }}
                    className="responsive-table border dark:border-gray-800  mt-4 rounded-lg "
                />
            </div>
        </div>
    );
};

export default ManageCustomer;
