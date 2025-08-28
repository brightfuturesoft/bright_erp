import { InboxOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Select,
    Radio,
    Button,
    Checkbox,
    Typography,
    message,
    Upload,
    Spin,
    TreeSelect,
} from 'antd';
import type { UploadProps } from 'antd';
import JoditEditor from 'jodit-react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useItemsData } from './data_get_api';
import { Erp_context } from '@/provider/ErpContext';
import { createItemPayload } from './ItemPayload';
import CategoryTreeSelect from './CategoryTreeSelect';
import uploadImage from '@/helpers/hooks/uploadImage';

const { Dragger } = Upload;
const { Text } = Typography;
const { TextArea } = Input;

// Category type
interface Category {
    _id: string;
    name: string;
    parentId?: string;
}

const AddSingleItem: React.FC = () => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const [is_saleable, set_is_saleable] = useState(true);
    const [is_track_inventory, set_is_track_inventory] = useState(false);
    const [is_serialized, set_is_serialized] = useState(false);
    const [is_manage_batch, set_is_manage_batch] = useState(false);
    const [is_purchasable, set_is_purchasable] = useState(false);
    const [is_returnable, set_is_returnable] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const {
        brandData,
        categories = [],
        manufacturers,
        isLoading,
        isError,
    } = useItemsData();

    // console.log("categories", categories)
    // console.log("user", user)

    const [itemType, setItemType] = useState('product');
    const [sku, setSku] = useState('');
    const [categoryValue, setCategoryValue] = useState<string[]>([]);
    const allCategories: Category[] = Array.isArray(categories)
        ? categories.map((cat: any) => ({
              _id: cat._id,
              name: cat.name,
              parentId: cat.parentId,
          }))
        : [];

    // Tailwind dark mode detection
    const [isDarkMode, setIsDarkMode] = useState(() =>
        typeof window !== 'undefined'
            ? document.documentElement.classList.contains('dark')
            : false
    );

    // Listen to dark mode changes (Tailwind)
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    // SKU generator
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        form.setFieldsValue({ item_name: value });
        if (value) {
            const generated = value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');
            setSku(generated);
            form.setFieldsValue({ sku: generated });
        } else {
            setSku('');
            form.setFieldsValue({ sku: '' });
        }
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        customRequest: async ({ file, onSuccess, onError }: any) => {
            try {
                const imageUrl = await uploadImage(file as File);
                message.success(
                    `${(file as File).name} uploaded successfully.`
                );
                onSuccess && onSuccess(imageUrl, new XMLHttpRequest());
            } catch (err) {
                message.error(`${(file as File).name} upload failed.`);
                onError && onError(err as Error);
            }
        },
        onChange(info) {
            if (info.file.status === 'done') {
                const imageUrl = info.file.response;
                setUploadedImages(prev => [...prev, imageUrl]);
            }
        },
    };

    // Keep state in sync with form
    useEffect(() => {
        setCategoryValue(form.getFieldValue('categories') || []);
    }, [form]);

    return (
        <Spin spinning={isLoading}>
            <Form
                form={form}
                layout="vertical"
                className="flex py-3"
                style={{ gap: 32 }}
                onFinish={async values => {
                    try {
                        const payload = createItemPayload({
                            ...values,
                            attachments: uploadedImages,
                        });

                        const res = await fetch(
                            `${import.meta.env.VITE_BASE_URL}items/item/create-item`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `${user?._id}`,
                                    workspace_id: `${user?.workspace_id}`,
                                },
                                body: JSON.stringify(payload),
                            }
                        );

                        const data = await res.json();

                        if (!data.error) {
                            message.success('Item added successfully');
                            form.resetFields();
                            setUploadedImages([]); // ✅ clear uploaded images
                        } else {
                            message.error(
                                data.message || 'Something went wrong'
                            );
                        }
                    } catch (err) {
                        console.error(err);
                        message.error('Network error');
                    }
                }}
                initialValues={{
                    selling_price: 0,
                    item_type: 'product',
                    is_returnable: false,
                    is_track_inventory: false,
                    is_serialized: false,
                    is_manage_batch: false,
                    is_purchasable: false,
                    is_saleable: true,
                }}
            >
                <div className="space-y-4 w-3/5">
                    {/* Item Type */}

                    <Form.Item
                        label="Item Type"
                        name="item_type"
                        className="mb-2"
                        required
                    >
                        <Radio.Group
                            onChange={e => setItemType(e.target.value)}
                            value={itemType}
                        >
                            <Radio value="service">Service</Radio>
                            <Radio value="product">Product</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/* Item Name */}
                    <Form.Item
                        label="Item Name"
                        name="item_name"
                        rules={[
                            {
                                required: true,
                                message: 'Item Name is required',
                            },
                        ]}
                        className="mb-2"
                    >
                        <Input
                            onChange={handleNameChange}
                            placeholder="Enter item name"
                            className="focus:border-[1px] p-2 border focus:border-blue-600 rounded w-full h-[42px] dark:text-white"
                        />
                    </Form.Item>

                    {/* SKU + Unit + Returnable */}
                    {itemType === 'product' && (
                        <div className="flex items-center gap-3">
                            <Form.Item
                                label="SKU"
                                name="sku"
                                className="flex-1 mb-0"
                            >
                                <Input
                                    value={sku}
                                    placeholder="Enter SKU"
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                label="Unit"
                                name="unit"
                                className="flex-1 mb-0"
                            >
                                <Input placeholder="Enter Unit" />
                            </Form.Item>
                        </div>
                    )}
                    <Form.Item
                        name="is_returnable"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox>Returnable Item</Checkbox>
                    </Form.Item>

                    {/* Manufacturer + Brand */}
                    {itemType === 'product' && (
                        <div className="flex gap-3">
                            <Form.Item
                                label="Manufacturer"
                                name="manufacturer"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Manufacturer"
                                    options={
                                        Array.isArray(manufacturers)
                                            ? manufacturers.map((m: any) => ({
                                                  label: m.manufacturer,
                                                  value: m._id,
                                              }))
                                            : []
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                label="Brand"
                                name="brand"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Brand"
                                    options={
                                        Array.isArray(brandData)
                                            ? brandData.map((b: any) => ({
                                                  label: b.brand,
                                                  value: b._id,
                                              }))
                                            : []
                                    }
                                />
                            </Form.Item>
                        </div>
                    )}

                    {/* Color + Size */}
                    {itemType === 'product' && (
                        <div className="flex gap-3">
                            <Form.Item
                                label="Color"
                                name="color"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Color"
                                    options={[
                                        { label: 'Color 1', value: 'color_1' },
                                        { label: 'Color 2', value: 'color_2' },
                                        { label: 'Color 3', value: 'color_3' },
                                        { label: 'Color 4', value: 'color_4' },
                                        { label: 'Color 5', value: 'color_5' },
                                        { label: 'Color 6', value: 'color_6' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Size"
                                name="size"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Size"
                                    options={[
                                        { label: 'Size 1', value: 'size_1' },
                                        { label: 'Size 2', value: 'size_2' },
                                        { label: 'Size 3', value: 'size_3' },
                                        { label: 'Size 4', value: 'size_4' },
                                        { label: 'Size 5', value: 'size_5' },
                                        { label: 'Size 6', value: 'size_6' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    )}

                    {/* Purchasable */}
                    {itemType === 'product' && (
                        <Form.Item
                            name="is_purchasable"
                            valuePropName="checked"
                            className="mb-0"
                        >
                            <Checkbox
                                onChange={() =>
                                    set_is_purchasable(!is_purchasable)
                                }
                            >
                                <Text
                                    strong
                                    className="text-xl dark:text-white text-black"
                                >
                                    Purchasable
                                </Text>
                            </Checkbox>
                        </Form.Item>
                    )}

                    {/* Purchasable fields */}
                    {is_purchasable && (
                        <div className="flex items-center gap-3 my-4">
                            <Form.Item
                                label="Purchasing Price"
                                name="purchasing_price"
                                className="flex-1 mb-0"
                            >
                                <Input placeholder="Enter Purchasing Price" />
                            </Form.Item>
                            <Form.Item
                                label="Purchasing Account"
                                name="purchasing_account"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    placeholder="Select Purchasing Account"
                                    options={[
                                        {
                                            label: 'Account 1',
                                            value: 'account_1',
                                        },
                                        {
                                            label: 'Account 2',
                                            value: 'account_2',
                                        },
                                        {
                                            label: 'Account 3',
                                            value: 'account_3',
                                        },
                                        {
                                            label: 'Account 4',
                                            value: 'account_4',
                                        },
                                        {
                                            label: 'Account 5',
                                            value: 'account_5',
                                        },
                                        {
                                            label: 'Account 6',
                                            value: 'account_6',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Purchasing VAT"
                                name="purchasing_vat"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    placeholder="Select Purchasing VAT"
                                    options={[
                                        { label: 'VAT 1', value: 'vat_1' },
                                        { label: 'VAT 2', value: 'vat_2' },
                                        { label: 'VAT 3', value: 'vat_3' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    )}

                    {/* Saleable */}
                    <Form.Item className="mb-0">
                        <Checkbox
                            checked={is_saleable}
                            onChange={e => set_is_saleable(e.target.checked)}
                        >
                            <Text
                                strong
                                className="text-xl dark:text-white text-black"
                            >
                                Saleable
                            </Text>
                        </Checkbox>
                    </Form.Item>

                    {/* Saleable fields */}
                    {is_saleable && (
                        <div className="flex items-center gap-3 my-4">
                            <Form.Item
                                label="Selling Price"
                                name="selling_price"
                                className="flex-1 mb-0"
                            >
                                <Input placeholder="Enter Selling Price" />
                            </Form.Item>

                            {itemType === 'product' && (
                                <Form.Item
                                    label="Item Weight"
                                    name="item_weight"
                                    className="flex-1 mb-0"
                                >
                                    <Input placeholder="Enter Item Weight" />
                                </Form.Item>
                            )}

                            {itemType === 'product' && (
                                <Form.Item
                                    label="Sales Account"
                                    name="sales_account"
                                    className="flex-1 mb-0"
                                >
                                    <Select
                                        placeholder="Select Sales Account"
                                        options={[
                                            {
                                                label: 'Account 1',
                                                value: 'account_1',
                                            },
                                            {
                                                label: 'Account 2',
                                                value: 'account_2',
                                            },
                                            {
                                                label: 'Account 3',
                                                value: 'account_3',
                                            },
                                            {
                                                label: 'Account 4',
                                                value: 'account_4',
                                            },
                                            {
                                                label: 'Account 5',
                                                value: 'account_5',
                                            },
                                            {
                                                label: 'Account 6',
                                                value: 'account_6',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            )}

                            <Form.Item
                                label="Selling VAT"
                                name="selling_vat"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    placeholder="Select Selling VAT"
                                    options={[
                                        {
                                            label: 'Account 1',
                                            value: 'account_1',
                                        },
                                        {
                                            label: 'Account 2',
                                            value: 'account_2',
                                        },
                                        {
                                            label: 'Account 3',
                                            value: 'account_3',
                                        },
                                        {
                                            label: 'Account 4',
                                            value: 'account_4',
                                        },
                                        {
                                            label: 'Account 5',
                                            value: 'account_5',
                                        },
                                        {
                                            label: 'Account 6',
                                            value: 'account_6',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Selling Discount"
                                name="selling_discount"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    placeholder="Select Selling Discount"
                                    options={[
                                        {
                                            label: 'Account 1',
                                            value: 'account_1',
                                        },
                                        {
                                            label: 'Account 2',
                                            value: 'account_2',
                                        },
                                        {
                                            label: 'Account 3',
                                            value: 'account_3',
                                        },
                                        {
                                            label: 'Account 4',
                                            value: 'account_4',
                                        },
                                        {
                                            label: 'Account 5',
                                            value: 'account_5',
                                        },
                                        {
                                            label: 'Account 6',
                                            value: 'account_6',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    )}

                    {/* Short Description */}
                    <Form.Item
                        label="Short Description"
                        name="item_description"
                    >
                        <TextArea
                            className="text-black dark:text-white"
                            placeholder="Write a short description about this item..."
                            rows={2}
                        />
                    </Form.Item>

                    {/* Long Description */}
                    <Form.Item
                        label="Long Description"
                        name="item_long_description"
                    >
                        <JoditEditor
                            config={{
                                readonly: false,
                                height: 300,
                                theme: isDarkMode ? 'dark' : 'default',
                            }}
                            className="jodit-editor"
                            value={
                                form.getFieldValue('item_long_description') ||
                                ''
                            }
                            onChange={val =>
                                form.setFieldsValue({
                                    item_long_description: val,
                                })
                            }
                        />
                    </Form.Item>

                    {/* Attribute sets */}
                    {itemType === 'product' && (
                        <Form.Item
                            label="Attribute sets"
                            className="mb-2"
                        >
                            <Button>Add Attribute</Button>
                        </Form.Item>
                    )}

                    {/* Categories (TreeSelect) */}
                    <Form.Item
                        label="Categories"
                        name="categories"
                        rules={[
                            {
                                required: true,
                                message: 'Please select at least one category',
                            },
                        ]}
                        className="mb-2"
                    >
                        <CategoryTreeSelect
                            categories={allCategories}
                            value={categoryValue}
                            onChange={val => setCategoryValue(val)}
                        />
                    </Form.Item>

                    {/* Track Inventory */}
                    {itemType === 'product' && (
                        <Form.Item
                            name="is_track_inventory"
                            valuePropName="checked"
                            className="mb-0"
                        >
                            <Checkbox
                                onChange={() =>
                                    set_is_track_inventory(!is_track_inventory)
                                }
                            >
                                <Text
                                    strong
                                    className="text-xl dark:text-white text-black"
                                >
                                    Track Inventory
                                </Text>
                            </Checkbox>
                        </Form.Item>
                    )}

                    {/* Inventory details (conditional) */}
                    {is_track_inventory && (
                        <div className="flex items-center gap-3 my-4">
                            <Form.Item
                                label="Inventory Account"
                                name="inventory_account"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    placeholder="Select Inventory Account"
                                    options={[
                                        {
                                            label: 'Account 1',
                                            value: 'account_1',
                                        },
                                        {
                                            label: 'Account 2',
                                            value: 'account_2',
                                        },
                                        {
                                            label: 'Account 3',
                                            value: 'account_3',
                                        },
                                        {
                                            label: 'Account 4',
                                            value: 'account_4',
                                        },
                                        {
                                            label: 'Account 5',
                                            value: 'account_5',
                                        },
                                        {
                                            label: 'Account 6',
                                            value: 'account_6',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Low stock point"
                                name="low_stock"
                                className="flex-1 mb-0"
                            >
                                <Input placeholder="Enter Low stock point" />
                            </Form.Item>
                            <Form.Item
                                name="is_serialized"
                                valuePropName="checked"
                                className="flex-1 mb-0"
                            >
                                <Checkbox>Serialized Item</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="is_manage_batch"
                                valuePropName="checked"
                                className="flex-1 mb-0"
                            >
                                <Checkbox>Manage Batch</Checkbox>
                            </Form.Item>
                        </div>
                    )}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Save Item
                        </Button>
                    </Form.Item>
                </div>

                {/* File Upload */}
                <div className="mx-auto w-2/5">
                    <div className="p-12">
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="dark:text-white text-black">
                                Click or drag file to this area to upload
                            </p>
                            <p className="dark:text-gray-400 text-black">
                                Support for a single or bulk upload. Strictly
                                prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </div>
                </div>
            </Form>
        </Spin>
    );
};

export default AddSingleItem;
