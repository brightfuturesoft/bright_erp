import React from 'react';
import { Button, Select, Input, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';

interface Props {
    searchText: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterCustomerType: string;
    filterCustomerStatus: string;
    handleFilterChange: (type: string, value: string) => void;
    clearFilters: () => void;
    start: () => void;
    loading: boolean;
    hasSelected: boolean;
    pageSize: number;
    handlePageSizeChange: (size: number) => void;
}

const CustomerAction: React.FC<Props> = ({
    searchText,
    handleSearch,
    filterCustomerType,
    filterCustomerStatus,
    handleFilterChange,
    clearFilters,
    start,
    loading,
    hasSelected,
    pageSize,
    handlePageSizeChange,
}) => {
    const commonClass =
        'h-10 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white';

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-4">
            <Space
                wrap
                className="flex-1"
            >
                {/* Search */}
                <Input
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Search customers..."
                    className={`${commonClass} w-64 items-center`}
                    allowClear
                />

                {/* Customer Type */}
                <Select
                    value={filterCustomerType}
                    onChange={val => handleFilterChange('customerType', val)}
                    placeholder="Customer Type"
                    className={`${commonClass} w-40`}
                    options={[
                        { value: '', label: 'All Types' },
                        { value: 'POS', label: 'POS' },
                        { value: 'Ecommerce', label: 'E-commerce' },
                    ]}
                    suffixIcon={
                        <DownOutlined
                            className={classNames('text-black dark:text-white')}
                        />
                    }
                />

                {/* Customer Status */}
                <Select
                    value={filterCustomerStatus}
                    onChange={val => handleFilterChange('customerStatus', val)}
                    placeholder="Customer Status"
                    className={`${commonClass} w-40`}
                    options={[
                        { value: '', label: 'All Status' },
                        { value: 'Active', label: 'Active' },
                        { value: 'Inactive', label: 'Inactive' },
                    ]}
                    suffixIcon={
                        <DownOutlined
                            className={classNames('text-black dark:text-white')}
                        />
                    }
                />

                {/* Page Size */}
                <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className={`${commonClass} w-32`}
                    options={[
                        { value: 5, label: '5' },
                        { value: 10, label: '10' },
                        { value: 15, label: '15' },
                    ]}
                    suffixIcon={
                        <DownOutlined
                            className={classNames('text-black dark:text-white')}
                        />
                    }
                />

                {/* Clear Filters */}
                <Button
                    type="default"
                    onClick={clearFilters}
                    className="h-10 dark:bg-gray-600 dark:text-white dark:border-gray-500"
                >
                    Clear Filters
                </Button>
            </Space>

            <div className="flex items-center gap-2 mt-2 md:mt-0">
                {hasSelected && (
                    <span className="dark:text-white">
                        {hasSelected} selected
                    </span>
                )}
                <Button
                    type="primary"
                    onClick={start}
                    loading={loading}
                    className="h-10"
                >
                    Add Customer
                </Button>
            </div>
        </div>
    );
};

export default CustomerAction;
