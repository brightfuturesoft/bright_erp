'use client';

import React, { useEffect, useContext } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { FaqType } from '../Question_Type';

interface FaqModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingFaq?: FaqType | null;
    isDarkMode?: boolean;
}

const FaqModal: React.FC<FaqModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingFaq,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingFaq) {
                form.setFieldsValue({
                    question: editingFaq.question || '',
                    answer: editingFaq.answer || '',
                    status: editingFaq.status || 'Active',
                });
            } else {
                form.setFieldsValue({ status: 'Active' });
            }
        }
    }, [isOpen, editingFaq, form]);

    return (
        <Modal
            title={editingFaq ? 'Edit FAQ' : 'Add FAQ'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() =>
                form.validateFields().then(values => handleAddSave(values))
            }
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onChange={() => set_error_message('')}
            >
                {/* Question */}
                <Form.Item
                    name="question"
                    label="Question"
                    rules={[
                        { required: true, message: 'Please enter a question!' },
                    ]}
                >
                    <Input placeholder="Enter FAQ question" />
                </Form.Item>

                {/* Answer */}
                <Form.Item
                    name="answer"
                    label="Answer"
                    rules={[
                        { required: true, message: 'Please enter an answer!' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Enter FAQ answer"
                        rows={4}
                    />
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        { required: true, message: 'Please select status!' },
                    ]}
                >
                    <Select placeholder="Select status">
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

export default FaqModal;
