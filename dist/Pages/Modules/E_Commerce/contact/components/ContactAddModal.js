import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
export default function ContactModal({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingContact, // ✅ pass editingContact from parent
}) {
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
    return _jsx(Modal, {
        title: editingContact ? 'Edit Contact' : 'Add Contact',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: () => {
            form.validateFields().then(values => {
                handleAddSave(values);
            });
        },
        destroyOnClose: true,
        children: _jsxs(Form, {
            form: form,
            onChange: () => set_error_message(''),
            layout: 'vertical',
            children: [
                _jsx(Form.Item, {
                    name: 'name',
                    label: 'Name',
                    rules: [{ required: true, message: 'Please enter name!' }],
                    children: _jsx(Input, { placeholder: 'Enter name' }),
                }),
                _jsx(Form.Item, {
                    name: 'email',
                    label: 'Email',
                    rules: [
                        { required: true, message: 'Please enter email!' },
                        {
                            type: 'email',
                            message: 'Please enter a valid email!',
                        },
                    ],
                    children: _jsx(Input, { placeholder: 'Enter email' }),
                }),
                _jsx(Form.Item, {
                    name: 'phone',
                    label: 'Phone',
                    rules: [
                        {
                            required: true,
                            message: 'Please enter phone number!',
                        },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter phone number',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'message',
                    label: 'Message',
                    rules: [
                        { required: true, message: 'Please enter message!' },
                    ],
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter message',
                        rows: 4,
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
}
