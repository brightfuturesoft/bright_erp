'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState, useContext } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import moment from 'moment';
export const BlogFilter = ({ filters, setFilters, onClear }) => {
    const { user } = useContext(Erp_context);
    const [categories, setCategories] = useState([]);
    // Fetch categories
    const { refetch } = useQuery({
        queryKey: ['blogCategories'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/blog-category/get-blog-categories`,
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
            setCategories(data.data || []);
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
                placeholder: 'Category',
                className: 'flex-1',
                value: filters.category || undefined,
                onChange: val => setFilters({ ...filters, category: val }),
                allowClear: true,
                children: categories.map(cat =>
                    _jsx(
                        Select.Option,
                        { value: cat.name, children: cat.name },
                        cat._id
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
            _jsx(DatePicker.RangePicker, {
                className:
                    'flex-1\n               bg-white text-gray-900\n               dark:bg-gray-800 dark:text-white\n               border border-gray-300 dark:border-gray-700\n               rounded-md\n               placeholder:text-gray-400 dark:placeholder:text-gray-300',
                value: filters.dateRange || undefined,
                onChange: dates => {
                    if (!dates) setFilters({ ...filters, dateRange: null });
                    else
                        setFilters({
                            ...filters,
                            dateRange: [moment(dates[0]), moment(dates[1])],
                        });
                },
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
