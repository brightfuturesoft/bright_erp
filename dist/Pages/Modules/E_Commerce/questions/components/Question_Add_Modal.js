'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useContext } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
const FaqModal = ({
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
    return _jsx(Modal, {
        title: editingFaq ? 'Edit FAQ' : 'Add FAQ',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: () => form.validateFields().then(values => handleAddSave(values)),
        destroyOnClose: true,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onChange: () => set_error_message(''),
            children: [
                _jsx(Form.Item, {
                    name: 'question',
                    label: 'Question',
                    rules: [
                        { required: true, message: 'Please enter a question!' },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter FAQ question',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'answer',
                    label: 'Answer',
                    rules: [
                        { required: true, message: 'Please enter an answer!' },
                    ],
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter FAQ answer',
                        rows: 4,
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [
                        { required: true, message: 'Please select status!' },
                    ],
                    children: _jsxs(Select, {
                        placeholder: 'Select status',
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
export default FaqModal;
