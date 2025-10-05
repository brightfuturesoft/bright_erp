import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { useEffect } from 'react';
// Remove discount option: show remove button if discount exists
export default function Manufacturer_modal({
    open,
    onClose,
    onSubmit,
    editingManufacturer,
    errorMsg,
    setErrorMsg,
}) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (open) {
            if (editingManufacturer) {
                form.setFieldsValue(editingManufacturer);
            } else {
                form.resetFields();
                form.setFieldsValue({ status: true });
            }
            setErrorMsg('');
        }
        // eslint-disable-next-line
    }, [open, editingManufacturer]);
    // Remove discount
    const removeDiscount = () => {
        form.setFieldsValue({ discount: '' });
    };
    return _jsx(Modal, {
        title: editingManufacturer ? 'Edit Manufacturer' : 'Add Manufacturer',
        open: open,
        onCancel: onClose,
        footer: null,
        children: _jsxs(Form, {
            layout: 'vertical',
            form: form,
            initialValues: { status: true },
            onChange: () => setErrorMsg(''),
            onFinish: onSubmit,
            children: [
                _jsx(Form.Item, {
                    label: 'Manufacturer',
                    name: 'manufacturer',
                    rules: [
                        {
                            required: true,
                            message: 'Please enter manufacturer name',
                        },
                    ],
                    children: _jsx(Input, {}),
                }),
                _jsx(Form.Item, {
                    label: 'Unique Code',
                    shouldUpdate: (prev, curr) =>
                        prev.manufacturer !== curr.manufacturer,
                    rules: [
                        { required: true, message: 'Please enter unique code' },
                    ],
                    children: ({ getFieldValue, setFieldsValue }) => {
                        const nameValue = getFieldValue('manufacturer') || '';
                        const codeValue = nameValue
                            .toLowerCase()
                            .replace(/\s/g, '_');
                        setTimeout(
                            () => setFieldsValue({ code: codeValue }),
                            0
                        );
                        return _jsx(Form.Item, {
                            name: 'code',
                            noStyle: true,
                            children: _jsx(Input, {
                                className: 'dark:text-white text-black',
                                value: codeValue,
                            }),
                        });
                    },
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
                _jsx(Form.Item, {
                    label: 'Description',
                    name: 'description',
                    children: _jsx(Input.TextArea, {
                        className: 'dark:text-white text-black',
                        rows: 2,
                    }),
                }),
                _jsx('p', { className: 'text-red-500', children: errorMsg }),
                _jsx(Form.Item, {
                    className: 'flex justify-end',
                    children: _jsx(Button, {
                        type: 'primary',
                        htmlType: 'submit',
                        children: editingManufacturer ? 'Update' : 'Submit',
                    }),
                }),
            ],
        }),
    });
}
