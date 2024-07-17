import React, { useState } from 'react';
import DashboardTitle from '../../../../../../../Modules/CommonComponents/DashboardTitle';
import DashboardContentHeader from '../../../../../../../../wraper/DashboardContentHeader';
import { Button, Radio, RadioChangeEvent, Select, DatePicker } from 'antd';
import subTotal from '../../../../../../../../assets/icons/sub-total.png';
import tax from '../../../../../../../../assets/icons/tax.png';
import grandTotal from '../../../../../../../../assets/icons/grand-total.png';
import AllStanderdOrderTable from './AllStanderdOrderTable';
import { Filter, X } from 'lucide-react';
const { Option } = Select;

const AllStanderdOrderAction = () => {
    const [value1, setValue1] = useState('Apple');
    const [filterOn, setFilterOn] = useState(false);
    const plainOptions = ['Standard', 'Ectomere'];
    const onChange1 = ({ target: { value } }: RadioChangeEvent) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };

    // Generate year options from 2020 to current year
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let year = 2020; year <= currentYear; year++) {
        yearOptions.push(
            <Option
                key={year}
                value={year.toString()}
            >
                {year}
            </Option>
        );
    }

    return (
        <div>
            <DashboardContentHeader>
                <DashboardTitle title="Order" />
                <Button
                    className="dark:bg-transparent dark:!text-light text-light shadow-none !border border-primary"
                    type="primary"
                >
                    Add Order
                </Button>
            </DashboardContentHeader>

            <section className="grid md:grid-cols-3 grid-cols-1 mt-4 gap-4">
                <div className="px-3 py-6 rounded border dark:bg-[#5b132f40] bg-[#fccede53] gap-2 grid grid-cols-4 border-danger">
                    <div className="flex justify-center items-center">
                        <img
                            src={subTotal}
                            alt=""
                            className="w-[60px]"
                        />
                    </div>
                    <div className="col-span-3">
                        <h1 className="text-md text-danger font-semibold">
                            Sub Total Amount
                        </h1>
                        <h1 className="text-xl font-bold">৳ 1,800.00</h1>
                    </div>
                </div>

                <div className="px-3 py-6 border rounded dark:bg-[#2d2d5d45] bg-[#7979fb3d] grid grid-cols-4 border-primary">
                    <div className="flex justify-center items-center">
                        <img
                            src={tax}
                            alt=""
                            className="w-[60px]"
                        />
                    </div>
                    <div className="col-span-3">
                        <h1 className="text-md text-primary font-semibold">
                            Total Tax Amount
                        </h1>
                        <h1 className="text-xl font-bold">৳ 1,800.00</h1>
                    </div>
                </div>

                <div className="px-3 py-6 rounded border dark:bg-[#294b2947] bg-[#7ee87e47] grid grid-cols-4 border-success">
                    <div className="flex justify-center items-center">
                        <img
                            src={grandTotal}
                            alt=""
                            className="w-[60px]"
                        />
                    </div>
                    <div className="col-span-3">
                        <h1 className="text-md text-success font-semibold">
                            Grand Total Amount
                        </h1>
                        <h1 className="text-xl font-bold">৳ 1,800.00</h1>
                    </div>
                </div>
            </section>

            <section className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold md:text-md ">
                        Order Type :
                    </h4>
                    <Radio.Group
                        options={plainOptions}
                        onChange={onChange1}
                        value={value1}
                    />
                </div>

                <Button
                    onClick={() => setFilterOn(!filterOn)}
                    title="Filter"
                    shape="circle"
                    className="rounded dark:border-gray-700 bg-transparent dark:text-light hover:!bg-transparent md:hidden block text-dark"
                    icon={
                        !filterOn ? (
                            <Filter className="w-[15px]" />
                        ) : (
                            <X className="w-[15px]" />
                        )
                    }
                ></Button>
            </section>

            <section className="md:block hidden mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        {/* <h4 className="text-sm font-semibold mb-2">Select Customer</h4> */}
                        <Select
                            className="w-full"
                            placeholder="Select Customer"
                        >
                            <Option value="customer1">Customer 1</Option>
                            <Option value="customer2">Customer 2</Option>
                            <Option value="customer3">Customer 3</Option>
                        </Select>
                    </div>
                    <div>
                        {/* <h4 className="text-sm font-semibold mb-2">Order Status</h4> */}
                        <Select
                            className="w-full"
                            placeholder="Select Order Status"
                        >
                            <Option value="pending">Pending</Option>
                            <Option value="completed">Completed</Option>
                            <Option value="cancelled">Cancelled</Option>
                        </Select>
                    </div>
                    <div>
                        {/* <h4 className="text-sm font-semibold mb-2">Delivery Status</h4> */}
                        <Select
                            className="w-full"
                            placeholder="Select Delivery Status"
                        >
                            <Option value="delivered">Delivered</Option>
                            <Option value="in-transit">In Transit</Option>
                            <Option value="not-delivered">Not Delivered</Option>
                        </Select>
                    </div>
                    <div>
                        {/* <h4 className="text-sm font-semibold mb-2">Invoice Status</h4> */}
                        <Select
                            className="w-full"
                            placeholder="Select Invoice Status"
                        >
                            <Option value="paid">Paid</Option>
                            <Option value="unpaid">Unpaid</Option>
                            <Option value="partially-paid">
                                Partially Paid
                            </Option>
                        </Select>
                    </div>
                    <div>
                        {/* <h4 className="text-sm font-semibold mb-2">Select Date Range</h4> */}
                        <Select
                            className="w-full"
                            placeholder="Select Date Range"
                        >
                            {yearOptions}
                            <Option value="last3months">Last 3 Months</Option>
                            <Option value="last5months">Last 5 Months</Option>
                            <Option value="last7days">Last 7 Days</Option>
                            <Option value="last15days">Last 15 Days</Option>
                        </Select>
                    </div>
                    <div>
                        {/* <h4 className="text-sm font-semibold mb-2">Select Start Date</h4> */}
                        <DatePicker className="w-full h-[40px]" />
                    </div>
                    <div>
                        {/* <h4 className="text-sm font-semibold mb-2">Select End Date</h4> */}
                        <DatePicker className="w-full h-[40px]" />
                    </div>
                </div>
            </section>

            {filterOn && (
                <section className="mt-6 md:hidden block">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            {/* <h4 className="text-sm font-semibold mb-2">Select Customer</h4> */}
                            <Select
                                className="w-full"
                                placeholder="Select Customer"
                            >
                                <Option value="customer1">Customer 1</Option>
                                <Option value="customer2">Customer 2</Option>
                                <Option value="customer3">Customer 3</Option>
                            </Select>
                        </div>
                        <div>
                            {/* <h4 className="text-sm font-semibold mb-2">Order Status</h4> */}
                            <Select
                                className="w-full"
                                placeholder="Select Order Status"
                            >
                                <Option value="pending">Pending</Option>
                                <Option value="completed">Completed</Option>
                                <Option value="cancelled">Cancelled</Option>
                            </Select>
                        </div>
                        <div>
                            {/* <h4 className="text-sm font-semibold mb-2">Delivery Status</h4> */}
                            <Select
                                className="w-full"
                                placeholder="Select Delivery Status"
                            >
                                <Option value="delivered">Delivered</Option>
                                <Option value="in-transit">In Transit</Option>
                                <Option value="not-delivered">
                                    Not Delivered
                                </Option>
                            </Select>
                        </div>
                        <div>
                            {/* <h4 className="text-sm font-semibold mb-2">Invoice Status</h4> */}
                            <Select
                                className="w-full"
                                placeholder="Select Invoice Status"
                            >
                                <Option value="paid">Paid</Option>
                                <Option value="unpaid">Unpaid</Option>
                                <Option value="partially-paid">
                                    Partially Paid
                                </Option>
                            </Select>
                        </div>
                        <div>
                            {/* <h4 className="text-sm font-semibold mb-2">Select Date Range</h4> */}
                            <Select
                                className="w-full"
                                placeholder="Select Date Range"
                            >
                                {yearOptions}
                                <Option value="last3months">
                                    Last 3 Months
                                </Option>
                                <Option value="last5months">
                                    Last 5 Months
                                </Option>
                                <Option value="last7days">Last 7 Days</Option>
                                <Option value="last15days">Last 15 Days</Option>
                            </Select>
                        </div>
                        <div>
                            {/* <h4 className="text-sm font-semibold mb-2">Select Start Date</h4> */}
                            <DatePicker className="w-full h-[40px]" />
                        </div>
                        <div>
                            {/* <h4 className="text-sm font-semibold mb-2">Select End Date</h4> */}
                            <DatePicker className="w-full h-[40px]" />
                        </div>
                    </div>
                </section>
            )}

            <section className="mt-12 relative">
                <div className="div absolute top-0 left-0 right-0 bottom-0">
                    <AllStanderdOrderTable />
                </div>
            </section>
        </div>
    );
};

export default AllStanderdOrderAction;
