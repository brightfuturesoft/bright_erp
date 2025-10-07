'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
export const OutletFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    return _jsxs('div', {
        className: 'flex gap-3 my-3 flex-col md:flex-row',
        children: [
            _jsx(Input, {
                placeholder: 'Outlet Name',
                value: filters.name || '',
                onChange: e => setFilters({ ...filters, name: e.target.value }),
            }),
            _jsx(Input, {
                placeholder: 'Address',
                value: filters.address || '',
                onChange: e =>
                    setFilters({ ...filters, address: e.target.value }),
            }),
            _jsxs(Select, {
                placeholder: 'Status',
                value: filters.status || undefined,
                onChange: val => setFilters({ ...filters, status: val }),
                allowClear: true,
                style: { minWidth: 150 },
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
