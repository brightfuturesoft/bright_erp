'use client';

import React, { useContext } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import moment from 'moment';

interface FaqFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const FaqFilter: React.FC<FaqFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex flex-wrap gap-3 my-3">
            {/* Question Filter */}
            <Input
                placeholder="Question"
                className="flex-1"
                value={filters.question || ''}
                onChange={e =>
                    setFilters({ ...filters, question: e.target.value })
                }
            />

            {/* Answer Filter */}
            <Input
                placeholder="Answer"
                className="flex-1"
                value={filters.answer || ''}
                onChange={e =>
                    setFilters({ ...filters, answer: e.target.value })
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
                className="flex-1
               bg-white text-gray-900 border border-gray-300
               dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
               placeholder-gray-400 dark:placeholder-gray-300"
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
            <div className="flex gap-2 h-10">
                <Button onClick={onClear}>Clear Filter</Button>
            </div>
        </div>
    );
};
