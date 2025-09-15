import React, { useContext, useState } from 'react';
import { Form, Input, Select, Button, Space, message } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { save_company_info } from '@/helpers/local-storage';
import { Item } from '../Company_info';

const { TextArea } = Input;
const { Option } = Select;

const industries = [
    // Product-based
    'Clothing & Apparel',
    'Shoes & Accessories',
    'Jewelry & Watches',
    'Bags & Luggage',
    'Cosmetics & Beauty Products',
    'Home Decor & Furniture',
    'Electronics & Gadgets',
    'Grocery & Supermarket',
    'Packaged Foods & Snacks',
    'Beverages',
    'Pharmaceuticals & Supplements',
    'Fitness & Sports Equipment',
    'Personal Care Products',
    'Vehicle Sales & Rentals',
    'Auto Parts & Accessories',
    'Machinery & Equipment',
    'Tools & Hardware',
    'Office Supplies',
    'Handmade Products',
    'Art & Craft Supplies',
    'Books & Stationery',
    'Pets & Pet Supplies',
    'Gardening & Outdoor',
    'Toys & Games',
    'Digital Services',
    'Web & App Development',
    'Graphic & Design Services',
    'Marketing & SEO Services',
    'Event Planning & Entertainment',
    'Education & Online Courses',
    'Consulting & Professional Services',
    'Health & Wellness Services',
    'Fitness Training & Coaching',
    'Home Repair & Maintenance',
    'Delivery & Logistics',
    'Photography & Videography',
    'Cleaning Services',
    'Travel & Tourism',
    'Restaurant',
    'Real Estate',
    'Others',
];

type Props = {
    value: any;
    onUpdate: (val: any) => void;
};

export default function Basic_info({ value, onUpdate }: Props) {
    const [edit, setEdit] = useState(false);
    const { user, workspace, set_workspace } = useContext(Erp_context);

    const [form] = Form.useForm();

    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue(value);
    };
    const handleCancel = () => setEdit(false);

    const handleFinish = (vals: any) => {
        console.log(vals, 'vals');
        console.log(form.getFieldsValue());

        const data = {
            basic_info: {
                name: vals.name,
                legal_name: vals.legal_name,
                registration_number: vals.registration_number,
                vat_number: vals.vat_number,
                industry: vals.industry,
                description: vals.description,
            },
            name: vals.name,
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
                    className="mt-2 "
                >
                    <Form.Item
                        initialValue={value?.name}
                        label="Company Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className="dark:bg-neutral-800 dark:text-white "
                            placeholder="Company Name"
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.legal_name}
                        label="Legal Name"
                        name="legal_name"
                    >
                        <Input
                            className="dark:bg-neutral-800 dark:text-white "
                            placeholder="Legal Name"
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.registration_number}
                        label="Registration / Trade License No."
                        name="registration_number"
                    >
                        <Input
                            className="dark:bg-neutral-800 dark:text-white "
                            placeholder="Registration / Trade License No."
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.vat_number}
                        label="VAT/TIN Number"
                        name="vat_number"
                    >
                        <Input
                            className="dark:bg-neutral-800 dark:text-white "
                            placeholder="VAT/TIN Number"
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={value?.industry}
                        label="Industry/Business Type"
                        name="industry"
                        rules={[
                            {
                                required: true,
                                message: 'Please select an industry!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            className="dark:bg-neutral-800 dark:text-white"
                            dropdownClassName="dark:bg-neutral-800 dark:text-white"
                            placeholder="Industry/Business Type"
                            optionFilterProp="children" // এটা বলে দেয় কোন property দিয়ে search হবে
                            filterOption={(input: string, option: any) =>
                                option.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {industries.map(ind => (
                                <Select.Option
                                    key={ind}
                                    value={ind}
                                >
                                    {ind}
                                </Select.Option>
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
