'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
export const SocialLinkFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    return _jsxs('div', {
        className: 'flex gap-3 my-3 flex-wrap',
        children: [
            _jsxs(Select, {
                placeholder: 'Platform',
                value: filters.platform || undefined,
                onChange: val => setFilters({ ...filters, platform: val }),
                allowClear: true,
                children: [
                    _jsx(Select.Option, {
                        value: 'Facebook',
                        children: 'Facebook',
                    }),
                    _jsx(Select.Option, {
                        value: 'Instagram',
                        children: 'Instagram',
                    }),
                    _jsx(Select.Option, {
                        value: 'YouTube',
                        children: 'YouTube',
                    }),
                    _jsx(Select.Option, {
                        value: 'WhatsApp',
                        children: 'WhatsApp',
                    }),
                    _jsx(Select.Option, {
                        value: 'Twitter',
                        children: 'Twitter',
                    }),
                    _jsx(Select.Option, {
                        value: 'LinkedIn',
                        children: 'LinkedIn',
                    }),
                ],
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
            _jsx(Input, {
                placeholder: 'Created By',
                value: filters.createdBy || '',
                onChange: e =>
                    setFilters({ ...filters, createdBy: e.target.value }),
            }),
            _jsx(Button, { onClick: onClear, children: 'Clear Filter' }),
        ],
    });
};
