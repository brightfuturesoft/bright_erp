import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Form, Input, Button, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
const EditAccountModal = ({
    entity,
    isOpen,
    onCancel,
    onSubmit,
    record,
    errorMsg = '',
    setErrorMsg,
}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen) {
            setErrorMsg && setErrorMsg('');
            form.setFieldsValue({
                ac_name: record.ac_name,
                description: record.description,
                status: record.status ?? false,
            });
        } else {
            form.resetFields();
        }
    }, [isOpen, record, form, setErrorMsg]);
    const handleFinish = values => {
        if (!record._id) {
            console.warn('Warning: Editing record has no _id');
            return;
        }
        onSubmit({ ...values, id: record._id });
        form.resetFields();
    };
    const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);
    return _jsx(Modal, {
        title: `Edit ${capitalized} Account`,
        open: isOpen,
        onCancel: onCancel,
        footer: null,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onFinish: handleFinish,
            children: [
                _jsx(Form.Item, {
                    name: 'ac_name',
                    rules: [{ required: true, message: 'Enter account name' }],
                    children: _jsx(Input, {
                        className: 'p-2 border rounded w-full h-[42px]',
                        placeholder: 'Account Name',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    rules: [{ required: true, message: 'Enter description' }],
                    children: _jsx(TextArea, {
                        rows: 4,
                        className: 'p-2 border rounded w-full dark:text-white',
                        placeholder: 'Description',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    valuePropName: 'checked',
                    label: 'Status',
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
                    className: 'flex space-x-2 justify-start',
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            htmlType: 'submit',
                            children: 'Update',
                        }),
                        _jsx(Button, {
                            className: '!bg-red-600 !text-white',
                            onClick: onCancel,
                            children: 'Cancel',
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default EditAccountModal;
