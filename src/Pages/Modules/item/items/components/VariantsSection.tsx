import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Upload, Modal, message } from 'antd';
import { InboxOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from '@/utils/arrayMove';

interface Variant {
    color?: string;
    size?: string;
    sku?: string;
    quantity?: number;
    normal_price?: number;
    offer_price?: number;
    product_cost?: number;
    cover_photo?: string[];
}

interface VariantsSectionProps {
    itemType: 'product' | 'service';
    variants: Variant[];
    setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
    colors: any[];
    sizes: any[];
    form?: any;
    handleVariantCoverUpload: (
        file: File,
        index: number
    ) => Promise<string | null>;
}

const VariantsSection: React.FC<VariantsSectionProps> = ({
    itemType,
    variants,
    setVariants,
    colors,
    sizes,
    form,
    handleVariantCoverUpload,
}) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        const formVariants = form.getFieldValue('variants');
        if (Array.isArray(formVariants) && formVariants.length > 0) {
            setVariants(formVariants);
        }
    }, [form, setVariants]);

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
                cover_photo: [],
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

    if (itemType !== 'product') return null;

    return (
        <div className="space-y-4 mt-6">
            <div className="space-y-4">
                {variants.map((variant, index) => {
                    const mainSKU = form.getFieldValue('sku') || '';
                    const autoSKU = `${mainSKU.trim().toLowerCase().replace(/\s+/g, '-')}-${index + 1}`;

                    return (
                        <div
                            key={index}
                            className="p-4 border border-gray-500 rounded shadow-sm grid grid-cols-1 gap-4"
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
                                                prev.map((v, i) =>
                                                    i === index
                                                        ? {
                                                              ...v,
                                                              cover_photo:
                                                                  v.cover_photo?.includes(
                                                                      uploadedFile!
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
                                <div className="flex flex-wrap mt-2 gap-2">
                                    {(variant.cover_photo || []).map(
                                        (url, imgIndex) => (
                                            <div
                                                key={imgIndex}
                                                className="relative group w-40 h-40 cursor-move"
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
                                                    const oldIndex = Number(
                                                        e.dataTransfer.getData(
                                                            'text/plain'
                                                        )
                                                    );
                                                    const newIndex = imgIndex;
                                                    if (oldIndex === newIndex)
                                                        return;
                                                    setVariants(prev =>
                                                        prev.map((v, i) =>
                                                            i === index
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
                                                    className="w-full h-full object-cover rounded border"
                                                />
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    icon={<EyeOutlined />}
                                                    size="small"
                                                    className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition"
                                                    onClick={() => {
                                                        setPreviewImage(url);
                                                        setPreviewVisible(true);
                                                    }}
                                                />
                                                <Button
                                                    type="primary"
                                                    danger
                                                    shape="circle"
                                                    icon={<DeleteOutlined />}
                                                    size="small"
                                                    className="absolute top-1 right-1"
                                                    onClick={() => {
                                                        setVariants(prev =>
                                                            prev.map((v, i) =>
                                                                i === index
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
                                        )
                                    )}
                                </div>
                                <Modal
                                    visible={previewVisible}
                                    footer={null}
                                    onCancel={() => setPreviewVisible(false)}
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
                                            updateVariant(index, 'color', val)
                                        }
                                        options={colors?.map((c: any) => ({
                                            label: c.color_name,
                                            value: c.code,
                                            key: c._id,
                                        }))}
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
                                            updateVariant(index, 'size', val)
                                        }
                                        options={sizes?.map((s: any) => ({
                                            label: s.addedType,
                                            value: s.addedType,
                                            key: s._id,
                                        }))}
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
                                                Number(e.target.value)
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
                                        value={variant.normal_price}
                                        onChange={e =>
                                            updateVariant(
                                                index,
                                                'normal_price',
                                                Number(e.target.value)
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
                                        value={variant.offer_price}
                                        onChange={e =>
                                            updateVariant(
                                                index,
                                                'offer_price',
                                                Number(e.target.value)
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
                                        value={variant.product_cost}
                                        onChange={e =>
                                            updateVariant(
                                                index,
                                                'product_cost',
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    type="dashed"
                                    danger
                                    onClick={() => removeVariant(index)}
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
    );
};

export default VariantsSection;
