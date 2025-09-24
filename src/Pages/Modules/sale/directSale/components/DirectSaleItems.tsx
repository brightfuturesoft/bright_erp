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
} from 'antd';
import { useState } from 'react';
import UnitDropdown from './UnitDropdown';

interface Product {
    key: number;
    name: string;
    itemType: string;
    stock: number;
    price: number;
    vat: number;
    discount: number;
    brand?: string;
    color?: string;
    size?: string;
    manufacture?: string;
    category?: string;
}

interface Props {
    form: any;
}

// Sample product list
const allProducts: Product[] = [
    {
        key: 0,
        name: 'Bata Socks',
        itemType: 'Clothing',
        stock: 50,
        price: 200,
        vat: 5,
        discount: 10,
        brand: 'Bata',
        color: 'Black',
        size: 'M',
        manufacture: 'Bata Ltd',
        category: 'Socks',
    },
    {
        key: 1,
        name: 'Heat Pass',
        itemType: 'Electronics',
        stock: 100,
        price: 1.5,
        vat: 0,
        discount: 0,
        brand: 'Heat',
        color: 'Red',
        size: 'One Size',
        manufacture: 'Heat Inc',
        category: 'Access',
    },
    {
        key: 2,
        name: 'Green Tea Pack',
        itemType: 'Beverage',
        stock: 30,
        price: 20,
        vat: 10,
        discount: 5,
        brand: 'Green',
        color: 'Green',
        size: '250g',
        manufacture: 'Tea Ltd',
        category: 'Tea',
    },
];

