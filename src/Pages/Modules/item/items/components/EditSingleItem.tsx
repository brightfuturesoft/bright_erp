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
import ItemBasicInfoSection from './ItemBasicInfoSection';
import SkuUnitSection from './SkuUnitSection';
import ItemExtraInfoSection from './ItemExtraInfoSection';
import VariantsSection from './VariantsSection';
import ManufacturerBrandSelect from './ManufacturerBrandSelect';
import PurchasableFields from './PurchasableFields';
import SaleableFields from './SaleableFields';
import ItemDescriptionSection from './ItemDescriptionSection';
import AttributeSelect from './AttributeSelect';
import CategorySelectSection from './CategorySelectSection';
import TrackInventoryFields from './TrackInventoryFields';
import ItemFooterActions from './ItemFooterActions';

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
        const url = await uploadImage(file);
        return url;
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
    const [is_purchasable, set_is_purchasable] = useState(false);
    const [is_saleable, set_is_saleable] = useState(false);
    useEffect(() => {
        if (itemsData) {
            set_is_saleable(itemsData.is_saleable ?? true);
            form.setFieldsValue({
                item_weight: itemsData.item_weight || '',
                selling_vat: itemsData.selling_vat ?? 0,
                selling_discount: itemsData.selling_discount ?? 0,
            });
        }
    }, [itemsData, form]);

    useEffect(() => {
        if (itemsData) {
            set_is_purchasable(itemsData.is_purchasable ?? false);
            form.setFieldsValue({
                purchasing_price: itemsData.purchasing_price || 0,
                purchasing_account: itemsData.purchasing_account
                    ? {
                          label:
                              expenseData?.find(
                                  (acc: any) =>
                                      acc._id === itemsData.purchasing_account
                              )?.ac_name || '',
                          value: itemsData.purchasing_account,
                      }
                    : undefined,
                purchasing_vat: itemsData.purchasing_vat || 0,
            });
        }
    }, [itemsData, form, expenseData]);

    const [is_track_inventory, set_is_track_inventory] = useState(false);
    const [is_serialized, set_is_serialized] = useState(false);
    const [is_manage_batch, set_is_manage_batch] = useState(false);

    useEffect(() => {
        if (itemsData) {
            set_is_track_inventory(itemsData.is_track_inventory ?? false);
            set_is_serialized(itemsData.is_serialized ?? false);
            set_is_manage_batch(itemsData.is_manage_batch ?? false);

            form.setFieldsValue({
                is_track_inventory: itemsData.is_track_inventory ?? false,
                is_serialized: itemsData.is_serialized ?? false,
                is_manage_batch: itemsData.is_manage_batch ?? false,
                stock_quantites: itemsData.stock_quantites ?? '',
                low_stock: itemsData.low_stock ?? '',
            });
        }
    }, [itemsData, form]);

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
                    <ItemBasicInfoSection
                        form={form}
                        itemType={itemType}
                        setItemType={setItemType}
                        handleNameChange={handleNameChange}
                    />

                    <SkuUnitSection
                        form={form}
                        itemType={itemType}
                        sku={sku}
                        setSku={setSku}
                    />
                    <ItemExtraInfoSection
                        form={form}
                        itemType={itemType}
                    />

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

                    <CategorySelectSection
                        form={form}
                        allCategories={allCategories}
                        categoryValue={categoryValue}
                        setCategoryValue={setCategoryValue}
                    />
                    <AttributeSelect
                        attributes={attributes}
                        form={form}
                        existingAttributes={itemsData?.attribute_sets || []}
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
                        colors={colors || []}
                        sizes={sizes || []}
                        form={form}
                        handleVariantCoverUpload={handleVariantCoverUpload}
                    />
                </div>
            </Form>
        </Spin>
    );
};

export default EditSingleItem;
