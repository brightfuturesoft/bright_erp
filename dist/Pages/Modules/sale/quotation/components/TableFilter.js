import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker, Select } from 'antd';
const TableFilter = () => {
    return _jsx('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: _jsxs('div', {
            className: 'flex flex-row flex-1 items-center gap-2',
            children: [
                _jsxs(Select, {
                    defaultValue: 'Option1',
                    className: 'flex-1',
                    children: [
                        _jsx(Select.Option, {
                            value: 'Option1',
                            children: 'Option1',
                        }),
                        _jsx(Select.Option, {
                            value: 'Option2',
                            children: 'Option2',
                        }),
                        _jsx(Select.Option, {
                            value: 'Option3',
                            children: 'Option3',
                        }),
                    ],
                }),
                _jsxs(Select, {
                    defaultValue: 'Option1',
                    className: 'flex-1',
                    children: [
                        _jsx(Select.Option, {
                            value: 'Option1',
                            children: 'Option1',
                        }),
                        _jsx(Select.Option, {
                            value: 'Option2',
                            children: 'Option2',
                        }),
                        _jsx(Select.Option, {
                            value: 'Option3',
                            children: 'Option3',
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
