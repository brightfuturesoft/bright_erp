import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// TableFilter.tsx
import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';
const TableFilter = ({ filters, setFilters, onClear, onApply }) => {
    return _jsxs('div', {
        className: 'flex flex-row flex-wrap items-center gap-3 my-3',
        children: [
            _jsx(Input, {
                placeholder: 'Customer Name',
                className: 'flex-1 min-w-[150px]',
                value: filters.customer || '',
                onChange: e =>
                    setFilters({ ...filters, customer: e.target.value }),
            }),
            _jsx(Input, {
                placeholder: 'Product Name',
                className: 'flex-1 min-w-[150px]',
                value: filters.productName || '',
                onChange: e =>
                    setFilters({ ...filters, productName: e.target.value }),
            }),
            _jsxs(Select, {
                placeholder: 'Order Status',
                className: 'flex-1 min-w-[150px]',
                value: filters.orderStatus || undefined,
                onChange: val => setFilters({ ...filters, orderStatus: val }),
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
                className: 'flex-1 min-w-[150px]',
                value: filters.paymentStatus || undefined,
                onChange: val => setFilters({ ...filters, paymentStatus: val }),
                allowClear: true,
                children: [
                    _jsx(Select.Option, {
                        value: 'pending',
                        children: 'Pending',
                    }),
                    _jsx(Select.Option, { value: 'paid', children: 'Paid' }),
                    _jsx(Select.Option, {
                        value: 'failed',
                        children: 'Failed',
                    }),
                ],
            }),
            _jsxs(Select, {
                placeholder: 'Payment Method',
                className: 'flex-1 min-w-[150px]',
                value: filters.paymentMethod || undefined,
                onChange: val => setFilters({ ...filters, paymentMethod: val }),
                allowClear: true,
                children: [
                    _jsx(Select.Option, { value: 'cod', children: 'COD' }),
                    _jsx(Select.Option, { value: 'bkash', children: 'Bkash' }),
                    _jsx(Select.Option, { value: 'nagad', children: 'Nagad' }),
                ],
            }),
            _jsx(DatePicker.RangePicker, {
                className: 'flex-1 min-w-[200px]',
                value: filters.dateRange || undefined,
                onChange: dates => {
                    if (!dates) setFilters({ ...filters, dateRange: null });
                    else
                        setFilters({
                            ...filters,
                            dateRange: [moment(dates[0]), moment(dates[1])],
                        });
                },
            }),
            _jsxs('div', {
                className: 'flex flex-row gap-2',
                children: [
                    _jsx(Button, {
                        type: 'primary',
                        onClick: onApply,
                        children: 'Apply Filter',
                    }),
                    _jsx(Button, { onClick: onClear, children: 'Clear' }),
                ],
            }),
        ],
    });
};
export default TableFilter;
