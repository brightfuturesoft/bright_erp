'use client';

import React, { useContext } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import moment from 'moment';

interface CustomSectionFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const CustomSectionFilter: React.FC<CustomSectionFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex flex-wrap gap-3 my-3">
            {/* Title Filter */}
            <Input
                placeholder="Title"
                className="flex-1"
                value={filters.title || ''}
                onChange={e =>
                    setFilters({ ...filters, title: e.target.value })
                }
            />

            {/* Created By Filter */}
            <Input
                placeholder="Created By"
                className="flex-1"
                value={filters.createdBy || ''}
                onChange={e =>
                    setFilters({ ...filters, createdBy: e.target.value })
                }
            />

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

            {/* Date Range Filter */}
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

            {/* Clear Filter Button */}
            <div className="flex gap-2">
                <Button onClick={onClear}>Clear Filter</Button>
            </div>
        </div>
    );
};
