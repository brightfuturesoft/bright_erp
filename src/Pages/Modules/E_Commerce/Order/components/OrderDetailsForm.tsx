'use client';

import React, { useState } from 'react';
import { Card, Input, Select, Typography, message } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { OrderDetailsType } from '../OrderType';
import { useOrdersData } from './data_get_api';

const { Option } = Select;
const { Title, Text } = Typography;

interface OrderDetailsFormProps {
    order: OrderDetailsType;
}

const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({ order }) => {
    const { editOrder, refetch } = useOrdersData();
    const [data, setData] = useState<OrderDetailsType>(order);
    const [orderInfoCollapsed, setOrderInfoCollapsed] = useState(false);
    const [customerInfoCollapsed, setCustomerInfoCollapsed] = useState(false);

    const handleChange = (key: keyof typeof data, value: any) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const handleAddressChange = (
        key: keyof typeof data.delivery_address,
        value: any
    ) => {
        setData(prev => ({
            ...prev,
            delivery_address: { ...prev.delivery_address, [key]: value },
        }));
    };

    const handleStatusChange = async (value: string) => {
        setData(prev => ({ ...prev, order_status: value }));
        try {
            await editOrder({ id: data._id, order_status: value });
            message.success(`Order status updated to ${value}`);
            refetch();
        } catch (err) {
            console.error(err);
            message.error('Failed to update order status');
        }
    };

    return (
        <div className="w-full pb-5 space-y-4">
            {/* Order Information */}
            <Card
                className="shadow-md border-none rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                bodyStyle={{ padding: '16px' }}
                title={
                    <div
                        className="flex justify-between items-center cursor-pointer select-none"
                        onClick={() =>
                            setOrderInfoCollapsed(!orderInfoCollapsed)
                        }
                    >
                        <Title
                            level={5}
                            className="!mb-0 dark:text-gray-200 text-gray-800 "
                        >
                            Order Information
                        </Title>
                        {orderInfoCollapsed ? <DownOutlined /> : <UpOutlined />}
                    </div>
                }
            >
                {!orderInfoCollapsed && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                Order Number
                            </Text>
                            <Input
                                value={data.order_number}
                                disabled
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                Order Type
                            </Text>
                            <Select
                                value={data.order_type}
                                onChange={value =>
                                    handleChange('order_type', value)
                                }
                                className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                dropdownStyle={{
                                    backgroundColor: '#f9fafb',
                                    color: '#000',
                                }}
                            >
                                <Option value="ecommerce">E-commerce</Option>
                                <Option value="pos">POS</Option>
                            </Select>
                        </div>

                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                Order Status
                            </Text>
                            <Select
                                value={data.order_status}
                                onChange={handleStatusChange}
                                className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                dropdownStyle={{
                                    backgroundColor: '#f9fafb',
                                    color: '#000',
                                }}
                            >
                                <Option value="Processing">Processing</Option>
                                <Option value="Shipped">Shipped</Option>
                                <Option value="Delivered">Delivered</Option>
                                <Option value="Return">Return</Option>
                                <Option value="Cancelled">Cancelled</Option>
                            </Select>
                        </div>

                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                Total Amount
                            </Text>
                            <Input
                                value={data.total_amount}
                                onChange={e =>
                                    handleChange(
                                        'total_amount',
                                        Number(e.target.value)
                                    )
                                }
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                )}
            </Card>

            {/* Customer / Delivery Information */}
            <Card
                className="shadow-md border-none rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                bodyStyle={{ padding: '16px' }}
                title={
                    <div
                        className="flex justify-between items-center cursor-pointer select-none"
                        onClick={() =>
                            setCustomerInfoCollapsed(!customerInfoCollapsed)
                        }
                    >
                        <Title
                            level={5}
                            className="!mb-0 dark:text-gray-200 text-gray-800"
                        >
                            Customer / Delivery Information
                        </Title>
                        {customerInfoCollapsed ? (
                            <DownOutlined />
                        ) : (
                            <UpOutlined />
                        )}
                    </div>
                }
            >
                {!customerInfoCollapsed && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                Full Name
                            </Text>
                            <Input
                                value={data.delivery_address.full_name}
                                onChange={e =>
                                    handleAddressChange(
                                        'full_name',
                                        e.target.value
                                    )
                                }
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                Phone Number
                            </Text>
                            <Input
                                value={data.delivery_address.phone_number}
                                onChange={e =>
                                    handleAddressChange(
                                        'phone_number',
                                        e.target.value
                                    )
                                }
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                Street
                            </Text>
                            <Input
                                value={data.delivery_address.street}
                                onChange={e =>
                                    handleAddressChange(
                                        'street',
                                        e.target.value
                                    )
                                }
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                City
                            </Text>
                            <Input
                                value={data.delivery_address.city}
                                onChange={e =>
                                    handleAddressChange('city', e.target.value)
                                }
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        <div>
                            <Text className="block mb-1 dark:text-gray-200 text-gray-800">
                                State
                            </Text>
                            <Input
                                value={data.delivery_address.state}
                                onChange={e =>
                                    handleAddressChange('state', e.target.value)
                                }
                                className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default OrderDetailsForm;
