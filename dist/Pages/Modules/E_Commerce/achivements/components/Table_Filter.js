'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState, useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
export const AchievementsFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    const [creators, setCreators] = useState([]);
    // Fetch all users/creators for "Created By" filter
    const { refetch } = useQuery({
        queryKey: ['workspaceUsers'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}auth/get-users`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            const data = await res.json();
            setCreators(data.data || []);
            return data.data;
        },
    });
    useEffect(() => {
        refetch();
    }, [refetch]);
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
            _jsx(Select, {
                placeholder: 'Created By',
                className: 'flex-1',
                value: filters.createdBy || undefined,
                onChange: val => setFilters({ ...filters, createdBy: val }),
                allowClear: true,
                children: creators.map(user =>
                    _jsx(
                        Select.Option,
                        { value: user.name, children: user.name },
                        user._id
                    )
                ),
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
