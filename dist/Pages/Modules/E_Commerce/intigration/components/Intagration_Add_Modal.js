'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
const SocialLinkModal = ({
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
    return _jsx(Modal, {
        title: editingLink ? 'Edit Social Links' : 'Add Social Links',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: handleOk,
        destroyOnClose: true,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onChange: () => set_error_message(''),
            children: [
                _jsx(Form.Item, {
                    name: 'messenger_url',
                    label: 'Messenger URL',
                    rules: [{ type: 'url', message: 'Enter a valid URL!' }],
                    children: _jsx(Input, {
                        placeholder: 'https://messenger.com/your-chat',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'whatsapp_url',
                    label: 'WhatsApp URL / Number',
                    rules: [{ type: 'url', message: 'Enter a valid URL!' }],
                    children: _jsx(Input, {
                        placeholder: 'https://wa.me/1234567890',
                    }),
                }),
                error_message &&
                    _jsx('p', {
                        style: { color: 'red' },
                        children: error_message,
                    }),
            ],
        }),
    });
};
export default SocialLinkModal;
