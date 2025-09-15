import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { save_company_info } from '@/helpers/local-storage';
import { Item } from '../Company_info';

type Props = {
    value?: any;
    onUpdate: (val: any) => void;
};

export default function Contact_info({ value, onUpdate }: Props) {
    const [edit, setEdit] = useState(false);
    const { user, workspace, set_workspace } = useContext(Erp_context);

    const [form] = Form.useForm();
    const [phones, setPhones] = useState<string[]>([
        ...(value?.phone_number || []),
    ]);

    // Update phones if value changes
    useEffect(() => {
        setPhones([...(value?.phone_number || [])]);
    }, [value]);

    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue({ ...value, phone_number: phones });
    };

    const handleCancel = () => {
        setEdit(false);
        setPhones([...(value?.phone_number || [])]);
    };

    const handleFinish = (vals: any) => {
        // onUpdate({ ...vals, phone_number: phones });
        const data = {
            contact_info: {
                official_email: vals.official_email,
                support_email: vals.support_email,
                phone_number: phones,
                fax: vals.fax,
            },
        };
        console.log(data, 'data');
        fetch(
            `${import.meta.env.VITE_BASE_URL}settings/company/update-company`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify(data),
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data, 'data');
                if (!data.error) {
                    save_company_info(data.data);
                    set_workspace(data.data);
                    message.success(data.message);
                    setEdit(false);
                } else {
                    message.error(data.message);
                }
            });
        // setEdit(false);
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
                            value={value?.official_email}
                        />
                        <Item
                            label="Support Email"
                            value={value?.support_email}
                        />
                        <div className="sm:col-span-2">
                            <Item
                                label="Phone Number(s)"
                                value={phones.filter(Boolean).join(', ')}
                            />
                        </div>
                        <Item
                            label="Fax"
                            value={value?.fax}
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
                    className="mt-2"
                >
                    <Form.Item
                        required
                        label="Official Email"
                        name="official_email"
                        rules={[{ type: 'email' }]}
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>

                    <Form.Item
                        label="Support Email"
                        name="support_email"
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
