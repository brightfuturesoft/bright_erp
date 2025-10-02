import React from 'react';
import { Button, Select } from 'antd';

interface Props {
    searchText: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterCustomerType: string;
    filterCustomerStatus: string;
    handleFilterChange: (type: string, value: string) => void;
    start: () => void;
    loading: boolean;
    hasSelected: boolean;
    searchOn: boolean;
    setSearchOn: (val: boolean) => void;
    pageSize: number;
    handlePageSizeChange: (size: number) => void;
}

const CustomerAction: React.FC<Props> = ({
    searchText,
    handleSearch,
    filterCustomerType,
    filterCustomerStatus,
    handleFilterChange,
    start,
    loading,
    hasSelected,
    searchOn,
    setSearchOn,
    pageSize,
    handlePageSizeChange,
}) => {
    return (
        <div className="flex justify-between items-center gap-2 mb-2">
            <div className="flex gap-2">
                <Button onClick={() => setSearchOn(!searchOn)}>
                    {searchOn ? 'Close Search' : 'Search'}
                </Button>

                <Select
                    value={filterCustomerType}
                    onChange={val => handleFilterChange('customerType', val)}
                    placeholder="Customer Type"
                    className="w-40"
                    options={[
                        { value: '', label: 'All' },
                        { value: 'POS', label: 'POS' },
                        { value: 'E-commerce', label: 'E-commerce' },
                    ]}
                />

                <Select
                    value={filterCustomerStatus}
                    onChange={val => handleFilterChange('customerStatus', val)}
                    placeholder="Customer Status"
                    className="w-40"
                    options={[
                        { value: '', label: 'All' },
                        { value: 'Active', label: 'Active' },
                        { value: 'Inactive', label: 'Inactive' },
                    ]}
                />

                <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="w-32"
                    options={[
                        { value: 5, label: '5' },
                        { value: 10, label: '10' },
                        { value: 15, label: '15' },
                    ]}
                />
            </div>

            <div>
                {hasSelected && (
                    <span>{hasSelected ? `${hasSelected} selected` : ''}</span>
                )}
                <Button
                    type="primary"
                    onClick={start}
                    loading={loading}
                >
                    Add Customer
                </Button>
            </div>
        </div>
    );
};

export default CustomerAction;
