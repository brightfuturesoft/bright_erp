'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
export const SEOFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    return _jsxs('div', {
        className: 'flex gap-3 my-3 flex-col md:flex-row',
        children: [
            _jsx(Input, {
                placeholder: 'Page Title',
                value: filters.pageTitle || '',
                onChange: e =>
                    setFilters({ ...filters, pageTitle: e.target.value }),
                className: 'min-w-[200px]',
            }),
            _jsxs(Select, {
                placeholder: 'Status',
                value: filters.status || undefined,
                onChange: val => setFilters({ ...filters, status: val }),
                allowClear: true,
                className: 'min-w-[150px]',
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
            _jsx(Button, {
                onClick: onClear,
                type: 'default',
                children: 'Clear Filter',
            }),
        ],
    });
};
