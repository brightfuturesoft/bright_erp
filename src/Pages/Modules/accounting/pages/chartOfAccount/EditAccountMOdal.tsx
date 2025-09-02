import { Modal, Form, Input, InputNumber, Button, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { TableItem } from './components/expense/Gold_of_sold_table';
import { EntityType } from './components/Entity';

export interface ExpenseFormValues {
    _id: string;
    ac_name: string;
    amount: number;
    description: string;
    status: boolean;
}

interface EditAccountModalProps {
    entity: EntityType;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (values: ExpenseFormValues & { id: string }) => void;
    record: TableItem;
    errorMsg?: string;
    setErrorMsg?: (msg: string) => void;
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({
    entity,
    isOpen,
    onCancel,
    onSubmit,
    record,
    errorMsg = '',
    setErrorMsg,
}) => {
    const [form] = Form.useForm<ExpenseFormValues>();

    useEffect(() => {
        if (isOpen) {
            setErrorMsg && setErrorMsg('');
            form.setFieldsValue({
                ac_name: record.ac_name,
                amount: record.amount,
                description: record.description,
                status: record.status ?? false,
            });
        } else {
            form.resetFields();
        }
    }, [isOpen, record, form, setErrorMsg]);

    const handleFinish = (values: ExpenseFormValues) => {
        if (!record._id) {
            console.warn('Warning: Editing record has no _id');
            return;
        }
        onSubmit({ ...values, id: record._id });
        form.resetFields();
    };

    const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);

    return (
        <Modal
            title={`Edit ${capitalized} Account`}
            open={isOpen}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="amount"
                    rules={[{ required: true, message: 'Enter cost' }]}
                >
                    <InputNumber
                        min={0}
                        className="w-full h-[42px]"
                        placeholder="Enter amount"
                    />
                </Form.Item>

                <Form.Item
                    name="ac_name"
                    rules={[{ required: true, message: 'Enter account name' }]}
                >
                    <Input
                        className="p-2 border rounded w-full h-[42px]"
                        placeholder="Account Name"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Enter description' }]}
                >
                    <TextArea
                        rows={4}
                        className="p-2 border rounded w-full"
                        placeholder="Description"
                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    valuePropName="checked"
                    label="Status"
                >
                    <Switch
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                    />
                </Form.Item>

                {errorMsg && <p className="text-red-500">{errorMsg}</p>}

                <div className="flex space-x-2 justify-start">
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Update
                    </Button>
                    <Button
                        className="!bg-red-600 !text-white"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default EditAccountModal;
