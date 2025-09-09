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
import { useNavigate } from 'react-router-dom';
import { UnitDropdown } from './UnitDropdown';
import { SortableList } from './SortableItem';
import { arrayMoveImmutable } from 'array-move';

const { Dragger } = Upload;
const { Text } = Typography;
const { TextArea } = Input;

interface Category {
    _id: string;
    name: string;
    parentId?: string;
}

const AddSingleItem: React.FC = () => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [is_saleable, set_is_saleable] = useState(true);
    const [is_track_inventory, set_is_track_inventory] = useState(false);
    const [is_serialized, set_is_serialized] = useState(false);
    const [is_manage_batch, set_is_manage_batch] = useState(false);
    const [is_purchasable, set_is_purchasable] = useState(false);
    const [is_returnable, set_is_returnable] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [variants, setVariants] = useState<
        {
            color: string;
            size: string;
            sku: string;
            quantity: number;
            normal_price: number;
            offer_price: number;
            product_cost: number;
            cover_photo?: string[];
        }[]
    >([
        {
            color: '',
            size: '',
            sku: '',
            quantity: 0,
            normal_price: 0,
            offer_price: 0,
            product_cost: 0,
            cover_photo: [],
        },
    ]);

    const {
        brandData,
        categories = [],
        manufacturers,
        sizes,
        colors,
        isLoading,
        attributes,
        isError,
    } = useItemsData();

    const addVariant = () => {
        setVariants(prev => [
            ...prev,
            {
                color: '',
                size: '',
                sku: '',
                quantity: 0,
                normal_price: 0,
                offer_price: 0,
                product_cost: 0,
            },
        ]);
    };
    const removeVariant = (index: number) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };
    const updateVariant = (index: number, field: string, value: any) => {
        setVariants(prev =>
            prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
        );
    };
    const handleVariantCoverUpload = async (file: File, index: number) => {
        try {
            const url = await uploadImage(file);
            setVariants(prev =>
                prev.map((v, i) =>
                    i === index
                        ? {
                              ...v,
                              cover_photo: v.cover_photo
                                  ? [...v.cover_photo, url]
                                  : [url],
                          }
                        : v
                )
            );
            message.success('Cover photo uploaded successfully');
            return url; // optional
        } catch (err) {
            message.error('Cover photo upload failed');
            return null;
        }
    };

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
                            variants,
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
                            navigate(-1);
                            form.resetFields();
                            setUploadedImages([]);
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
                    <div className="flex items-center gap-3">
                        <Form.Item
                            label="SKU"
                            name="sku"
                            className="flex-1 mb-0 dark:text-white"
                        >
                            <Input
                                value={sku}
                                placeholder="Enter SKU"
                            />
                        </Form.Item>

                        {itemType === 'product' && (
                            <Form.Item
                                label="Unit"
                                name="unit"
                                className="flex-1 mb-0"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a unit!',
                                    },
                                ]}
                            >
                                <UnitDropdown />
                            </Form.Item>
                        )}
                    </div>

                    <Form.Item
                        name="is_returnable"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox>Returnable Item</Checkbox>
                    </Form.Item>

                    {itemType === 'product' && (
                        <div className="space-y-4 mt-6">
                            <h3 className="text-lg font-semibold dark:text-white">
                                Variants
                            </h3>
                            <div className="space-y-4">
                                {variants.map((variant, index) => {
                                    const mainSKU = form.getFieldValue('sku');
                                    const autoSKU = `${mainSKU}-${index + 1}`;

                                    return (
                                        <div
                                            key={index}
                                            className="p-4 border border-gray-500 rounded shadow-sm grid grid-cols-1 gap-4 "
                                        >
                                            <Form.Item
                                                label="Cover Photo"
                                                className="mb-0"
                                            >
                                                <Upload.Dragger
                                                    multiple
                                                    fileList={[]}
                                                    showUploadList={false}
                                                    customRequest={async ({
                                                        file,
                                                        onSuccess,
                                                    }) => {
                                                        try {
                                                            const uploadedFile =
                                                                await handleVariantCoverUpload(
                                                                    file as File,
                                                                    index
                                                                );

                                                            setVariants(prev =>
                                                                prev.map(
                                                                    (v, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...v,
                                                                                  cover_photo:
                                                                                      v.cover_photo?.includes(
                                                                                          uploadedFile
                                                                                      )
                                                                                          ? [
                                                                                                ...v.cover_photo,
                                                                                            ]
                                                                                          : [
                                                                                                ...(v.cover_photo ||
                                                                                                    []),
                                                                                                uploadedFile,
                                                                                            ],
                                                                              }
                                                                            : v
                                                                )
                                                            );

                                                            onSuccess &&
                                                                onSuccess(
                                                                    {},
                                                                    new XMLHttpRequest()
                                                                );
                                                        } catch {
                                                            message.error(
                                                                'Cover upload failed'
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <p className="ant-upload-drag-icon text-black dark:text-white">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="text-sm text-black dark:text-white">
                                                        Upload cover photo
                                                    </p>
                                                </Upload.Dragger>

                                                {(variant.cover_photo || [])
                                                    .length > 0 && (
                                                    <SortableList
                                                        items={
                                                            variant.cover_photo
                                                        }
                                                        onSortEnd={({
                                                            oldIndex,
                                                            newIndex,
                                                        }) => {
                                                            setVariants(prev =>
                                                                prev.map(
                                                                    (v, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...v,
                                                                                  cover_photo:
                                                                                      arrayMoveImmutable(
                                                                                          v.cover_photo,
                                                                                          oldIndex,
                                                                                          newIndex
                                                                                      ),
                                                                              }
                                                                            : v
                                                                )
                                                            );
                                                        }}
                                                        onRemove={url => {
                                                            setVariants(prev =>
                                                                prev.map(
                                                                    (v, i) =>
                                                                        i ===
                                                                        index
                                                                            ? {
                                                                                  ...v,
                                                                                  cover_photo:
                                                                                      v.cover_photo?.filter(
                                                                                          u =>
                                                                                              u !==
                                                                                              url
                                                                                      ),
                                                                              }
                                                                            : v
                                                                )
                                                            );
                                                        }}
                                                        axis="xy"
                                                        pressDelay={200}
                                                    />
                                                )}
                                            </Form.Item>

                                            {/* Fields */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                                <Form.Item
                                                    label="Color"
                                                    className="mb-0"
                                                >
                                                    <Select
                                                        allowClear
                                                        placeholder="Select Color"
                                                        value={variant.color}
                                                        onChange={val =>
                                                            updateVariant(
                                                                index,
                                                                'color',
                                                                val
                                                            )
                                                        }
                                                        options={colors?.map(
                                                            (c: any) => ({
                                                                label: c.color_name,
                                                                value: c.code,
                                                                key: c._id,
                                                            })
                                                        )}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Size"
                                                    className="mb-0"
                                                >
                                                    <Select
                                                        allowClear
                                                        placeholder="Select Size"
                                                        value={variant.size}
                                                        onChange={val =>
                                                            updateVariant(
                                                                index,
                                                                'size',
                                                                val
                                                            )
                                                        }
                                                        options={sizes?.map(
                                                            (s: any) => ({
                                                                label: s.addedType,
                                                                value: s.addedType,
                                                                key: s._id,
                                                            })
                                                        )}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="SKU"
                                                    className="mb-0"
                                                >
                                                    <Input
                                                        value={autoSKU}
                                                        readOnly
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Quantity"
                                                    className="mb-0"
                                                >
                                                    <Input
                                                        type="number"
                                                        value={variant.quantity}
                                                        onChange={e =>
                                                            updateVariant(
                                                                index,
                                                                'quantity',
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Normal Price"
                                                    className="mb-0"
                                                >
                                                    <Input
                                                        type="number"
                                                        value={
                                                            variant.normal_price
                                                        }
                                                        onChange={e =>
                                                            updateVariant(
                                                                index,
                                                                'normal_price',
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Offer Price"
                                                    className="mb-0"
                                                >
                                                    <Input
                                                        type="number"
                                                        value={
                                                            variant.offer_price
                                                        }
                                                        onChange={e =>
                                                            updateVariant(
                                                                index,
                                                                'offer_price',
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Product Cost"
                                                    className="mb-0"
                                                >
                                                    <Input
                                                        type="number"
                                                        value={
                                                            variant.product_cost
                                                        }
                                                        onChange={e =>
                                                            updateVariant(
                                                                index,
                                                                'product_cost',
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                    />
                                                </Form.Item>
                                            </div>

                                            <div className="flex justify-end">
                                                <Button
                                                    type="dashed"
                                                    danger
                                                    onClick={() =>
                                                        removeVariant(index)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Button
                                    type="dashed"
                                    onClick={addVariant}
                                >
                                    Add Variant
                                </Button>
                            </div>
                        </div>
                    )}

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
                                    labelInValue
                                    options={
                                        Array.isArray(manufacturers)
                                            ? manufacturers.map((m: any) => ({
                                                  label: m.manufacturer,
                                                  value: m.discount,
                                                  key: m._id,
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
                                    labelInValue
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
                    <Form.Item
                        label="Attribute"
                        name="attribute_sets"
                        className="flex-1 mb-0"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Select Attribute"
                            labelInValue={false}
                            options={
                                Array.isArray(attributes)
                                    ? attributes.map((m: any) => ({
                                          label: m.attribute_set,
                                          value: m.attribute_set,
                                          key: m._id,
                                      }))
                                    : []
                            }
                            className="dark:text-white"
                            dropdownClassName="dark:bg-gray-800 dark:text-white"
                            tagRender={props => {
                                const { label, value, closable, onClose } =
                                    props;
                                return (
                                    <span className="inline-flex items-center px-2 py-1 bg-gray-700 text-white rounded mr-1 mb-1">
                                        {label}
                                        {closable && (
                                            <span
                                                onClick={onClose}
                                                className="ml-1 cursor-pointer text-white"
                                            >
                                                ×
                                            </span>
                                        )}
                                    </span>
                                );
                            }}
                        />
                    </Form.Item>

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

                    <Form.Item
                        name="availeablein_pos"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox>Available in POS</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="availeablein_ecommerce"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox>Available in E-commerce</Checkbox>
                    </Form.Item>

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
