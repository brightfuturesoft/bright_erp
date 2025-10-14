import { Form, Input, Radio, Button, Checkbox, message, Spin } from 'antd';
import type { UploadProps } from 'antd';
import JoditEditor from 'jodit-react';
import { useContext, useEffect, useState } from 'react';
import { useItemsData } from './data_get_api';
import { Erp_context } from '@/provider/ErpContext';
import { createItemPayload } from './ItemPayload';
import CategoryTreeSelect from './CategoryTreeSelect';
import uploadImage from '@/helpers/hooks/uploadImage';
import { useNavigate } from 'react-router-dom';
import PurchasableFields from './PurchasableFields';
import SaleableFields from './SaleableFields';
import AttributeSelect from './AttributeSelect';
import TrackInventoryFields from './TrackInventoryFields';
import FileUploader from './FileUploader';
import ManufacturerBrandSelect from './ManufacturerBrandSelect';
import VariantsSection from './VariantsSection';
import SkuUnitSection from './SkuUnitSection';
import ItemDescriptionSection from './ItemDescriptionSection';
import CategorySelectSection from './CategorySelectSection';
import ItemFooterActions from './ItemFooterActions';
import ItemBasicInfoSection from './ItemBasicInfoSection';
import ItemExtraInfoSection from './ItemExtraInfoSection';
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
        expenseData,
        colors,
        isLoading,
        attributes,
        isError,
    } = useItemsData();

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

    const [itemType, setItemType] = useState<'product' | 'service'>('product');
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
                    <ItemBasicInfoSection
                        itemType={itemType}
                        setItemType={setItemType}
                        handleNameChange={handleNameChange}
                    />
                    <SkuUnitSection
                        sku={sku}
                        setSku={setSku}
                        itemType={itemType}
                    />
                    <ItemExtraInfoSection itemType={itemType} />
                    <ManufacturerBrandSelect
                        itemType={itemType}
                        manufacturers={manufacturers}
                        brandData={brandData}
                    />
                    <PurchasableFields
                        itemType={itemType}
                        is_purchasable={is_purchasable}
                        set_is_purchasable={set_is_purchasable}
                        expenseData={expenseData}
                    />
                    <SaleableFields
                        itemType={itemType}
                        is_saleable={is_saleable}
                        set_is_saleable={set_is_saleable}
                    />
                    <ItemDescriptionSection
                        form={form}
                        isDarkMode={isDarkMode}
                    />
                    <AttributeSelect attributes={attributes} />
                    <CategorySelectSection
                        form={form}
                        allCategories={allCategories}
                        categoryValue={categoryValue}
                        setCategoryValue={setCategoryValue}
                    />
                    <TrackInventoryFields
                        itemType={itemType}
                        is_track_inventory={is_track_inventory}
                        set_is_track_inventory={set_is_track_inventory}
                        is_serialized={is_serialized}
                        set_is_serialized={set_is_serialized}
                        is_manage_batch={is_manage_batch}
                        set_is_manage_batch={set_is_manage_batch}
                    />
                    <ItemFooterActions itemType={itemType} />
                </div>
                <div className="mt-20">
                    <VariantsSection
                        itemType={itemType}
                        variants={variants}
                        setVariants={setVariants}
                        colors={colors}
                        sizes={sizes}
                        form={form}
                        handleVariantCoverUpload={handleVariantCoverUpload}
                    />
                </div>

                {/* <FileUploader uploadProps={uploadProps} /> */}
            </Form>
        </Spin>
    );
};
export default AddSingleItem;
