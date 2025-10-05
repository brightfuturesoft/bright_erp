'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useState } from 'react';
import {
    Table,
    Button,
    Tag,
    Modal,
    Descriptions,
    Switch,
    Card,
    Avatar,
    Space,
    Typography,
    Badge,
    Row,
    Col,
} from 'antd';
import {
    ShopOutlined,
    EyeOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    IdcardOutlined,
    BankOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
const { Title, Text } = Typography;
const fetchShops = async userId => {
    const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}admin/get-all-shop/get-all-shop`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: userId,
            },
        }
    );
    if (!res.ok) throw new Error('Failed to fetch shops');
    const data = await res.json();
    return data.data || [];
};
const updateStoreStatus = async ({ storeId, isActive, userId }) => {
    const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}admin/update-shop-status`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: userId,
            },
            body: JSON.stringify({
                shopId: storeId,
                is_active: isActive,
            }),
        }
    );
    if (!res.ok) throw new Error('Failed to update store status');
    return res.json();
};
export default function AllStoresTableEnhanced() {
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();
    const {
        data: stores = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['all-shops', user?._id],
        queryFn: () => fetchShops(user?._id),
        enabled: !!user?._id,
    });
    const [selectedStore, setSelectedStore] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const statusMutation = useMutation({});
    const handleManageClick = record => {
        setSelectedStore(record);
        setIsModalVisible(true);
    };
    const handleStatusChange = checked => {};
    const columns = [
        {
            title: 'Store',
            dataIndex: 'image',
            width: 120,
            render: (img, record) =>
                _jsxs('div', {
                    className: 'flex items-center space-x-3',
                    children: [
                        _jsx(Avatar, {
                            size: 48,
                            src: img,
                            icon: _jsx(ShopOutlined, {}),
                            className:
                                'border-2 object-center border-gray-200 dark:border-gray-700',
                        }),
                        _jsxs('div', {
                            children: [
                                _jsx('div', {
                                    className:
                                        'font-semibold text-gray-800 dark:text-gray-100',
                                    children: record.name,
                                }),
                                _jsx(Badge, {
                                    status: record.is_active
                                        ? 'success'
                                        : 'error',
                                    text: _jsx('span', {
                                        className: record.is_active
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400',
                                        children: record.is_active
                                            ? 'Active'
                                            : 'Inactive',
                                    }),
                                }),
                            ],
                        }),
                    ],
                }),
        },
        {
            title: 'Store Details',
            key: 'details',
            render: (_, record) =>
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                                _jsx(IdcardOutlined, {
                                    className:
                                        'text-gray-500 dark:text-gray-400',
                                }),
                                _jsx(Text, {
                                    className: 'text-sm dark:text-gray-300',
                                    children: record.unique_id,
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                                _jsx(BankOutlined, {
                                    className:
                                        'text-gray-500 dark:text-gray-400',
                                }),
                                _jsx(Text, {
                                    className: 'text-sm dark:text-gray-300',
                                    children:
                                        record.basic_info?.industry || 'N/A',
                                }),
                            ],
                        }),
                    ],
                }),
        },
        {
            title: 'Contact Information',
            key: 'contact',
            render: (_, record) =>
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                                _jsx(MailOutlined, {
                                    className:
                                        'text-gray-500 dark:text-gray-400',
                                }),
                                _jsx(Text, {
                                    className: 'text-sm dark:text-gray-300',
                                    children:
                                        record.contact_info?.official_email ||
                                        'N/A',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex items-center space-x-2',
                            children: [
                                _jsx(PhoneOutlined, {
                                    className:
                                        'text-gray-500 dark:text-gray-400',
                                }),
                                _jsx(Text, {
                                    className: 'text-sm dark:text-gray-300',
                                    children:
                                        record.contact_info?.phone_number?.join(
                                            ', '
                                        ) || 'N/A',
                                }),
                            ],
                        }),
                    ],
                }),
        },
        {
            title: 'Location',
            key: 'location',
            render: (_, record) =>
                _jsxs('div', {
                    className: 'flex items-center space-x-2',
                    children: [
                        _jsx(EnvironmentOutlined, {
                            className: 'text-gray-500 dark:text-gray-400',
                        }),
                        _jsxs('div', {
                            children: [
                                _jsx('div', {
                                    className:
                                        'text-sm font-medium dark:text-gray-200',
                                    children:
                                        record.address_info?.division?.label ||
                                        'N/A',
                                }),
                                _jsx('div', {
                                    className:
                                        'text-xs text-gray-500 dark:text-gray-400',
                                    children:
                                        record.address_info?.country?.label ||
                                        'N/A',
                                }),
                            ],
                        }),
                    ],
                }),
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            width: 120,
            render: date =>
                _jsxs('div', {
                    className: 'flex items-center space-x-2',
                    children: [
                        _jsx(CalendarOutlined, {
                            className: 'text-gray-500 dark:text-gray-400',
                        }),
                        _jsx(Text, {
                            className: 'text-sm dark:text-gray-300',
                            children: date
                                ? new Date(
                                      typeof date === 'string'
                                          ? date
                                          : date.$date
                                  ).toLocaleDateString()
                                : 'N/A',
                        }),
                    ],
                }),
        },
        {
            title: 'Actions',
            key: 'action',
            width: 120,
            render: (_, record) =>
                _jsx(Space, {
                    children: _jsx(Button, {
                        type: 'primary',
                        icon: _jsx(EyeOutlined, {}),
                        onClick: () => handleManageClick(record),
                        className:
                            'bg-blue-600 hover:bg-blue-700 border-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-blue-500 rounded-md transition-all',
                        children: 'Manage',
                    }),
                }),
        },
    ];
    return _jsxs('div', {
        className:
            'p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300',
        children: [
            _jsxs('div', {
                className: 'mb-6',
                children: [
                    _jsxs(Title, {
                        level: 2,
                        className:
                            'text-gray-800 dark:text-gray-100 mb-2 flex items-center',
                        children: [
                            _jsx(ShopOutlined, { className: 'mr-3' }),
                            'Store Management',
                        ],
                    }),
                    _jsx(Text, {
                        className: 'text-gray-600 dark:text-gray-300',
                        children:
                            'Manage all your stores, view details, and update their status',
                    }),
                ],
            }),
            _jsx(Table, {
                rowKey: row => row._id?.$oid || row._id,
                dataSource: stores,
                columns: columns,
                loading: isLoading,
                pagination: {
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} stores`,
                },
                className: 'custom-table',
                rowClassName:
                    'hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200',
            }),
            _jsx(Modal, {
                title: _jsxs('div', {
                    className:
                        'flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700',
                    children: [
                        _jsx(Avatar, {
                            size: 48,
                            src: selectedStore?.image,
                            icon: _jsx(ShopOutlined, {}),
                            className:
                                'border-2 border-gray-200 dark:border-gray-500',
                        }),
                        _jsxs('div', {
                            children: [
                                _jsx(Title, {
                                    level: 4,
                                    className:
                                        'mb-0 text-gray-800 dark:text-white',
                                    children: selectedStore?.name,
                                }),
                                _jsx(Text, {
                                    className:
                                        'text-gray-500 dark:text-gray-300',
                                    children: 'Store Management',
                                }),
                            ],
                        }),
                    ],
                }),
                open: isModalVisible,
                onCancel: () => setIsModalVisible(false),
                footer: null,
                width: 800,
                className: 'custom-modal',
                centered: true,
                bodyStyle: { background: 'transparent' },
                children:
                    selectedStore &&
                    _jsxs('div', {
                        className: 'pt-4',
                        children: [
                            _jsx(Card, {
                                className:
                                    'mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-800',
                                children: _jsxs('div', {
                                    className:
                                        'flex items-center justify-between',
                                    children: [
                                        _jsxs('div', {
                                            children: [
                                                _jsx(Title, {
                                                    level: 5,
                                                    className:
                                                        'mb-1 dark:text-white',
                                                    children: 'Store Status',
                                                }),
                                                _jsx(Text, {
                                                    className:
                                                        'text-gray-600 dark:text-gray-300',
                                                    children:
                                                        'Control whether this store is active or inactive',
                                                }),
                                            ],
                                        }),
                                        _jsx(Switch, {
                                            checked: selectedStore.is_active,
                                            onChange: handleStatusChange,
                                            // loading={statusMutation.isLoading}
                                            checkedChildren: 'Active',
                                            unCheckedChildren: 'Inactive',
                                            className:
                                                'bg-gray-400 dark:bg-gray-700',
                                        }),
                                    ],
                                }),
                            }),
                            _jsxs(Row, {
                                gutter: [24, 24],
                                children: [
                                    _jsx(Col, {
                                        span: 24,
                                        children: _jsx(Card, {
                                            title: 'Basic Information',
                                            className:
                                                'mb-4 bg-white dark:bg-gray-800 text-black dark:text-white',
                                            children: _jsxs(Descriptions, {
                                                column: 2,
                                                bordered: true,
                                                size: 'small',
                                                className:
                                                    'text-black dark:text-white',
                                                labelStyle: {
                                                    color: 'var(--label-color)',
                                                },
                                                children: [
                                                    _jsx(Descriptions.Item, {
                                                        label: 'Store Name',
                                                        span: 2,
                                                        children: _jsx(Text, {
                                                            strong: true,
                                                            className:
                                                                'text-black dark:text-white',
                                                            children:
                                                                selectedStore.name,
                                                        }),
                                                    }),
                                                    _jsx(Descriptions.Item, {
                                                        className:
                                                            'text-black dark:text-white',
                                                        label: 'Unique ID',
                                                        children: _jsx(Tag, {
                                                            color: 'blue',
                                                            children:
                                                                selectedStore.unique_id,
                                                        }),
                                                    }),
                                                    _jsx(Descriptions.Item, {
                                                        className:
                                                            'text-black dark:text-white',
                                                        label: 'Industry',
                                                        children:
                                                            selectedStore
                                                                .basic_info
                                                                ?.industry ||
                                                            'N/A',
                                                    }),
                                                    _jsx(Descriptions.Item, {
                                                        className:
                                                            'text-black dark:text-white',
                                                        label: 'Status',
                                                        span: 2,
                                                        children: _jsx(Badge, {
                                                            status: selectedStore.is_active
                                                                ? 'success'
                                                                : 'error',
                                                            text: _jsx('span', {
                                                                className:
                                                                    selectedStore.is_active
                                                                        ? 'text-green-600 dark:text-green-400'
                                                                        : 'text-red-600 dark:text-red-400',
                                                                children:
                                                                    selectedStore.is_active
                                                                        ? 'Active'
                                                                        : 'Inactive',
                                                            }),
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 12,
                                        children: _jsx(Card, {
                                            title: 'Contact Information',
                                            className:
                                                'h-full bg-white dark:bg-gray-800',
                                            children: _jsxs(Descriptions, {
                                                className:
                                                    'text-black dark:text-white',
                                                column: 1,
                                                size: 'small',
                                                children: [
                                                    _jsx(Descriptions.Item, {
                                                        className:
                                                            'text-black dark:text-white',
                                                        label: 'Official Email',
                                                        children: _jsxs('div', {
                                                            className:
                                                                'flex items-center space-x-2',
                                                            children: [
                                                                _jsx(
                                                                    MailOutlined,
                                                                    {
                                                                        className:
                                                                            'text-blue-500',
                                                                    }
                                                                ),
                                                                _jsx(Text, {
                                                                    className:
                                                                        'dark:text-gray-200',
                                                                    children:
                                                                        selectedStore
                                                                            .contact_info
                                                                            ?.official_email ||
                                                                        'N/A',
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                    _jsx(Descriptions.Item, {
                                                        className:
                                                            'text-black dark:text-white',
                                                        label: 'Phone Numbers',
                                                        children: _jsxs('div', {
                                                            className:
                                                                'flex items-center space-x-2',
                                                            children: [
                                                                _jsx(
                                                                    PhoneOutlined,
                                                                    {
                                                                        className:
                                                                            'text-green-500',
                                                                    }
                                                                ),
                                                                _jsx(Text, {
                                                                    className:
                                                                        'dark:text-gray-200',
                                                                    children:
                                                                        selectedStore.contact_info?.phone_number?.join(
                                                                            ', '
                                                                        ) ||
                                                                        'N/A',
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 12,
                                        children: _jsx(Card, {
                                            title: 'Address Information',
                                            className:
                                                'h-full bg-white dark:bg-gray-800',
                                            children: _jsxs(Descriptions, {
                                                column: 1,
                                                size: 'small',
                                                children: [
                                                    _jsx(Descriptions.Item, {
                                                        label: 'Country',
                                                        children: _jsxs('div', {
                                                            className:
                                                                'flex items-center space-x-2',
                                                            children: [
                                                                _jsx(
                                                                    EnvironmentOutlined,
                                                                    {
                                                                        className:
                                                                            'text-red-500',
                                                                    }
                                                                ),
                                                                _jsx(Text, {
                                                                    className:
                                                                        'dark:text-gray-200',
                                                                    children:
                                                                        selectedStore
                                                                            .address_info
                                                                            ?.country ||
                                                                        'N/A',
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                    _jsx(Descriptions.Item, {
                                                        label: 'City',
                                                        children: _jsxs('div', {
                                                            className:
                                                                'flex items-center space-x-2',
                                                            children: [
                                                                _jsx(
                                                                    EnvironmentOutlined,
                                                                    {
                                                                        className:
                                                                            'text-orange-500',
                                                                    }
                                                                ),
                                                                _jsx(Text, {
                                                                    className:
                                                                        'dark:text-gray-200',
                                                                    children:
                                                                        selectedStore
                                                                            .address_info
                                                                            ?.city ||
                                                                        'N/A',
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                    _jsx(Col, {
                                        span: 24,
                                        children: _jsx(Card, {
                                            title: 'Additional Information',
                                            className:
                                                'bg-white dark:bg-gray-800',
                                            children: _jsxs(Descriptions, {
                                                column: 2,
                                                size: 'small',
                                                children: [
                                                    _jsx(Descriptions.Item, {
                                                        label: 'Created Date',
                                                        children: _jsxs('div', {
                                                            className:
                                                                'flex items-center space-x-2',
                                                            children: [
                                                                _jsx(
                                                                    CalendarOutlined,
                                                                    {
                                                                        className:
                                                                            'text-purple-500',
                                                                    }
                                                                ),
                                                                _jsx(Text, {
                                                                    className:
                                                                        'dark:text-gray-200',
                                                                    children:
                                                                        selectedStore.created_at
                                                                            ? new Date(
                                                                                  typeof selectedStore.created_at ===
                                                                                  'string'
                                                                                      ? selectedStore.created_at
                                                                                      : selectedStore
                                                                                            .created_at
                                                                                            .$date
                                                                              ).toLocaleDateString(
                                                                                  'en-US',
                                                                                  {
                                                                                      year: 'numeric',
                                                                                      month: 'long',
                                                                                      day: 'numeric',
                                                                                  }
                                                                              )
                                                                            : 'N/A',
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                    _jsx(Descriptions.Item, {
                                                        label: 'Store ID',
                                                        children: _jsx(Tag, {
                                                            color: 'geekblue',
                                                            children:
                                                                selectedStore
                                                                    ._id
                                                                    ?.$oid ||
                                                                selectedStore._id,
                                                        }),
                                                    }),
                                                ],
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
            }),
        ],
    });
}
