import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
const TableFilter = ({ filters, setFilters, onApply, onClear }) => {
    return _jsx('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: _jsxs('div', {
            className: 'flex flex-row flex-1 items-center gap-2 flex-wrap',
            children: [
                _jsx(Input, {
                    placeholder: 'Customer Name',
                    className: 'flex-1 min-w-[180px]',
                    value: filters.customer || '',
                    onChange: e =>
                        setFilters({ ...filters, customer: e.target.value }),
                }),
                _jsx(Input, {
                    placeholder: 'Product Name',
                    className: 'flex-1 min-w-[180px]',
                    value: filters.productName || '',
                    onChange: e =>
                        setFilters({ ...filters, productName: e.target.value }),
                }),
                _jsxs(Select, {
                    placeholder: 'Order Status',
                    className: 'flex-1 min-w-[160px]',
                    value: filters.orderStatus || undefined,
                    onChange: val =>
                        setFilters({ ...filters, orderStatus: val }),
                    allowClear: true,
                    children: [
                        _jsx(Select.Option, {
                            value: 'pending',
                            children: 'Pending',
                        }),
                        _jsx(Select.Option, {
                            value: 'delivered',
                            children: 'Delivered',
                        }),
                        _jsx(Select.Option, {
                            value: 'cancelled',
                            children: 'Cancelled',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    placeholder: 'Payment Status',
                    className: 'flex-1 min-w-[160px]',
                    value: filters.paymentStatus || undefined,
                    onChange: val =>
                        setFilters({ ...filters, paymentStatus: val }),
                    allowClear: true,
                    children: [
                        _jsx(Select.Option, {
                            value: 'pending',
                            children: 'Pending',
                        }),
                        _jsx(Select.Option, {
                            value: 'paid',
                            children: 'Paid',
                        }),
                        _jsx(Select.Option, {
                            value: 'failed',
                            children: 'Failed',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    placeholder: 'Payment Method',
                    className: 'flex-1 min-w-[160px]',
                    value: filters.paymentMethod || undefined,
                    onChange: val =>
                        setFilters({ ...filters, paymentMethod: val }),
                    allowClear: true,
                    children: [
                        _jsx(Select.Option, { value: 'cod', children: 'COD' }),
                        _jsx(Select.Option, {
                            value: 'bkash',
                            children: 'Bkash',
                        }),
                        _jsx(Select.Option, {
                            value: 'nagad',
                            children: 'Nagad',
                        }),
                    ],
                }),
                _jsx(DatePicker.RangePicker, {
                    className: 'flex-1 min-w-[220px]',
                    value: filters.dateRange
                        ? [
                              dayjs(filters.dateRange[0]),
                              dayjs(filters.dateRange[1]),
                          ]
                        : undefined,
                    onChange: dates => {
                        if (!dates) setFilters({ ...filters, dateRange: null });
                        else
                            setFilters({
                                ...filters,
                                dateRange: [dayjs(dates[0]), dayjs(dates[1])],
                            });
                    },
                }),
                _jsxs('div', {
                    className: 'flex flex-row gap-2',
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            onClick: onApply,
                            children: 'Apply filter',
                        }),
                        _jsx(Button, {
                            onClick: onClear,
                            children: 'Clear filter',
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default TableFilter;
