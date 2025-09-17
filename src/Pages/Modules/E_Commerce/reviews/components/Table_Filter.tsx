'use client';

import React, { useContext } from 'react';
import { Input, Select, Button } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface ReviewFilterProps {
    filters: any;
    setFilters: (val: any) => void;
    onClear: () => void;
}

export const ReviewFilter: React.FC<ReviewFilterProps> = ({
    filters,
    setFilters,
    onClear,
}) => {
    const { user } = useContext(Erp_context);

    return (
        <div className="flex gap-3 my-3 md:flex-row flex-col">
            {/* Filter by Review Text */}
            <Input
                placeholder="Review Text"
                value={filters.reviewText || ''}
                onChange={e =>
                    setFilters({ ...filters, reviewText: e.target.value })
                }
            />

            {/* Filter by Rating */}
            <Select
                placeholder="Rating"
                value={filters.rating || undefined}
                onChange={val => setFilters({ ...filters, rating: val })}
                allowClear
                style={{ width: 120 }}
            >
                {[1, 2, 3, 4, 5].map(r => (
                    <Select.Option
                        key={r}
                        value={r}
                    >
                        {r}
                    </Select.Option>
                ))}
            </Select>

            {/* Filter by Workspace */}
            <Input
                placeholder="Workspace ID"
                value={filters.workspace_id || ''}
                onChange={e =>
                    setFilters({ ...filters, workspace_id: e.target.value })
                }
            />

            {/* Filter by Product */}
            <Input
                placeholder="Product ID"
                value={filters.product_id || ''}
                onChange={e =>
                    setFilters({ ...filters, product_id: e.target.value })
                }
            />

            <Button onClick={onClear}>Clear Filter</Button>
        </div>
    );
};
