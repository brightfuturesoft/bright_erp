import React, { useState, useMemo } from 'react';

import SearchBar from '@/common/SearchBar';
import { Customer } from './Customer_Type';
import { useCombinedCustomers } from './components/data_get_api';
import CustomerAction from './components/CustomerAction';
import CustomerTable from './components/Data_Table';
import { message } from 'antd';

const ManageCustomer: React.FC = () => {
    const [pageSize, setPageSize] = useState(5);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

    // Map raw data to Customer type
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

    // Filtered data
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

    // Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(e.target.value);

    const handleFilterChange = (type: string, value: string) => {
        if (type === 'customerType') setFilterCustomerType(value);
        else setFilterCustomerStatus(value);
    };

    const handleClearFilters = () => {
        setFilterCustomerType('');
        setFilterCustomerStatus('');
        setPageSize(5);
    };

    const handleDelete = async (record: Customer) => {
        try {
            if (record.customerType === 'POS') {
                await deletePosCustomer(record.key as string);
            } else {
                await deleteEcomCustomer(record.key as string);
            }
            message.success(`Customer "${record.name}" deleted successfully!`);
        } catch (err) {
            console.error(err);
            message.error(
                `Failed to delete "${record.name}". Please try again.`
            );
        }
    };

    const handleStatusUpdate = async (record: Customer) => {
        const newStatus =
            record.customerStatus === 'Active' ? 'Inactive' : 'Active';
        try {
            if (record.customerType === 'POS') {
                await editPosCustomer({ id: record.key, status: newStatus });
            } else {
                await editEcomCustomer({ id: record.key, status: newStatus });
            }
            message.success(
                `Customer "${record.name}" status updated to "${newStatus}"!`
            );
        } catch (err) {
            console.error(err);
            message.error(`Failed to update status for "${record.name}".`);
        }
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
                clearFilters={handleClearFilters}
                start={() => {}}
                loading={false}
                hasSelected={hasSelected}
                pageSize={pageSize}
                handlePageSizeChange={setPageSize}
            />

            {/* Table */}
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
