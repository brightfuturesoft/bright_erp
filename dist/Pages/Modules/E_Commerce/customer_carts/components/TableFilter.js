import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// src/Pages/Modules/Cart/components/TableFilter.tsx
import { Input, Button } from 'antd';
const TableFilter = ({ filters, setFilters, onClear }) => {
    return _jsxs('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: [
            _jsx(Input, {
                placeholder: 'Customer Name',
                value: filters.customer || '',
                onChange: e =>
                    setFilters({ ...filters, customer: e.target.value }),
            }),
            _jsx(Input, {
                placeholder: 'Product Name',
                value: filters.productName || '',
                onChange: e =>
                    setFilters({ ...filters, productName: e.target.value }),
            }),
            _jsxs('div', {
                className: 'flex gap-2',
                children: [
                    _jsx(Button, {
                        type: 'primary',
                        onClick: () => {},
                        children: 'Apply filter',
                    }),
                    _jsx(Button, {
                        onClick: onClear,
                        children: 'Clear filter',
                    }),
                ],
            }),
        ],
    });
};
export default TableFilter;
