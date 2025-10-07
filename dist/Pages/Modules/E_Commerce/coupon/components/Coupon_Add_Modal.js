'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';
const CouponModal = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingCoupon,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingCoupon) {
                form.setFieldsValue({
                    ...editingCoupon,
                    dateRange: [
                        dayjs(editingCoupon.startDateTime),
                        dayjs(editingCoupon.endDateTime),
                    ],
                });
            }
        }
    }, [isOpen, editingCoupon, form]);
    const handleOk = () => {
        form.validateFields().then(values => {
            // Convert dateRange to backend-friendly fields
            if (values.dateRange) {
                values.startDateTime = values.dateRange[0].format(
                    'YYYY-MM-DD HH:mm:ss'
                );
                values.endDateTime = values.dateRange[1].format(
                    'YYYY-MM-DD HH:mm:ss'
                );
                delete values.dateRange;
            }
            handleAddSave(values);
        });
    };
    return _jsx(Modal, {
        title: editingCoupon ? 'Edit Coupon' : 'Add Coupon',
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
                    name: 'code',
                    label: 'Coupon Code',
                    rules: [{ required: true, message: 'Enter code!' }],
                    children: _jsx(Input, {
                        placeholder: 'Enter coupon code',
                        onChange: e => {
                            const value = e.target.value
                                .toUpperCase()
                                .replace(/\s/g, '');
                            form.setFieldsValue({ code: value });
                        },
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'name',
                    label: 'Coupon Name',
                    rules: [{ required: true, message: 'Enter name!' }],
                    children: _jsx(Input, { placeholder: 'Enter coupon name' }),
                }),
                _jsx(Form.Item, {
                    name: 'type',
                    label: 'Type',
                    rules: [{ required: true, message: 'Select type!' }],
                    children: _jsxs(Select, {
                        children: [
                            _jsx(Select.Option, {
                                value: 'fixed',
                                children: 'Fixed',
                            }),
                            _jsx(Select.Option, {
                                value: 'percentage',
                                children: 'Percentage',
                            }),
                        ],
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'price',
                    label: 'Price / Discount',
                    rules: [
                        { required: true, message: 'Enter discount value!' },
                    ],
                    children: _jsx(Input, {
                        type: 'number',
                        placeholder: 'Enter discount value',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'usageLimitPerUser',
                    label: 'Usage Limit per User',
                    rules: [{ required: true, message: 'Enter usage limit!' }],
                    children: _jsx(Input, { type: 'number' }),
                }),
                _jsx(Form.Item, {
                    name: 'userLimit',
                    label: 'Total User Limit',
                    rules: [{ required: true, message: 'Enter user limit!' }],
                    children: _jsx(Input, { type: 'number' }),
                }),
                _jsx(Form.Item, {
                    name: 'dateRange',
                    label: 'Start & End Date',
                    rules: [{ required: true, message: 'Select date range!' }],
                    children: _jsx(DatePicker.RangePicker, { showTime: true }),
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
export default CouponModal;
