import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

export default function ContactModal({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingContact, // ✅ pass editingContact from parent
}: any) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            // If editing, pre-fill the form
            if (editingContact) {
                form.setFieldsValue({
                    name: editingContact.name || '',
                    email: editingContact.email || '',
                    phone: editingContact.phone || '',
                    message: editingContact.message || '',
                });
            }
        }
    }, [isOpen, editingContact, form]);

    return (
        <Modal
            title={editingContact ? 'Edit Contact' : 'Add Contact'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() => {
                form.validateFields().then(values => {
                    handleAddSave(values);
                });
            }}
            destroyOnClose
        >
            <Form
                form={form}
                onChange={() => set_error_message('')}
                layout="vertical"
            >
                {/* Name */}
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter name!' }]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter email!' },
                        {
                            type: 'email',
                            message: 'Please enter a valid email!',
                        },
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>

                {/* Phone */}
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter phone number!',
                        },
                    ]}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>

                {/* Message */}
                <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                        { required: true, message: 'Please enter message!' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Enter message"
                        rows={4}
                    />
                </Form.Item>

                {/* Error message */}
                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
}
