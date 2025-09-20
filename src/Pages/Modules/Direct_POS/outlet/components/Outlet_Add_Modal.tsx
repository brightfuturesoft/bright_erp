'use client';

import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface OutletType {
    _id?: string;
    name: string;
    address: string;
    contact: string;
    status: 'Active' | 'Inactive';
}

interface OutletModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingOutlet?: OutletType | null;
}

const OutletModal: React.FC<OutletModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingOutlet,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingOutlet) {
                form.setFieldsValue({ ...editingOutlet });
            }
        }
    }, [isOpen, editingOutlet, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            handleAddSave(values);
        });
    };

    return (
        <Modal
            title={editingOutlet ? 'Edit Outlet' : 'Add Outlet'}
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
                    name="name"
                    label="Outlet Name"
                    rules={[{ required: true, message: 'Enter outlet name!' }]}
                >
                    <Input placeholder="Enter outlet name" />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        { required: true, message: 'Enter outlet address!' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Enter outlet address"
                        rows={3}
                        className="dark:placeholder-white dark:text-white"
                    />
                </Form.Item>

                <Form.Item
                    name="contact"
                    label="Contact Number"
                    rules={[
                        { required: true, message: 'Enter contact number!' },
                    ]}
                >
                    <Input placeholder="Enter contact number" />
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

export default OutletModal;
