'use client';

import React, { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface OutletFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const OutletFilter: React.FC<OutletFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex gap-3 my-3 flex-col md:flex-row">
            <Input
                placeholder="Outlet Name"
                value={filters.name || ''}
                onChange={e => setFilters({ ...filters, name: e.target.value })}
            />

            <Input
                placeholder="Address"
                value={filters.address || ''}
                onChange={e =>
                    setFilters({ ...filters, address: e.target.value })
                }
            />

            <Select
                placeholder="Status"
                value={filters.status || undefined}
                onChange={val => setFilters({ ...filters, status: val })}
                allowClear
                style={{ minWidth: 150 }}
            >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>

            <Button onClick={onClear}>Clear Filter</Button>
        </div>
    );
};
