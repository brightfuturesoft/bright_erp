import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Form, Input, Button, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
const AddNewAccountModal = ({
    entity,
    isModalOpen,
    onSubmit,
    onClose,
    errorMsg = '',
    setErrorMsg,
    initialValues = {},
}) => {
    const [form] = Form.useForm();
    // Reset form when modal opens
    useEffect(() => {
        if (isModalOpen) {
            form.resetFields();
            form.setFieldsValue({
                ac_name: initialValues.ac_name || '',
                description: initialValues.description || '',
                status: initialValues.status ?? false, // default to false
            });
            setErrorMsg?.('');
        }
    }, [isModalOpen, initialValues, form, setErrorMsg]);
    const capitalizedEntity = entity.charAt(0).toUpperCase() + entity.slice(1); // Expense, Discount, etc.
    return _jsx(Modal, {
        title: `Add New ${capitalizedEntity} Account`,
        open: isModalOpen,
        onCancel: onClose,
        footer: null,
        className: '!rounded-lg',
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onFinish: onSubmit,
            onChange: () => setErrorMsg?.(''),
            children: [
                _jsx(Form.Item, {
                    name: 'ac_name',
                    rules: [{ required: true, message: 'Enter account name' }],
                    children: _jsx(Input, {
                        className: 'w-full h-[42px] rounded border px-2',
                        placeholder: 'Account Name',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    rules: [{ required: false, message: 'Enter description' }],
                    children: _jsx(TextArea, {
                        rows: 4,
                        className: 'w-full rounded border px-2 dark:text-white',
                        placeholder: 'Description',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    valuePropName: 'checked',
                    children: _jsx(Switch, {
                        checkedChildren: 'Active',
                        unCheckedChildren: 'Inactive',
                    }),
                }),
                errorMsg &&
                    _jsx('p', {
                        className: 'text-red-500',
                        children: errorMsg,
                    }),
                _jsxs('div', {
                    className: 'flex space-x-2 mt-2',
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            htmlType: 'submit',
                            className: 'rounded',
                            children: 'Add',
                        }),
                        _jsx(Button, {
                            onClick: onClose,
                            className:
                                '!bg-red-600 !text-white !border-none rounded hover:!bg-red-700',
                            children: 'Cancel',
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default AddNewAccountModal;
