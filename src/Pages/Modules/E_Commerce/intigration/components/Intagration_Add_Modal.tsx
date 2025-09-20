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
                    facebook_url: editingLink.facebook_url || '',
                    instagram_url: editingLink.instagram_url || '',
                    youtube_url: editingLink.youtube_url || '',
                    whatsapp_url: editingLink.whatsapp_url || '',
                    twitter_url: editingLink.twitter_url || '',
                    linkedin_url: editingLink.linkedin_url || '',
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
                    name="facebook_url"
                    label="Facebook URL"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://facebook.com/your-page" />
                </Form.Item>

                <Form.Item
                    name="instagram_url"
                    label="Instagram URL"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://instagram.com/your-profile" />
                </Form.Item>

                <Form.Item
                    name="youtube_url"
                    label="YouTube URL"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://youtube.com/your-channel" />
                </Form.Item>

                <Form.Item
                    name="whatsapp_url"
                    label="WhatsApp URL / Number"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://wa.me/1234567890" />
                </Form.Item>

                <Form.Item
                    name="twitter_url"
                    label="Twitter URL"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://twitter.com/your-profile" />
                </Form.Item>

                <Form.Item
                    name="linkedin_url"
                    label="LinkedIn URL"
                    rules={[{ type: 'url', message: 'Enter a valid URL!' }]}
                >
                    <Input placeholder="https://linkedin.com/in/your-profile" />
                </Form.Item>

                {error_message && (
                    <p style={{ color: 'red' }}>{error_message}</p>
                )}
            </Form>
        </Modal>
    );
};

export default SocialLinkModal;
