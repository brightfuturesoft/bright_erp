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
import CategoryTreeSelect from './CategoryTreeSelect';
import uploadImage from '@/helpers/hooks/uploadImage';
import { useNavigate } from 'react-router-dom';
import { UnitDropdown } from './UnitDropdown';
import { arrayMoveImmutable } from '@/utils/arrayMove';
const { Dragger } = Upload;
const { Text } = Typography;
const { TextArea } = Input;
const AddSingleItem = () => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [is_saleable, set_is_saleable] = useState(true);
    const [is_track_inventory, set_is_track_inventory] = useState(false);
    const [is_serialized, set_is_serialized] = useState(false);
    const [is_manage_batch, set_is_manage_batch] = useState(false);
    const [is_purchasable, set_is_purchasable] = useState(false);
    const [is_returnable, set_is_returnable] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [variants, setVariants] = useState([
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
        expenseData,
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
    const removeVariant = index => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };
    const updateVariant = (index, field, value) => {
        setVariants(prev =>
            prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
        );
    };
    const handleVariantCoverUpload = async (file, index) => {
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
    const [categoryValue, setCategoryValue] = useState([]);
    const allCategories = Array.isArray(categories)
        ? categories.map(cat => ({
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
        } else {
            setSku('');
            form.setFieldsValue({ sku: '' });
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
    };
    useEffect(() => {
        setCategoryValue(form.getFieldValue('categories') || []);
    }, [form]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    return _jsx(Spin, {
        spinning: isLoading,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            className: 'flex py-3',
            style: { gap: 32 },
            onFinish: async values => {
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
                        message.error(data.message || 'Something went wrong');
                    }
                } catch (err) {
                    console.error(err);
                    message.error('Network error');
                }
            },
            initialValues: {
                selling_price: 0,
                item_type: 'product',
                is_returnable: false,
                is_track_inventory: false,
                is_serialized: false,
                is_manage_batch: false,
                is_purchasable: false,
                is_saleable: true,
            },
            children: [
                _jsxs('div', {
                    className: 'space-y-4 w-3/5',
                    children: [
                        _jsx(Form.Item, {
                            label: 'Item Type',
                            name: 'item_type',
                            className: 'mb-2',
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
                            className: 'mb-2',
                            children: _jsx(Input, {
                                onChange: handleNameChange,
                                placeholder: 'Enter item name',
                                className:
                                    'focus:border-[1px] p-2 border focus:border-blue-600 rounded w-full h-[42px] dark:text-white',
                            }),
                        }),
                        _jsxs('div', {
                            className: 'flex items-center gap-3',
                            children: [
                                _jsx(Form.Item, {
                                    label: 'SKU',
                                    name: 'sku',
                                    className: 'flex-1 mb-0 dark:text-white',
                                    children: _jsx(Input, {
                                        value: sku,
                                        placeholder: 'Enter SKU',
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
                                                message:
                                                    'Please select a unit!',
                                            },
                                        ],
                                        children: _jsx(UnitDropdown, {}),
                                    }),
                            ],
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
                                                const mainSKU =
                                                    form.getFieldValue('sku') ||
                                                    '';
                                                const autoSKU = `${mainSKU
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(
                                                        /\s+/g,
                                                        '-'
                                                    )}-${index + 1}`;
                                                return _jsxs(
                                                    'div',
                                                    {
                                                        className:
                                                            'p-4 border border-gray-500 rounded shadow-sm grid grid-cols-1 gap-4 ',
                                                        children: [
                                                            _jsxs(Form.Item, {
                                                                label: 'Cover Photo',
                                                                className:
                                                                    'mb-0',
                                                                children: [
                                                                    _jsxs(
                                                                        Upload.Dragger,
                                                                        {
                                                                            multiple: true,
                                                                            fileList:
                                                                                [],
                                                                            showUploadList: false,
                                                                            customRequest:
                                                                                async ({
                                                                                    file,
                                                                                    onSuccess,
                                                                                }) => {
                                                                                    try {
                                                                                        const uploadedFile =
                                                                                            await handleVariantCoverUpload(
                                                                                                file,
                                                                                                index
                                                                                            );
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
                                                                                },
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
                                                                    _jsx(
                                                                        'div',
                                                                        {
                                                                            className:
                                                                                'flex flex-wrap mt-2 gap-2',
                                                                            children:
                                                                                (
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
                                                                                                    'relative group w-40 h-40 cursor-move', // cursor-move for draggable hint
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
                                                                                                                    'w-full h-full object-cover rounded border',
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
                                                                        }
                                                                    ),
                                                                    _jsx(
                                                                        Modal,
                                                                        {
                                                                            visible:
                                                                                previewVisible,
                                                                            footer: null,
                                                                            onCancel:
                                                                                () =>
                                                                                    setPreviewVisible(
                                                                                        false
                                                                                    ),
                                                                            children:
                                                                                _jsx(
                                                                                    'img',
                                                                                    {
                                                                                        src: previewImage,
                                                                                        className:
                                                                                            'w-full',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
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
                                                                                        value: autoSKU,
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
                            _jsx(Form.Item, {
                                label: 'Handaling Price',
                                name: 'handaling_price',
                                className: 'flex-1 mb-0',
                                children: _jsx(Input, {
                                    type: 'number',
                                    placeholder: 'Please Handaling Price',
                                    min: 0,
                                }),
                            }),
                        itemType === 'product' &&
                            _jsxs('div', {
                                className: 'flex gap-3',
                                children: [
                                    _jsx(Form.Item, {
                                        label: 'Manufacturer',
                                        name: 'manufacturer',
                                        className: 'flex-1 mb-0',
                                        children: _jsx(Select, {
                                            allowClear: true,
                                            placeholder: 'Select Manufacturer',
                                            labelInValue: true,
                                            options: Array.isArray(
                                                manufacturers
                                            )
                                                ? manufacturers.map(m => ({
                                                      label: m.manufacturer,
                                                      value: m.discount,
                                                      key: m._id,
                                                  }))
                                                : [],
                                        }),
                                    }),
                                    _jsx(Form.Item, {
                                        label: 'Brand',
                                        name: 'brand',
                                        className: 'flex-1 mb-0',
                                        children: _jsx(Select, {
                                            allowClear: true,
                                            placeholder: 'Select Brand',
                                            labelInValue: true,
                                            options: Array.isArray(brandData)
                                                ? brandData.map(b => ({
                                                      label: b.brand,
                                                      value: b._id,
                                                  }))
                                                : [],
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
                                    onChange: () =>
                                        set_is_purchasable(!is_purchasable),
                                    children: _jsx(Text, {
                                        strong: true,
                                        className:
                                            'text-xl dark:text-white text-black',
                                        children: 'Purchasable',
                                    }),
                                }),
                            }),
                        is_purchasable &&
                            _jsxs('div', {
                                className: 'flex items-center gap-3 my-4',
                                children: [
                                    itemType === 'product' &&
                                        _jsx(Form.Item, {
                                            label: 'Purchasing Price',
                                            name: 'purchasing_price',
                                            className: 'flex-1 mb-0',
                                            children: _jsx(Input, {
                                                type: 'number',
                                                placeholder:
                                                    'Please Purchasing Price',
                                                min: 0,
                                            }),
                                        }),
                                    itemType === 'product' &&
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
                                                    ? expenseData.map(b => ({
                                                          label: b.ac_name,
                                                          value: b._id,
                                                      }))
                                                    : [],
                                            }),
                                        }),
                                    itemType === 'product' &&
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
                            }),
                        _jsx(Form.Item, {
                            className: 'mb-0',
                            children: _jsx(Checkbox, {
                                checked: is_saleable,
                                onChange: e =>
                                    set_is_saleable(e.target.checked),
                                children: _jsx(Text, {
                                    strong: true,
                                    className:
                                        'text-xl dark:text-white text-black',
                                    children: 'Saleable',
                                }),
                            }),
                        }),
                        is_saleable &&
                            _jsxs('div', {
                                className: 'flex items-center gap-3 my-4',
                                children: [
                                    itemType === 'product' &&
                                        _jsx(Form.Item, {
                                            label: 'Item Weight',
                                            name: 'item_weight',
                                            className: 'flex-1 mb-0',
                                            children: _jsx(Input, {
                                                placeholder:
                                                    'Enter Item Weight',
                                            }),
                                        }),
                                    _jsx(Form.Item, {
                                        label: 'Selling VAT(%)',
                                        name: 'selling_vat',
                                        className: 'flex-1 mb-0',
                                        children: _jsx(Input, {
                                            type: 'number',
                                            placeholder:
                                                'Please Selling VAT(%)',
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
                        _jsx(Form.Item, {
                            label: 'Short Description',
                            name: 'item_description',
                            children: _jsx(TextArea, {
                                className: 'text-black dark:text-white',
                                placeholder:
                                    'Write a short description about this item...',
                                rows: 2,
                            }),
                        }),
                        _jsx(Form.Item, {
                            label: 'Long Description',
                            name: 'item_long_description',
                            children: _jsx(JoditEditor, {
                                config: {
                                    readonly: false,
                                    height: 300,
                                    theme: isDarkMode ? 'dark' : 'default',
                                },
                                className: 'jodit-editor',
                                value:
                                    form.getFieldValue(
                                        'item_long_description'
                                    ) || '',
                                onChange: val =>
                                    form.setFieldsValue({
                                        item_long_description: val,
                                    }),
                            }),
                        }),
                        _jsx(Form.Item, {
                            label: 'Attribute',
                            name: 'attribute_sets',
                            className: 'flex-1 mb-0',
                            children: _jsx(Select, {
                                mode: 'multiple',
                                allowClear: true,
                                placeholder: 'Select Attribute',
                                labelInValue: false,
                                options: Array.isArray(attributes)
                                    ? attributes.map(m => ({
                                          label: m.attribute_set,
                                          value: m.attribute_set,
                                          key: m._id,
                                      }))
                                    : [],
                                className: 'dark:text-white',
                                dropdownClassName:
                                    'dark:bg-gray-800 dark:text-white',
                                tagRender: props => {
                                    const { label, value, closable, onClose } =
                                        props;
                                    return _jsxs('span', {
                                        className:
                                            'inline-flex items-center px-2 py-1 bg-gray-700 text-white rounded mr-1 mb-1',
                                        children: [
                                            label,
                                            closable &&
                                                _jsx('span', {
                                                    onClick: onClose,
                                                    className:
                                                        'ml-1 cursor-pointer text-white',
                                                    children: '\u00D7',
                                                }),
                                        ],
                                    });
                                },
                            }),
                        }),
                        _jsx(Form.Item, {
                            label: 'Categories',
                            name: 'categories',
                            rules: [
                                {
                                    required: true,
                                    message:
                                        'Please select at least one category',
                                },
                            ],
                            className: 'mb-2',
                            children: _jsx(CategoryTreeSelect, {
                                categories: allCategories,
                                value: categoryValue,
                                onChange: val => setCategoryValue(val),
                            }),
                        }),
                        itemType === 'product' &&
                            _jsx(Form.Item, {
                                name: 'is_track_inventory',
                                valuePropName: 'checked',
                                className: 'mb-0',
                                children: _jsx(Checkbox, {
                                    onChange: () =>
                                        set_is_track_inventory(
                                            !is_track_inventory
                                        ),
                                    children: _jsx(Text, {
                                        strong: true,
                                        className:
                                            'text-xl dark:text-white text-black',
                                        children: 'Track Inventory',
                                    }),
                                }),
                            }),
                        is_track_inventory &&
                            _jsxs('div', {
                                className: 'flex items-center gap-3 my-4',
                                children: [
                                    _jsx(Form.Item, {
                                        label: 'Stock Quantity',
                                        name: 'stock_quantites',
                                        className: 'flex-1 mb-0',
                                        children: _jsx(Input, {
                                            placeholder: 'Enter Stock Quantity',
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
                        itemType === 'product' &&
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
                                children: 'Save Item',
                            }),
                        }),
                    ],
                }),
                _jsx('div', {
                    className: 'mx-auto w-2/5',
                    children: _jsx('div', {
                        className: 'p-12',
                        children: _jsxs(Dragger, {
                            ...uploadProps,
                            children: [
                                _jsx('p', {
                                    className: 'ant-upload-drag-icon',
                                    children: _jsx(InboxOutlined, {}),
                                }),
                                _jsx('p', {
                                    className: 'dark:text-white text-black',
                                    children:
                                        'Click or drag file to this area to upload',
                                }),
                                _jsx('p', {
                                    className: 'dark:text-gray-400 text-black',
                                    children:
                                        'Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.',
                                }),
                            ],
                        }),
                    }),
                }),
            ],
        }),
    });
};
export default AddSingleItem;
