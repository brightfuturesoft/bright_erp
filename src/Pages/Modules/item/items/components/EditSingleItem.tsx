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
} from 'antd';
import type { UploadProps } from 'antd';
import JoditEditor from 'jodit-react';
import { useContext, useEffect, useState } from 'react';
import { useItemsData } from './data_get_api';
import { Erp_context } from '@/provider/ErpContext';
import { createItemPayload } from './ItemPayload';
import uploadImage from '@/helpers/hooks/uploadImage';
import { useNavigate, useParams } from 'react-router-dom';
import EditCategoryTreeSelect from './EditTreeCategory';

const { Dragger } = Upload;
const { Text } = Typography;
const { TextArea } = Input;

interface Category {
    _id: string;
    name: string;
    parentId?: string;
}

interface ItemId {
    id: string;
}

const EditSingleItem: React.FC = () => {
    const { id: itemId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [sku, setSku] = useState('');
    const [categoryValue, setCategoryValue] = useState<string[]>([]);
    const [itemType, setItemType] = useState<'product' | 'service'>('product');
    const [isDarkMode, setIsDarkMode] = useState(() =>
        typeof window !== 'undefined'
            ? document.documentElement.classList.contains('dark')
            : false
    );

    // Fetch data
    const {
        brandData,
        categories = [],
        manufacturers,
        attributes,
        itemsData: fetchedItemsData,
        colors,
        sizes,
        isLoading,
    } = useItemsData();

    // Find single item by ID if editing
    const itemsData: any =
        itemId && Array.isArray(fetchedItemsData)
            ? fetchedItemsData.find((item: any) => item._id === itemId)
            : fetchedItemsData || null;

    // console.log('itemsData', itemsData);

    // Prepare categories tree
    const allCategories: Category[] = Array.isArray(categories)
        ? categories.map((cat: any) => ({
              _id: cat._id,
              name: cat.name,
              parentId: cat.parentId,
          }))
        : [];

    // Populate form if editing
    useEffect(() => {
        if (itemsData) {
            const catValues = itemsData.categories;
            setCategoryValue(catValues); // local state update
            form.setFieldsValue({
                ...itemsData,
                categories: catValues, // form update
            });
        }
    }, [itemsData, form]);

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
        fileList: uploadedImages.map(url => ({
            uid: url,
            name: url.split('/').pop(),
            status: 'done',
            url,
        })),
    };

    return (
        <Spin spinning={isLoading}>
            <Form
                form={form}
                layout="vertical"
                className="flex py-3"
                style={{ gap: 32 }}
                initialValues={{
                    selling_price: 0,
                    categories: categoryValue,
                    item_type: 'product',
                    is_returnable: false,
                    is_track_inventory: false,
                    is_serialized: false,
                    is_manage_batch: false,
                    is_purchasable: false,
                    is_saleable: true,
                }}
                onFinish={async values => {
                    try {
                        const payload = createItemPayload({
                            ...values,
                            attachments: uploadedImages,
                        });

                        const url = `${import.meta.env.VITE_BASE_URL}items/item/update-item/${itemId}`;
                        const res = await fetch(url, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `${user?._id}`,
                                workspace_id: `${user?.workspace_id}`,
                            },
                            body: JSON.stringify(payload),
                        });

                        const data = await res.json();
                        if (!data.error) {
                            message.success(
                                itemId ? 'Item updated' : 'Item added'
                            );
                            navigate(-1);
                            form.resetFields();
                            setUploadedImages([]);
                        } else {
                            console.log(data?.error);
                            message.error(
                                data.message || 'Something went wrong'
                            );
                        }
                    } catch (err) {
                        console.error(err);
                        message.error('Network error');
                    }
                }}
            >
                <div className="space-y-4 w-3/5">
                    {/* Item Type */}
                    <Form.Item
                        label="Item Type"
                        name="item_type"
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
                    >
                        <Input
                            onChange={handleNameChange}
                            placeholder="Enter item name"
                        />
                    </Form.Item>

                    <div className="flex gap-3">
                        <Form.Item
                            label="SKU"
                            name="sku"
                            className="flex-1 "
                        >
                            <Input
                                value={sku}
                                placeholder="SKU"
                                className="dark:text-white"
                            />
                        </Form.Item>
                        {itemType === 'product' && (
                            <Form.Item
                                label="Unit"
                                name="unit"
                                className="flex-1"
                            >
                                <Input placeholder="Enter Unit" />
                            </Form.Item>
                        )}
                    </div>

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
                                    labelInValue
                                    placeholder="Select Color"
                                    options={
                                        Array.isArray(colors)
                                            ? colors.map((m: any) => ({
                                                  label: m.color_name,
                                                  value: m.code,
                                                  key: m._id,
                                              }))
                                            : []
                                    }
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
                                    labelInValue
                                    options={
                                        Array.isArray(sizes)
                                            ? sizes.map((m: any) => ({
                                                  label: m.sizeType,
                                                  value: m.addedType,
                                                  key: m._id,
                                              }))
                                            : []
                                    }
                                />
                            </Form.Item>
                        </div>
                    )}

                    {/* Manufacturer + Brand (only product) */}
                    {itemType === 'product' && (
                        <div className="flex gap-3">
                            <Form.Item
                                label="Manufacturer"
                                name="manufacturer"
                                className="flex-1"
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Manufacturer"
                                    labelInValue
                                    options={manufacturers?.map((m: any) => ({
                                        label: m.manufacturer,
                                        value: m.discount,
                                        key: m._id,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Brand"
                                name="brand"
                                className="flex-1"
                            >
                                <Select
                                    allowClear
                                    placeholder="Select Brand"
                                    options={brandData?.map((b: any) => ({
                                        label: b.brand,
                                        value: b._id,
                                    }))}
                                />
                            </Form.Item>
                        </div>
                    )}

                    {/* Saleable / Purchasable */}
                    <Form.Item
                        name="is_saleable"
                        valuePropName="checked"
                        className="mb-0"
                    >
                        <Checkbox>
                            <Text
                                strong
                                className="dark:text-white"
                            >
                                Saleable
                            </Text>
                        </Checkbox>
                    </Form.Item>
                    {form.getFieldValue('is_saleable') && (
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

                            <Form.Item
                                label="Selling VAT"
                                name="selling_vat"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    placeholder="Select or type Selling VAT"
                                    showSearch
                                    filterOption={false}
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
                                    value={form.getFieldValue('selling_vat')}
                                    onSelect={value => {
                                        form.setFieldsValue({
                                            selling_vat: value,
                                        });
                                    }}
                                    onBlur={e => {
                                        const target =
                                            e.target as HTMLInputElement;
                                        const typedValue = target.value;
                                        if (typedValue) {
                                            form.setFieldsValue({
                                                selling_vat: typedValue,
                                            });
                                        }
                                    }}
                                    allowClear
                                />
                            </Form.Item>

                            <Form.Item
                                label="Selling Discount"
                                name="selling_discount"
                                className="flex-1 mb-0"
                            >
                                <Select
                                    placeholder="Select or type Selling Discount"
                                    showSearch
                                    filterOption={false}
                                    options={[
                                        { label: '5%', value: '5' },
                                        { label: '10%', value: '10' },
                                        { label: '15%', value: '15' },
                                    ]}
                                    value={form.getFieldValue(
                                        'selling_discount'
                                    )}
                                    onSelect={value => {
                                        form.setFieldsValue({
                                            selling_discount: value,
                                        });
                                    }}
                                    onBlur={e => {
                                        const target =
                                            e.target as HTMLInputElement;
                                        const typedValue = target.value;
                                        if (typedValue) {
                                            form.setFieldsValue({
                                                selling_discount: typedValue,
                                            });
                                        }
                                    }}
                                    allowClear
                                />
                            </Form.Item>
                        </div>
                    )}

                    {itemType === 'product' && (
                        <Form.Item
                            name="is_purchasable"
                            valuePropName="checked"
                            className="mb-0"
                        >
                            <Checkbox>
                                <Text
                                    strong
                                    className="dark:text-white"
                                >
                                    Purchasable
                                </Text>
                            </Checkbox>
                        </Form.Item>
                    )}

                    {form.getFieldValue('is_purchasable') && (
                        <div className="flex items-center gap-3 my-4">
                            {itemType === 'product' && (
                                <Form.Item
                                    label="Purchasing Price"
                                    name="purchasing_price"
                                    className="flex-1 mb-0"
                                >
                                    <Input placeholder="Enter Purchasing Price" />
                                </Form.Item>
                            )}

                            {itemType === 'product' && (
                                <Form.Item
                                    label="Purchasing Account"
                                    name="purchasing_account"
                                    className="flex-1 mb-0"
                                >
                                    <Select
                                        placeholder="Select Purchasing Account"
                                        showSearch
                                        filterOption={false}
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
                                        value={form.getFieldValue(
                                            'purchasing_account'
                                        )}
                                        onSelect={value => {
                                            form.setFieldsValue({
                                                purchasing_account: value,
                                            });
                                        }}
                                        onBlur={e => {
                                            const target =
                                                e.target as HTMLInputElement;
                                            const typedValue = target.value;
                                            if (typedValue) {
                                                form.setFieldsValue({
                                                    purchasing_account:
                                                        typedValue,
                                                });
                                            }
                                        }}
                                        allowClear
                                    />
                                </Form.Item>
                            )}
                            {itemType === 'product' && (
                                <Form.Item
                                    label="Purchasing VAT"
                                    name="purchasing_vat"
                                    className="flex-1 mb-0"
                                >
                                    <Select
                                        placeholder="Select Purchasing VAT"
                                        showSearch
                                        filterOption={false}
                                        options={[
                                            { label: '5%', value: '5' },
                                            { label: '10%', value: '10' },
                                            { label: '15%', value: '15%' },
                                        ]}
                                        value={form.getFieldValue(
                                            'purchasing_vat'
                                        )}
                                        onSelect={value => {
                                            form.setFieldsValue({
                                                purchasing_vat: value,
                                            });
                                        }}
                                        onBlur={e => {
                                            const target =
                                                e.target as HTMLInputElement;
                                            const typedValue = target.value;
                                            if (typedValue) {
                                                form.setFieldsValue({
                                                    purchasing_vat: typedValue,
                                                });
                                            }
                                        }}
                                        allowClear
                                    />
                                </Form.Item>
                            )}
                        </div>
                    )}

                    {/* Categories */}
                    <Form.Item
                        label="Categories"
                        name="categories"
                        rules={[
                            {
                                required: true,
                                message: 'Please select at least one category',
                            },
                        ]}
                    >
                        <EditCategoryTreeSelect
                            categories={allCategories}
                            value={categoryValue} // local state
                            onChange={(val: string[]) => {
                                setCategoryValue(val); // local state update
                                form.setFieldsValue({ categories: val }); // form update
                            }}
                        />
                    </Form.Item>

                    {/* Descriptions */}
                    <Form.Item
                        label="Short Description"
                        name="item_description"
                    >
                        <TextArea
                            className="dark:text-white"
                            rows={2}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Long Description"
                        name="item_long_description"
                    >
                        <JoditEditor
                            value={
                                form.getFieldValue('item_long_description') ||
                                ''
                            }
                            onChange={val =>
                                form.setFieldsValue({
                                    item_long_description: val,
                                })
                            }
                            config={{
                                readonly: false,
                                height: 300,
                                theme: isDarkMode ? 'dark' : 'default',
                            }}
                        />
                    </Form.Item>

                    {itemType === 'product' && (
                        <Form.Item
                            label="Attribute"
                            name="attribute_sets"
                            className="flex-1 mb-0"
                        >
                            <Select
                                allowClear
                                placeholder="Select Attribute"
                                options={
                                    Array.isArray(attributes)
                                        ? attributes.map((m: any) => ({
                                              label: m.attribute_set,
                                              discount: m.discount,
                                              value: m._id,
                                          }))
                                        : []
                                }
                            />
                        </Form.Item>
                    )}

                    {itemType === 'product' && (
                        <Form.Item
                            name="is_track_inventory"
                            valuePropName="checked"
                            className="mb-0"
                        >
                            <Checkbox>
                                <Text
                                    strong
                                    className="dark:text-white"
                                >
                                    Track Inventory
                                </Text>
                            </Checkbox>
                        </Form.Item>
                    )}

                    {form.getFieldValue('is_track_inventory') && (
                        <div className="flex items-center gap-3 my-4">
                            <Form.Item
                                label="Stock Quantity"
                                name="stock_quantites"
                                className="flex-1 mb-0"
                            >
                                <Input placeholder="Enter Stock Quantity" />
                            </Form.Item>

                            <Form.Item
                                label="Low stock Quantity"
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
                            {itemId ? 'Update Item' : 'Save Item'}
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
                            <p>Click or drag file to this area to upload</p>
                        </Dragger>
                    </div>
                </div>
            </Form>
        </Spin>
    );
};

export default EditSingleItem;
