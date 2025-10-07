import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker, Select } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const TableFilter = ({ saleData, onFilterChange }) => {
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [customer, setCustomer] = useState('');
    const [dateRange, setDateRange] = useState(null);
    // Flatten all items for dropdowns
    const allItems = saleData?.flatMap(sale => sale.items) || [];
    const brands = Array.from(new Set(allItems.map(i => i.brand)));
    const categories = Array.from(new Set(allItems.map(i => i.category)));
    const customers = Array.from(
        new Set(saleData.map(s => s.customer?.name).filter(Boolean))
    );
    const applyFilter = () => {
        let filtered = allItems;
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
    return _jsxs('div', {
        className: 'flex flex-wrap items-center gap-3 my-3',
        children: [
            _jsx(Select, {
                placeholder: 'Select Brand',
                value: brand || undefined,
                onChange: setBrand,
                className: 'flex-1',
                allowClear: true,
                children: brands.map(b =>
                    _jsx(Select.Option, { value: b, children: b }, b)
                ),
            }),
            _jsx(Select, {
                placeholder: 'Select Category',
                value: category || undefined,
                onChange: setCategory,
                className: 'flex-1',
                allowClear: true,
                children: categories.map(c =>
                    _jsx(Select.Option, { value: c, children: c }, c)
                ),
            }),
            _jsx(Select, {
                placeholder: 'Select Customer',
                value: customer || undefined,
                onChange: setCustomer,
                className: 'flex-1',
                allowClear: true,
                children: customers.map(c =>
                    _jsx(Select.Option, { value: c, children: c }, c)
                ),
            }),
            _jsx(DatePicker.RangePicker, {
                className: 'flex-1 dark:bg-gray-800 dark:border-gray-500 h-10',
                value: dateRange,
                onChange: dates => setDateRange(dates),
                placeholder: ['From date', 'To date'],
                style: { width: '100%' },
            }),
            _jsxs('div', {
                className: 'flex gap-2',
                children: [
                    _jsx(Button, {
                        className: 'h-9',
                        type: 'primary',
                        onClick: applyFilter,
                        children: 'Apply filter',
                    }),
                    _jsx(Button, {
                        className: 'h-9',
                        onClick: clearFilter,
                        children: 'Clear filter',
                    }),
                ],
            }),
        ],
    });
};
export default TableFilter;
