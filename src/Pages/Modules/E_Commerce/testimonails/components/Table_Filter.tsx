'use client';

import React, { useEffect, useState, useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';

interface TestimonialsFilterProps {
    filters: {
        name?: string;
        createdBy?: string;
        status?: string;
    };
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const TestimonialsFilter: React.FC<TestimonialsFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);
    const [creators, setCreators] = useState<{ _id: string; name: string }[]>(
        []
    );

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

    return (
        <div className="flex flex-wrap gap-3 my-3">
            {/* Name Filter */}
            <Input
                placeholder="Name"
                className="flex-1"
                value={filters.name || ''}
                onChange={e => setFilters({ ...filters, name: e.target.value })}
            />

            {/* Created By Filter */}
            <Select
                placeholder="Created By"
                className="flex-1"
                value={filters.createdBy || undefined}
                onChange={val => setFilters({ ...filters, createdBy: val })}
                allowClear
            >
                {creators.map(user => (
                    <Select.Option
                        key={user._id}
                        value={user.name}
                    >
                        {user.name}
                    </Select.Option>
                ))}
            </Select>

            {/* Status Filter */}
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

            {/* Clear Button */}
            <div className="flex gap-2">
                <Button onClick={onClear}>Clear Filter</Button>
            </div>
        </div>
    );
};
