import { Modal, Form, Input, Switch, Button } from 'antd';
import { useEffect } from 'react';

// Remove discount option: show remove button if discount exists
export default function Attribute_modal({
    open,
    onClose,
    onSubmit,
    editingAttribute,
    errorMsg,
    setErrorMsg,
}: any) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingAttribute) {
                form.setFieldsValue(editingAttribute);
            } else {
                form.resetFields();
                form.setFieldsValue({ status: true });
            }
            setErrorMsg('');
        }
        // eslint-disable-next-line
    }, [open, editingAttribute]);

    // Remove discount
    const removeDiscount = () => {
        form.setFieldsValue({ discount: '' });
    };

    return (
        <Modal
            title={
                editingAttribute ? 'Edit Attribute Set' : 'Add Attribute Set'
            }
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ status: true }}
                onChange={() => setErrorMsg('')}
                onFinish={onSubmit}
            >
                <Form.Item
                    label="Attribute Set"
                    name="attribute_set"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter attribute set name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Unique Code"
                    shouldUpdate={(prev, curr) =>
                        prev.attribute_set !== curr.attribute_set
                    }
                    rules={[
                        { required: true, message: 'Please enter unique code' },
                    ]}
                >
                    {({ getFieldValue, setFieldsValue }) => {
                        const nameValue = getFieldValue('attribute_set') || '';
                        const codeValue = nameValue
                            .toLowerCase()
                            .replace(/\s/g, '_');
                        setTimeout(
                            () => setFieldsValue({ code: codeValue }),
                            0
                        );
                        return (
                            <Form.Item
                                name="code"
                                noStyle
                            >
                                <Input
                                    className="dark:text-white text-black"
                                    value={codeValue}
                                />
                            </Form.Item>
                        );
                    }}
                </Form.Item>
                <Form.Item
                    label="Discount %"
                    name="discount"
                >
                    <Input type="number" />
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
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea
                        className="dark:text-white text-black"
                        rows={2}
                    />
                </Form.Item>
                <p className="text-red-500">{errorMsg}</p>
                <Form.Item className="flex justify-end">
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        {editingAttribute ? 'Update' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
