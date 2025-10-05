'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
export const ReviewFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    return _jsxs('div', {
        className: 'flex gap-3 my-3 md:flex-row flex-col',
        children: [
            _jsx(Input, {
                placeholder: 'Review Text',
                value: filters.reviewText || '',
                onChange: e =>
                    setFilters({ ...filters, reviewText: e.target.value }),
            }),
            _jsx(Select, {
                placeholder: 'Rating',
                value: filters.rating || undefined,
                onChange: val => setFilters({ ...filters, rating: val }),
                allowClear: true,
                style: { width: 120 },
                children: [1, 2, 3, 4, 5].map(r =>
                    _jsx(Select.Option, { value: r, children: r }, r)
                ),
            }),
            _jsx(Input, {
                placeholder: 'Workspace ID',
                value: filters.workspace_id || '',
                onChange: e =>
                    setFilters({ ...filters, workspace_id: e.target.value }),
            }),
            _jsx(Input, {
                placeholder: 'Product ID',
                value: filters.product_id || '',
                onChange: e =>
                    setFilters({ ...filters, product_id: e.target.value }),
            }),
            _jsx(Button, { onClick: onClear, children: 'Clear Filter' }),
        ],
    });
};
