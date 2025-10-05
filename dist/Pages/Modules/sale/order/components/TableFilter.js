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
                    placeholder: 'Order Status',
                    children: [
                        _jsx(Select.Option, {
                            value: 'order1',
                            children: 'Order 1',
                        }),
                        _jsx(Select.Option, {
                            value: 'order2',
                            children: 'Order 2',
                        }),
                        _jsx(Select.Option, {
                            value: 'order3',
                            children: 'Order 3',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    className: 'flex-1',
                    placeholder: 'Delivery Status',
                    children: [
                        _jsx(Select.Option, {
                            value: 'delivery1',
                            children: 'Delivery 1',
                        }),
                        _jsx(Select.Option, {
                            value: 'delivery2',
                            children: 'Delivery 2',
                        }),
                        _jsx(Select.Option, {
                            value: 'delivery3',
                            children: 'Delivery 3',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    className: 'flex-1',
                    placeholder: 'Invoice Status',
                    children: [
                        _jsx(Select.Option, {
                            value: 'invoice1',
                            children: 'Invoice 1',
                        }),
                        _jsx(Select.Option, {
                            value: 'invoice2',
                            children: 'Invoice 2',
                        }),
                        _jsx(Select.Option, {
                            value: 'invoice3',
                            children: 'Invoice 3',
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
                        style: { width: '100%' },
                    }),
                }),
                _jsxs('div', {
                    className: 'flex flex-row gap-2',
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            children: 'Apply filter',
                        }),
                        _jsx(Button, { children: 'Clear filter' }),
                    ],
                }),
            ],
        }),
    });
};
export default TableFilter;
