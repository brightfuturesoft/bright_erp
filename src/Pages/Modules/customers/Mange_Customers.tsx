import React, { useState, useMemo } from 'react';

import SearchBar from '@/common/SearchBar';
import { Customer } from './Customer_Type';
import { useCombinedCustomers } from './components/data_get_api';
import CustomerAction from './components/CustomerAction';
import CustomerTable from './components/Data_Table';

const ManageCustomer: React.FC = () => {
    const [pageSize, setPageSize] = useState(5);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [searchOn, setSearchOn] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filterCustomerType, setFilterCustomerType] = useState('');
    const [filterCustomerStatus, setFilterCustomerStatus] = useState('');

    const {
        customers,
        deletePosCustomer,
        deleteEcomCustomer,
        editPosCustomer,
        editEcomCustomer,
    } = useCombinedCustomers();

    const mappedData: Customer[] = customers.map(c => ({
        key: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        customerType: c.customerType,
        customerSince: c.raw.created_at
            ? new Date(c.raw.created_at).toLocaleDateString()
            : c.raw.customerSince || 'N/A',
        customerCode: c.id,
        customerStatus: c.raw.status || c.raw.customerStatus || 'Active',
        raw: c.raw,
    }));

    const data: Customer[] = useMemo(() => {
        return mappedData.filter(item => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.email.toLowerCase().includes(searchText.toLowerCase()) ||
                item.phone.toLowerCase().includes(searchText.toLowerCase());
            const matchesType = filterCustomerType
                ? item.customerType === filterCustomerType
                : true;
            const matchesStatus = filterCustomerStatus
                ? item.customerStatus === filterCustomerStatus
                : true;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [mappedData, searchText, filterCustomerType, filterCustomerStatus]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(e.target.value);
    const handleFilterChange = (type: string, value: string) => {
        if (type === 'customerType') setFilterCustomerType(value);
        else setFilterCustomerStatus(value);
    };

    const handleDelete = async (record: Customer) => {
        if (record.customerType === 'POS')
            await deletePosCustomer(record.key as string);
        else await deleteEcomCustomer(record.key as string);
    };

    const handleStatusUpdate = async (record: Customer) => {
        const newStatus =
            record.customerStatus === 'Active' ? 'Inactive' : 'Active';
        if (record.customerType === 'POS')
            await editPosCustomer({ id: record.key, status: newStatus });
        else await editEcomCustomer({ id: record.key, status: newStatus });
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className="p-4">
            <CustomerAction
                searchText={searchText}
                handleSearch={handleSearch}
                filterCustomerType={filterCustomerType}
                filterCustomerStatus={filterCustomerStatus}
                handleFilterChange={handleFilterChange}
                start={() => {}}
                loading={false}
                hasSelected={hasSelected}
                searchOn={searchOn}
                setSearchOn={setSearchOn}
                pageSize={pageSize}
                handlePageSizeChange={setPageSize}
            />

            {searchOn && (
                <div className="mt-2">
                    <SearchBar
                        width="100%"
                        searchText={searchText}
                        handleSearch={handleSearch}
                    />
                </div>
            )}

            <CustomerTable
                data={data}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                pageSize={pageSize}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
            />
        </div>
    );
};

export default ManageCustomer;
