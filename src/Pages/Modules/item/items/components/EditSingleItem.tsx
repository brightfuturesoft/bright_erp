import { DeleteOutlined, EyeOutlined, InboxOutlined } from '@ant-design/icons';
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
    Modal,
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
import { UnitDropdown } from './UnitDropdown';
import { SortableList } from './EditSortableItem';
import { arrayMoveImmutable } from '@/utils/arrayMove';

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
    const [variants, setVariants] = useState<
        {
            color?: string;
            size?: string;
            sku?: string;
            quantity?: number;
            normal_price?: number;
            offer_price?: number;
            product_cost?: number;
            cover_photo?: string[];
        }[]
    >([]);

    // Fetch data
    const {
        brandData,
        categories = [],
        manufacturers,
        expenseData,
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
            // Categories
            const catValues = itemsData.categories || [];
            setCategoryValue(catValues);

            // Uploaded images
            setUploadedImages(itemsData.attachments || []);

            // Variants
            setVariants(itemsData.variants || []);

            // Form values
            form.setFieldsValue({
                ...itemsData,
                categories: catValues,
                item_type: itemsData.item_type || 'product',
                selling_price: itemsData.selling_price || 0,
                is_saleable: itemsData.is_saleable ?? true,
                handling_price: itemsData.handling_price || 0,
                is_purchasable: itemsData.is_purchasable ?? false,
                is_track_inventory: itemsData.is_track_inventory ?? false,
                is_serialized: itemsData.is_serialized ?? false,
                is_manage_batch: itemsData.is_manage_batch ?? false,
                purchasing_account: {
                    label:
                        expenseData?.find(
                            (acc: any) =>
                                acc?._id === itemsData?.purchasing_account
                        )?.ac_name || '',
                    value: itemsData?.purchasing_account || '',
                },

                purchasing_vat: itemsData.purchasing_vat || 0,
                selling_vat: itemsData.selling_vat ?? 0,
                selling_discount: itemsData.selling_discount ?? 0,
                unit: itemsData.unit ?? '',
                is_returnable: itemsData.is_returnable ?? false,
            });

            // SKU
            if (itemsData.sku) setSku(itemsData.sku);
        }
    }, [itemsData, form]);

    // Variants Function
    const addVariant = () => {
        setVariants(prev => [
            ...prev,
            {
                sku: `${form.getFieldValue('item_name') || 'item'}-${prev.length + 1}`,
            },
        ]);
    };

    const removeVariant = (index: number) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };

    // updateVariant function modification for cover_photo
    const updateVariant = (index: number, field: string, value: any) => {
        setVariants(prev => {
            const newVariants = [...prev];

            if (field === 'cover_photo') {
                // Always store as array
                newVariants[index][field] = Array.isArray(value)
                    ? value
                    : [value];
            } else {
                newVariants[index][field] = value;
            }

            // Auto-generate SKU for all variants
            const itemName = form.getFieldValue('item_name') || 'item';
            return newVariants.map((v, i) => ({
                ...v,
                sku: `${itemName.trim().toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
            }));
        });
    };

    useEffect(() => {
        const itemName = form.getFieldValue('item_name') || 'item';
        const slugifiedName = itemName
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-');
        setVariants(prev =>
            prev.map((v, i) => ({
                ...v,
                sku: `${slugifiedName}-${i + 1}`,
            }))
        );
    }, [form.getFieldValue('item_name'), variants.length]);

    // Upload cover photo for variant
    const handleVariantCoverUpload = async (
        file: File,
        index: number
    ): Promise<string> => {
        const url = await uploadImage(file); // your image upload helper
        return url; // always return string
    };

    const onVariantCoverUpload = async (files: File[], index: number) => {
        const uploadedUrls: string[] = [];

        for (const file of files) {
            try {
                const url = await handleVariantCoverUpload(file, index);
                uploadedUrls.push(url);
                message.success(`${file.name} uploaded successfully`);
            } catch (err) {
                message.error(`${file.name} upload failed`);
            }
        }

        setVariants(prev =>
            prev.map((v, i) => {
                if (i !== index) return v;
                const existingPhotos = v.cover_photo || [];
                return {
                    ...v,
                    cover_photo: [...existingPhotos, ...uploadedUrls],
                };
            })
        );
    };

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
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>('');

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
                            variants: variants,
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
                            message.success('Item updated');
                            navigate(-1);
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
                                className="flex-1 mb-0"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a unit!',
                                    },
                                ]}
                            >
                                <UnitDropdown value={itemsData?.unit} />
                            </Form.Item>
                        )}
                    </div>
                    {itemType === 'product' && (
                        <Form.Item
                            label="Handling Price"
                            name="handling_price"
                            className="flex-1 mb-0"
                        >
                            <Input
                                type="number"
                                placeholder="Enter Handling Price"
                                min={0}
                            />
                        </Form.Item>
                    )}

                    {itemType === 'product' && (
                        <div className="space-y-4 mt-6">
                            <h3 className="text-lg font-semibold dark:text-white">
                                Variants
                            </h3>
                            <div className="space-y-4">
                                {variants.map((variant, index) => {
                                    const itemName =
                                        form.getFieldValue('item_name') ||
                                        'item';
                                    const autoSKU = `${itemName.trim().toLowerCase().replace(/\s+/g, '-')}-${index + 1}`;

                                    return (
                                        <div
                                            key={index}
                                            className="p-4 border border-gray-500 rounded shadow-sm grid grid-cols-1 gap-4 "
                                        >
                                            <Form.Item
                                                label="Cover Photo"
                                                className="mb-0 dark:text-white"
                                            >
                                                <Upload.Dragger
                                                    multiple
                                                    showUploadList={false}
                                                    customRequest={async ({
                                                        file,
                                                        onSuccess,
                                                    }) => {
                                                        const uploadedUrl =
                                                            await handleVariantCoverUpload(
                                                                file as File,
                                                                index
                                                            );
                                                        onSuccess &&
                                                            onSuccess(
                                                                {},
                                                                new XMLHttpRequest()
                                                            );
                                                        setVariants(prev =>
                                                            prev.map((v, i) => {
                                                                if (i !== index)
                                                                    return v;
                                                                const existing =
                                                                    v.cover_photo ||
                                                                    [];
                                                                return {
                                                                    ...v,
                                                                    cover_photo:
                                                                        [
                                                                            ...existing,
                                                                            uploadedUrl,
                                                                        ],
                                                                };
                                                            })
                                                        );
                                                    }}
                                                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                                >
                                                    <p className="ant-upload-drag-icon text-black dark:text-white">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="text-sm text-black dark:text-white">
                                                        Upload cover photo
                                                    </p>
                                                </Upload.Dragger>

                                                {/* Existing / Uploaded Images */}
                                                <div className="flex flex-wrap mt-2 gap-2">
                                                    {(
                                                        variant.cover_photo ||
                                                        []
                                                    ).map((url, imgIndex) => (
                                                        <div
                                                            key={imgIndex}
                                                            className="relative group w-40 h-40 cursor-move border border-gray-300 dark:border-gray-600 rounded"
                                                            draggable
                                                            onDragStart={e =>
                                                                e.dataTransfer.setData(
                                                                    'text/plain',
                                                                    imgIndex.toString()
                                                                )
                                                            }
                                                            onDragOver={e =>
                                                                e.preventDefault()
                                                            }
                                                            onDrop={e => {
                                                                const oldIndex =
                                                                    Number(
                                                                        e.dataTransfer.getData(
                                                                            'text/plain'
                                                                        )
                                                                    );
                                                                const newIndex =
                                                                    imgIndex;
                                                                if (
                                                                    oldIndex ===
                                                                    newIndex
                                                                )
                                                                    return;
                                                                setVariants(
                                                                    prev =>
                                                                        prev.map(
                                                                            (
                                                                                v,
                                                                                i
                                                                            ) =>
                                                                                i ===
                                                                                index
                                                                                    ? {
                                                                                          ...v,
                                                                                          cover_photo:
                                                                                              arrayMoveImmutable(
                                                                                                  v.cover_photo!,
                                                                                                  oldIndex,
                                                                                                  newIndex
                                                                                              ),
                                                                                      }
                                                                                    : v
                                                                        )
                                                                );
                                                            }}
                                                        >
                                                            <img
                                                                src={url}
                                                                alt={`cover-${imgIndex}`}
                                                                className="w-full h-full object-cover rounded border border-gray-300 dark:border-gray-600"
                                                            />

                                                            {/* Preview Button */}
                                                            <Button
                                                                type="primary"
                                                                shape="circle"
                                                                icon={
                                                                    <EyeOutlined />
                                                                }
                                                                size="small"
                                                                className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition"
                                                                onClick={() => {
                                                                    setPreviewImage(
                                                                        url
                                                                    );
                                                                    setPreviewVisible(
                                                                        true
                                                                    );
                                                                }}
                                                            />

                                                            {/* Remove Button */}
                                                            <Button
                                                                type="primary"
                                                                danger
                                                                shape="circle"
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                size="small"
                                                                className="absolute top-1 right-1"
                                                                onClick={() => {
                                                                    setVariants(
                                                                        prev =>
                                                                            prev.map(
                                                                                (
                                                                                    v,
                                                                                    i
                                                                                ) =>
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
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Modal for Preview */}
                                                <Modal
                                                    open={previewVisible}
                                                    footer={null}
                                                    onCancel={() =>
                                                        setPreviewVisible(false)
                                                    }
                                                    className="dark:bg-gray-800"
                                                >
                                                    <img
                                                        src={previewImage}
                                                        className="w-full"
                                                    />
                                                </Modal>
                                            </Form.Item>

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
                                                        value={variant.sku}
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
                                label="Selling VAT(%)"
                                name="selling_vat"
                                className="flex-1 mb-0"
                            >
                                <Input
                                    type="number"
                                    placeholder="Please Selling VAT(%)"
                                    min={0}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Selling Discount(%)"
                                name="selling_discount"
                                className="flex-1 mb-0"
                            >
                                <Input
                                    type="number"
                                    placeholder="Please Enter Discount (%)"
                                    min={0}
                                    max={100}
                                />
                            </Form.Item>
                        </div>
                    )}

                    {/* Purchasable Checkbox */}
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

                    {/* Purchasable Fields */}
                    {itemType === 'product' && (
                        <Form.Item
                            shouldUpdate={(prevValues, currentValues) =>
                                prevValues.is_purchasable !==
                                currentValues.is_purchasable
                            }
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('is_purchasable') ? (
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
                                                allowClear
                                                placeholder="Select Purchasing Account"
                                                labelInValue
                                                options={
                                                    Array.isArray(expenseData)
                                                        ? expenseData.map(
                                                              (b: any) => ({
                                                                  label: b.ac_name,
                                                                  value: b._id,
                                                              })
                                                          )
                                                        : []
                                                }
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label="Purchasing VAT(%)"
                                            name="purchasing_vat"
                                            className="flex-1 mb-0"
                                        >
                                            <Input
                                                type="number"
                                                placeholder="Please Purchasing VAT (%)"
                                                min={0}
                                                max={100}
                                            />
                                        </Form.Item>
                                    </div>
                                ) : null
                            }
                        </Form.Item>
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
                            value={categoryValue}
                            onChange={(val: string[]) => {
                                setCategoryValue(val);
                                form.setFieldsValue({ categories: val });
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

                    <Form.Item
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.is_track_inventory !==
                            currentValues.is_track_inventory
                        }
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('is_track_inventory') ? (
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
                            ) : null
                        }
                    </Form.Item>

                    <Form.Item
                        name="is_returnable"
                        valuePropName="checked"
                        className="flex-1 mb-0"
                    >
                        <Checkbox>Returnable Item</Checkbox>
                    </Form.Item>

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
                            {itemId ? 'Update Item' : 'Save Item'}
                        </Button>
                    </Form.Item>
                </div>

                {/* File Upload */}
                {/* <div className="mx-auto w-2/5">
                    <div className="p-12">
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p>Click or drag file to this area to upload</p>
                        </Dragger>
                    </div>
                </div> */}
            </Form>
        </Spin>
    );
};

export default EditSingleItem;
