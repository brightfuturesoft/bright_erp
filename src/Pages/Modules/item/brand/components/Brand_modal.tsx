import { Modal, Form, Input, Switch, Button } from 'antd';
import { useEffect } from 'react';

export default function Brand_modal({
    open,
    onClose,
    onSubmit,
    editingBrand,
    errorMsg,
    setErrorMsg,
}: any) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingBrand) {
                form.setFieldsValue({
                    brand: editingBrand.brand,
                    code: editingBrand.code,
                    status: editingBrand.status === 'active',
                    description: editingBrand.description,
                });
            } else {
                form.resetFields();
                form.setFieldsValue({ status: true });
            }
            setErrorMsg('');
        }
        // eslint-disable-next-line
    }, [open, editingBrand]);

    return (
        <Modal
            title={editingBrand ? 'Edit Brand' : 'Add Brand'}
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
                    label="Brand"
                    name="brand"
                    rules={[
                        { required: true, message: 'Please enter brand name' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prev, curr) => prev.brand !== curr.brand}
                >
                    {({ getFieldValue, setFieldsValue }) => {
                        const nameValue = getFieldValue('brand') || '';
                        const codeValue = nameValue
                            .toLowerCase()
                            .replace(/\s/g, '_');

                        // Only auto-generate code when brand changes (not during initial load)
                        if (!editingBrand || getFieldValue('code') === '') {
                            setTimeout(
                                () => setFieldsValue({ code: codeValue }),
                                0
                            );
                        }

                        return (
                            <Form.Item
                                label="Unique Code"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter unique code',
                                    },
                                ]}
                            >
                                <Input className="dark:text-white text-black" />
                            </Form.Item>
                        );
                    }}
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
                        {editingBrand ? 'Update' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
