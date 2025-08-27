import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';

type Props = {
    value: any;
    onUpdate: (val: any) => void;
};

export default function Social_links({ value, onUpdate }: Props) {
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();

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
                            label="Facebook Page URL"
                            value={value.facebook}
                        />
                        <Item
                            label="Instagram URL"
                            value={value.instagram}
                        />
                        <Item
                            label="Twitter/X URL"
                            value={value.twitter}
                        />
                        <Item
                            label="LinkedIn URL"
                            value={value.linkedin}
                        />
                        <Item
                            label="YouTube URL"
                            value={value.youtube}
                        />
                        <Item
                            label="TikTok URL"
                            value={value.tiktok}
                        />
                        <Item
                            label="WhatsApp Business Number"
                            value={value.whatsapp}
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
                        label="Facebook Page URL"
                        name="facebook"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="Instagram URL"
                        name="instagram"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="Twitter/X URL"
                        name="twitter"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="LinkedIn URL"
                        name="linkedin"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="YouTube URL"
                        name="youtube"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="TikTok URL"
                        name="tiktok"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="WhatsApp Business Number"
                        name="whatsapp"
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
