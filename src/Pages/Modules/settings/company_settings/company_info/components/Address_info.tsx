import React, { useContext, useState } from 'react';
import { Form, Input, Select, Button, Space, message } from 'antd';
import { save_company_info } from '@/helpers/local-storage';
import { Erp_context } from '@/provider/ErpContext';

const { Option } = Select;

const countries = [
    'Bangladesh',
    'United States',
    'United Kingdom',
    'India',
    'Canada',
    'Australia',
];

type Props = {
    value: any;
    onUpdate: (val: any) => void;
};

export default function Address_info({ value, onUpdate }: Props) {
    const { user, workspace, set_workspace } = useContext(Erp_context);
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();

    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue(value);
    };
    const handleCancel = () => setEdit(false);

    const handleFinish = (vals: any) => {
        const data = {
            address_info: {
                country: vals.country,
                state: vals.state,
                city: vals.city,
                zip_code: vals.zip_code,
                address: vals.address,
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
                        <Item
                            label="Country"
                            value={value.country}
                        />
                        <Item
                            label="State/Province"
                            value={value.state}
                        />
                        <Item
                            label="City"
                            value={value.city}
                        />
                        <Item
                            label="Postal/ZIP Code"
                            value={value.zip_code}
                        />
                        <div className="sm:col-span-2">
                            <Item
                                label="Full Address"
                                value={value.address}
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
                    className="mt-2"
                >
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true }]}
                    >
                        <Select
                            className="dark:bg-neutral-800 dark:text-white"
                            dropdownClassName="dark:bg-neutral-800 dark:text-white"
                        >
                            {countries.map(country => (
                                <Option
                                    key={country}
                                    value={country}
                                >
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="State/Province"
                        name="state"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="Postal/ZIP Code"
                        name="zip_code"
                    >
                        <Input className="dark:bg-neutral-800 dark:text-white" />
                    </Form.Item>
                    <Form.Item
                        label="Full Address"
                        name="address"
                    >
                        <Input.TextArea
                            rows={3}
                            className="dark:bg-neutral-800 dark:text-white"
                            placeholder="Full Address"
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
        <div className="mb-2 dark:text-gray-200 text-black">
            <div className="text-xs font-semibold ">{label}</div>
            <div className="text-base font-medium mt-0.5 dark:text-gray-400 text-black">
                {value || <span className="italic ">Not set</span>}
            </div>
        </div>
    );
}
