'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
const OutletModal = ({
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
    return _jsx(Modal, {
        title: editingOutlet ? 'Edit Outlet' : 'Add Outlet',
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
                    name: 'name',
                    label: 'Outlet Name',
                    rules: [{ required: true, message: 'Enter outlet name!' }],
                    children: _jsx(Input, { placeholder: 'Enter outlet name' }),
                }),
                _jsx(Form.Item, {
                    name: 'address',
                    label: 'Address',
                    rules: [
                        { required: true, message: 'Enter outlet address!' },
                    ],
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter outlet address',
                        rows: 3,
                        className: 'dark:placeholder-white dark:text-white',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'contact',
                    label: 'Contact Number',
                    rules: [
                        { required: true, message: 'Enter contact number!' },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter contact number',
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
export default OutletModal;
