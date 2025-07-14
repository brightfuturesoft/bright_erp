import { Modal, Radio } from 'antd';
import { Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import JoditEditor from 'jodit-react';

interface AddSingleItemModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
}

const AddSingleItemModal: React.FC<AddSingleItemModalProps> = ({
    isModalOpen,
    handleOk,
    handleCancel,
}) => {
    const handleCategoryChange = (value: string) => {
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

    const handleStatusChange = (value: string) => {
        console.log(value);
    };

    return (
        <Modal
            title="Add a Single Item"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <form className="space-y-4 max-h-[500px] overflow-y-scroll">
                <div className="space-y-1">
                    <label
                        htmlFor="item_type"
                        className="mr-4 text-black dark:text-white"
                    >
                        Item Type
                    </label>
                    <Radio.Group
                        name="item_type"
                        onChange={e => console.log(e.target.value)}
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
                        className="jodit-editor text-black"
                        value=""
                    />
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-col space-y-1 w-1/2">
                        <label
                            htmlFor="manufacturer"
                            className="text-black dark:text-white"
                        >
                            Manufacturer
                        </label>

                        <Select
                            className="hover:!border-none dark:text-white"
                            onChange={handleBrandChange}
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

                    <div className="flex flex-col space-y-1 w-1/2">
                        <label
                            htmlFor="categories"
                            className="text-black dark:text-white"
                        >
                            Categories
                        </label>

                        <Select
                            className="hover:!border-none dark:text-white"
                            onChange={handleCategoryChange}
                            allowClear
                        >
                            <Select.Option value="category_1">
                                Category 1
                            </Select.Option>
                            <Select.Option value="category_2">
                                Category 2
                            </Select.Option>
                            <Select.Option value="category_3">
                                Category 3
                            </Select.Option>
                            <Select.Option value="category_4">
                                Category 4
                            </Select.Option>
                            <Select.Option value="category_5">
                                Category 5
                            </Select.Option>
                            <Select.Option value="category_6">
                                Category 6
                            </Select.Option>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-col space-y-1">
                    <label
                        htmlFor="type"
                        className="text-black dark:text-white"
                    >
                        Type
                    </label>

                    <Select
                        className="hover:!border-none"
                        onChange={handleCategoryChange}
                        allowClear
                    >
                        <Select.Option value="service">Product</Select.Option>
                        <Select.Option value="product">Service</Select.Option>
                    </Select>
                </div>

                <div className="flex flex-col space-y-1">
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
                        <Select.Option value="brand_1">Brand 1</Select.Option>
                        <Select.Option value="brand_2">Brand 2</Select.Option>
                        <Select.Option value="brand_3">Brand 3</Select.Option>
                        <Select.Option value="brand_4">Brand 3</Select.Option>
                        <Select.Option value="brand_5">Brand 3</Select.Option>
                        <Select.Option value="brand_6">Brand 3</Select.Option>
                    </Select>
                </div>

                <div className="flex flex-col space-y-1">
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
                        <Select.Option value="color_1">Color 1</Select.Option>
                        <Select.Option value="color_2">Color 2</Select.Option>
                        <Select.Option value="color_3">Color 3</Select.Option>
                        <Select.Option value="color_4">Color 4</Select.Option>
                        <Select.Option value="color_5">Color 5</Select.Option>
                        <Select.Option value="color_6">Color 6</Select.Option>
                    </Select>
                </div>

                <div className="flex flex-col space-y-1">
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

                <div className="space-y-1">
                    <label
                        htmlFor="salePrice"
                        className="text-black dark:text-white"
                    >
                        Sale Price
                    </label>
                    <Input
                        name="salePrice"
                        className="focus:border-[1px] bg-transparent dark:bg-white p-2 border focus:border-blue-600 rounded w-full h-[42px] hover"
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="stock"
                        className="text-black dark:text-white"
                    >
                        Stock
                    </label>
                    <Input
                        name="stock"
                        className="focus:border-[1px] bg-transparent dark:bg-white p-2 border focus:border-blue-600 rounded w-full h-[42px] hover"
                    />
                </div>

                <div className="flex flex-col space-y-1">
                    <label
                        htmlFor="status"
                        className="text-black dark:text-white"
                    >
                        Status
                    </label>
                    <Select
                        className="hover:!border-none"
                        onChange={handleStatusChange}
                    >
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Inactive">Inactive</Select.Option>
                    </Select>
                </div>
            </form>
        </Modal>
    );
};

export default AddSingleItemModal;
