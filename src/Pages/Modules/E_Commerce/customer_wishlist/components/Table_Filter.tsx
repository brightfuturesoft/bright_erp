// src/Pages/Modules/Wishlist/components/TableFilter.tsx
import { Input, Button } from 'antd';

interface TableFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <Input
                placeholder="Customer Name"
                value={filters.customer || ''}
                onChange={e =>
                    setFilters({ ...filters, customer: e.target.value })
                }
            />
            <Input
                placeholder="Product Name"
                value={filters.productName || ''}
                onChange={e =>
                    setFilters({ ...filters, productName: e.target.value })
                }
            />
            <div className="flex gap-2">
                <Button
                    type="primary"
                    onClick={() => {}}
                >
                    Apply filter
                </Button>
                <Button onClick={onClear}>Clear filter</Button>
            </div>
        </div>
    );
};

export default TableFilter;
