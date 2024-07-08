import React, { useState } from 'react';
import { Divider } from 'antd';
import CustomerTable from './component/CustomerTable';
import DashboardTitle from '../CommonComponents/DashboardTitle';

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park',
    },
    // Add more data items as needed...
];

const CustomerType = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = event => {
        setSearchText(event.target.value);
    };

    const filteredData = data.filter(item => {
        return Object.keys(item).some(
            key =>
                (typeof item[key] === 'string' &&
                    item[key]
                        .toLowerCase()
                        .includes(searchText.toLowerCase())) ||
                (typeof item[key] === 'number' &&
                    item[key]
                        .toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase()))
        );
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <DashboardTitle title="Customer Type" />
                <div className="p-4  md:w-[500px] w-[300px]">
                    <input
                        type="text"
                        placeholder="Search by name, age, or address"
                        value={searchText}
                        onChange={handleSearch}
                        className="w-full  px-3 py-2 placeholder-gray-400 text-gray-900 bg-white rounded text-sm border dark:text-light dark:border-gray-600 border-dark focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
            <div className="dark:bg-light-dark rounded border dark:border-gray-700 overflow-hidden py-0">
                <CustomerTable data={filteredData} />
            </div>
        </div>
    );
};

export default CustomerType;
