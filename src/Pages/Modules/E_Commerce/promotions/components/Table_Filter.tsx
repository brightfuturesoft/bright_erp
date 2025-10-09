'use client';

import React, { useContext } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import moment from 'moment';

interface PromotionFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const PromotionFilter: React.FC<PromotionFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex flex-wrap gap-3 my-3">
            {/* Title Filter */}
            <Input
                placeholder="Search..."
                className="flex-1"
                value={filters.title || ''}
                onChange={e =>
                    setFilters({ ...filters, title: e.target.value })
                }
            />

            {/* Button Text Filter */}
            {/* <Input
                placeholder="Button Text"
                className="flex-1"
                value={filters.button_text || ''}
                onChange={e =>
                    setFilters({ ...filters, button_text: e.target.value })
                }
            /> */}

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

            {/* Clear Filter Button */}
            <div className="flex gap-2">
                <Button onClick={onClear}>Clear Filter</Button>
            </div>
        </div>
    );
};
