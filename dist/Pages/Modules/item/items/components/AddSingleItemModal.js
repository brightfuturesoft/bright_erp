import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Radio } from 'antd';
import { Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import JoditEditor from 'jodit-react';
const AddSingleItemModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const handleCategoryChange = value => {
        console.log(value);
    };
    const handleBrandChange = value => {
        console.log(value);
    };
    const handleSizeChange = value => {
        console.log(value);
    };
    const handleColorChange = value => {
        console.log(value);
    };
    const handleStatusChange = value => {
        console.log(value);
    };
    return _jsx(Modal, {
        title: 'Add a Single Item',
        open: isModalOpen,
        onOk: handleOk,
        onCancel: handleCancel,
        children: _jsxs('form', {
            className: 'space-y-4 max-h-[500px] overflow-y-scroll',
            children: [
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'item_type',
                            className: 'mr-4 text-black dark:text-white',
                            children: 'Item Type',
                        }),
                        _jsxs(Radio.Group, {
                            name: 'item_type',
                            onChange: e => console.log(e.target.value),
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
                    ],
                }),
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'item_name',
                            className: 'text-black dark:text-white',
                            children: 'Item Name',
                        }),
                        _jsx(Input, {
                            name: 'item_name',
                            placeholder: 'Enter item name',
                            className:
                                'focus:border-[1px] p-2 border focus:border-blue-600 rounded w-full h-[42px] dark:text-white hover',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'item_description',
                            className: 'text-black dark:text-white',
                            children: 'Short Description',
                        }),
                        _jsx(TextArea, {
                            name: 'item_description',
                            placeholder:
                                'Write a short description about this item...',
                            rows: 2,
                            className:
                                'focus:border-[1px] bg-transparent p-2 border focus:border-blue-600 rounded w-full h-[84px] dark:text-white hover',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'item_long_description',
                            className: 'text-black dark:text-white',
                            children: 'Long Description',
                        }),
                        _jsx(JoditEditor, {
                            className: 'jodit-editor text-black',
                            value: '',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex gap-3',
                    children: [
                        _jsxs('div', {
                            className: 'flex flex-col space-y-1 w-1/2',
                            children: [
                                _jsx('label', {
                                    htmlFor: 'manufacturer',
                                    className: 'text-black dark:text-white',
                                    children: 'Manufacturer',
                                }),
                                _jsxs(Select, {
                                    className:
                                        'hover:!border-none dark:text-white',
                                    onChange: handleBrandChange,
                                    allowClear: true,
                                    children: [
                                        _jsx(Select.Option, {
                                            value: 'manufacturer_1',
                                            children: 'Manufacturer 1',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'manufacturer_2',
                                            children: 'Manufacturer 2',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'manufacturer_3',
                                            children: 'Manufacturer 3',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'manufacturer_4',
                                            children: 'Manufacturer 4',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'manufacturer_5',
                                            children: 'Manufacturer 5',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'manufacturer_6',
                                            children: 'Manufacturer 6',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex flex-col space-y-1 w-1/2',
                            children: [
                                _jsx('label', {
                                    htmlFor: 'categories',
                                    className: 'text-black dark:text-white',
                                    children: 'Categories',
                                }),
                                _jsxs(Select, {
                                    className:
                                        'hover:!border-none dark:text-white',
                                    onChange: handleCategoryChange,
                                    allowClear: true,
                                    children: [
                                        _jsx(Select.Option, {
                                            value: 'category_1',
                                            children: 'Category 1',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'category_2',
                                            children: 'Category 2',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'category_3',
                                            children: 'Category 3',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'category_4',
                                            children: 'Category 4',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'category_5',
                                            children: 'Category 5',
                                        }),
                                        _jsx(Select.Option, {
                                            value: 'category_6',
                                            children: 'Category 6',
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex flex-col space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'type',
                            className: 'text-black dark:text-white',
                            children: 'Type',
                        }),
                        _jsxs(Select, {
                            className: 'hover:!border-none',
                            onChange: handleCategoryChange,
                            allowClear: true,
                            children: [
                                _jsx(Select.Option, {
                                    value: 'service',
                                    children: 'Product',
                                }),
                                _jsx(Select.Option, {
                                    value: 'product',
                                    children: 'Service',
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex flex-col space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'brand',
                            className: 'text-black dark:text-white',
                            children: 'Brand',
                        }),
                        _jsxs(Select, {
                            className: 'hover:!border-none',
                            onChange: handleBrandChange,
                            allowClear: true,
                            children: [
                                _jsx(Select.Option, {
                                    value: 'brand_1',
                                    children: 'Brand 1',
                                }),
                                _jsx(Select.Option, {
                                    value: 'brand_2',
                                    children: 'Brand 2',
                                }),
                                _jsx(Select.Option, {
                                    value: 'brand_3',
                                    children: 'Brand 3',
                                }),
                                _jsx(Select.Option, {
                                    value: 'brand_4',
                                    children: 'Brand 3',
                                }),
                                _jsx(Select.Option, {
                                    value: 'brand_5',
                                    children: 'Brand 3',
                                }),
                                _jsx(Select.Option, {
                                    value: 'brand_6',
                                    children: 'Brand 3',
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex flex-col space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'color',
                            className: 'text-black dark:text-white',
                            children: 'Color',
                        }),
                        _jsxs(Select, {
                            className: 'hover:!border-none',
                            onChange: value => handleColorChange(value),
                            allowClear: true,
                            children: [
                                _jsx(Select.Option, {
                                    value: 'color_1',
                                    children: 'Color 1',
                                }),
                                _jsx(Select.Option, {
                                    value: 'color_2',
                                    children: 'Color 2',
                                }),
                                _jsx(Select.Option, {
                                    value: 'color_3',
                                    children: 'Color 3',
                                }),
                                _jsx(Select.Option, {
                                    value: 'color_4',
                                    children: 'Color 4',
                                }),
                                _jsx(Select.Option, {
                                    value: 'color_5',
                                    children: 'Color 5',
                                }),
                                _jsx(Select.Option, {
                                    value: 'color_6',
                                    children: 'Color 6',
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex flex-col space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'size',
                            className: 'text-black dark:text-white',
                            children: 'Size',
                        }),
                        _jsxs(Select, {
                            className: 'hover:!border-none',
                            onChange: handleSizeChange,
                            allowClear: true,
                            children: [
                                _jsx(Select.Option, {
                                    value: 'size_1',
                                    children: 'Size 1',
                                }),
                                _jsx(Select.Option, {
                                    value: 'size_2',
                                    children: 'Size 2',
                                }),
                                _jsx(Select.Option, {
                                    value: 'size_3',
                                    children: 'Size 3',
                                }),
                                _jsx(Select.Option, {
                                    value: 'size_4',
                                    children: 'Size 4',
                                }),
                                _jsx(Select.Option, {
                                    value: 'size_5',
                                    children: 'Size 5',
                                }),
                                _jsx(Select.Option, {
                                    value: 'size_6',
                                    children: 'Size 6',
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'salePrice',
                            className: 'text-black dark:text-white',
                            children: 'Sale Price',
                        }),
                        _jsx(Input, {
                            name: 'salePrice',
                            className:
                                'focus:border-[1px] bg-transparent dark:bg-white p-2 border focus:border-blue-600 rounded w-full h-[42px] hover',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'stock',
                            className: 'text-black dark:text-white',
                            children: 'Stock',
                        }),
                        _jsx(Input, {
                            name: 'stock',
                            className:
                                'focus:border-[1px] bg-transparent dark:bg-white p-2 border focus:border-blue-600 rounded w-full h-[42px] hover',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex flex-col space-y-1',
                    children: [
                        _jsx('label', {
                            htmlFor: 'status',
                            className: 'text-black dark:text-white',
                            children: 'Status',
                        }),
                        _jsxs(Select, {
                            className: 'hover:!border-none',
                            onChange: handleStatusChange,
                            children: [
                                _jsx(Select.Option, {
                                    value: 'Active',
                                    children: 'Active',
                                }),
                                _jsx(Select.Option, {
                                    value: 'Inactive',
                                    children: 'Inactive',
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default AddSingleItemModal;
