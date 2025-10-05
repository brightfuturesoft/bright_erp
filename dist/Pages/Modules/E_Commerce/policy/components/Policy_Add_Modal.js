'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import JoditEditor from 'jodit-react';
const PolicyModal = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingPolicy,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingPolicy) {
                form.setFieldsValue({ ...editingPolicy });
            }
        }
    }, [isOpen, editingPolicy, form]);
    const handleOk = () => {
        form.validateFields().then(values => {
            handleAddSave(values);
        });
    };
    return _jsx(Modal, {
        title: editingPolicy ? 'Edit Policy' : 'Add Policy',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: handleOk,
        destroyOnClose: true,
        width: 1200,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onChange: () => set_error_message(''),
            children: [
                _jsx(Form.Item, {
                    name: 'title',
                    label: 'Title',
                    rules: [{ required: true, message: 'Enter title!' }],
                    children: _jsx(Input, {
                        placeholder: 'Enter policy title',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    label: 'Description',
                    rules: [{ required: true, message: 'Enter description!' }],
                    children: _jsx(JoditEditor, {
                        value: form.getFieldValue('message') || '',
                        onChange: val => form.setFieldsValue({ message: val }),
                        config: {
                            readonly: false,
                            height: 300,
                        },
                        className: 'jodit-editor',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [{ required: true }],
                    children: _jsxs(Select, {
                        children: [
                            _jsx(Select.Option, {
                                value: 'Active',
                                children: 'Active',
                            }),
                            _jsx(Select.Option, {
                                value: 'Inactive',
                                children: 'Inactive',
                            }),
                        ],
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
export default PolicyModal;
