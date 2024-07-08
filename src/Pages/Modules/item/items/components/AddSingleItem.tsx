import { InboxOutlined } from '@ant-design/icons';
import { Input, Select, Radio, Button, Checkbox, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { message, Upload } from 'antd';
import type { RadioChangeEvent, UploadProps } from 'antd';
import JoditEditor from 'jodit-react';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Dragger } = Upload;
const { Text } = Typography;

const AddSingleItem: React.FC = () => {
    const [itemType, setItemType] = useState('product');
    const [isReturnableItem, setIsReturnableItem] = useState(false);
    const [isTrackInventory, setIsTrackInventory] = useState(false);
    const [isSerializedItem, setIsSerializedItem] = useState(false);
    const [isManageBatch, setIsManageBatch] = useState(false);
    const [isPurchasable, setIsPurchasable] = useState(false);
    const [isSaleable, setIsSaleable] = useState(false);

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(
                    `${info.file.name} file uploaded successfully.`
                );
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleItemTypeChange = (e: RadioChangeEvent) => {
        setItemType(e.target.value);
    };

    const handleManufacturerChange = (value: string) => {
        console.log(value);
    };

    const handleBrandChange = (value: string) => {
        console.log(value);
    };

    const handleSizeChange = (value: string) => {
        console.log(value);
    };

    const handleColorChange = (value: string) => {
        console.log(value);
    };

    const handleReturnableItemChange = (e: CheckboxChangeEvent) => {
        setIsReturnableItem(e.target.checked);
    };

    const handleTrackInventoryChange = (e: CheckboxChangeEvent) => {
        setIsTrackInventory(e.target.checked);
    };

    const handleSerializedItemChange = (e: CheckboxChangeEvent) => {
        setIsSerializedItem(e.target.checked);
    };

    const handleManageBatchChange = (e: CheckboxChangeEvent) => {
        setIsManageBatch(e.target.checked);
    };

    const handlePurchasableChange = (e: CheckboxChangeEvent) => {
        setIsPurchasable(e.target.checked);
    };

    const handleSaleableChange = (e: CheckboxChangeEvent) => {
        setIsSaleable(e.target.checked);
    };

    return (
        <form className="flex py-3">
            <div className="space-y-4 w-3/5">
                <div className="space-y-1">
                    <label
                        htmlFor="item_type"
                        className="mr-4 text-black dark:text-white"
                    >
                        Item Type
                    </label>
                    <Radio.Group
                        name="item_type"
                        onChange={handleItemTypeChange}
                        defaultValue={itemType}
                    >
                        <Radio value="service">Service</Radio>
                        <Radio value="product">Product</Radio>
                    </Radio.Group>
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="item_name"
                        className="text-black dark:text-white"
                    >
                        Item Name
                    </label>
                    <Input
                        name="item_name"
                        placeholder="Enter item name"
                        className="focus:border-[1px] p-2 border focus:border-blue-600 rounded w-full h-[42px] dark:text-white hover"
                    />
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="item_description"
                        className="text-black dark:text-white"
                    >
                        Short Description
                    </label>
                    <TextArea
                        name="item_description"
                        placeholder="Write a short description about this item..."
                        rows={2}
                        className="focus:border-[1px] bg-transparent p-2 border focus:border-blue-600 rounded w-full h-[84px] dark:text-white hover"
                    />
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="item_long_description"
                        className="text-black dark:text-white"
                    >
                        Long Description
                    </label>

                    <JoditEditor
                        className="jodit-editor"
                        value={''}
                        onChange={() => {}}
                    />
                </div>
                <div className="flex gap-3">
                    <div className="flex flex-col flex-1 space-y-1">
                        <label
                            htmlFor="manufacturer"
                            className="text-black dark:text-white"
                        >
                            Manufacturer
                        </label>

                        <Select
                            className="hover:!border-none dark:text-white"
                            onChange={handleManufacturerChange}
                            allowClear
                        >
                            <Select.Option value="manufacturer_1">
                                Manufacturer 1
                            </Select.Option>
                            <Select.Option value="manufacturer_2">
                                Manufacturer 2
                            </Select.Option>
                            <Select.Option value="manufacturer_3">
                                Manufacturer 3
                            </Select.Option>
                            <Select.Option value="manufacturer_4">
                                Manufacturer 4
                            </Select.Option>
                            <Select.Option value="manufacturer_5">
                                Manufacturer 5
                            </Select.Option>
                            <Select.Option value="manufacturer_6">
                                Manufacturer 6
                            </Select.Option>
                        </Select>
                    </div>
                    <div className="flex flex-col flex-1 space-y-1">
                        <label
                            htmlFor="brand"
                            className="text-black dark:text-white"
                        >
                            Brand
                        </label>

                        <Select
                            className="hover:!border-none"
                            onChange={handleBrandChange}
                            allowClear
                        >
                            <Select.Option value="brand_1">
                                Brand 1
                            </Select.Option>
                            <Select.Option value="brand_2">
                                Brand 2
                            </Select.Option>
                            <Select.Option value="brand_3">
                                Brand 3
                            </Select.Option>
                            <Select.Option value="brand_4">
                                Brand 3
                            </Select.Option>
                            <Select.Option value="brand_5">
                                Brand 3
                            </Select.Option>
                            <Select.Option value="brand_6">
                                Brand 3
                            </Select.Option>
                        </Select>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex flex-col flex-1 space-y-1">
                        <label
                            htmlFor="color"
                            className="text-black dark:text-white"
                        >
                            Color
                        </label>

                        <Select
                            className="hover:!border-none"
                            onChange={value => handleColorChange(value)}
                            allowClear
                        >
                            <Select.Option value="color_1">
                                Color 1
                            </Select.Option>
                            <Select.Option value="color_2">
                                Color 2
                            </Select.Option>
                            <Select.Option value="color_3">
                                Color 3
                            </Select.Option>
                            <Select.Option value="color_4">
                                Color 4
                            </Select.Option>
                            <Select.Option value="color_5">
                                Color 5
                            </Select.Option>
                            <Select.Option value="color_6">
                                Color 6
                            </Select.Option>
                        </Select>
                    </div>

                    <div className="flex flex-col flex-1 space-y-1">
                        <label
                            htmlFor="size"
                            className="text-black dark:text-white"
                        >
                            Size
                        </label>

                        <Select
                            className="hover:!border-none"
                            onChange={handleSizeChange}
                            allowClear
                        >
                            <Select.Option value="size_1">Size 1</Select.Option>
                            <Select.Option value="size_2">Size 2</Select.Option>
                            <Select.Option value="size_3">Size 3</Select.Option>
                            <Select.Option value="size_4">Size 4</Select.Option>
                            <Select.Option value="size_5">Size 5</Select.Option>
                            <Select.Option value="size_6">Size 6</Select.Option>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <label className="text-black dark:text-white">
                        Attribute sets
                    </label>
                    <div>
                        <Button>Add Attribute</Button>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <label className="text-black dark:text-white">
                        Categories
                    </label>
                    <div>
                        <Button>Select Categories</Button>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col flex-1">
                        <label className="text-black dark:text-white">
                            SKU
                        </label>
                        <Input placeholder="Enter SKU" />
                    </div>

                    <div className="flex flex-col flex-1">
                        <label className="text-black dark:text-white">
                            Unit
                        </label>
                        <Input placeholder="Enter Unit" />
                    </div>

                    <div className="flex flex-1">
                        <Checkbox
                            checked={isReturnableItem}
                            onChange={handleReturnableItemChange}
                        >
                            Returnable Item
                        </Checkbox>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Checkbox
                            checked={isTrackInventory}
                            onChange={handleTrackInventoryChange}
                        >
                            <Text
                                strong
                                className="text-xl"
                            >
                                Track Inventory
                            </Text>
                        </Checkbox>
                    </div>
                </div>
                {isTrackInventory && (
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex flex-col flex-1">
                            <label className="text-black dark:text-white">
                                Inventory Account
                            </label>
                            <Select placeholder="Select Inventory Account">
                                <Select.Option value="account_1">
                                    Account 1
                                </Select.Option>
                                <Select.Option value="account_2">
                                    Account 2
                                </Select.Option>
                                <Select.Option value="account_3">
                                    Account 3
                                </Select.Option>
                                <Select.Option value="account_4">
                                    Account 4
                                </Select.Option>
                                <Select.Option value="account_5">
                                    Account 5
                                </Select.Option>
                                <Select.Option value="account_6">
                                    Account 6
                                </Select.Option>
                            </Select>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="text-black dark:text-white">
                                Low stock point
                            </label>
                            <Input placeholder="Enter Low stock point" />
                        </div>

                        <div className="flex flex-1">
                            <Checkbox
                                checked={isSerializedItem}
                                onChange={handleSerializedItemChange}
                            >
                                Serialized Item
                            </Checkbox>
                        </div>

                        <div className="flex flex-1">
                            <Checkbox
                                checked={isManageBatch}
                                onChange={handleManageBatchChange}
                            >
                                Manage Batch
                            </Checkbox>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Checkbox
                            checked={isPurchasable}
                            onChange={handlePurchasableChange}
                        >
                            <Text
                                strong
                                className="text-xl"
                            >
                                Purchasable
                            </Text>
                        </Checkbox>
                    </div>
                </div>

                <div>
                    {isPurchasable && (
                        <div className="flex items-center gap-3 my-4">
                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Purchasing Price
                                </label>
                                <Input placeholder="Enter Purchasing Price" />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Purchasing Account
                                </label>
                                <Select placeholder="Select Purchasing Account">
                                    <Select.Option value="account_1">
                                        Account 1
                                    </Select.Option>
                                    <Select.Option value="account_2">
                                        Account 2
                                    </Select.Option>
                                    <Select.Option value="account_3">
                                        Account 3
                                    </Select.Option>
                                    <Select.Option value="account_4">
                                        Account 4
                                    </Select.Option>
                                    <Select.Option value="account_5">
                                        Account 5
                                    </Select.Option>
                                    <Select.Option value="account_6">
                                        Account 6
                                    </Select.Option>
                                </Select>
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Purchasing VAT
                                </label>
                                <Select placeholder="Select Purchasing VAT">
                                    <Select.Option value="vat_1">
                                        VAT 1
                                    </Select.Option>
                                    <Select.Option value="vat_2">
                                        VAT 2
                                    </Select.Option>
                                    <Select.Option value="vat_3">
                                        VAT 3
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <Checkbox
                            checked={isSaleable}
                            onChange={handleSaleableChange}
                        >
                            <Text
                                strong
                                className="text-xl"
                            >
                                Saleable
                            </Text>
                        </Checkbox>
                    </div>
                </div>

                <div>
                    {isSaleable && (
                        <div className="flex items-center gap-3 my-4">
                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Selling Price
                                </label>
                                <Input placeholder="Enter Selling Price" />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Item Weight
                                </label>
                                <Input placeholder="Enter Item Weight" />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Sales Account
                                </label>
                                <Select placeholder="Select Sales Account">
                                    <Select.Option value="account_1">
                                        Account 1
                                    </Select.Option>
                                    <Select.Option value="account_2">
                                        Account 2
                                    </Select.Option>
                                    <Select.Option value="account_3">
                                        Account 3
                                    </Select.Option>
                                    <Select.Option value="account_4">
                                        Account 4
                                    </Select.Option>
                                    <Select.Option value="account_5">
                                        Account 5
                                    </Select.Option>
                                    <Select.Option value="account_6">
                                        Account 6
                                    </Select.Option>
                                </Select>
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Selling VAT
                                </label>
                                <Select placeholder="Select Selling VAT">
                                    <Select.Option value="account_1">
                                        Account 1
                                    </Select.Option>
                                    <Select.Option value="account_2">
                                        Account 2
                                    </Select.Option>
                                    <Select.Option value="account_3">
                                        Account 3
                                    </Select.Option>
                                    <Select.Option value="account_4">
                                        Account 4
                                    </Select.Option>
                                    <Select.Option value="account_5">
                                        Account 5
                                    </Select.Option>
                                    <Select.Option value="account_6">
                                        Account 6
                                    </Select.Option>
                                </Select>
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="text-black dark:text-white">
                                    Selling Discount
                                </label>
                                <Select placeholder="Select Selling VAT">
                                    <Select.Option value="account_1">
                                        Account 1
                                    </Select.Option>
                                    <Select.Option value="account_2">
                                        Account 2
                                    </Select.Option>
                                    <Select.Option value="account_3">
                                        Account 3
                                    </Select.Option>
                                    <Select.Option value="account_4">
                                        Account 4
                                    </Select.Option>
                                    <Select.Option value="account_5">
                                        Account 5
                                    </Select.Option>
                                    <Select.Option value="account_6">
                                        Account 6
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mx-auto w-2/5">
                <div className="p-12">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly
                            prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </div>
            </div>
        </form>
    );
};

export default AddSingleItem;
