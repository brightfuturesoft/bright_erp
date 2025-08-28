import React, { useState, useMemo } from 'react';
import {
    Button,
    Select,
    Typography,
    Spin,
    Table,
    Tag,
    Space,
    Dropdown,
} from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { useItemsData } from './data_get_api';

const { Text } = Typography;

const TableController = ({
    searchValue,
    setSearchValue,
}: {
    searchValue: string;
    setSearchValue: (value: string) => void;
}) => {
    const onSearch = (value: string) => {
        console.log('search', value);
    };

    return (
        <div className="flex justify-end my-4">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSearch(searchValue);
                }}
                className="flex items-center"
            >
                <input
                    type="text"
                    className="w-[400px] h-[40px] text-black border border-gray-300 rounded-l-md pl-3 text-base outline-none bg-white"
                    placeholder="Search items..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <button
                    type="submit"
                    className="h-[40px] px-4 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md text-gray-700 text-base cursor-pointer"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <circle
                            cx="9"
                            cy="9"
                            r="7"
                            stroke="#333"
                            strokeWidth="2"
                        />
                        <line
                            x1="15"
                            y1="15"
                            x2="19"
                            y2="19"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

const ItemsFilterTable: React.FC = () => {
    const {
        categories = [],
        brandData = [],
        itemsData,
        isLoading,
        isError,
    } = useItemsData();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedItemType, setSelectedItemType] = useState<string | null>(
        null
    );
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [appliedFilter, setAppliedFilter] = useState<any>({});

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

    const itemsArray = Array.isArray(itemsData)
        ? itemsData
        : itemsData?.data || [];
    const filteredItems = useMemo(() => {
        return itemsArray.filter((item: any) => {
            if (appliedFilter.categories?.length) {
                const hasCategory = item.categories.some((c: any) =>
                    appliedFilter.categories.includes(c._id)
                );
                if (!hasCategory) return false;
            }
            if (appliedFilter.brand && item.brand !== appliedFilter.brand)
                return false;
            if (
                appliedFilter.itemType &&
                item.item_type !== appliedFilter.itemType
            )
                return false;
            if (appliedFilter.status && item.status !== appliedFilter.status)
                return false;
            if (searchValue) {
                const text =
                    `${item.item_name} ${item.brand} ${item.sku || ''} ${item?.item_type} ${item?.categories?.label}`.toLowerCase();
                if (!text.includes(searchValue.toLowerCase())) return false;
            }
            return true;
        });
    }, [itemsArray, appliedFilter, searchValue]);

    const tableData = filteredItems.map((item: any) => ({
        key: item._id,
        name: item.item_name,
        code: item.sku || 'N/A',
        categories: item.categories.map((c: any) => c.label).join(', '),
        type: item.item_type,
        brand: item.brand || 'N/A',
        color: item.color || 'N/A',
        size: item.size || 'N/A',
        salePrice: item.selling_price || 0,
        stock: item.low_stock || 0,
        status: item.status === 'Active',
    }));

    const actionItems = [
        {
            key: '1',
            label: (
                <div onClick={() => console.log('details clicked')}>
                    Details
                </div>
            ),
        },
        {
            key: '2',
            label: <div onClick={() => console.log('edit clicked')}>Edit</div>,
        },
        {
            key: '3',
            label: (
                <div onClick={() => console.log('inactive clicked')}>
                    Make Inactive
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div onClick={() => console.log('Delete clicked')}>Delete</div>
            ),
        },
    ];

    const tableHead = [
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            render: (text: any) => <a>{text}</a>,
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
            render: (status: boolean) => (
                <Tag color={status ? 'green' : 'red'}>
                    {status ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'ACTION',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Dropdown
                        menu={{ items: actionItems }}
                        trigger={['click']}
                    >
                        <a>
                            <EllipsisVertical className="hover:cursor-pointer" />
                        </a>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-[80vh]">
                {' '}
                <Spin />
            </div>
        );
    if (isError) return <div>Error loading items</div>;

    return (
        <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <TableController
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />

            {/* Filter Section */}
            <div className="flex lg:flex-row flex-col gap-2">
                <div className="flex flex-col flex-1">
                    <Text
                        className="dark:text-white"
                        strong
                    >
                        Categories
                    </Text>
                    <Select
                        mode="multiple"
                        showSearch
                        placeholder="Select Item Categories"
                        value={selectedCategories}
                        options={categories.map((c: any) => ({
                            label: c.name,
                            value: c._id,
                        }))}
                        onChange={setSelectedCategories}
                        allowClear
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' &&
                            option.label
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <Text
                        className="dark:text-white"
                        strong
                    >
                        Item Type
                    </Text>
                    <Select
                        placeholder="Select Item Type"
                        value={selectedItemType}
                        onChange={setSelectedItemType}
                        allowClear
                        options={[
                            { value: 'product', label: 'Product' },
                            { value: 'service', label: 'Service' },
                        ]}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <Text
                        className="dark:text-white"
                        strong
                    >
                        Brand
                    </Text>
                    <Select
                        placeholder="Select Brand"
                        value={selectedBrand}
                        onChange={setSelectedBrand}
                        allowClear
                        options={brandData.map((b: any) => ({
                            label: b.brand,
                            value: b._id,
                        }))}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <Text
                        className="dark:text-white"
                        strong
                    >
                        Status
                    </Text>
                    <Select
                        placeholder="Select Status"
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        allowClear
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ]}
                    />
                </div>
            </div>
            <div className="gap-5 flex">
                <Button
                    type="primary"
                    onClick={handleApplyFilter}
                >
                    Apply Filter
                </Button>
                <Button onClick={handleClearFilter}>Clear Filter</Button>
            </div>
            {/* Table Section */}
            <Table
                columns={tableHead}
                dataSource={tableData}
                rowKey="key"
            />
        </div>
    );
};

export default ItemsFilterTable;
