import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import {
    Button,
    Table,
    Input,
    Modal,
    Form,
    Input as AntdInput,
    Upload,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import avatarFallback from '@/assets/images/avatar-ali.png';
import CommonBtn from '../../../Hooks/CommonBtn';
const initialData = [];
for (let i = 0; i < 10; i++) {
    initialData.push({
        key: i,
        photo: avatarFallback,
        name: `Edward King ${i}`,
        email: `edward.king${i}@example.com`,
        phone: `123456789${i}`,
        customerType: i % 2 === 0 ? 'Regular' : 'Premium',
        website: `https://website${i}.com`,
    });
}
const customerDefaultValue = {
    key: 0,
    photo: avatarFallback,
    name: 'nahid 360',
    email: 'mdnahid360s@gmail.com',
    phone: '01303531371',
    customerType: 'Regular',
    website: 'https://defaultwebsite.com',
};
const ManageDirectSale = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();
    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = newSelectedRowKeys => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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
        const filteredData = initialData.filter(
            item =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.email.toLowerCase().includes(value.toLowerCase()) ||
                item.phone.includes(value) ||
                item.customerType.toLowerCase().includes(value.toLowerCase()) ||
                item.website.toLowerCase().includes(value.toLowerCase())
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
        console.log('Edited values:', values);
        const newData = data.map(item => {
            if (item.key === values.key) {
                return values;
            }
            return item;
        });
        setData(newData);
        form.resetFields(); // Reset form fields
        handleModalOk(); // Close modal
    };
    useEffect(() => {
        if (editingRecord) {
            form.setFieldsValue(editingRecord);
        }
    }, [editingRecord, form]);
    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: photo =>
                _jsx('img', {
                    src: photo,
                    alt: 'Photo',
                    style: { width: 50, height: 50 },
                    onError: e => {
                        e.currentTarget.src = avatarFallback;
                    },
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
            title: 'Customer Type',
            dataIndex: 'customerType',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            render: website =>
                _jsx('a', {
                    href: website,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    children: website,
                }),
        },
        {
            title: 'Action',
            render: (_, record) =>
                _jsxs(_Fragment, {
                    children: [
                        _jsx(Button, {
                            type: 'link',
                            icon: _jsx(EditOutlined, {}),
                            onClick: () => handleEdit(record),
                        }),
                        _jsx(Button, {
                            type: 'link',
                            icon: _jsx(DeleteOutlined, {}),
                            onClick: () => handleDelete(record.key),
                        }),
                    ],
                }),
        },
    ];
    return _jsxs('div', {
        children: [
            _jsxs('div', {
                className: 'mt-3',
                style: {
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                },
                children: [
                    _jsxs('div', {
                        children: [
                            _jsx(Button, {
                                className:
                                    '!bg-[#3946d1] !border-none !rounded !text-white',
                                size: 'large',
                                type: 'primary',
                                onClick: start,
                                disabled: !hasSelected,
                                loading: loading,
                                children: 'Reload',
                            }),
                            _jsx('span', {
                                style: { marginLeft: 8 },
                                children: hasSelected
                                    ? `Selected ${selectedRowKeys.length} items`
                                    : '',
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            _jsx(Input, {
                                className:
                                    'border-gray-700 bg-transparent px-3 py-2 border rounded text-white placeholder:text-gray-600',
                                placeholder:
                                    'Search by Name, Email, Phone, Type, or Website',
                                value: searchText,
                                onChange: handleSearch,
                                style: { width: 200 },
                            }),
                            _jsx(Link, {
                                className:
                                    '!bg-[#3946d1] px-4 py-2.5 !border-none !rounded !text-white text-nowrap text-sm',
                                to: `create-customer`,
                                children: '+Add Customer',
                            }),
                        ],
                    }),
                ],
            }),
            _jsx(Table, {
                rowSelection: rowSelection,
                columns: columns,
                dataSource: data,
            }),
            _jsx(Modal, {
                title: 'Edit Customer',
                visible: isModalVisible,
                onOk: handleModalOk,
                onCancel: handleModalCancel,
                footer: null,
                children:
                    editingRecord &&
                    _jsxs(Form, {
                        form: form,
                        initialValues: editingRecord,
                        onFinish: handleFormSubmit,
                        children: [
                            _jsx(Form.Item, {
                                name: 'key',
                                style: { display: 'none' },
                                children: _jsx(AntdInput, {}),
                            }),
                            _jsx('div', {
                                className: 'relative edit-img',
                                children: _jsx(Form.Item, {
                                    name: 'photo',
                                    label: 'Photo URL',
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please input the photo URL!',
                                        },
                                    ],
                                    children: _jsx(Upload, {
                                        name: 'photo',
                                        action: '/uploadPhoto',
                                        listType: 'picture',
                                        beforeUpload: () => false,
                                        maxCount: 1,
                                        children: _jsx(Button, {
                                            icon: _jsx(UploadOutlined, {}),
                                            children: 'Upload Photo',
                                        }),
                                    }),
                                }),
                            }),
                            _jsx(Form.Item, {
                                name: 'name',
                                label: 'Name',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input the name!',
                                    },
                                ],
                                children: _jsx(AntdInput, {}),
                            }),
                            _jsx(Form.Item, {
                                name: 'email',
                                label: 'Email',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input the email!',
                                    },
                                ],
                                children: _jsx(AntdInput, {}),
                            }),
                            _jsx(Form.Item, {
                                name: 'phone',
                                label: 'Phone',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input the phone!',
                                    },
                                ],
                                children: _jsx(AntdInput, {}),
                            }),
                            _jsx(Form.Item, {
                                name: 'customerType',
                                label: 'Customer Type',
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            'Please select the customer type!',
                                    },
                                ],
                                children: _jsx(AntdInput, {}),
                            }),
                            _jsx(Form.Item, {
                                name: 'website',
                                label: 'Website',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input the website!',
                                    },
                                ],
                                children: _jsx(AntdInput, {}),
                            }),
                            _jsx(Form.Item, {
                                children: _jsx(CommonBtn, {
                                    back: false,
                                    type: 'submit',
                                    children: 'Update',
                                }),
                            }),
                        ],
                    }),
            }),
        ],
    });
};
export default ManageDirectSale;
