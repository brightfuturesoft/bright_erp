import { Button, DatePicker, Select } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface TableFilterProps {
    saleData: any[]; // Array of SaleDataType
    onFilterChange?: (filteredItems: any[]) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
    saleData,
    onFilterChange,
}) => {
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [customer, setCustomer] = useState('');
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

    // Flatten all items for dropdowns
    const allItems = saleData?.flatMap(sale => sale.items) || [];

    const brands = Array.from(new Set(allItems.map(i => i.brand)));
    const categories = Array.from(new Set(allItems.map(i => i.category)));
    const customers = Array.from(
        new Set(saleData.map(s => s.customer?.name).filter(Boolean))
    );

    const applyFilter = () => {
        let filtered: any[] = allItems;

        if (brand) filtered = filtered.filter(i => i.brand === brand);
        if (category) filtered = filtered.filter(i => i.category === category);
        if (customer)
            filtered = filtered.filter(i =>
                saleData.some(
                    s => s.customer?.name === customer && s.items.includes(i)
                )
            );
        if (dateRange) {
            const [start, end] = dateRange;
            filtered = filtered.filter(i =>
                saleData.some(
                    s =>
                        s.items.includes(i) &&
                        dayjs(s.createAt).isSameOrAfter(start, 'day') &&
                        dayjs(s.createAt).isSameOrBefore(end, 'day')
                )
            );
        }

        onFilterChange?.(filtered);
    };

    const clearFilter = () => {
        setBrand('');
        setCategory('');
        setCustomer('');
        setDateRange(null);
        onFilterChange?.(allItems);
    };

    return (
        <div className="flex flex-wrap items-center gap-3 my-3">
            <Select
                placeholder="Select Brand"
                value={brand || undefined}
                onChange={setBrand}
                className="flex-1"
                allowClear
            >
                {brands.map(b => (
                    <Select.Option
                        key={b}
                        value={b}
                    >
                        {b}
                    </Select.Option>
                ))}
            </Select>

            <Select
                placeholder="Select Category"
                value={category || undefined}
                onChange={setCategory}
                className="flex-1"
                allowClear
            >
                {categories.map(c => (
                    <Select.Option
                        key={c}
                        value={c}
                    >
                        {c}
                    </Select.Option>
                ))}
            </Select>

            <Select
                placeholder="Select Customer"
                value={customer || undefined}
                onChange={setCustomer}
                className="flex-1"
                allowClear
            >
                {customers.map(c => (
                    <Select.Option
                        key={c}
                        value={c}
                    >
                        {c}
                    </Select.Option>
                ))}
            </Select>

            <DatePicker.RangePicker
                className="flex-1 dark:bg-gray-800 dark:border-gray-500 h-10"
                value={dateRange}
                onChange={dates => setDateRange(dates as [Dayjs, Dayjs])}
                placeholder={['From date', 'To date']}
                style={{ width: '100%' }}
            />

            <div className="flex gap-2">
                <Button
                    className="h-9"
                    type="primary"
                    onClick={applyFilter}
                >
                    Apply filter
                </Button>
                <Button
                    className="h-9"
                    onClick={clearFilter}
                >
                    Clear filter
                </Button>
            </div>
        </div>
    );
};

export default TableFilter;
