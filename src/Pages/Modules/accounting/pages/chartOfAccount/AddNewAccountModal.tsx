import { Modal, Form, Input, InputNumber, Button, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { TableItem } from './components/expense/Gold_of_sold_table';
import { EntityType } from './components/Entity';

export interface ExpenseFormValues {
    _id: string;
    ac_name: string;
    description: string;
    status: boolean;
}

interface AddNewAccountModalProps {
    entity: EntityType;
    isModalOpen: boolean;
    onSubmit: (values: ExpenseFormValues) => Promise<void>;
    onClose: () => void;
    errorMsg?: string;
    setErrorMsg?: (msg: string) => void;
    initialValues?: Partial<TableItem>;
}

const AddNewAccountModal: React.FC<AddNewAccountModalProps> = ({
    entity,
    isModalOpen,
    onSubmit,
    onClose,
    errorMsg = '',
    setErrorMsg,
    initialValues = {},
}) => {
    const [form] = Form.useForm<ExpenseFormValues>();

    // Reset form when modal opens
    useEffect(() => {
        if (isModalOpen) {
            form.resetFields();
            form.setFieldsValue({
                ac_name: initialValues.ac_name || '',
                description: initialValues.description || '',
                status: initialValues.status ?? false, // default to false
            });
            setErrorMsg?.('');
        }
    }, [isModalOpen, initialValues, form, setErrorMsg]);

    const capitalizedEntity = entity.charAt(0).toUpperCase() + entity.slice(1); // Expense, Discount, etc.

    return (
        <Modal
            title={`Add New ${capitalizedEntity} Account`}
            open={isModalOpen}
            onCancel={onClose}
            footer={null}
            className="!rounded-lg"
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                onChange={() => setErrorMsg?.('')}
            >
                <Form.Item
                    name="ac_name"
                    rules={[{ required: true, message: 'Enter account name' }]}
                >
                    <Input
                        className="w-full h-[42px] rounded border px-2"
                        placeholder="Account Name"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[{ required: false, message: 'Enter description' }]}
                >
                    <TextArea
                        rows={4}
                        className="w-full rounded border px-2 dark:text-white"
                        placeholder="Description"
                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    valuePropName="checked"
                >
                    <Switch
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                    />
                </Form.Item>

                {errorMsg && <p className="text-red-500">{errorMsg}</p>}

                <div className="flex space-x-2 mt-2">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="rounded"
                    >
                        Add
                    </Button>
                    <Button
                        onClick={onClose}
                        className="!bg-red-600 !text-white !border-none rounded hover:!bg-red-700"
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddNewAccountModal;