const DirectSaleItems: React.FC<Props> = ({ form }) => {
    const [items, setItems] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [filters, setFilters] = useState({
        brand: 'Bata', // default value
        color: '',
        size: 'M', // default value
        manufacture: 'Bata Ltd', // default value
        category: '',
        itemType: '',
        search: '',
    });

    const filteredProducts = allProducts.filter(
        p =>
            (!filters.brand || p.brand === filters.brand) &&
            (!filters.color || p.color === filters.color) &&
            (!filters.size || p.size === filters.size) &&
            (!filters.manufacture || p.manufacture === filters.manufacture) &&
            (!filters.category || p.category === filters.category) &&
            (!filters.itemType || p.itemType === filters.itemType) &&
            (!filters.search ||
                p.name.toLowerCase().includes(filters.search.toLowerCase()))
    );

    const addSelectedItems = () => {
        const newItems = filteredProducts.filter(p =>
            selectedRowKeys.includes(p.key)
        );
        const updatedItems = [
            ...items,
            ...newItems.map(p => ({
                ...p,
                quantity: 1,
            })),
        ];
        setItems(updatedItems);
        setIsModalOpen(false);
        setSelectedRowKeys([]);
    };

    const removeItem = (key: number) => {
        setItems(items.filter(item => item.key !== key));
    };

    const modalColumns = [
        { title: 'Item Name', dataIndex: 'name', key: 'name' },
        { title: 'Item Type', dataIndex: 'itemType', key: 'itemType' },
        { title: 'Available Stock', dataIndex: 'stock', key: 'stock' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'VAT', dataIndex: 'vat', key: 'vat' },
        { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    ];

    const mainColumns = [
        { title: 'Item', dataIndex: 'name', key: 'name' },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            render: (_: any, record: any, index: number) => (
                <Form.Item
                    name={['items', index, 'unit']}
                    noStyle
                >
                    <UnitDropdown />
                </Form.Item>
            ),
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any, record: any, index: number) => (
                <Form.Item
                    name={['items', index, 'quantity']}
                    noStyle
                    initialValue={1}
                >
                    <Input
                        type="number"
                        min={1}
                    />
                </Form.Item>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_: any, record: any, index: number) => (
                <Form.Item
                    name={['items', index, 'price']}
                    noStyle
                    initialValue={0}
                >
                    <Input
                        type="number"
                        min={0}
                    />
                </Form.Item>
            ),
        },
        {
            title: 'Discount %',
            dataIndex: 'discount',
            key: 'discount',
            render: (_: any, record: any, index: number) => (
                <Form.Item
                    name={['items', index, 'discount']}
                    noStyle
                    initialValue={0}
                >
                    <Input
                        type="number"
                        min={0}
                        max={100}
                    />
                </Form.Item>
            ),
        },
        {
            title: 'VAT %',
            dataIndex: 'vat',
            key: 'vat',
            render: (_: any, record: any, index: number) => (
                <Form.Item
                    name={['items', index, 'vat']}
                    noStyle
                    initialValue={0}
                >
                    <Input
                        type="number"
                        min={0}
                        max={100}
                    />
                </Form.Item>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => removeItem(record.key)}
                />
            ),
        },
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">Items</h3>
            <Table
                dataSource={items}
                columns={mainColumns}
                pagination={false}
                rowKey="key"
            />
            <Button
                type="dashed"
                className="mt-3"
                onClick={() => setIsModalOpen(true)}
            >
                Add another Item
            </Button>

            <Modal
                title="Select Item"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={addSelectedItems}
                width={1300} // wider modal
                bodyStyle={{ maxHeight: '75vh', overflowY: 'auto' }} // scrollable
                okText="Add Selected Items"
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: '100%' }}
                >
                    {/* Filters */}
                    <Row
                        gutter={16}
                        className="mb-3"
                    >
                        <Col span={6}>
                            <Input
                                placeholder="Search"
                                value={filters.search}
                                onChange={e =>
                                    setFilters({
                                        ...filters,
                                        search: e.target.value,
                                    })
                                }
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                placeholder="Brand"
                                value={filters.brand}
                                onChange={val =>
                                    setFilters({ ...filters, brand: val })
                                }
                                allowClear
                                options={[
                                    ...new Set(allProducts.map(p => p.brand)),
                                ].map(b => ({ label: b, value: b }))}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                placeholder="Color"
                                value={filters.color}
                                onChange={val =>
                                    setFilters({ ...filters, color: val })
                                }
                                allowClear
                                options={[
                                    ...new Set(allProducts.map(p => p.color)),
                                ].map(c => ({ label: c, value: c }))}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                placeholder="Size"
                                value={filters.size}
                                onChange={val =>
                                    setFilters({ ...filters, size: val })
                                }
                                allowClear
                                options={[
                                    ...new Set(allProducts.map(p => p.size)),
                                ].map(s => ({ label: s, value: s }))}
                                style={{ width: '100%' }}
                            />
                        </Col>
                    </Row>
                    <Row
                        gutter={16}
                        className="mb-3"
                    >
                        <Col span={6}>
                            <Select
                                placeholder="Manufacture"
                                value={filters.manufacture}
                                onChange={val =>
                                    setFilters({ ...filters, manufacture: val })
                                }
                                allowClear
                                options={[
                                    ...new Set(
                                        allProducts.map(p => p.manufacture)
                                    ),
                                ].map(m => ({ label: m, value: m }))}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                placeholder="Category"
                                value={filters.category}
                                onChange={val =>
                                    setFilters({ ...filters, category: val })
                                }
                                allowClear
                                options={[
                                    ...new Set(
                                        allProducts.map(p => p.category)
                                    ),
                                ].map(c => ({ label: c, value: c }))}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Select
                                placeholder="Item Type"
                                value={filters.itemType}
                                onChange={val =>
                                    setFilters({ ...filters, itemType: val })
                                }
                                allowClear
                                options={[
                                    ...new Set(
                                        allProducts.map(p => p.itemType)
                                    ),
                                ].map(t => ({ label: t, value: t }))}
                                style={{ width: '100%' }}
                            />
                        </Col>
                    </Row>

                    {/* Products Table */}
                    <Table
                        dataSource={filteredProducts}
                        columns={modalColumns}
                        rowKey="key"
                        rowSelection={{
                            selectedRowKeys,
                            onChange: keys =>
                                setSelectedRowKeys(keys as number[]),
                        }}
                        pagination={{ pageSize: 5 }}
                    />
                </Space>
            </Modal>
        </div>
    );
};

export default DirectSaleItems;
