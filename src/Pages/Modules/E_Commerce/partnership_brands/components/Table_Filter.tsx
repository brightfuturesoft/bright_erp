'use client';

import React, { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface BrandFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const BrandFilter: React.FC<BrandFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex gap-3 my-3">
            <Input
                placeholder="Search..."
                value={filters.title || ''}
                onChange={e =>
                    setFilters({ ...filters, title: e.target.value })
                }
            />

            <Select
                placeholder="Status"
                value={filters.status || undefined}
                onChange={val => setFilters({ ...filters, status: val })}
                allowClear
            >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>

            <Button
                className="h-[38px]"
                onClick={onClear}
            >
                Clear Filter
            </Button>
        </div>
    );
};
