import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { DeleteOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Table,
    Modal,
    Select,
    Row,
    Col,
    Space,
    Switch,
} from 'antd';
import { useState, useMemo } from 'react';
import UnitDropdown from './UnitDropdown';
import { useItemsData } from '@/Pages/Modules/item/items/components/data_get_api';
import { getColorLabel } from './getColorLabel ';
import { calculateTotals } from './calculateTotals';
const DirectSaleItems = ({ form }) => {
    const { isLoading, itemsData, isError } = useItemsData();
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filters, setFilters] = useState({
        brand: undefined,
        color: undefined,
        size: undefined,
        manufacture: undefined,
        category: undefined,
        item_type: undefined,
        search: '',
    });
    const [selectType, setSelectType] = useState('checkbox');
    const allProducts = useMemo(() => {
        if (!isLoading && !isError && itemsData) {
            const products = [];
            itemsData.forEach((item, index) => {
                if (item.variants && item.variants.length > 0) {
                    item.variants.forEach((v, vIndex) => {
                        products.push({
                            key: `${item._id}-${vIndex}`, // unique key
                            item_name: item.item_name,
                            item_type: item.item_type,
                            stock: Number(v.quantity || 0),
                            price: Number(v.offer_price || v.normal_price || 0),
                            vat: Number(item.selling_vat || 0),
                            discount: Number(item.selling_discount || 0),
                            brand: item.brand?.label || '',
                            color: v.color || '',
                            size: v.size || '',
                            manufacture: item.manufacturer?.label || '',
                            category: item.categories?.[0]?.label || '',
                            unit: item.unit || 'Piece',
                            quantity: 1,
                        });
                    });
                } else {
                    products.push({
                        key: `${item._id}-0`,
                        item_name: item.item_name,
                        item_type: item.item_type,
                        stock: Number(item.stock_quantites || 0),
                        price: Number(item.selling_price || 0),
                        vat: Number(item.selling_vat || 0),
                        discount: Number(item.selling_discount || 0),
                        brand: item.brand?.label || '',
                        color: '',
                        size: '',
                        manufacture: item.manufacturer?.label || '',
                        category: item.categories?.[0]?.label || '',
                        unit: item.unit || 'Piece',
                        quantity: 1,
                    });
                }
            });
            return products;
        }
        return [];
    }, [itemsData, isLoading, isError]);
    const filteredProducts = allProducts.filter(
        p =>
            (!filters.brand || p.brand === filters.brand) &&
            (!filters.color || p.color === filters.color) &&
            (!filters.size || p.size === filters.size) &&
            (!filters.manufacture || p.manufacture === filters.manufacture) &&
            (!filters.category || p.category === filters.category) &&
            (!filters.item_type || p.item_type === filters.item_type) &&
            (!filters.search ||
                p.item_name
                    .toLowerCase()
                    .includes(filters.search.toLowerCase()))
    );
    const addSelectedItems = () => {
        const newItems = filteredProducts.filter(p =>
            selectedRowKeys.includes(p.key)
        );
        const updatedItems = [
            ...items,
            ...newItems.filter(p => !items.find(item => item.key === p.key)),
        ];
        setItems(updatedItems);
        setIsModalOpen(false);
        setSelectedRowKeys([]);
        // Prepare items with all properties for form
        const formItems = updatedItems.map(item => ({
            key: item.key,
            item_name: item.item_name,
            item_type: item.item_type,
            brand: item.brand,
            color: item.color,
            size: item.size,
            manufacture: item.manufacture,
            category: item.category,
            unit: item.unit || 'Piece',
            quantity: item.quantity || 1,
            price: item.price || 0,
            discount: item.discount || 0,
            vat: item.vat || 0,
            stock: item.stock || 0,
        }));
        // Calculate totals
        const totals = calculateTotals({
            items: formItems,
            global_discount: form.getFieldValue('global_discount'),
            adjustment: form.getFieldValue('adjustment'),
            paid_amount: form.getFieldValue('paid_amount'),
        });
        console.log('totals', totals);
        // Save totals in localStorage
        localStorage.setItem('directSaleTotals', JSON.stringify(totals));
        // Set form values
        form.setFieldsValue({
            ...totals,
        });
    };
    const removeItem = key => {
        setItems(items.filter(item => item.key !== key));
    };
    const modalColumns = [
        { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
        { title: 'Item Type', dataIndex: 'item_type', key: 'item_type' },
        { title: 'Available Stock', dataIndex: 'stock', key: 'stock' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'VAT(%)', dataIndex: 'vat', key: 'vat' },
        { title: 'Discount(%)', dataIndex: 'discount', key: 'discount' },
    ];
    const mainColumns = [
        { title: 'Item', dataIndex: 'item_name', key: 'item_name' },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            render: (_, record, index) =>
                _jsx(Form.Item, {
                    name: ['items', index, 'unit'],
                    noStyle: true,
                    initialValue: record.unit,
                    children: _jsx(UnitDropdown, {}),
                }),
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record, index) =>
                _jsx(Form.Item, {
                    name: ['items', index, 'quantity'],
                    noStyle: true,
                    initialValue: record.quantity || 1,
                    children: _jsx(Input, { type: 'number', min: 1 }),
                }),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record, index) =>
                _jsx(Form.Item, {
                    name: ['items', index, 'price'],
                    noStyle: true,
                    initialValue: record.price,
                    children: _jsx(Input, { type: 'number', min: 0 }),
                }),
        },
        {
            title: 'Discount %',
            dataIndex: 'discount',
            key: 'discount',
            render: (_, record, index) =>
                _jsx(Form.Item, {
                    name: ['items', index, 'discount'],
                    noStyle: true,
                    initialValue: record.discount,
                    children: _jsx(Input, { type: 'number', min: 0, max: 100 }),
                }),
        },
        {
            title: 'VAT %',
            dataIndex: 'vat',
            key: 'vat',
            render: (_, record, index) =>
                _jsx(Form.Item, {
                    name: ['items', index, 'vat'],
                    noStyle: true,
                    initialValue: record.vat,
                    children: _jsx(Input, { type: 'number', min: 0, max: 100 }),
                }),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) =>
                _jsx(Button, {
                    type: 'text',
                    icon: _jsx(DeleteOutlined, {}),
                    danger: true,
                    onClick: () => removeItem(record.key),
                }),
        },
    ];
    if (isLoading) return _jsx('p', { children: 'Loading items...' });
    if (isError) return _jsx('p', { children: 'Error loading items' });
    return _jsxs('div', {
        children: [
            _jsx('h3', {
                className: 'text-lg font-semibold mb-3 dark:text-white my-5',
                children: 'Items',
            }),
            _jsx(Table, {
                dataSource: items,
                columns: mainColumns,
                pagination: false,
                rowKey: record => record.key.toString(),
            }),
            _jsx(Button, {
                type: 'dashed',
                className: 'mt-3',
                onClick: () => setIsModalOpen(true),
                children: 'Add Item',
            }),
            _jsx(Modal, {
                title: 'Select Item',
                open: isModalOpen,
                onCancel: () => setIsModalOpen(false),
                onOk: addSelectedItems,
                width: 1300,
                bodyStyle: { maxHeight: '75vh', overflowY: 'auto' },
                okText: 'Add Selected Items',
                children: _jsxs(Space, {
                    direction: 'vertical',
                    size: 'middle',
                    style: { width: '100%' },
                    children: [
                        _jsx(Row, {
                            className: 'mb-3',
                            children: _jsxs(Col, {
                                children: [
                                    _jsx('span', {
                                        className: 'mr-2 dark:text-white',
                                        children: 'Multiple Select:',
                                    }),
                                    _jsx(Switch, {
                                        checked: selectType === 'checkbox',
                                        onChange: checked =>
                                            setSelectType(
                                                checked ? 'checkbox' : 'radio'
                                            ),
                                    }),
                                ],
                            }),
                        }),
                        _jsxs(Row, {
                            gutter: 16,
                            className: 'mb-3',
                            children: [
                                _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Input, {
                                        placeholder: 'Search by name',
                                        value: filters.search,
                                        onChange: e =>
                                            setFilters({
                                                ...filters,
                                                search: e.target.value,
                                            }),
                                    }),
                                }),
                                _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Select, {
                                        placeholder: 'Select Brand',
                                        value: filters.brand,
                                        onChange: val =>
                                            setFilters({
                                                ...filters,
                                                brand: val,
                                            }),
                                        allowClear: true,
                                        options: [
                                            ...new Set(
                                                allProducts.map(p => p.brand)
                                            ),
                                        ].map(b => ({
                                            label: b || 'No Brand',
                                            value: b,
                                        })),
                                        style: { width: '100%' },
                                    }),
                                }),
                                _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Select, {
                                        placeholder: 'Select Color',
                                        value: filters.color,
                                        onChange: val =>
                                            setFilters({
                                                ...filters,
                                                color: val,
                                            }),
                                        allowClear: true,
                                        options: [
                                            ...new Set(
                                                allProducts.map(p => p.color)
                                            ),
                                        ].map(c => ({
                                            label: getColorLabel(c),
                                            value: c,
                                        })),
                                        style: { width: '100%' },
                                    }),
                                }),
                                _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Select, {
                                        placeholder: 'Select Size',
                                        value: filters.size,
                                        onChange: val =>
                                            setFilters({
                                                ...filters,
                                                size: val,
                                            }),
                                        allowClear: true,
                                        options: [
                                            ...new Set(
                                                allProducts.map(p => p.size)
                                            ),
                                        ].map(s => ({
                                            label: s || 'No Size',
                                            value: s,
                                        })),
                                        style: { width: '100%' },
                                    }),
                                }),
                            ],
                        }),
                        _jsxs(Row, {
                            gutter: 16,
                            className: 'mb-3',
                            children: [
                                _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Select, {
                                        placeholder: 'Select Manufacturer',
                                        value: filters.manufacture,
                                        onChange: val =>
                                            setFilters({
                                                ...filters,
                                                manufacture: val,
                                            }),
                                        allowClear: true,
                                        options: [
                                            ...new Set(
                                                allProducts.map(
                                                    p => p.manufacture
                                                )
                                            ),
                                        ].map(m => ({
                                            label: m || 'No Manufacturer',
                                            value: m,
                                        })),
                                        style: { width: '100%' },
                                    }),
                                }),
                                _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Select, {
                                        placeholder: 'Select Category',
                                        value: filters.category,
                                        onChange: val =>
                                            setFilters({
                                                ...filters,
                                                category: val,
                                            }),
                                        allowClear: true,
                                        options: [
                                            ...new Set(
                                                allProducts.map(p => p.category)
                                            ),
                                        ].map(c => ({
                                            label: c || 'No Category',
                                            value: c,
                                        })),
                                        style: { width: '100%' },
                                    }),
                                }),
                                _jsx(Col, {
                                    span: 6,
                                    children: _jsx(Select, {
                                        placeholder: 'Select Item Type',
                                        value: filters.item_type,
                                        onChange: val =>
                                            setFilters({
                                                ...filters,
                                                item_type: val,
                                            }),
                                        allowClear: true,
                                        options: [
                                            ...new Set(
                                                allProducts.map(
                                                    p => p.item_type
                                                )
                                            ),
                                        ].map(t => ({
                                            label: t || 'No Type',
                                            value: t,
                                        })),
                                        style: { width: '100%' },
                                    }),
                                }),
                            ],
                        }),
                        _jsx(Table, {
                            dataSource: filteredProducts,
                            columns: modalColumns,
                            rowKey: record => record.key.toString(),
                            rowSelection: {
                                type: selectType,
                                selectedRowKeys,
                                onChange: keys =>
                                    setSelectedRowKeys(
                                        keys.map(k => k?.toString() || '')
                                    ),
                                getCheckboxProps: record => ({
                                    disabled: record?.stock === 0 || false,
                                }),
                            },
                            pagination: { pageSize: 5 },
                        }),
                    ],
                }),
            }),
        ],
    });
};
export default DirectSaleItems;
