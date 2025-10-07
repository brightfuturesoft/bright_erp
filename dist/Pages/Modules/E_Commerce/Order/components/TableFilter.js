import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';
const TableFilter = ({ filters, setFilters, onClear }) => {
    return _jsx('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: _jsxs('div', {
            className: 'flex flex-row flex-1 items-center gap-2',
            children: [
                _jsx(Input, {
                    placeholder: 'Customer Name',
                    className: 'flex-1',
                    value: filters.customer || '',
                    onChange: e =>
                        setFilters({ ...filters, customer: e.target.value }),
                }),
                _jsx(Input, {
                    placeholder: 'Product Name',
                    className: 'flex-1',
                    value: filters.productName || '',
                    onChange: e =>
                        setFilters({ ...filters, productName: e.target.value }),
                }),
                _jsxs(Select, {
                    placeholder: 'Order Status',
                    className: 'flex-1',
                    value: filters.orderStatus || undefined,
                    onChange: val =>
                        setFilters({ ...filters, orderStatus: val }),
                    allowClear: true,
                    children: [
                        _jsx(Select.Option, {
                            value: 'Pending',
                            children: 'Pending',
                        }),
                        _jsx(Select.Option, {
                            value: 'Delivered',
                            children: 'Delivered',
                        }),
                        _jsx(Select.Option, {
                            value: 'Shipped',
                            children: 'Shipped',
                        }),
                        _jsx(Select.Option, {
                            value: 'Cancelled',
                            children: 'Cancelled',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    placeholder: 'Payment Method',
                    className: 'flex-1',
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
                    value: filters.dateRange || undefined,
                    onChange: dates => {
                        if (!dates) setFilters({ ...filters, dateRange: null });
                        else
                            setFilters({
                                ...filters,
                                dateRange: [moment(dates[0]), moment(dates[1])],
                            });
                    },
                    className:
                        '\n                flex-1 \n                bg-white text-gray-900 \n                border border-gray-300 \n                rounded-md \n                px-3 py-2\n                placeholder-gray-400\n                focus:outline-none focus:ring-2 focus:ring-blue-500 \n                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:placeholder-gray-400\n            ',
                }),
                _jsx('div', {
                    className: 'flex flex-row gap-2',
                    children: _jsx(Button, {
                        onClick: onClear,
                        className:
                            '\n                    bg-gray-200 text-gray-900 \n                    hover:bg-gray-300 \n                    dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600\n                    px-4 py-2 rounded-md h-[38px]\n                    transition-colors duration-200\n                ',
                        children: 'Clear filter',
                    }),
                }),
            ],
        }),
    });
};
export default TableFilter;
