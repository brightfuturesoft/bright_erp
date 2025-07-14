import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';

import DashboardTitle from '../CommonComponents/DashboardTitle';
import { Plus, Search } from 'lucide-react';
import { CloseOutlined } from '@ant-design/icons';
import DashboardContentHeader from '../../../wraper/DashboardContentHeader';
import AddCustomerType from './component/Add_CustomerType';
import Customer_TypeTable from './component/Customer_TypeTable';

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

const Customer_Type = () => {
    const [searchOn, setSearchOn] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [pageCount, setPageCount] = useState(25);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(null);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        // @ts-ignore
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    // @ts-ignore
    const handleSearch = event => {
        setSearchText(event.target.value);
    };

    const handleChange = (value: string) => {
        // @ts-ignore
        setPageCount(value);
    };

    const filteredData = data.filter(item => {
        return Object.keys(item).some(
            key =>
                // @ts-ignore
                (typeof item[key] === 'string' &&
                    // @ts-ignore
                    item[key]
                        .toLowerCase()
                        .includes(searchText.toLowerCase())) ||
                // @ts-ignore
                (typeof item[key] === 'number' &&
                    // @ts-ignore
                    item[key]
                        .toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase()))
        );
    });

    return (
        <div>
            {searchOn && (
                <div className="md:hidden block w-full mt-3">
                    <Input
                        type="text"
                        placeholder="Search by name, age, or address"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
            )}

            <DashboardContentHeader>
                <DashboardTitle title="Customer Type" />

                <div className="flex gap-2 pb-4 md:mt-0 mt-4  items-center">
                    <div className="md:block hidden  md:w-[300px] w-[300px]">
                        <Input
                            type="text"
                            placeholder="Search by name, age, or address"
                            value={searchText}
                            onChange={handleSearch}
                        />
                    </div>

                    <Select
                        // @ts-ignore
                        defaultValue={pageCount}
                        className="md:w-[90px] w-[70px]"
                        onChange={handleChange}
                        options={[
                            { value: 25, label: 25 },
                            { value: 50, label: 50 },
                            { value: 100, label: 100 },
                        ]}
                    />

                    <Button
                        className="md:block hidden"
                        onClick={showModal}
                        type="primary"
                        size="large"
                    >
                        Add
                    </Button>
                    <Button
                        className="md:hidden  text-sm p-0 w-[40px] h-[40px] flex items-center justify-center"
                        onClick={showModal}
                        type="primary"
                        shape="circle"
                        size="large"
                    >
                        <Plus size={18} />
                    </Button>

                    <Button
                        className="md:hidden  text-sm p-0 w-[40px] h-[40px] flex items-center justify-center"
                        onClick={() => setSearchOn(!searchOn)}
                        type="primary"
                        danger={searchOn ? true : false}
                        shape="circle"
                        size="large"
                    >
                        {!searchOn ? (
                            <Search size={18} />
                        ) : (
                            <CloseOutlined size={18} />
                        )}
                    </Button>
                </div>
            </DashboardContentHeader>

            <div className="dark:bg-light-dark rounded border dark:border-gray-700 overflow-hidden py-0">
                <Customer_TypeTable
                    pageCount={pageCount}
                    // @ts-ignore
                    data={filteredData}
                />
            </div>
            <div className="">
                <AddCustomerType
                    title="Add Customer"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
};

export default Customer_Type;
