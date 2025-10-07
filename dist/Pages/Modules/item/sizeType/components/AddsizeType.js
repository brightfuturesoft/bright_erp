import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// AddSizeTypeModal.tsx
import { Modal, Form, Input, Switch, Button } from 'antd';
import { useEffect } from 'react';
const AddSizeTypeModal = ({
    open,
    onClose,
    onSubmit,
    errorMsg,
    setErrorMsg,
}) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (open) {
            form.resetFields();
            form.setFieldsValue({ status: true });
            setErrorMsg('');
        }
    }, [open]);
    return _jsx(Modal, {
        title: 'Add Size Type',
        open: open,
        onCancel: onClose,
        footer: null,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onFinish: onSubmit,
            initialValues: { status: true },
            onChange: () => setErrorMsg(''),
            children: [
                _jsx(Form.Item, {
                    label: 'Size Type',
                    name: 'sizeType',
                    rules: [{ required: true, message: 'Enter size type' }],
                    children: _jsx(Input, {}),
                }),
                _jsx(Form.Item, {
                    label: 'Added Type',
                    name: 'addedType',
                    rules: [{ required: true, message: 'Enter added type' }],
                    children: _jsx(Input, {}),
                }),
                _jsx(Form.Item, {
                    label: 'Status',
                    name: 'status',
                    valuePropName: 'checked',
                    children: _jsx(Switch, {
                        checkedChildren: 'Active',
                        unCheckedChildren: 'Inactive',
                    }),
                }),
                _jsx('p', { className: 'text-red-500', children: errorMsg }),
                _jsx(Form.Item, {
                    className: 'flex justify-end',
                    children: _jsx(Button, {
                        type: 'primary',
                        htmlType: 'submit',
                        children: 'Submit',
                    }),
                }),
            ],
        }),
    });
};
export default AddSizeTypeModal;
