import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';
const TableFilter = ({ filters, setFilters, onClear }) => {
    const handleGlobalSearch = e => {
        const value = e.target.value;
        setFilters({ ...filters, globalSearch: value });
    };
    return _jsxs('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: [
            _jsx(Input, {
                placeholder: 'Search order, customer, or product...',
                value: filters.globalSearch || '',
                onChange: handleGlobalSearch,
                className: 'flex-1',
            }),
            _jsxs(Select, {
                placeholder: 'Payment Method',
                className: 'flex-1',
                value: filters.paymentMethod || undefined,
                onChange: val => setFilters({ ...filters, paymentMethod: val }),
                allowClear: true,
                children: [
                    _jsx(Select.Option, { value: 'cash', children: 'Cash' }),
                    _jsx(Select.Option, { value: 'card', children: 'Card' }),
                    _jsx(Select.Option, { value: 'bkash', children: 'Bkash' }),
                    _jsx(Select.Option, { value: 'nagad', children: 'Nagad' }),
                ],
            }),
            _jsx(DatePicker.RangePicker, {
                className:
                    'flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 h-[38px]',
                popupClassName: 'dark:!bg-gray-700 dark:!text-white',
                value: filters.dateRange || undefined,
                onChange: dates => {
                    if (!dates) setFilters({ ...filters, dateRange: null });
                    else
                        setFilters({
                            ...filters,
                            dateRange: [
                                moment(dates[0]).startOf('day'),
                                moment(dates[1]).endOf('day'),
                            ],
                        });
                },
            }),
            _jsx(Button, {
                className: 'h-[38px]',
                onClick: onClear,
                children: 'Clear filter',
            }),
        ],
    });
};
export default TableFilter;
