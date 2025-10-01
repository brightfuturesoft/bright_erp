'use client';

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
    message,
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
            render: (img, record) => (
                <div className="flex items-center space-x-3">
                    <Avatar
                        size={48}
                        src={img}
                        icon={<ShopOutlined />}
                        className="border-2 object-center border-gray-200 dark:border-gray-700"
                    />
                    <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-100">
                            {record.name}
                        </div>
                        <Badge
                            status={record.is_active ? 'success' : 'error'}
                            text={
                                <span
                                    className={
                                        record.is_active
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                    }
                                >
                                    {record.is_active ? 'Active' : 'Inactive'}
                                </span>
                            }
                        />
                    </div>
                </div>
            ),
        },
        {
            title: 'Store Details',
            key: 'details',
            render: (_, record) => (
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <IdcardOutlined className="text-gray-500 dark:text-gray-400" />
                        <Text className="text-sm dark:text-gray-300">
                            {record.unique_id}
                        </Text>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BankOutlined className="text-gray-500 dark:text-gray-400" />
                        <Text className="text-sm dark:text-gray-300">
                            {record.basic_info?.industry || 'N/A'}
                        </Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Contact Information',
            key: 'contact',
            render: (_, record) => (
                <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <MailOutlined className="text-gray-500 dark:text-gray-400" />
                        <Text className="text-sm dark:text-gray-300">
                            {record.contact_info?.official_email || 'N/A'}
                        </Text>
                    </div>
                    <div className="flex items-center space-x-2">
                        <PhoneOutlined className="text-gray-500 dark:text-gray-400" />
                        <Text className="text-sm dark:text-gray-300">
                            {record.contact_info?.phone_number?.join(', ') ||
                                'N/A'}
                        </Text>
                    </div>
                </div>
            ),
        },
        {
            title: 'Location',
            key: 'location',
            render: (_, record) => (
                <div className="flex items-center space-x-2">
                    <EnvironmentOutlined className="text-gray-500 dark:text-gray-400" />
                    <div>
                        <div className="text-sm font-medium dark:text-gray-200">
                            {record.address_info?.division?.label || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {record.address_info?.country?.label || 'N/A'}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Created Date',
            dataIndex: 'created_at',
            width: 120,
            render: date => (
                <div className="flex items-center space-x-2">
                    <CalendarOutlined className="text-gray-500 dark:text-gray-400" />
                    <Text className="text-sm dark:text-gray-300">
                        {date
                            ? new Date(
                                  typeof date === 'string' ? date : date.$date
                              ).toLocaleDateString()
                            : 'N/A'}
                    </Text>
                </div>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => handleManageClick(record)}
                        className="bg-blue-600 hover:bg-blue-700 border-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 dark:border-blue-500 rounded-md transition-all"
                    >
                        Manage
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="mb-6">
                <Title
                    level={2}
                    className="text-gray-800 dark:text-gray-100 mb-2 flex items-center"
                >
                    <ShopOutlined className="mr-3" />
                    Store Management
                </Title>
                <Text className="text-gray-600 dark:text-gray-300">
                    Manage all your stores, view details, and update their
                    status
                </Text>
            </div>

            <Table
                rowKey={row => row._id?.$oid || row._id}
                dataSource={stores}
                columns={columns}
                loading={isLoading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} stores`,
                }}
                className="custom-table"
                rowClassName="hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200"
            />

            <Modal
                title={
                    <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <Avatar
                            size={48}
                            src={selectedStore?.image}
                            icon={<ShopOutlined />}
                            className="border-2 border-gray-200 dark:border-gray-500"
                        />
                        <div>
                            <Title
                                level={4}
                                className="mb-0 text-gray-800 dark:text-white"
                            >
                                {selectedStore?.name}
                            </Title>
                            <Text className="text-gray-500 dark:text-gray-300">
                                Store Management
                            </Text>
                        </div>
                    </div>
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
                className="custom-modal"
                centered
                bodyStyle={{ background: 'transparent' }}
            >
                {selectedStore && (
                    <div className="pt-4">
                        {/* Status Control */}
                        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Title
                                        level={5}
                                        className="mb-1 dark:text-white"
                                    >
                                        Store Status
                                    </Title>
                                    <Text className="text-gray-600 dark:text-gray-300">
                                        Control whether this store is active or
                                        inactive
                                    </Text>
                                </div>
                                <Switch
                                    checked={selectedStore.is_active}
                                    onChange={handleStatusChange}
                                    // loading={statusMutation.isLoading}
                                    checkedChildren="Active"
                                    unCheckedChildren="Inactive"
                                    className="bg-gray-400 dark:bg-gray-700"
                                />
                            </div>
                        </Card>

                        {/* Store Details */}
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Card
                                    title="Basic Information"
                                    className="mb-4 bg-white dark:bg-gray-800 text-black dark:text-white"
                                >
                                    <Descriptions
                                        column={2}
                                        bordered
                                        size="small"
                                        className="text-black dark:text-white"
                                        labelStyle={{
                                            color: 'var(--label-color)',
                                        }}
                                    >
                                        <Descriptions.Item
                                            label="Store Name"
                                            span={2}
                                        >
                                            <Text
                                                strong
                                                className="text-black dark:text-white"
                                            >
                                                {selectedStore.name}
                                            </Text>
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            className="text-black dark:text-white"
                                            label="Unique ID"
                                        >
                                            <Tag color="blue">
                                                {selectedStore.unique_id}
                                            </Tag>
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            className="text-black dark:text-white"
                                            label="Industry"
                                        >
                                            {selectedStore.basic_info
                                                ?.industry || 'N/A'}
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            className="text-black dark:text-white"
                                            label="Status"
                                            span={2}
                                        >
                                            <Badge
                                                status={
                                                    selectedStore.is_active
                                                        ? 'success'
                                                        : 'error'
                                                }
                                                text={
                                                    <span
                                                        className={
                                                            selectedStore.is_active
                                                                ? 'text-green-600 dark:text-green-400'
                                                                : 'text-red-600 dark:text-red-400'
                                                        }
                                                    >
                                                        {selectedStore.is_active
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </span>
                                                }
                                            />
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>

                            <Col span={12}>
                                <Card
                                    title="Contact Information"
                                    className="h-full bg-white dark:bg-gray-800"
                                >
                                    <Descriptions
                                        className="text-black dark:text-white"
                                        column={1}
                                        size="small"
                                    >
                                        <Descriptions.Item
                                            className="text-black dark:text-white"
                                            label="Official Email"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <MailOutlined className="text-blue-500" />
                                                <Text className="dark:text-gray-200">
                                                    {selectedStore.contact_info
                                                        ?.official_email ||
                                                        'N/A'}
                                                </Text>
                                            </div>
                                        </Descriptions.Item>
                                        <Descriptions.Item
                                            className="text-black dark:text-white"
                                            label="Phone Numbers"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <PhoneOutlined className="text-green-500" />
                                                <Text className="dark:text-gray-200">
                                                    {selectedStore.contact_info?.phone_number?.join(
                                                        ', '
                                                    ) || 'N/A'}
                                                </Text>
                                            </div>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>

                            <Col span={12}>
                                <Card
                                    title="Address Information"
                                    className="h-full bg-white dark:bg-gray-800"
                                >
                                    <Descriptions
                                        column={1}
                                        size="small"
                                    >
                                        <Descriptions.Item label="Country">
                                            <div className="flex items-center space-x-2">
                                                <EnvironmentOutlined className="text-red-500" />
                                                <Text className="dark:text-gray-200">
                                                    {selectedStore.address_info
                                                        ?.country || 'N/A'}
                                                </Text>
                                            </div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="City">
                                            <div className="flex items-center space-x-2">
                                                <EnvironmentOutlined className="text-orange-500" />
                                                <Text className="dark:text-gray-200">
                                                    {selectedStore.address_info
                                                        ?.city || 'N/A'}
                                                </Text>
                                            </div>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>

                            <Col span={24}>
                                <Card
                                    title="Additional Information"
                                    className="bg-white dark:bg-gray-800"
                                >
                                    <Descriptions
                                        column={2}
                                        size="small"
                                    >
                                        <Descriptions.Item label="Created Date">
                                            <div className="flex items-center space-x-2">
                                                <CalendarOutlined className="text-purple-500" />
                                                <Text className="dark:text-gray-200">
                                                    {selectedStore.created_at
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
                                                        : 'N/A'}
                                                </Text>
                                            </div>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Store ID">
                                            <Tag color="geekblue">
                                                {selectedStore._id?.$oid ||
                                                    selectedStore._id}
                                            </Tag>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}
            </Modal>
        </div>
    );
}
