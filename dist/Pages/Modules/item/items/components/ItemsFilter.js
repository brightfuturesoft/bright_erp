import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useMemo, useContext } from 'react';
import {
    Button,
    Select,
    Typography,
    Spin,
    Table,
    Tag,
    Space,
    Dropdown,
    message,
} from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { useItemsData } from './data_get_api';
import { useNavigate } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
const { Text } = Typography;
const TableController = ({ searchValue, setSearchValue }) => {
    return _jsx('div', {
        className: 'flex justify-end my-4',
        children: _jsxs('form', {
            onSubmit: e => e.preventDefault(),
            className: 'flex items-center',
            children: [
                _jsx('input', {
                    type: 'text',
                    className:
                        'w-[400px] h-[40px] text-black border border-gray-300 rounded-l-md pl-3 text-base outline-none bg-white',
                    placeholder: 'Search items...',
                    value: searchValue,
                    onChange: e => setSearchValue(e.target.value),
                }),
                _jsx('button', {
                    type: 'submit',
                    className:
                        'h-[40px] px-4 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md text-gray-700 text-base cursor-pointer',
                    children: _jsxs('svg', {
                        width: '20',
                        height: '20',
                        viewBox: '0 0 20 20',
                        fill: 'none',
                        children: [
                            _jsx('circle', {
                                cx: '9',
                                cy: '9',
                                r: '7',
                                stroke: '#333',
                                strokeWidth: '2',
                            }),
                            _jsx('line', {
                                x1: '15',
                                y1: '15',
                                x2: '19',
                                y2: '19',
                                stroke: '#333',
                                strokeWidth: '2',
                                strokeLinecap: 'round',
                            }),
                        ],
                    }),
                }),
            ],
        }),
    });
};
const ItemsFilterTable = () => {
    const {
        categories = [],
        brandData = [],
        itemsData,
        isLoading,
        isError,
        refetch,
        updateItemStatus,
        deleteItem,
    } = useItemsData();
    const navigate = useNavigate();
    const { user } = useContext(Erp_context);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedItemType, setSelectedItemType] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [appliedFilter, setAppliedFilter] = useState({});
    const [selectedBrand, setSelectedBrand] = useState(null);
    const handleApplyFilter = () => {
        setAppliedFilter({
            categories: selectedCategories,
            brand: selectedBrand,
            itemType: selectedItemType,
            status: selectedStatus,
        });
    };
    const handleClearFilter = () => {
        setSelectedCategories([]);
        setSelectedBrand(null);
        setSelectedItemType(null);
        setSelectedStatus(null);
        setSearchValue('');
        setAppliedFilter({});
    };
    const itemsArray = Array.isArray(itemsData) ? itemsData : [];
    const filteredItems = useMemo(() => {
        return itemsArray.filter(item => {
            if (appliedFilter.categories?.length) {
                // check correct key: c._id, c.value, or c.id
                const categoryIds = item.categories.map(
                    c => c._id || c.value || c
                );
                const hasCategory = appliedFilter.categories.some(catId =>
                    categoryIds.includes(catId)
                );
                if (!hasCategory) return false;
            }
            if (appliedFilter.brand?.value) {
                const itemBrandId =
                    item.brand?._id || item.brand?.value || item.brand;
                if (itemBrandId !== appliedFilter.brand.value) return false;
            }
            if (
                appliedFilter.itemType &&
                item.item_type !== appliedFilter.itemType
            )
                return false;
            if (appliedFilter.status && item.status !== appliedFilter.status)
                return false;
            if (searchValue) {
                const text =
                    `${item.item_name} ${item.brand?.label || item.brand?.brand || ''} ${item.sku || ''} ${item?.item_type} ${item?.categories?.map(c => c.label || c.name).join(', ')}`.toLowerCase();
                if (!text.includes(searchValue.toLowerCase())) return false;
            }
            return true;
        });
    }, [itemsArray, appliedFilter, searchValue]);
    const tableData = filteredItems.map(item => ({
        key: item._id,
        name: item.item_name,
        code: item.sku || 'N/A',
        categories: item.categories?.map(c => c.label).join(', ') || 'N/A',
        type: item.item_type || 'N/A',
        brand: item.brand?.label || 'N/A',
        color: item?.variants[0]?.color || 'N/A',
        size: item?.variants[0]?.size || 'N/A',
        salePrice: item?.variants[0]?.offer_price || 0,
        stock: item?.variants[0]?.quantity || 0,
        status: item.status === 'Active',
    }));
    const tableHead = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            render: text => _jsx('a', { children: text }),
        },
        { title: 'CATEGORIES', dataIndex: 'categories', key: 'categories' },
        { title: 'TYPE', dataIndex: 'type', key: 'type' },
        { title: 'BRAND', dataIndex: 'brand', key: 'brand' },
        { title: 'COLOR', dataIndex: 'color', key: 'color' },
        { title: 'SIZE', dataIndex: 'size', key: 'size' },
        { title: 'SALE PRICE', dataIndex: 'salePrice', key: 'salePrice' },
        { title: 'STOCK', dataIndex: 'stock', key: 'stock' },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: status =>
                _jsx(Tag, {
                    color: status ? 'green' : 'red',
                    children: status ? 'Active' : 'Inactive',
                }),
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) => {
                const handleToggleStatus = async () => {
                    const newStatus = record.status ? 'Inactive' : 'Active';
                    try {
                        await updateItemStatus(record.key, newStatus);
                        message.success(`Item marked as ${newStatus}`);
                        refetch();
                    } catch (err) {
                        console.error(err);
                        message.error('Failed to update status');
                    }
                };
                const handleDelete = async () => {
                    try {
                        // Use record.code instead of _id
                        await deleteItem(record.key);
                        message.success('Item deleted successfully');
                        refetch();
                    } catch (err) {
                        console.error(err);
                        message.error('Failed to delete item');
                    }
                };
                const actionItems = [
                    {
                        key: '1',
                        label: _jsx('div', {
                            onClick: () => navigate(`edit_item/${record.key}`),
                            children: 'Edit',
                        }),
                    },
                    {
                        key: '2',
                        label: _jsx('div', {
                            onClick: handleToggleStatus,
                            children: record.status
                                ? 'Make Inactive'
                                : 'Make Active',
                        }),
                    },
                    {
                        key: '3',
                        label: _jsx('div', {
                            onClick: handleDelete,
                            children: 'Delete',
                        }),
                    },
                ];
                return _jsx(Space, {
                    size: 'middle',
                    children: _jsx(Dropdown, {
                        menu: { items: actionItems },
                        trigger: ['click'],
                        children: _jsx('a', {
                            children: _jsx(EllipsisVertical, {
                                className: 'hover:cursor-pointer',
                            }),
                        }),
                    }),
                });
            },
        },
    ];
    if (isLoading)
        return _jsx('div', {
            className: 'flex justify-center items-center h-[80vh]',
            children: _jsx(Spin, {}),
        });
    if (isError) return _jsx('div', { children: 'Error loading items' });
    return _jsxs('div', {
        className: 'flex flex-col gap-4',
        children: [
            _jsxs('div', {
                className: 'flex lg:flex-row flex-col gap-2 items-center',
                children: [
                    _jsxs('div', {
                        className: 'flex flex-col flex-1',
                        children: [
                            _jsx(Text, {
                                className: 'dark:text-white',
                                strong: true,
                                children: 'Categories',
                            }),
                            _jsx(Select, {
                                mode: 'multiple',
                                showSearch: true,
                                placeholder: 'Select Item Categories',
                                value: selectedCategories,
                                options: categories.map(c => ({
                                    label: c.name,
                                    value: c._id,
                                })),
                                onChange: setSelectedCategories,
                                allowClear: true,
                                filterOption: (input, option) =>
                                    typeof option?.label === 'string' &&
                                    option.label
                                        .toLowerCase()
                                        .includes(input.toLowerCase()),
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'flex flex-col flex-1',
                        children: [
                            _jsx(Text, {
                                className: 'dark:text-white',
                                strong: true,
                                children: 'Item Type',
                            }),
                            _jsx(Select, {
                                placeholder: 'Select Item Type',
                                value: selectedItemType,
                                onChange: setSelectedItemType,
                                allowClear: true,
                                options: [
                                    { value: 'product', label: 'Product' },
                                    { value: 'service', label: 'Service' },
                                ],
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'flex flex-col flex-1',
                        children: [
                            _jsx(Text, {
                                className: 'dark:text-white',
                                strong: true,
                                children: 'Brand',
                            }),
                            _jsx(Select, {
                                placeholder: 'Select Brand',
                                value: selectedBrand,
                                onChange: setSelectedBrand,
                                allowClear: true,
                                options: brandData.map(b => ({
                                    label: b.brand,
                                    value: b._id,
                                })),
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'flex flex-col flex-1',
                        children: [
                            _jsx(Text, {
                                className: 'dark:text-white',
                                strong: true,
                                children: 'Status',
                            }),
                            _jsx(Select, {
                                placeholder: 'Select Status',
                                value: selectedStatus,
                                onChange: setSelectedStatus,
                                allowClear: true,
                                options: [
                                    { value: 'Active', label: 'Active' },
                                    { value: 'Inactive', label: 'Inactive' },
                                ],
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'gap-5 flex mt-5',
                        children: [
                            _jsx(Button, {
                                type: 'primary',
                                onClick: handleApplyFilter,
                                children: 'Apply Filter',
                            }),
                            _jsx(Button, {
                                onClick: handleClearFilter,
                                children: 'Clear Filter',
                            }),
                        ],
                    }),
                ],
            }),
            _jsx('div', {
                className: 'flex justify-end items-center flex-1',
                children: _jsx(TableController, {
                    searchValue: searchValue,
                    setSearchValue: setSearchValue,
                }),
            }),
            _jsx(Table, {
                columns: tableHead,
                dataSource: tableData,
                rowKey: 'key',
            }),
        ],
    });
};
export default ItemsFilterTable;
