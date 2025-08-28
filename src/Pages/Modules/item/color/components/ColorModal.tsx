import { Modal, Form, Input, Switch, Button, ColorPicker } from 'antd';
import { useEffect, useState } from 'react';
import type { DataType } from '../Color.type';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (payload: any) => void;
    editingColor: DataType | null;
    errorMsg: string;
    setErrorMsg: (v: string) => void;
    darkMode?: boolean; // optional prop to toggle dark mode
}

export default function ColorModal({
    open,
    onClose,
    onSubmit,
    editingColor,
    errorMsg,
    setErrorMsg,
    darkMode = false,
}: Props) {
    const [form] = Form.useForm();
    const [colorValue, setColorValue] = useState<string>('#1677ff');

    useEffect(() => {
        if (!open) return;
        if (editingColor) {
            form.setFieldsValue({
                name: editingColor.name,
                code: editingColor.code,
                status: editingColor.status === 'active',
            });
            setColorValue(editingColor.code || '#1677ff');
        } else {
            form.resetFields();
            form.setFieldsValue({ status: true });
            setColorValue('#1677ff');
        }
        setErrorMsg('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, editingColor]);

    const handleFinish = (values: any) => {
        const payload = {
            name: values.name?.trim(),
            code: colorValue,
            status: values.status ? 'active' : 'inactive',
        };
        console.log(
            editingColor ? 'Updating Color =>' : 'Creating Color =>',
            payload
        );
        onSubmit(payload);
    };

    // Conditional class names for dark mode
    const inputClass = darkMode
        ? 'dark:bg-gray-800 dark:text-white dark:border-gray-600'
        : 'text-black';

    return (
        <Modal
            title={editingColor ? 'Edit Colour' : 'Add Colour'}
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            className={darkMode ? 'dark' : ''}
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ status: true }}
                onChange={() => setErrorMsg('')}
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please enter colour name' },
                        { max: 80, message: 'Max 80 characters' },
                    ]}
                >
                    <Input
                        allowClear
                        className={inputClass}
                    />
                </Form.Item>

                <Form.Item
                    label="Colour Code"
                    name="color_code"
                >
                    <ColorPicker
                        value={colorValue}
                        onChange={c => setColorValue(c.toHexString())}
                        className={darkMode ? 'dark' : ''}
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
                        className={darkMode ? 'dark-switch' : ''}
                    />
                </Form.Item>

                {errorMsg && (
                    <p
                        className={`mt-1 ${darkMode ? 'text-red-400' : 'text-red-500'}`}
                    >
                        {errorMsg}
                    </p>
                )}

                <Form.Item className="flex justify-end mb-0">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="mt-2"
                    >
                        {editingColor ? 'Update' : 'Submit'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
