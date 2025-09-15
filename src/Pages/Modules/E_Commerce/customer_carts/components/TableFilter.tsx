// src/Pages/Modules/Cart/components/TableFilter.tsx
import { Input, Button } from 'antd';

const TableFilter = ({ filters, setFilters, onClear }: any) => {
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
