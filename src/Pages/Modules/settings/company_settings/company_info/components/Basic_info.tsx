import React, { useState } from 'react';
import { Form, Input, Select, Button, Space } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const industries = [
    'Retail',
    'Fashion',
    'Electronics',
    'Technology',
    'Finance',
    'Healthcare',
    'Other',
];

type Props = {
    value: any;
    onUpdate: (val: any) => void;
};

export default function Basic_info({ value, onUpdate }: Props) {
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();
    console.log(value, 'value');

    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue(value);
    };
    const handleCancel = () => setEdit(false);

    const handleFinish = (vals: any) => {
        onUpdate(vals);
        setEdit(false);
    };

    return (
        <div>
            {!edit ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <Item
                            label="Company Name"
                            value={value?.name}
                        />
                        <Item
                            label="Legal Name"
                            value={value?.legal_name}
                        />
                        <Item
                            label="Registration / Trade License No."
                            value={value?.registration_number}
                        />
                        <Item
                            label="VAT/TIN Number"
                            value={value?.vat_number}
                        />
                        <Item
                            label="Industry/Business Type"
                            value={value?.industry}
                        />
                        <div className="sm:col-span-2">
                            <Item
                                label="Description / About Company"
                                value={value?.description}
                            />
                        </div>
                    </div>
                    <Button
                        className="mt-6"
                        onClick={handleEdit}
                        type="primary"
                    >
                        Edit
                    </Button>
                </div>
            ) : (
                <Form
                    layout="vertical"
                    form={form}
                    initialValues={value}
                    onFinish={handleFinish}
                    requiredMark="optional"
                    className="mt-2"
                >
                    <Form.Item
                        initialValue={value?.name}
                        label="Company Name"
                        name="companyName"
                        rules={[{ required: true }]}
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.legal_name}
                        label="Legal Name"
                        name="legalName"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.registration_number}
                        label="Registration / Trade License No."
                        name="regNo"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.vat_number}
                        label="VAT/TIN Number"
                        name="vatTin"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.industry}
                        label="Industry/Business Type"
                        name="industry"
                        rules={[{ required: true }]}
                    >
                        <Select
                            className="dark:bg-neutral-800 dark:text-white"
                            dropdownClassName="dark:bg-neutral-800 dark:text-white"
                        >
                            {industries.map(ind => (
                                <Option
                                    key={ind}
                                    value={ind}
                                >
                                    {ind}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.description}
                        label="Description / About Company"
                        name="description"
                    >
                        <TextArea
                            rows={4}
                            className="dark:bg-neutral-800 dark:text-white"
                            placeholder="Write about your company..."
                        />
                    </Form.Item>
                    <Space className="mt-6">
                        <Button
                            htmlType="submit"
                            type="primary"
                        >
                            Update
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Space>
                </Form>
            )}
        </div>
    );
}
function Item({ label, value }: { label: string; value?: React.ReactNode }) {
    return (
        <div className="mb-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {label}
            </div>
            <div className="text-base font-medium mt-0.5">
                {value || <span className="italic text-gray-400">Not set</span>}
            </div>
        </div>
    );
}
