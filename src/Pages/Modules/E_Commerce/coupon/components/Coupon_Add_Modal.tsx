'use client';

import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { CouponType } from '../Coupon';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';

interface CouponModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingCoupon?: CouponType | null;
}

const CouponModal: React.FC<CouponModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingCoupon,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingCoupon) {
                form.setFieldsValue({
                    ...editingCoupon,
                    dateRange: [
                        dayjs(editingCoupon.startDateTime),
                        dayjs(editingCoupon.endDateTime),
                    ],
                });
            }
        }
    }, [isOpen, editingCoupon, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            // Convert dateRange to backend-friendly fields
            if (values.dateRange) {
                values.startDateTime = values.dateRange[0].format(
                    'YYYY-MM-DD HH:mm:ss'
                );
                values.endDateTime = values.dateRange[1].format(
                    'YYYY-MM-DD HH:mm:ss'
                );
                delete values.dateRange;
            }
            handleAddSave(values);
        });
    };

    return (
        <Modal
            title={editingCoupon ? 'Edit Coupon' : 'Add Coupon'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={handleOk}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onChange={() => set_error_message('')}
            >
                <Form.Item
                    name="code"
                    label="Coupon Code"
                    rules={[{ required: true, message: 'Enter code!' }]}
                >
                    <Input placeholder="Enter coupon code" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Coupon Name"
                    rules={[{ required: true, message: 'Enter name!' }]}
                >
                    <Input placeholder="Enter coupon name" />
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Select type!' }]}
                >
                    <Select>
                        <Select.Option value="fixed">Fixed</Select.Option>
                        <Select.Option value="percentage">
                            Percentage
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price / Discount"
                    rules={[
                        { required: true, message: 'Enter discount value!' },
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Enter discount value"
                    />
                </Form.Item>

                <Form.Item
                    name="usageLimitPerUser"
                    label="Usage Limit per User"
                    rules={[{ required: true, message: 'Enter usage limit!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    name="userLimit"
                    label="Total User Limit"
                    rules={[{ required: true, message: 'Enter user limit!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    name="dateRange"
                    label="Start & End Date"
                    rules={[{ required: true, message: 'Select date range!' }]}
                >
                    <DatePicker.RangePicker showTime />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
};

export default CouponModal;
