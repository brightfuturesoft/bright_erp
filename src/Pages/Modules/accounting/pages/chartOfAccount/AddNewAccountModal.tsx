import { Modal, Form, Input, InputNumber, Button, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';

export interface ExpenseFormValues {
    ac_name: string;
    amount: number;
    description: string;
    status: boolean;
}

interface AddNewAccountModalProps {
    isModalOpen: boolean;
    onSubmit: (values: ExpenseFormValues) => Promise<void>;
    onClose: () => void;
    errorMsg?: string;
    setErrorMsg?: (msg: string) => void;
    initialValues?: Partial<ExpenseFormValues>; // for edit
    isEditing?: boolean;
}

const AddNewAccountModal: React.FC<AddNewAccountModalProps> = ({
    isModalOpen,
    onSubmit,
    onClose,
    errorMsg = '',
    setErrorMsg,
    initialValues,
    isEditing = false,
}) => {
    const [form] = Form.useForm<ExpenseFormValues>();

    useEffect(() => {
        if (isModalOpen) {
            setErrorMsg && setErrorMsg('');
            if (isEditing && initialValues) {
                form.setFieldsValue(initialValues); // pre-fill fields when editing
            } else {
                form.resetFields(); // clear fields when adding
            }
        }
    }, [isModalOpen, isEditing, initialValues]);

    return (
        <Modal
            title={isEditing ? 'Edit Info' : 'Add a New Account'}
            open={isModalOpen}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                onChange={() => setErrorMsg && setErrorMsg('')}
            >
                <div className="space-y-4">
                    <div>
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
                    </div>

                    <div>
                        <Form.Item
                            name="ac_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter account name',
                                },
                            ]}
                        >
                            <Input
                                className="p-2 border rounded w-full h-[42px]"
                                placeholder="Account Name"
                            />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter description',
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                className="p-2 border rounded w-full"
                                placeholder="Description"
                            />
                        </Form.Item>
                    </div>

                    <div>
                        <label>Status</label>
                        <Form.Item
                            name="status"
                            rules={[
                                { required: true, message: 'Select status' },
                            ]}
                        >
                            <Switch
                                checkedChildren="Active"
                                unCheckedChildren="Inactive"
                            />
                        </Form.Item>
                    </div>

                    {errorMsg && <p className="text-red-500">{errorMsg}</p>}

                    <div className="flex space-x-2 justify-start">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                        <Button
                            className="!bg-red-600 !text-white"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default AddNewAccountModal;
