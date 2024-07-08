import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { TablePaginationConfig } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

interface CustomerTableProps {
    data: DataType[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ data }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [searchedColumn, setSearchedColumn] = useState<string>('');

    const handleSearch = (
        selectedKeys: React.Key[],
        confirm: () => void,
        dataIndex: string
    ) => {
        confirm();
        setSearchText(selectedKeys[0] as string);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <button
                    type="button"
                    onClick={() => handleReset(clearFilters)}
                    style={{ width: 90, marginRight: 8 }}
                >
                    Reset
                </button>
            </div>
        ),
        onFilter: (value: string, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    // Pagination configuration
    const pagination: TablePaginationConfig = {
        pageSize: 5, // Number of items per page
    };

    return (
        <Table
            className="custom-table" // Add your custom class here
            columns={columns}
            dataSource={data}
            pagination={pagination}
        />
    );
};

export default CustomerTable;
