'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
export const CustomSectionFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    return _jsxs('div', {
        className: 'flex flex-wrap gap-3 my-3',
        children: [
            _jsx(Input, {
                placeholder: 'Title',
                className: 'flex-1',
                value: filters.title || '',
                onChange: e =>
                    setFilters({ ...filters, title: e.target.value }),
            }),
            _jsx(Input, {
                placeholder: 'Created By',
                className: 'flex-1',
                value: filters.createdBy || '',
                onChange: e =>
                    setFilters({ ...filters, createdBy: e.target.value }),
            }),
            _jsxs(Select, {
                placeholder: 'Status',
                className: 'flex-1',
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
            _jsx('div', {
                className: 'flex gap-2',
                children: _jsx(Button, {
                    onClick: onClear,
                    children: 'Clear Filter',
                }),
            }),
        ],
    });
};
