'use client';

import React, { useContext } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';

interface CouponFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const CouponFilter: React.FC<CouponFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex gap-3 my-3">
            <Input
                placeholder="Code"
                value={filters.code || ''}
                onChange={e => setFilters({ ...filters, code: e.target.value })}
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

            <DatePicker.RangePicker
                value={filters.dateRange || undefined}
                onChange={dates => {
                    if (!dates) setFilters({ ...filters, dateRange: null });
                    else
                        setFilters({
                            ...filters,
                            dateRange: [dayjs(dates[0]), dayjs(dates[1])],
                        });
                }}
                className="bg-gray-800 text-white rounded-md hover:bg-gray-800"
                popupClassName="bg-gray-900 text-white hover:bg-gray-800"
            />

            <Button onClick={onClear}>Clear Filter</Button>
        </div>
    );
};
