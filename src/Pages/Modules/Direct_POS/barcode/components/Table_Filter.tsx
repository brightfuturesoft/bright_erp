import { Button, Input } from 'antd';

const ProductFilter = ({ filters, setFilters, onClear }: any) => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2">
                <Input
                    placeholder="Search (Name, SKU, Brand, Category)"
                    value={filters.search || ''}
                    onChange={e =>
                        setFilters({
                            ...filters,
                            search: e.target.value,
                        })
                    }
                    className="flex-1"
                />

                <div className="flex flex-row gap-2">
                    <Button onClick={onClear}>Clear filter</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
