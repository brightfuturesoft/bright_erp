'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
export const PolicyFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    return _jsxs('div', {
        className: 'flex gap-3 my-3',
        children: [
            _jsx(Input, {
                placeholder: 'Title',
                value: filters.title || '',
                onChange: e =>
                    setFilters({ ...filters, title: e.target.value }),
            }),
            _jsxs(Select, {
                placeholder: 'Status',
                value: filters.status || undefined,
                onChange: val => setFilters({ ...filters, status: val }),
                allowClear: true,
                children: [
                    _jsx(Select.Option, {
                        value: 'Active',
                        children: 'Active',
                    }),
                    _jsx(Select.Option, {
                        value: 'Inactive',
                        children: 'Inactive',
                    }),
                ],
            }),
            _jsx(Button, { onClick: onClear, children: 'Clear Filter' }),
        ],
    });
};
