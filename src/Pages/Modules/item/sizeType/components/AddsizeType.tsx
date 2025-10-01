// AddSizeTypeModal.tsx
import { Modal, Form, Input, Switch, Button } from 'antd';
import { useEffect } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    errorMsg: string;
    setErrorMsg: (msg: string) => void;
}

const AddSizeTypeModal: React.FC<Props> = ({
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

    return (
        <Modal
            title="Add Size Type"
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                initialValues={{ status: true }}
                onChange={() => setErrorMsg('')}
            >
                <Form.Item
                    label="Size Type"
                    name="sizeType"
                    rules={[{ required: true, message: 'Enter size type' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Added Type"
                    name="addedType"
                    rules={[{ required: true, message: 'Enter added type' }]}
                >
                    <Input />
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

                <p className="text-red-500">{errorMsg}</p>

                <Form.Item className="flex justify-end">
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddSizeTypeModal;
