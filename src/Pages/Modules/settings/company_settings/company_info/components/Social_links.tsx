import React, { useState, useContext } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { save_company_info } from '@/helpers/local-storage';
import { Item } from '../Company_info';

type Props = {
    value: any;
    onUpdate: (val: any) => void;
};

const baseUrls: Record<string, string> = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
    youtube: 'https://youtube.com/',
    tiktok: 'https://tiktok.com/@',
    whatsapp: 'https://wa.me/', // WhatsApp business number
};

export default function Social_links({ value, onUpdate }: Props) {
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();
    const { user, workspace, set_workspace } = useContext(Erp_context);

    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue(value);
    };
    const handleCancel = () => setEdit(false);

    const handleFinish = (vals: any) => {
        const updated = Object.keys(vals).reduce((acc, key) => {
            if (vals[key]) {
                acc[key] = key === 'whatsapp' ? vals[key] : vals[key]; // keep username only
            }
            return acc;
        }, {} as any);

        const data = {
            social_info: {
                ...updated,
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
    };

    return (
        <div>
            {!edit ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        {Object.keys(baseUrls).map(key => (
                            <Item
                                key={key}
                                label={
                                    key.charAt(0).toUpperCase() + key.slice(1)
                                }
                                value={value?.[key]}
                            />
                        ))}
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
                    className="mt-2 dark:text-white"
                >
                    {Object.keys(baseUrls).map(key => (
                        <Form.Item
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            name={key}
                            className="dark:text-white"
                            tooltip={
                                key !== 'whatsapp'
                                    ? `Enter only your ${key} username`
                                    : 'Enter WhatsApp number with country code'
                            }
                        >
                            <Input className="dark:bg-neutral-800 dark:text-white" />
                        </Form.Item>
                    ))}
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
