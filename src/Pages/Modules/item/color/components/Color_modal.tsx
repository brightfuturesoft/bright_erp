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
}: any) {
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

    return (
        <Modal
            title={editing_color ? 'Edit Color' : 'Add Color'}
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ status: true }}
                onChange={() => set_error_msg('')}
                onFinish={onSubmit}
            >
                <Form.Item
                    label="Color"
                    name="color_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter color name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Color Code"
                    name="code"
                >
                    <ColorPicker
                        defaultValue="#1677ff"
                        onChange={(_, hex) => {
                            form.setFieldsValue({ code: hex }); // ✅ Only save hex (#rrggbb)
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                    />
                </Form.Item>
                <p className="text-red-500">{error_msg}</p>
                <Form.Item className="flex justify-end">
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        {editing_color ? 'Update' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
