import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// @ts-nocheck
import { useState, useMemo } from 'react';
import { Button, Table, Dropdown, Menu, message } from 'antd';
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
import { useCustomersData } from './components/data_get_api';
const ManageCustomer = () => {
    const [pageSize, setPageSize] = useState(5);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
    const mappedData =
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
    const data = useMemo(() => {
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
        onChange: newSelectedRowKeys => setSelectedRowKeys(newSelectedRowKeys),
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleSearch = e => {
        setSearchText(e.target.value);
    };
    const handleFilterChange = (type, value) => {
        if (type === 'customerType') setFilterCustomerType(value);
        else setFilterCustomerStatus(value);
    };
    const handleDelete = async id => {
        try {
            await deleteCustomer(id);
            message.success('Customer deleted!');
        } catch (err) {
            message.error('Failed to delete customer!');
        }
    };
    const handleStatusUpdate = async record => {
        try {
            const newStatus =
                record.customerStatus === 'Active' ? 'Inactive' : 'Active';
            await editCustomer({ id: record.key, status: newStatus });
            message.success(`Status updated to ${newStatus}!`);
        } catch (err) {
            message.error('Failed to update status!');
        }
    };
    const menu = record =>
        _jsxs(Menu, {
            className: 'w-[160px]',
            children: [
                _jsx(
                    Menu.Item,
                    {
                        onClick: () => handleDelete(record.key),
                        children: _jsxs('div', {
                            className: 'flex items-center gap-1',
                            children: [_jsx(DeleteOutlined, {}), ' Delete'],
                        }),
                    },
                    'delete'
                ),
                _jsx(
                    Menu.Item,
                    {
                        children: _jsx('div', {
                            className: 'flex items-center gap-1 cursor-pointer',
                            children:
                                record.customerStatus === 'Active'
                                    ? _jsxs('span', {
                                          onClick: () =>
                                              handleStatusUpdate(record),
                                          className:
                                              'flex items-center gap-1 text-red-600',
                                          children: [
                                              _jsx(PowerOffIcon, {
                                                  className: 'text-red-700',
                                                  size: 17,
                                              }),
                                              ' ',
                                              'Inactive',
                                          ],
                                      })
                                    : _jsxs('span', {
                                          onClick: () =>
                                              handleStatusUpdate(record),
                                          className:
                                              'flex items-center gap-1 text-green-600',
                                          children: [
                                              _jsx(PowerOff, {
                                                  className: 'text-green-700',
                                                  size: 17,
                                              }),
                                              ' ',
                                              'Active',
                                          ],
                                      }),
                        }),
                    },
                    'status'
                ),
                _jsx(
                    Menu.Item,
                    {
                        children: _jsxs(Link, {
                            to: `/dashboard/e-commerce/customer-details/${record.key}`,
                            className: 'flex items-center gap-1',
                            children: [_jsx(Info, { size: 17 }), ' Details'],
                        }),
                    },
                    'details'
                ),
            ],
        });
    const shareMenu = _jsxs(Menu, {
        children: [
            _jsx(
                Menu.Item,
                {
                    children: _jsxs('div', {
                        className: 'flex items-center gap-1 w-[100px]',
                        children: [
                            _jsx(MessageSquareMore, {
                                size: 21,
                                strokeWidth: 1,
                            }),
                            ' ',
                            'SMS',
                        ],
                    }),
                },
                '1'
            ),
            _jsx(
                Menu.Item,
                {
                    children: _jsxs('div', {
                        className: 'flex items-center gap-1 w-[100px]',
                        children: [
                            _jsx(Mail, { size: 21, strokeWidth: 1 }),
                            ' ',
                            'Email',
                        ],
                    }),
                },
                '2'
            ),
        ],
    });
    const pageSizeMenu = _jsx(Menu, {
        children: [5, 10, 15].map(size =>
            _jsx(
                Menu.Item,
                { onClick: () => setPageSize(size), children: size },
                size
            )
        ),
    });
    const exportMenu = _jsxs(Menu, {
        children: [
            _jsxs(
                Menu.Item,
                {
                    onClick: () => generatePDF(data, selectedRowKeys),
                    children: [
                        _jsx(FileText, { size: 21, strokeWidth: 1 }),
                        ' ',
                        'PDF',
                    ],
                },
                '1'
            ),
            _jsxs(
                Menu.Item,
                {
                    onClick: () => generateExcel(data, selectedRowKeys),
                    children: [
                        _jsx(FileX2, { size: 21, strokeWidth: 1 }),
                        ' ',
                        'Excel',
                    ],
                },
                '2'
            ),
        ],
    });
    const generatePDF = (allData, selectedKeys) => {
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
    const generateExcel = (allData, selectedKeys) => {
        const selectedData = allData.filter(item =>
            selectedKeys.includes(item.key)
        );
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
        XLSX.writeFile(workbook, 'customers.xlsx');
    };
    const columns = [
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
            render: status =>
                _jsx('div', {
                    className: `status-badge px-2 pt-0.5 flex items-center justify-center pb-0.5 !w-[70px] shape-z ${
                        status === 'Active'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`,
                    children: status,
                }),
            responsive: ['sm', 'md', 'lg', 'xl'],
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) =>
                _jsx(Dropdown, {
                    overlay: menu(record),
                    trigger: ['click'],
                    children: _jsx(Button, {
                        className:
                            'dark:text-light text-dark dark:bg-gray-700 dark:hover:!bg-gray-600 bg-gray-50',
                        icon: _jsx(MoreOutlined, {
                            className: 'dark:text-light text-dark',
                        }),
                    }),
                }),
            responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
    ];
    return _jsxs('div', {
        className:
            'dark:text-light text-dark md:w-full w-[90vw] m-auto h-screen',
        children: [
            _jsx(CustomerAction, {
                searchText: searchText,
                handleSearch: handleSearch,
                filterCustomerType: filterCustomerType,
                handleFilterChange: handleFilterChange,
                filterCustomerStatus: filterCustomerStatus,
                start: () => setLoading(true),
                loading: loading,
                hasSelected: hasSelected,
                searchOn: searchOn,
                setSearchOn: setSearchOn,
                shareMenu: shareMenu,
                exportMenu: exportMenu,
                pageSizeMenu: pageSizeMenu,
                pageSize: pageSize,
                handlePageSizeChange: setPageSize,
            }),
            searchOn &&
                _jsx('div', {
                    className: 'relative mt-2',
                    children: _jsx(SearchBar, {
                        width: '100%',
                        searchText: searchText,
                        handleSearch: handleSearch,
                    }),
                }),
            _jsx('div', {
                className:
                    'top-0 left-0 bottom-0 right-0 max-w-[100%] w-[100%]',
                children: _jsx(Table, {
                    rowSelection: rowSelection,
                    columns: columns,
                    dataSource: data,
                    pagination: { pageSize },
                    scroll: { x: '100%' },
                    className:
                        'responsive-table border dark:border-gray-800 mt-4 rounded-lg',
                }),
            }),
        ],
    });
};
export default ManageCustomer;
