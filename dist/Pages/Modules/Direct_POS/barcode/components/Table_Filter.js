import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, Input } from 'antd';
const ProductFilter = ({ filters, setFilters, onClear }) => {
    return _jsx('div', {
        className: 'flex flex-row items-center gap-5 my-3',
        children: _jsxs('div', {
            className: 'flex flex-row flex-1 items-center gap-2',
            children: [
                _jsx(Input, {
                    placeholder: 'Search (Name, SKU, Brand, Category)',
                    value: filters.search || '',
                    onChange: e =>
                        setFilters({
                            ...filters,
                            search: e.target.value,
                        }),
                    className: 'flex-1',
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
export default ProductFilter;
