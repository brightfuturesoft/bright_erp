import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker, Input, Select } from 'antd';
const TableFilter = ({ filters, setFilters, onClear }) => {
    return _jsx('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: _jsxs('div', {
            className: 'flex flex-row flex-1 items-center gap-2',
            children: [
                _jsx(Input, {
                    placeholder: 'Search by Order Number',
                    value: filters.orderNumber || '',
                    onChange: e =>
                        setFilters({ ...filters, orderNumber: e.target.value }),
                    className: 'flex-1',
                }),
                _jsx(Input, {
                    placeholder: 'Customer Name',
                    className: 'flex-1',
                    value: filters.customer || '',
                    onChange: e =>
                        setFilters({ ...filters, customer: e.target.value }),
                }),
                _jsxs(Select, {
                    placeholder: 'Payment Method',
                    className: 'flex-1',
                    value: filters.paymentMethod || undefined,
                    onChange: val =>
                        setFilters({ ...filters, paymentMethod: val }),
                    allowClear: true,
                    children: [
                        _jsx(Select.Option, {
                            value: 'cash',
                            children: 'Cash',
                        }),
                        _jsx(Select.Option, {
                            value: 'card',
                            children: 'Card',
                        }),
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
                    className:
                        'flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2',
                    popupClassName: 'dark:bg-gray-700 dark:text-white',
                    value: filters.dateRange || undefined,
                    onChange: dates => {
                        if (!dates) setFilters({ ...filters, dateRange: null });
                        else
                            setFilters({
                                ...filters,
                                dateRange: [dates[0], dates[1]],
                            });
                    },
                }),
                _jsx('div', {
                    className: 'flex flex-row gap-2',
                    children: _jsx(Button, {
                        onClick: onClear,
                        children: 'Clear filter',
                    }),
                }),
            ],
        }),
    });
};
export default TableFilter;
