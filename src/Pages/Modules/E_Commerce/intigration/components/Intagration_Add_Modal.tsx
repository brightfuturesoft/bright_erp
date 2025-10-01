'use client';

import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface SocialLinkModalProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    handleAddSave: (values: any) => void;
    error_message: string;
    set_error_message: (val: string) => void;
    editingLink?: any | null;
}

const SocialLinkModal: React.FC<SocialLinkModalProps> = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingLink,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();

    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingLink) {
                form.setFieldsValue({
                    messenger_url: editingLink.messenger_url || '',
                    whatsapp_url: editingLink.whatsapp_url || '',
                });
            }
        }
    }, [isOpen, editingLink, form]);

    const handleOk = () => {
        form.validateFields().then(values => {
            handleAddSave(values);
        });
    };

    return (
        <Modal
            title={editingLink ? 'Edit Social Links' : 'Add Social Links'}
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
                    name="messenger_url"
                    label="Messenger URL"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://messenger.com/your-chat" />
                </Form.Item>

                <Form.Item
                    name="whatsapp_url"
                    label="WhatsApp URL / Number"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://wa.me/1234567890" />
                </Form.Item>

                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
};

export default SocialLinkModal;
