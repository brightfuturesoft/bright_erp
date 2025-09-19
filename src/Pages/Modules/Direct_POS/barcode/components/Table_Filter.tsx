import { Button, Input, Select } from 'antd';

const ProductFilter = ({ filters, setFilters, onClear }: any) => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2">
                <Input
                    placeholder="Search by Product Name"
                    value={filters.productName || ''}
                    onChange={e =>
                        setFilters({ ...filters, productName: e.target.value })
                    }
                    className="flex-1"
                />

                <Input
                    placeholder="SKU"
                    value={filters.sku || ''}
                    onChange={e =>
                        setFilters({ ...filters, sku: e.target.value })
                    }
                    className="flex-1"
                />

                <Input
                    placeholder="Brand"
                    value={filters.brand || ''}
                    onChange={e =>
                        setFilters({ ...filters, brand: e.target.value })
                    }
                    className="flex-1"
                />

                <Input
                    placeholder="Category"
                    value={filters.category || ''}
                    onChange={e =>
                        setFilters({ ...filters, category: e.target.value })
                    }
                    className="flex-1"
                />

                <Select
                    placeholder="Status"
                    value={filters.status || undefined}
                    onChange={val => setFilters({ ...filters, status: val })}
                    className="flex-1"
                    allowClear
                >
                    <Select.Option value="Active">Active</Select.Option>
                    <Select.Option value="Inactive">Inactive</Select.Option>
                </Select>

                <div className="flex flex-row gap-2">
                    <Button onClick={onClear}>Clear filter</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
