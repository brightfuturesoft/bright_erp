import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
import JoditEditor from 'jodit-react';
import { useContext, useEffect, useState } from 'react';
import { useItemsData } from './data_get_api';
import { Erp_context } from '@/provider/ErpContext';
import { createItemPayload } from './ItemPayload';
import uploadImage from '@/helpers/hooks/uploadImage';
import { useNavigate, useParams } from 'react-router-dom';
import EditCategoryTreeSelect from './EditTreeCategory';
import { UnitDropdown } from './UnitDropdown';
import { arrayMoveImmutable } from '@/utils/arrayMove';
const { Dragger } = Upload;
const { Text } = Typography;
const { TextArea } = Input;
const EditSingleItem = () => {
    const { id: itemId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [sku, setSku] = useState('');
    const [categoryValue, setCategoryValue] = useState([]);
    const [itemType, setItemType] = useState('product');
    const [isDarkMode, setIsDarkMode] = useState(() =>
        typeof window !== 'undefined'
            ? document.documentElement.classList.contains('dark')
            : false
    );
    const [variants, setVariants] = useState([]);
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
    const itemsData =
        itemId && Array.isArray(fetchedItemsData)
            ? fetchedItemsData.find(item => item._id === itemId)
            : fetchedItemsData || null;
    // console.log('itemsData', itemsData);
    // Prepare categories tree
    const allCategories = Array.isArray(categories)
        ? categories.map(cat => ({
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
                            acc => acc?._id === itemsData?.purchasing_account
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
    const removeVariant = index => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };
    // updateVariant function modification for cover_photo
    const updateVariant = (index, field, value) => {
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
    const handleVariantCoverUpload = async (file, index) => {
        const url = await uploadImage(file); // your image upload helper
        return url; // always return string
    };
    const onVariantCoverUpload = async (files, index) => {
        const uploadedUrls = [];
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
    const handleNameChange = e => {
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
    const uploadProps = {
        name: 'file',
        multiple: true,
        customRequest: async ({ file, onSuccess, onError }) => {
            try {
                const imageUrl = await uploadImage(file);
                message.success(`${file.name} uploaded successfully.`);
                onSuccess && onSuccess(imageUrl, new XMLHttpRequest());
            } catch (err) {
                message.error(`${file.name} upload failed.`);
                onError && onError(err);
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
    const [previewImage, setPreviewImage] = useState('');
    return _jsx(Spin, {
        spinning: isLoading,
        children: _jsx(Form, {
            form: form,
            layout: 'vertical',
            className: 'flex py-3',
            style: { gap: 32 },
            initialValues: {
                selling_price: 0,
                categories: categoryValue,
                item_type: 'product',
                is_returnable: false,
                is_track_inventory: false,
                is_serialized: false,
                is_manage_batch: false,
                is_purchasable: false,
                is_saleable: true,
            },
            onFinish: async values => {
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
                        message.error(data.message || 'Something went wrong');
                    }
                } catch (err) {
                    console.error(err);
                    message.error('Network error');
                }
            },
            children: _jsxs('div', {
                className: 'space-y-4 w-3/5',
                children: [
                    _jsx(Form.Item, {
                        label: 'Item Type',
                        name: 'item_type',
                        required: true,
                        children: _jsxs(Radio.Group, {
                            onChange: e => setItemType(e.target.value),
                            value: itemType,
                            children: [
                                _jsx(Radio, {
                                    value: 'service',
                                    children: 'Service',
                                }),
                                _jsx(Radio, {
                                    value: 'product',
                                    children: 'Product',
                                }),
                            ],
                        }),
                    }),
                    _jsx(Form.Item, {
                        label: 'Item Name',
                        name: 'item_name',
                        rules: [
                            {
                                required: true,
                                message: 'Item Name is required',
                            },
                        ],
                        children: _jsx(Input, {
                            onChange: handleNameChange,
                            placeholder: 'Enter item name',
                        }),
                    }),
                    _jsxs('div', {
                        className: 'flex gap-3',
                        children: [
                            _jsx(Form.Item, {
                                label: 'SKU',
                                name: 'sku',
                                className: 'flex-1 ',
                                children: _jsx(Input, {
                                    value: sku,
                                    placeholder: 'SKU',
                                    className: 'dark:text-white',
                                }),
                            }),
                            itemType === 'product' &&
                                _jsx(Form.Item, {
                                    label: 'Unit',
                                    name: 'unit',
                                    className: 'flex-1 mb-0',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select a unit!',
                                        },
                                    ],
                                    children: _jsx(UnitDropdown, {
                                        value: itemsData?.unit,
                                    }),
                                }),
                        ],
                    }),
                    itemType === 'product' &&
                        _jsx(Form.Item, {
                            label: 'Handling Price',
                            name: 'handling_price',
                            className: 'flex-1 mb-0',
                            children: _jsx(Input, {
                                type: 'number',
                                placeholder: 'Enter Handling Price',
                                min: 0,
                            }),
                        }),
                    itemType === 'product' &&
                        _jsxs('div', {
                            className: 'space-y-4 mt-6',
                            children: [
                                _jsx('h3', {
                                    className:
                                        'text-lg font-semibold dark:text-white',
                                    children: 'Variants',
                                }),
                                _jsxs('div', {
                                    className: 'space-y-4',
                                    children: [
                                        variants.map((variant, index) => {
                                            const itemName =
                                                form.getFieldValue(
                                                    'item_name'
                                                ) || 'item';
                                            const autoSKU = `${itemName.trim().toLowerCase().replace(/\s+/g, '-')}-${index + 1}`;
                                            return _jsxs(
                                                'div',
                                                {
                                                    className:
                                                        'p-4 border border-gray-500 rounded shadow-sm grid grid-cols-1 gap-4 ',
                                                    children: [
                                                        _jsxs(Form.Item, {
                                                            label: 'Cover Photo',
                                                            className:
                                                                'mb-0 dark:text-white',
                                                            children: [
                                                                _jsxs(
                                                                    Upload.Dragger,
                                                                    {
                                                                        multiple: true,
                                                                        showUploadList: false,
                                                                        customRequest:
                                                                            async ({
                                                                                file,
                                                                                onSuccess,
                                                                            }) => {
                                                                                const uploadedUrl =
                                                                                    await handleVariantCoverUpload(
                                                                                        file,
                                                                                        index
                                                                                    );
                                                                                onSuccess &&
                                                                                    onSuccess(
                                                                                        {},
                                                                                        new XMLHttpRequest()
                                                                                    );
                                                                                setVariants(
                                                                                    prev =>
                                                                                        prev.map(
                                                                                            (
                                                                                                v,
                                                                                                i
                                                                                            ) => {
                                                                                                if (
                                                                                                    i !==
                                                                                                    index
                                                                                                )
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
                                                                                            }
                                                                                        )
                                                                                );
                                                                            },
                                                                        className:
                                                                            'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'p',
                                                                                    {
                                                                                        className:
                                                                                            'ant-upload-drag-icon text-black dark:text-white',
                                                                                        children:
                                                                                            _jsx(
                                                                                                InboxOutlined,
                                                                                                {}
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'p',
                                                                                    {
                                                                                        className:
                                                                                            'text-sm text-black dark:text-white',
                                                                                        children:
                                                                                            'Upload cover photo',
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                                _jsx('div', {
                                                                    className:
                                                                        'flex flex-wrap mt-2 gap-2',
                                                                    children: (
                                                                        variant.cover_photo ||
                                                                        []
                                                                    ).map(
                                                                        (
                                                                            url,
                                                                            imgIndex
                                                                        ) =>
                                                                            _jsxs(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'relative group w-40 h-40 cursor-move border border-gray-300 dark:border-gray-600 rounded',
                                                                                    draggable: true,
                                                                                    onDragStart:
                                                                                        e =>
                                                                                            e.dataTransfer.setData(
                                                                                                'text/plain',
                                                                                                imgIndex.toString()
                                                                                            ),
                                                                                    onDragOver:
                                                                                        e =>
                                                                                            e.preventDefault(),
                                                                                    onDrop: e => {
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
                                                                                                                          v.cover_photo,
                                                                                                                          oldIndex,
                                                                                                                          newIndex
                                                                                                                      ),
                                                                                                              }
                                                                                                            : v
                                                                                                )
                                                                                        );
                                                                                    },
                                                                                    children:
                                                                                        [
                                                                                            _jsx(
                                                                                                'img',
                                                                                                {
                                                                                                    src: url,
                                                                                                    alt: `cover-${imgIndex}`,
                                                                                                    className:
                                                                                                        'w-full h-full object-cover rounded border border-gray-300 dark:border-gray-600',
                                                                                                }
                                                                                            ),
                                                                                            _jsx(
                                                                                                Button,
                                                                                                {
                                                                                                    type: 'primary',
                                                                                                    shape: 'circle',
                                                                                                    icon: _jsx(
                                                                                                        EyeOutlined,
                                                                                                        {}
                                                                                                    ),
                                                                                                    size: 'small',
                                                                                                    className:
                                                                                                        'absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition',
                                                                                                    onClick:
                                                                                                        () => {
                                                                                                            setPreviewImage(
                                                                                                                url
                                                                                                            );
                                                                                                            setPreviewVisible(
                                                                                                                true
                                                                                                            );
                                                                                                        },
                                                                                                }
                                                                                            ),
                                                                                            _jsx(
                                                                                                Button,
                                                                                                {
                                                                                                    type: 'primary',
                                                                                                    danger: true,
                                                                                                    shape: 'circle',
                                                                                                    icon: _jsx(
                                                                                                        DeleteOutlined,
                                                                                                        {}
                                                                                                    ),
                                                                                                    size: 'small',
                                                                                                    className:
                                                                                                        'absolute top-1 right-1',
                                                                                                    onClick:
                                                                                                        () => {
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
                                                                                                        },
                                                                                                }
                                                                                            ),
                                                                                        ],
                                                                                },
                                                                                imgIndex
                                                                            )
                                                                    ),
                                                                }),
                                                                _jsx(Modal, {
                                                                    open: previewVisible,
                                                                    footer: null,
                                                                    onCancel:
                                                                        () =>
                                                                            setPreviewVisible(
                                                                                false
                                                                            ),
                                                                    className:
                                                                        'dark:bg-gray-800',
                                                                    children:
                                                                        _jsx(
                                                                            'img',
                                                                            {
                                                                                src: previewImage,
                                                                                className:
                                                                                    'w-full',
                                                                            }
                                                                        ),
                                                                }),
                                                            ],
                                                        }),
                                                        _jsxs('div', {
                                                            className:
                                                                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
                                                            children: [
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        label: 'Color',
                                                                        className:
                                                                            'mb-0',
                                                                        children:
                                                                            _jsx(
                                                                                Select,
                                                                                {
                                                                                    allowClear: true,
                                                                                    placeholder:
                                                                                        'Select Color',
                                                                                    value: variant.color,
                                                                                    onChange:
                                                                                        val =>
                                                                                            updateVariant(
                                                                                                index,
                                                                                                'color',
                                                                                                val
                                                                                            ),
                                                                                    options:
                                                                                        colors?.map(
                                                                                            c => ({
                                                                                                label: c.color_name,
                                                                                                value: c.code,
                                                                                                key: c._id,
                                                                                            })
                                                                                        ),
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        label: 'Size',
                                                                        className:
                                                                            'mb-0',
                                                                        children:
                                                                            _jsx(
                                                                                Select,
                                                                                {
                                                                                    allowClear: true,
                                                                                    placeholder:
                                                                                        'Select Size',
                                                                                    value: variant.size,
                                                                                    onChange:
                                                                                        val =>
                                                                                            updateVariant(
                                                                                                index,
                                                                                                'size',
                                                                                                val
                                                                                            ),
                                                                                    options:
                                                                                        sizes?.map(
                                                                                            s => ({
                                                                                                label: s.addedType,
                                                                                                value: s.addedType,
                                                                                                key: s._id,
                                                                                            })
                                                                                        ),
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        label: 'SKU',
                                                                        className:
                                                                            'mb-0',
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    value: variant.sku,
                                                                                    readOnly: true,
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        label: 'Quantity',
                                                                        className:
                                                                            'mb-0',
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    type: 'number',
                                                                                    value: variant.quantity,
                                                                                    onChange:
                                                                                        e =>
                                                                                            updateVariant(
                                                                                                index,
                                                                                                'quantity',
                                                                                                Number(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            ),
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        label: 'Normal Price',
                                                                        className:
                                                                            'mb-0',
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    type: 'number',
                                                                                    value: variant.normal_price,
                                                                                    onChange:
                                                                                        e =>
                                                                                            updateVariant(
                                                                                                index,
                                                                                                'normal_price',
                                                                                                Number(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            ),
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        label: 'Offer Price',
                                                                        className:
                                                                            'mb-0',
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    type: 'number',
                                                                                    value: variant.offer_price,
                                                                                    onChange:
                                                                                        e =>
                                                                                            updateVariant(
                                                                                                index,
                                                                                                'offer_price',
                                                                                                Number(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            ),
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                                _jsx(
                                                                    Form.Item,
                                                                    {
                                                                        label: 'Product Cost',
                                                                        className:
                                                                            'mb-0',
                                                                        children:
                                                                            _jsx(
                                                                                Input,
                                                                                {
                                                                                    type: 'number',
                                                                                    value: variant.product_cost,
                                                                                    onChange:
                                                                                        e =>
                                                                                            updateVariant(
                                                                                                index,
                                                                                                'product_cost',
                                                                                                Number(
                                                                                                    e
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            ),
                                                                                }
                                                                            ),
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                        _jsx('div', {
                                                            className:
                                                                'flex justify-end',
                                                            children: _jsx(
                                                                Button,
                                                                {
                                                                    type: 'dashed',
                                                                    danger: true,
                                                                    onClick:
                                                                        () =>
                                                                            removeVariant(
                                                                                index
                                                                            ),
                                                                    children:
                                                                        'Remove',
                                                                }
                                                            ),
                                                        }),
                                                    ],
                                                },
                                                index
                                            );
                                        }),
                                        _jsx(Button, {
                                            type: 'dashed',
                                            onClick: addVariant,
                                            children: 'Add Variant',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    itemType === 'product' &&
                        _jsxs('div', {
                            className: 'flex gap-3',
                            children: [
                                _jsx(Form.Item, {
                                    label: 'Manufacturer',
                                    name: 'manufacturer',
                                    className: 'flex-1',
                                    children: _jsx(Select, {
                                        allowClear: true,
                                        placeholder: 'Select Manufacturer',
                                        labelInValue: true,
                                        options: manufacturers?.map(m => ({
                                            label: m.manufacturer,
                                            value: m.discount,
                                            key: m._id,
                                        })),
                                    }),
                                }),
                                _jsx(Form.Item, {
                                    label: 'Brand',
                                    name: 'brand',
                                    className: 'flex-1',
                                    children: _jsx(Select, {
                                        allowClear: true,
                                        placeholder: 'Select Brand',
                                        options: brandData?.map(b => ({
                                            label: b.brand,
                                            value: b._id,
                                        })),
                                    }),
                                }),
                            ],
                        }),
                    _jsx(Form.Item, {
                        name: 'is_saleable',
                        valuePropName: 'checked',
                        className: 'mb-0',
                        children: _jsx(Checkbox, {
                            children: _jsx(Text, {
                                strong: true,
                                className: 'dark:text-white',
                                children: 'Saleable',
                            }),
                        }),
                    }),
                    form.getFieldValue('is_saleable') &&
                        _jsxs('div', {
                            className: 'flex items-center gap-3 my-4',
                            children: [
                                itemType === 'product' &&
                                    _jsx(Form.Item, {
                                        label: 'Item Weight',
                                        name: 'item_weight',
                                        className: 'flex-1 mb-0',
                                        children: _jsx(Input, {
                                            placeholder: 'Enter Item Weight',
                                        }),
                                    }),
                                _jsx(Form.Item, {
                                    label: 'Selling VAT(%)',
                                    name: 'selling_vat',
                                    className: 'flex-1 mb-0',
                                    children: _jsx(Input, {
                                        type: 'number',
                                        placeholder: 'Please Selling VAT(%)',
                                        min: 0,
                                    }),
                                }),
                                _jsx(Form.Item, {
                                    label: 'Selling Discount(%)',
                                    name: 'selling_discount',
                                    className: 'flex-1 mb-0',
                                    children: _jsx(Input, {
                                        type: 'number',
                                        placeholder:
                                            'Please Enter Discount (%)',
                                        min: 0,
                                        max: 100,
                                    }),
                                }),
                            ],
                        }),
                    itemType === 'product' &&
                        _jsx(Form.Item, {
                            name: 'is_purchasable',
                            valuePropName: 'checked',
                            className: 'mb-0',
                            children: _jsx(Checkbox, {
                                children: _jsx(Text, {
                                    strong: true,
                                    className: 'dark:text-white',
                                    children: 'Purchasable',
                                }),
                            }),
                        }),
                    itemType === 'product' &&
                        _jsx(Form.Item, {
                            shouldUpdate: (prevValues, currentValues) =>
                                prevValues.is_purchasable !==
                                currentValues.is_purchasable,
                            children: ({ getFieldValue }) =>
                                getFieldValue('is_purchasable')
                                    ? _jsxs('div', {
                                          className:
                                              'flex items-center gap-3 my-4',
                                          children: [
                                              _jsx(Form.Item, {
                                                  label: 'Purchasing Price',
                                                  name: 'purchasing_price',
                                                  className: 'flex-1 mb-0',
                                                  children: _jsx(Input, {
                                                      placeholder:
                                                          'Enter Purchasing Price',
                                                  }),
                                              }),
                                              _jsx(Form.Item, {
                                                  label: 'Purchasing Account',
                                                  name: 'purchasing_account',
                                                  className: 'flex-1 mb-0',
                                                  children: _jsx(Select, {
                                                      allowClear: true,
                                                      placeholder:
                                                          'Select Purchasing Account',
                                                      labelInValue: true,
                                                      options: Array.isArray(
                                                          expenseData
                                                      )
                                                          ? expenseData.map(
                                                                b => ({
                                                                    label: b.ac_name,
                                                                    value: b._id,
                                                                })
                                                            )
                                                          : [],
                                                  }),
                                              }),
                                              _jsx(Form.Item, {
                                                  label: 'Purchasing VAT(%)',
                                                  name: 'purchasing_vat',
                                                  className: 'flex-1 mb-0',
                                                  children: _jsx(Input, {
                                                      type: 'number',
                                                      placeholder:
                                                          'Please Purchasing VAT (%)',
                                                      min: 0,
                                                      max: 100,
                                                  }),
                                              }),
                                          ],
                                      })
                                    : null,
                        }),
                    _jsx(Form.Item, {
                        label: 'Categories',
                        name: 'categories',
                        rules: [
                            {
                                required: true,
                                message: 'Please select at least one category',
                            },
                        ],
                        children: _jsx(EditCategoryTreeSelect, {
                            categories: allCategories,
                            value: categoryValue,
                            onChange: val => {
                                setCategoryValue(val);
                                form.setFieldsValue({ categories: val });
                            },
                        }),
                    }),
                    _jsx(Form.Item, {
                        label: 'Short Description',
                        name: 'item_description',
                        children: _jsx(TextArea, {
                            className: 'dark:text-white',
                            rows: 2,
                        }),
                    }),
                    _jsx(Form.Item, {
                        label: 'Long Description',
                        name: 'item_long_description',
                        children: _jsx(JoditEditor, {
                            value:
                                form.getFieldValue('item_long_description') ||
                                '',
                            onChange: val =>
                                form.setFieldsValue({
                                    item_long_description: val,
                                }),
                            config: {
                                readonly: false,
                                height: 300,
                                theme: isDarkMode ? 'dark' : 'default',
                            },
                        }),
                    }),
                    itemType === 'product' &&
                        _jsx(Form.Item, {
                            label: 'Attribute',
                            name: 'attribute_sets',
                            className: 'flex-1 mb-0',
                            children: _jsx(Select, {
                                allowClear: true,
                                placeholder: 'Select Attribute',
                                options: Array.isArray(attributes)
                                    ? attributes.map(m => ({
                                          label: m.attribute_set,
                                          discount: m.discount,
                                          value: m._id,
                                      }))
                                    : [],
                            }),
                        }),
                    itemType === 'product' &&
                        _jsx(Form.Item, {
                            name: 'is_track_inventory',
                            valuePropName: 'checked',
                            className: 'mb-0',
                            children: _jsx(Checkbox, {
                                children: _jsx(Text, {
                                    strong: true,
                                    className: 'dark:text-white',
                                    children: 'Track Inventory',
                                }),
                            }),
                        }),
                    _jsx(Form.Item, {
                        shouldUpdate: (prevValues, currentValues) =>
                            prevValues.is_track_inventory !==
                            currentValues.is_track_inventory,
                        children: ({ getFieldValue }) =>
                            getFieldValue('is_track_inventory')
                                ? _jsxs('div', {
                                      className: 'flex items-center gap-3 my-4',
                                      children: [
                                          _jsx(Form.Item, {
                                              label: 'Stock Quantity',
                                              name: 'stock_quantites',
                                              className: 'flex-1 mb-0',
                                              children: _jsx(Input, {
                                                  placeholder:
                                                      'Enter Stock Quantity',
                                              }),
                                          }),
                                          _jsx(Form.Item, {
                                              label: 'Low stock Quantity',
                                              name: 'low_stock',
                                              className: 'flex-1 mb-0',
                                              children: _jsx(Input, {
                                                  placeholder:
                                                      'Enter Low stock point',
                                              }),
                                          }),
                                          _jsx(Form.Item, {
                                              name: 'is_serialized',
                                              valuePropName: 'checked',
                                              className: 'flex-1 mb-0',
                                              children: _jsx(Checkbox, {
                                                  children: 'Serialized Item',
                                              }),
                                          }),
                                          _jsx(Form.Item, {
                                              name: 'is_manage_batch',
                                              valuePropName: 'checked',
                                              className: 'flex-1 mb-0',
                                              children: _jsx(Checkbox, {
                                                  children: 'Manage Batch',
                                              }),
                                          }),
                                      ],
                                  })
                                : null,
                    }),
                    _jsx(Form.Item, {
                        name: 'is_returnable',
                        valuePropName: 'checked',
                        className: 'flex-1 mb-0',
                        children: _jsx(Checkbox, {
                            children: 'Returnable Item',
                        }),
                    }),
                    _jsx(Form.Item, {
                        name: 'availeablein_pos',
                        valuePropName: 'checked',
                        className: 'flex-1 mb-0',
                        children: _jsx(Checkbox, {
                            children: 'Available in POS',
                        }),
                    }),
                    _jsx(Form.Item, {
                        name: 'availeablein_ecommerce',
                        valuePropName: 'checked',
                        className: 'flex-1 mb-0',
                        children: _jsx(Checkbox, {
                            children: 'Available in E-commerce',
                        }),
                    }),
                    _jsx(Form.Item, {
                        children: _jsx(Button, {
                            type: 'primary',
                            htmlType: 'submit',
                            children: itemId ? 'Update Item' : 'Save Item',
                        }),
                    }),
                ],
            }),
        }),
    });
};
export default EditSingleItem;
