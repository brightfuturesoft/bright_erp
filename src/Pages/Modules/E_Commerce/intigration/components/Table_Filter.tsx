'use client';

import React, { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface SocialLinkFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const SocialLinkFilter: React.FC<SocialLinkFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex gap-3 my-3 flex-wrap">
            <Select
                placeholder="Platform"
                value={filters.platform || undefined}
                onChange={val => setFilters({ ...filters, platform: val })}
                allowClear
            >
                <Select.Option value="Facebook">Facebook</Select.Option>
                <Select.Option value="Instagram">Instagram</Select.Option>
                <Select.Option value="YouTube">YouTube</Select.Option>
                <Select.Option value="WhatsApp">WhatsApp</Select.Option>
                <Select.Option value="Twitter">Twitter</Select.Option>
                <Select.Option value="LinkedIn">LinkedIn</Select.Option>
            </Select>

            <Select
                placeholder="Status"
                value={filters.status || undefined}
                onChange={val => setFilters({ ...filters, status: val })}
                allowClear
            >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>

            <Input
                placeholder="Created By"
                value={filters.createdBy || ''}
                onChange={e =>
                    setFilters({ ...filters, createdBy: e.target.value })
                }
            />

            <Button onClick={onClear}>Clear Filter</Button>
        </div>
    );
};
