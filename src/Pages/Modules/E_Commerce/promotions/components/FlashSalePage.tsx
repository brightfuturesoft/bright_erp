'use client';

import React, { useState, useEffect, useContext } from 'react';
import {
    Form,
    Input,
    Upload,
    Modal,
    Button,
    Switch,
    DatePicker,
    Table,
    InputNumber,
    message,
    Select,
} from 'antd';
import {
    UploadOutlined,
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { useItemsData } from '@/Pages/Modules/item/items/components/data_get_api';
import { Erp_context } from '@/provider/ErpContext';
import uploadImage from '@/helpers/hooks/uploadImage';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

interface ProductVariant {
    sku: string;
    quantity: number;
    normal_price: number;
    offer_price: number;
    product_cost: number;
    cover_photo: string[];
    color?: string;
    size?: string;
}

interface ProductType {
    id: string;
    name: string;
    main_price: number;
    campaign_price?: number;
    sku: string;
    cover_photo: string[];
    variants?: ProductVariant[];
    stock?: number;
    description?: string;
}

interface FlashSalePageProps {
    editingPromotion?: any;
}

const FlashSalePage: React.FC<FlashSalePageProps> = () => {
    const location = useLocation();
    const editingPromotion = location.state?.editingPromotion;
    const { itemsData } = useItemsData();
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const [isFlashSale, setIsFlashSale] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [productList, setProductList] = useState<ProductType[]>([]);
    const [availableProducts, setAvailableProducts] = useState<ProductType[]>(
        []
    );
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [bannerFile, setBannerFile] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (itemsData && Array.isArray(itemsData)) {
            const filtered = itemsData
                .filter(
                    (item: any) =>
                        item.item_type === 'product' &&
                        item.availeablein_ecommerce
                )
                .map((item: any) => ({
                    id: item._id,
                    name: item.item_name,
                    main_price: item.variants?.[0]?.normal_price || 0,
                    sku: item.sku,
                    cover_photo: item.variants?.[0]?.cover_photo || [],
                    variants: item.variants,
                }));
            setAvailableProducts(filtered);
        }
    }, [itemsData]);

    // Edit mode prefill
    useEffect(() => {
        if (editingPromotion) {
            form.setFieldsValue({
                name: editingPromotion.name,
                description: editingPromotion.description,
                status: editingPromotion.status || 'Active',
                flash_date: editingPromotion.flash_date
                    ? [
                          moment(editingPromotion.flash_date[0]),
                          moment(editingPromotion.flash_date[1]),
                      ]
                    : undefined,
            });
            setIsFlashSale(editingPromotion.flash_sale);
            setProductList(editingPromotion.products || []);
            if (editingPromotion.banner) {
                setBannerFile([{ url: editingPromotion.banner }]);
            }
        }
    }, [editingPromotion, form]);

    const handleAddProducts = () => {
        if (!selectedProducts.length) {
            message.error('Please select at least one product!');
            return;
        }
        const newProducts = availableProducts
            .filter(p => selectedProducts.includes(p.id))
            .filter(p => !productList.some(pl => pl.id === p.id))
            .map(p => ({ ...p, campaign_price: p.main_price }));

        setProductList(prev => [...prev, ...newProducts]);
        setIsProductModalOpen(false);
        setSelectedProducts([]);
    };

    const handleRemoveProduct = (id: string) => {
        setProductList(prev => prev.filter(p => p.id !== id));
    };

    const handlePreview = async (file: any) => {
        let src: string | undefined;
        if (file.url) src = file.url;
        else if (file.thumbUrl) src = file.thumbUrl;
        else if (file.originFileObj) {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            await new Promise(resolve => (reader.onload = resolve));
            src = reader.result as string;
        }
        if (!src) return;
        const img = new Image();
        img.src = src;
        const win = window.open('');
        win?.document.write(img.outerHTML);
    };

    const handleSubmit = async (values: any) => {
        if (!productList.length) {
            message.error('Please add at least one product!');
            return;
        }
        let imageUrl = '';
        const imageList = values.banner as any[];
        const fileObj = imageList?.[0]?.originFileObj as File | undefined;
        const fileUrl = imageList?.[0]?.url as string | undefined;

        if (fileObj) {
            imageUrl = await uploadImage(fileObj);
        } else if (fileUrl) {
            imageUrl = fileUrl;
        } else if (editingPromotion?.banner) {
            imageUrl = editingPromotion.banner;
        }

        const productsForAPI = productList.map(p => ({
            id: p.id,
            name: p.name,
            sku: p.sku,
            main_price: p.main_price,
            campaign_price: p.campaign_price,
            cover_photo: p.cover_photo,
            variants: p.variants || [],
            stock:
                p.variants?.reduce((sum, v) => sum + (v.quantity || 0), 0) || 0,
        }));

        const promoData: any = {
            name: values.name,
            description: values.description || '',
            status: values.status || 'Active',
            flash_sale: isFlashSale,
            flash_date: values.flash_date || null,
            products: productsForAPI,
            banner: imageUrl,
            workspace_id: user?.workspace_id,
            createdBy: user?.name,
        };

        if (editingPromotion?._id) {
            promoData.id = editingPromotion._id;
        }

        try {
            const url = editingPromotion
                ? `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/update-promotion`
                : `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/create-promotion`;

            const res = await fetch(url, {
                method: editingPromotion ? 'PATCH' : 'POST',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(promoData),
            });

            const data = await res.json();
            if (data.error)
                message.error(data.message || 'Something went wrong!');
            else {
                message.success(
                    editingPromotion
                        ? 'Promotion updated!'
                        : 'Promotion created!'
                );
                form.resetFields();
                setProductList([]);
                setIsFlashSale(false);
                setBannerFile([]);
                navigate(-1);
            }
        } catch (err) {
            console.error(err);
            message.error('Network error!');
        }
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
        },
        {
            title: 'Main Price',
            dataIndex: 'main_price',
            key: 'main_price',
            render: (text: number) => `৳ ${text}`,
        },
        {
            title: 'Campaign Price',
            dataIndex: 'campaign_price',
            key: 'campaign_price',
            render: (_: any, record: ProductType) => (
                <InputNumber
                    min={1}
                    value={record.campaign_price}
                    onChange={val =>
                        setProductList(prev =>
                            prev.map(p =>
                                p.id === record.id
                                    ? { ...p, campaign_price: val || 0 }
                                    : p
                            )
                        )
                    }
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: ProductType) => (
                <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveProduct(record.id)}
                >
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <div className="mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
                {isFlashSale ? 'Flash Sale Setup' : 'Campaign Setup'}
            </h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="name"
                    label="Campaign Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter campaign name!',
                        },
                    ]}
                >
                    <Input placeholder="Enter campaign name" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea placeholder="Enter campaign description (optional)" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        { required: true, message: 'Please select status!' },
                    ]}
                >
                    <Select placeholder="Select status">
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="banner"
                    label="Campaign Banner"
                    valuePropName="fileList"
                    getValueFromEvent={e =>
                        Array.isArray(e) ? e : e?.fileList
                    }
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        maxCount={1}
                        accept="image/*"
                        onPreview={handlePreview}
                        fileList={bannerFile}
                        onChange={({ fileList }) => setBannerFile(fileList)}
                    >
                        {bannerFile.length >= 1 ? null : (
                            <div className="flex flex-col items-center justify-center text-white dark:text-white">
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item label="Flash Sale">
                    <Switch
                        checked={isFlashSale}
                        onChange={setIsFlashSale}
                    />
                </Form.Item>

                {isFlashSale && (
                    <Form.Item
                        name="flash_date"
                        label="Flash Sale Duration"
                        rules={[
                            {
                                required: true,
                                message: 'Select start and end date!',
                            },
                        ]}
                    >
                        <RangePicker
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            className="dark:bg-dark-gray border-none dark:text-white"
                            popupClassName="dark:bg-gray-800 dark:text-white"
                        />
                    </Form.Item>
                )}

                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium dark:text-gray-200">
                        Products
                    </h3>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setIsProductModalOpen(true)}
                    >
                        Add Products
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={productList}
                        rowKey="id"
                        pagination={false}
                        bordered
                        locale={{ emptyText: 'No products added yet' }}
                    />
                </div>

                <div className="text-center mt-6">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="px-8"
                    >
                        {editingPromotion ? 'Update Campaign' : 'Save Campaign'}
                    </Button>
                </div>
            </Form>

            <Modal
                title="Select Products"
                open={isProductModalOpen}
                onCancel={() => setIsProductModalOpen(false)}
                onOk={handleAddProducts}
                okText="Add Selected Products"
                width={800}
                bodyStyle={{
                    maxHeight: '60vh',
                    overflowY: 'auto',
                    padding: '16px',
                }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableProducts.map(prod => {
                        const isSelected = selectedProducts.includes(prod.id);
                        return (
                            <div
                                key={prod.id}
                                onClick={() => {
                                    if (isSelected) {
                                        setSelectedProducts(prev =>
                                            prev.filter(id => id !== prod.id)
                                        );
                                    } else {
                                        setSelectedProducts(prev => [
                                            ...prev,
                                            prod.id,
                                        ]);
                                    }
                                }}
                                className={`relative border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                                    isSelected
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                        : 'border-gray-300 dark:border-gray-700 dark:bg-gray-800'
                                } hover:shadow-lg`}
                            >
                                <img
                                    src={prod.cover_photo[0]}
                                    alt={prod.name}
                                    className="w-full h-32 object-cover rounded mb-2"
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-gray-800 dark:text-gray-200">
                                        {prod.name}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        SKU: {prod.sku}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Stock:{' '}
                                        {prod.variants?.[0]?.quantity || 0}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Price: ৳{prod.main_price}
                                    </span>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 text-blue-600 dark:text-blue-400 font-bold">
                                        ✓
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Modal>
        </div>
    );
};

export default FlashSalePage;
