import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// @ts-nocheck
import { useState, useEffect } from 'react';
import { Button, Table, Form, Dropdown, Menu, Select } from 'antd';
import {
    DeleteOutlined,
    MoreOutlined,
    ReloadOutlined,
    SearchOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import DashboardContentHeader from '../../../../../../wraper/DashboardContentHeader';
import DashboardTitle from '../../../../CommonComponents/DashboardTitle';
import SearchBar from '@/common/SearchBar';
const { Option } = Select;
const initialData = [];
for (let i = 0; i < 10; i++) {
    initialData.push({
        key: i,
        photo: `https://via.placeholder.com/150?text=Photo+${i}`,
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
    photo: 'https://via.placeholder.com/150?text=Photo+Default',
    name: 'nahid 360',
    email: 'mdnahid360s@gmail.com',
    phone: '01303531371',
    customerType: 'Regular',
    customerSince: 'https://defaultwebsite.com',
};
const ManageCustomer = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchOn, setSearchOn] = useState(false);
    const [data, setData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
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
    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleSearch = e => {
        const value = e.target.value;
        setSearchText(value);
        filterData(value, filterCustomerType, filterCustomerStatus);
    };
    const handleFilterChange = (type, value) => {
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
    const filterData = (searchValue, customerType, customerStatus) => {
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
    const handleEdit = record => {
        setEditingRecord({ ...customerDefaultValue, ...record });
        setIsModalVisible(true);
    };
    const handleDelete = key => {
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
    const handleFormSubmit = values => {
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
    const menu = record =>
        _jsxs(Menu, {
            className: 'w-[160px]',
            children: [
                _jsx(
                    Menu.Item,
                    {
                        onClick: () => handleEdit(record),
                        children: _jsxs('div', {
                            className: 'flex items-center gap-1',
                            children: [_jsx(Edit, { size: 17 }), ' Edit'],
                        }),
                    },
                    'edit'
                ),
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
            ],
        });
    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: photo =>
                _jsx('img', {
                    src: photo,
                    alt: 'Photo',
                    style: { width: 50, height: 50 },
                }),
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Customer Since',
            dataIndex: 'customerSince',
        },
        {
            title: 'Customer Code',
            dataIndex: 'customerCode',
        },
        {
            title: 'Customer Type',
            dataIndex: 'customerType',
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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) =>
                _jsx(Dropdown, {
                    overlay: menu(record),
                    trigger: ['click'],
                    children: _jsx(Button, { icon: _jsx(MoreOutlined, {}) }),
                }),
        },
    ];
    return _jsxs('div', {
        className: 'dark:text-light text-dark md:w-full w-[90vw] m-auto',
        children: [
            _jsxs(DashboardContentHeader, {
                children: [
                    _jsx(DashboardTitle, { title: 'Manage Customer' }),
                    _jsxs('div', {
                        className: 'md:flex hidden items-center gap-2',
                        children: [
                            _jsxs(Select, {
                                placeholder: 'Filter by Customer Type',
                                onChange: value =>
                                    handleFilterChange('customerType', value),
                                style: { width: 200 },
                                children: [
                                    _jsx(Option, {
                                        value: '',
                                        children: 'All',
                                    }),
                                    _jsx(Option, {
                                        value: 'Regular',
                                        children: 'Regular',
                                    }),
                                    _jsx(Option, {
                                        value: 'Premium',
                                        children: 'Premium',
                                    }),
                                ],
                            }),
                            _jsxs(Select, {
                                placeholder: 'Filter by Customer Status',
                                onChange: value =>
                                    handleFilterChange('customerStatus', value),
                                style: { width: 200 },
                                children: [
                                    _jsx(Option, {
                                        value: '',
                                        children: 'All',
                                    }),
                                    _jsx(Option, {
                                        value: 'Active',
                                        children: 'Active',
                                    }),
                                    _jsx(Option, {
                                        value: 'Inactive',
                                        children: 'Inactive',
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'md:hidden flex items-center gap-1',
                        children: [
                            _jsx(Link, {
                                className:
                                    '!bg-[#3946d1] w-[32px] h-[32px] flex items-center justify-center rounded-full !border-none !text-white text-nowrap text-sm',
                                to: `create-customer`,
                                children: _jsx(PlusOutlined, {
                                    style: { fontSize: 14 },
                                }),
                            }),
                            _jsx(Button, {
                                className:
                                    '!bg-[#3946d1] rounded-full !border-none !text-white',
                                size: 'medium',
                                shape: 'circle',
                                type: 'primary',
                                onClick: start,
                                disabled: !hasSelected,
                                loading: loading,
                                icon: _jsx(ReloadOutlined, {
                                    className: `${loading ? 'rotate-45' : 'rotate-0'} duration-150`,
                                }),
                            }),
                            _jsx(Button, {
                                onClick: () => setSearchOn(!searchOn),
                                className:
                                    '!bg-[#3946d1] rounded-full !border-none !text-white',
                                size: 'medium',
                                shape: 'circle',
                                type: 'primary',
                                loading: loading,
                                icon: _jsx(SearchOutlined, {
                                    style: { fontSize: 16 },
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            searchOn &&
                _jsx('div', {
                    className: 'relative',
                    children: _jsx(SearchBar, {
                        searchText: searchText,
                        handleSearch: handleSearch,
                    }),
                }),
            _jsx(Table, {
                rowSelection: rowSelection,
                columns: columns,
                dataSource: data,
                pagination: { pageSize: 5 },
                scroll: { x: 1300 },
            }),
        ],
    });
};
export default ManageCustomer;
