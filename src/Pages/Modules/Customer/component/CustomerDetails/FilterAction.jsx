import React, { useState } from 'react';
import DashboardHeader from '../../../CommonComponents/DashboardHeader';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import { Button, DatePicker, Input, Select, Space } from 'antd';
import { Edit, Filter, Power, PowerOff, Search, X } from 'lucide-react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const FilterAction = () => {
    const [filterBox, setFilterBox] = useState(false);
    const onChange = (date, dateString) => {};

    const status = false;
    return (
        <div className="py-2 ">
            <DashboardHeader>
                <DashboardTitle title="Customer Details" />
                <div className="md:flex hidden gap-2 items-center ">
                    <Button
                        danger
                        type="default"
                        className={`h-full py-[7px] ${status === false ? 'text-danger border-danger dark:bg-danger dark:!text-light hover:!text-light hover:!bg-danger' : 'text-success border-success'}`}
                        icon={
                            status ? (
                                <Power size={18} />
                            ) : (
                                <PowerOff size={18} />
                            )
                        }
                    >
                        {status === false ? 'Inactive' : 'Active'}
                    </Button>

                    <Link
                        to={`/dashboard/customer/customer-edit/Edward%20King%200`}
                    >
                        <Button
                            type="primary"
                            className="h-full py-[7px] group bg-transparent hover:bg-transparent shadow-none !border border-blue-400 text-blue-400"
                            icon={
                                <Edit
                                    className="text-blue-400 group-hover:text-light"
                                    size={18}
                                />
                            }
                        >
                            Edit
                        </Button>
                    </Link>

                    <Select
                        className="w-full "
                        showSearch
                        placeholder="Select Country"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            { value: '1', label: 'Jack' },
                            { value: '2', label: 'Lucy' },
                            { value: '3', label: 'Tom' },
                        ]}
                    />

                    <Space
                        direction="vertical"
                        className="w-full md:w-auto flex  flex-row items-center"
                    >
                        <div className="">
                            {/* <p className='text-xs font-semibold'>Start date :</p> */}
                            <DatePicker
                                placeholder="Start Date"
                                format="YYYY-MM-DD"
                                onChange={onChange}
                                className="!w-[160px] !border-gray-300 dark:!border-gray-700 placeholder:!text-gray-300 custom-placeholder"
                            />
                        </div>
                        <div className="">
                            {/* <p className='text-xs font-semibold'>Start date :</p> */}
                            <DatePicker
                                placeholder="End Date"
                                format="YYYY-MM-DD"
                                onChange={onChange}
                                className="!w-[160px] !border-gray-300 dark:!border-gray-700 placeholder:!text-gray-300 custom-placeholder"
                            />
                        </div>
                    </Space>
                </div>

                <div className="flex md:hidden gap-1">
                    <Button
                        className="!bg-transparent group dark:text-light text-dark"
                        onClick={() => setFilterBox(!filterBox)}
                        icon={
                            <Filter
                                className="text-dark dark:text-light group-hover:!text-blue-500"
                                size={18}
                            />
                        }
                    >
                        {' '}
                        Filter
                    </Button>
                </div>
            </DashboardHeader>

            {/* hidden area */}
            {filterBox && (
                <div className="dark:text-light text-dark">
                    <Select
                        className="w-full mt-3"
                        showSearch
                        placeholder="Select country"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            { value: '1', label: 'Jack' },
                            { value: '2', label: 'Lucy' },
                            { value: '3', label: 'Tom' },
                        ]}
                    />

                    <div className="w-full flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                        <Space
                            direction="vertical"
                            className="w-full md:w-auto flex mt-2 flex-row items-center"
                        >
                            <div className="space-y-1">
                                <p className="text-xs font-semibold">
                                    Start date :
                                </p>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={onChange}
                                    className="w-full "
                                />
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-semibold">
                                    End date :
                                </p>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={onChange}
                                    className="w-full"
                                />
                            </div>
                        </Space>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterAction;
