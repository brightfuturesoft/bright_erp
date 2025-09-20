'use client';

import React, { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface SEOFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const SEOFilter: React.FC<SEOFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex gap-3 my-3 flex-col md:flex-row">
            {/* Page Title */}
            <Input
                placeholder="Page Title"
                value={filters.pageTitle || ''}
                onChange={e =>
                    setFilters({ ...filters, pageTitle: e.target.value })
                }
                className="min-w-[200px]"
            />

            {/* Status */}
            <Select
                placeholder="Status"
                value={filters.status || undefined}
                onChange={val => setFilters({ ...filters, status: val })}
                allowClear
                className="min-w-[150px]"
            >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>

            {/* Clear Button */}
            <Button
                onClick={onClear}
                type="default"
            >
                Clear Filter
            </Button>
        </div>
    );
};
