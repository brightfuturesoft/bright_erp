'use client';

import React, { useEffect, useState, useContext } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import moment from 'moment';

interface BlogFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);
    const [categories, setCategories] = useState<any[]>([]);

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

    return (
        <div className="flex flex-wrap gap-3 my-3">
            <Input
                placeholder="Title"
                className="flex-1"
                value={filters.title || ''}
                onChange={e =>
                    setFilters({ ...filters, title: e.target.value })
                }
            />

            <Select
                placeholder="Category"
                className="flex-1"
                value={filters.category || undefined}
                onChange={val => setFilters({ ...filters, category: val })}
                allowClear
            >
                {categories.map(cat => (
                    <Select.Option
                        key={cat._id}
                        value={cat.name}
                    >
                        {cat.name}
                    </Select.Option>
                ))}
            </Select>

            <Select
                placeholder="Status"
                className="flex-1"
                value={filters.status || undefined}
                onChange={val => setFilters({ ...filters, status: val })}
                allowClear
            >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
            <DatePicker.RangePicker
                className="flex-1"
                value={filters.dateRange || undefined}
                onChange={(dates: any) => {
                    if (!dates) setFilters({ ...filters, dateRange: null });
                    else
                        setFilters({
                            ...filters,
                            dateRange: [moment(dates[0]), moment(dates[1])],
                        });
                }}
            />

            <div className="flex gap-2">
                <Button onClick={onClear}>Clear Filter</Button>
            </div>
        </div>
    );
};
