'use client';

import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import JoditEditor from 'jodit-react';

interface TermType {
    _id?: string;
    title: string;
    description: string;
    status: 'Active' | 'Inactive';
}

interface TermModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingTerm?: TermType | null;
}

const TermModal: React.FC<TermModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingTerm,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingTerm) {
                form.setFieldsValue({ ...editingTerm });
            }
        }
    }, [isOpen, editingTerm, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            handleAddSave(values);
        });
    };

    return (
        <Modal
            title={editingTerm ? 'Edit Term' : 'Add Term'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={handleOk}
            destroyOnClose
            width={1200}
        >
            <Form
                form={form}
                layout="vertical"
                onChange={() => set_error_message('')}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Enter title!' }]}
                >
                    <Input placeholder="Enter term title" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Enter description!' }]}
                >
                    <JoditEditor
                        value={form.getFieldValue('description') || ''}
                        onChange={val =>
                            form.setFieldsValue({ description: val })
                        }
                        config={{
                            readonly: false,
                            height: 300,
                        }}
                        className="jodit-editor"
                    />
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

export default TermModal;
