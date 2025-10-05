import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, DatePicker } from 'antd';
const TableFilter = () => {
    return _jsx('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: _jsxs('div', {
            className: 'flex flex-row flex-1 items-center gap-2',
            children: [
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
