import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';

type Props = {
    value: any;
    onUpdate: (val: any) => void;
};

export default function Contact_info({ value, onUpdate }: Props) {
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();
    const [phones, setPhones] = useState([...(value.phoneNumbers || [])]);

    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue({ ...value, phoneNumbers: undefined });
    };
    const handleCancel = () => {
        setEdit(false);
        setPhones([...(value.phoneNumbers || [])]);
    };

    const handleFinish = (vals: any) => {
        onUpdate({ ...vals, phoneNumbers: phones });
        setEdit(false);
    };

    const addPhone = () => setPhones([...phones, '']);
    const removePhone = (idx: number) =>
        setPhones(phones.filter((_, i) => i !== idx));
    const handlePhoneChange = (val: string, idx: number) => {
        const arr = [...phones];
        arr[idx] = val;
        setPhones(arr);
    };

    return (
        <div>
            {!edit ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <Item
                            label="Official Email"
                            value={value.officialEmail}
                        />
                        <Item
                            label="Support Email"
                            value={value.supportEmail}
                        />
                        <div className="sm:col-span-2">
                            <Item
                                label="Phone Number(s)"
                                value={value.phoneNumbers
                                    ?.filter(Boolean)
                                    .join(', ')}
                            />
                        </div>
                        <Item
                            label="Fax"
                            value={value.fax}
                        />
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
                        label="Official Email"
                        name="officialEmail"
                        rules={[{ type: 'email' }]}
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="Support Email"
                        name="supportEmail"
                        rules={[{ type: 'email' }]}
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        required
                    >
                        {phones.map((num, idx) => (
                            <Space
                                key={idx}
                                className="flex mb-2"
                            >
                                <Input
                                    value={num}
                                    onChange={e =>
                                        handlePhoneChange(e.target.value, idx)
                                    }
                                    className="dark:bg-neutral-800 dark:text-white"
                                    placeholder={`Phone #${idx + 1}`}
                                />
                                {phones.length > 1 && (
                                    <Button
                                        danger
                                        type="text"
                                        onClick={() => removePhone(idx)}
                                        className="ml-2"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Space>
                        ))}
                        <Button
                            type="dashed"
                            onClick={addPhone}
                            className="mt-2"
                        >
                            Add Phone
                        </Button>
                    </Form.Item>
                    <Form.Item
                        label="Fax"
                        name="fax"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
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
