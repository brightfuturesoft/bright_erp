import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker, Select } from 'antd';
const TableFilter = () => {
    return _jsx('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: _jsxs('div', {
            className: 'flex flex-row flex-1 items-center gap-2',
            children: [
                _jsxs(Select, {
                    className: 'flex-1',
                    placeholder: 'Select Customer',
                    children: [
                        _jsx(Select.Option, {
                            value: 'customer1',
                            children: 'Customer 1',
                        }),
                        _jsx(Select.Option, {
                            value: 'customer2',
                            children: 'Customer 2',
                        }),
                        _jsx(Select.Option, {
                            value: 'customer3',
                            children: 'Customer 3',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    className: 'flex-1',
                    placeholder: 'Return Status',
                    children: [
                        _jsx(Select.Option, {
                            value: 'order1',
                            children: 'Approved',
                        }),
                        _jsx(Select.Option, {
                            value: 'order2',
                            children: 'Cancelled',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    className: 'flex-1',
                    placeholder: 'Select Range',
                    children: [
                        _jsx(Select.Option, {
                            value: 'range1',
                            children: 'Range 1',
                        }),
                        _jsx(Select.Option, {
                            value: 'range2',
                            children: 'Range 2',
                        }),
                        _jsx(Select.Option, {
                            value: 'range3',
                            children: 'Range 3',
                        }),
                    ],
                }),
                _jsx('div', {
                    className: 'flex-1',
                    children: _jsx(DatePicker.RangePicker, {
                        placeholder: ['From date', 'To date'],
                        style: {
                            width: '100%',
                            height: '40px',
                            padding: '20px 10px',
                        },
                    }),
                }),
                _jsxs('div', {
                    className: 'flex flex-row gap-2',
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            className:
                                'bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white',
                            children: 'Apply filter',
                        }),
                        _jsx(Button, {
                            className:
                                'bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white',
                            children: 'Clear filter',
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default TableFilter;
