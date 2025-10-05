import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Form, Input, Switch, Button, ColorPicker } from 'antd';
import { useEffect } from 'react';
// Remove discount option: show remove button if discount exists
export default function Color_modal({
    open,
    onClose,
    onSubmit,
    editing_color,
    error_msg,
    set_error_msg,
}) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (open) {
            if (editing_color) {
                form.setFieldsValue(editing_color);
            } else {
                form.resetFields();
                form.setFieldsValue({ status: true });
            }
            set_error_msg('');
        }
        // eslint-disable-next-line
    }, [open, editing_color]);
    // Remove discount
    const removeDiscount = () => {
        form.setFieldsValue({ discount: '' });
    };
    return _jsx(Modal, {
        title: editing_color ? 'Edit Color' : 'Add Color',
        open: open,
        onCancel: onClose,
        footer: null,
        children: _jsxs(Form, {
            layout: 'vertical',
            form: form,
            initialValues: { status: true },
            onChange: () => set_error_msg(''),
            onFinish: onSubmit,
            children: [
                _jsx(Form.Item, {
                    label: 'Color',
                    name: 'color_name',
                    rules: [
                        {
                            required: true,
                            message: 'Please enter color name',
                        },
                    ],
                    children: _jsx(Input, {}),
                }),
                _jsx(Form.Item, {
                    label: 'Color Code',
                    name: 'code',
                    children: _jsx(ColorPicker, {
                        defaultValue: '#1677ff',
                        onChange: (_, hex) => {
                            form.setFieldsValue({ code: hex });
                        },
                    }),
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
                _jsx('p', { className: 'text-red-500', children: error_msg }),
                _jsx(Form.Item, {
                    className: 'flex justify-end',
                    children: _jsx(Button, {
                        type: 'primary',
                        htmlType: 'submit',
                        children: editing_color ? 'Update' : 'Submit',
                    }),
                }),
            ],
        }),
    });
}
