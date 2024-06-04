/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { BadgeDollarSign, UserPlus } from 'lucide-react';
import { FileAddFilled } from '@ant-design/icons';
import buisness from '../../../assets/icons/business.png';
import info from '../../../assets/icons/info.png';
import pay from '../../../assets/icons/pay.png';
import returnable from '../../../assets/icons/return.png';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
} from 'chart.js';
import { Flex, Progress } from 'antd';
import TopSaleingItems from './TopSaleingItems';
import EmployeeAttendance from './EmployeAttendance';
import DashboardTitle from '../CommonComponents/DashboardTitle';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LogarithmicScale);
const DashboardHomeModule = () => {

    const dashboardButtons = [
        {
            name: 'Create Customer',
            path: '/dashboard/customer/create-customer',
            bg: '#266bff16',
            color: '#3e74e7',
            icon: <UserPlus className='text-xl' />
        },
        {
            name: 'Create Quotation',
            path: '/dashboard',
            bg: '#f33d8916',
            color: '#f33d89',
            icon: <FileAddFilled className='text-xl' />
        },
        {
            name: 'Direct Sale',
            path: 'direct-sale/new_sale',
            bg: '#70f80016',
            color: '#119632',
            icon: <BadgeDollarSign className='text-xl' />
        },
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#01f7a511',
            color: '#158088',
            icon: <UserPlus className='text-xl' />
        },
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#ffbb0014',
            color: '#ad6b14',
            icon: <UserPlus className='text-xl' />
        },
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#ff080016',
            color: '#a5302c',
            icon: <UserPlus className='text-xl' />
        },
    ];

    const saleData = {
        todayTotalSales: 2000,
        todayCurrentSales: 500,

        weekTotalSales: 5000,
        weekCurrentSales: 800,

        monthTotalSales: 5000,
        monthCurrentSales: 700,

        yearlyTotalSales: 10000,
        yearlyCurrentSales: 2000,
    };

    // Calculate percentages and format to have one decimal place
    const percent = ((saleData.todayCurrentSales / saleData.todayTotalSales) * 100).toFixed();
    const weekSale = ((saleData.weekCurrentSales / saleData.weekTotalSales) * 100).toFixed();
    const monthSale = ((saleData.monthCurrentSales / saleData.monthTotalSales) * 100).toFixed();
    const yearlySale = ((saleData.yearlyCurrentSales / saleData.yearlyTotalSales) * 100).toFixed();


    const posData = {
        todayTotalPos: 2000,
        todayCurrentPos: 500,

        weekTotalPos: 5000,
        weekCurrentPos: 800,

        monthTotalPos: 5000,
        monthCurrentPos: 700,

        yearlyTotalPos: 10000,
        yearlyCurrentPos: 2000,
    };

    // Calculate percentages and format to have one decimal place
    const percentPos = ((posData.todayCurrentPos / posData.todayTotalPos) * 100).toFixed();
    const weekSalePos = ((posData.weekCurrentPos / posData.weekTotalPos) * 100).toFixed();
    const monthSalePos = ((posData.monthCurrentPos / posData.monthTotalPos) * 100).toFixed();
    const yearlySalePos = ((posData.yearlyCurrentPos / posData.yearlyTotalPos) * 100).toFixed();

    return (
        <div className='mt-3'>
            <DashboardTitle title={'Dashboard'} />
            <div className="grid md:grid-cols-6 grid-cols-2 gap-2 mt-4">
                {dashboardButtons.map((itm, index) => (
                    <Link to={itm.path} key={index}>
                        <div style={{ backgroundColor: itm.bg, color: itm.color }}
                            className={`p-4 rounded-lg flex items-center justify-center`}>
                            {itm.icon}
                            <h4 className="ml-2 font-bold text-md">{itm.name}</h4>
                        </div>
                    </Link>
                ))}
            </div>

            {/* sales report */}

            <div className='mt-6'>
                <DashboardTitle title={'Sales Report'} />
            </div>

            {/* pos report */}
            <div className="grid md:grid-cols-3 gap-3 mt-3">
                <div className="w-full flex dark:shadow-none shadow-xl shadow-[#8080800e] justify-between p-6 bg-white dark:bg-light-dark dark:border-gray-700 border rounded-lg dark:text-gray-400 text-dark">
                    <div>
                        <h1 className=" text-2xl font-[200] dark:text-gray-300 uppercase"> Sale</h1>
                        <h1 className=" text-gray-500 text-md">Today</h1>
                        <p className="mt-5 font-bold text-green-500">BDT <span className="text-red-500">{saleData?.todayCurrentSales}</span></p>
                    </div>

                    <Flex align="center" wrap gap={0}>
                        <Progress
                            type="circle"
                            percent={percent}
                            size={'medium'}
                            strokeWidth={8}
                            strokeColor={'#1869ff'} // Transparent stroke color for the progress text
                            trailColor={'#c9c9c930'} // Change the trail color behind the progress to the desired text color
                        />
                    </Flex>
                </div>

                <div className="w-full flex justify-between dark:shadow-none shadow-xl shadow-[#8080800e]  p-6 bg-white dark:bg-light-dark dark:border-gray-700 border rounded-lg dark:text-gray-400 text-dark">
                    <div>
                        <h1 className=" text-2xl font-[200] cape dark:text-gray-300 uppercase">POS</h1>
                        <h1 className=" text-gray-500 text-md">Today</h1>
                        <p className="mt-5 font-bold text-green-500">BDT <span className="text-red-500">50,000</span></p>
                    </div>

                    <Flex align="center" wrap gap={0}>
                        <Progress
                            type="circle"
                            percent={weekSale}
                            size={'large'}
                            strokeWidth={8}
                            strokeColor={'#1869ff'} // Transparent stroke color for the progress text
                            trailColor={'#c9c9c930'} // Change the trail color behind the progress to the desired text color
                        />
                    </Flex>
                </div>

                <div className="w-full flex justify-between dark:shadow-none shadow-xl shadow-[#8080800e]  p-6 bg-white dark:bg-light-dark dark:border-gray-700 border rounded-lg dark:text-gray-400 text-dark">
                    <div>
                        <h1 className=" text-2xl font-[200] dark:text-gray-300">PURCHASE</h1>
                        <h1 className=" text-gray-500 text-md">tody</h1>
                        <p className="mt-5 font-bold text-green-500">BDT <span className="text-red-500">{posData?.todayCurrentPos}</span></p>
                    </div>

                    <Flex align="center" wrap gap={0}>
                        <Progress
                            type="circle"
                            percent={monthSale}
                            size={'large'}
                            strokeWidth={8}
                            strokeColor={'#1869ff'} // Transparent stroke color for the progress text
                            trailColor={'#c9c9c930'} // Change the trail color behind the progress to the desired text color
                        />
                    </Flex>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mt-10">
                <div className="w-full  p-6 bg-white  dark:shadow-none shadow-xl shadow-[#8080800e]  dark:bg-light-dark dark:border-gray-700 border rounded-lg">
                    <div className="flex items-start justify-between">
                        <div className="">
                            <h4 className="text-xl font-semibold dark:text-gray-400 text-dark">TOTAL PAYABLES</h4>
                            <p className="dark:text-gray-500  text-dark">৳ 418,957,857.48</p>
                        </div>
                        <div>
                            <img src={pay} alt="" className="md:w-auto w-16" />
                        </div>
                    </div>
                    <div className="border border-gray-700 mt-5 p-2 dark:text-gray-400 text-dark rounded md:flex items-center justify-between overflow-hidden">
                        <div className="md:w-1/2">
                            <h3 className="text-xl  dark:text-gray-400">
                                <p className="text-sm">Current ( <small>This Month</small> )</p>
                                <p> ৳ 418,957</p>
                            </h3>
                        </div>
                        <div className="md:w-1/2 md:float-end md:mt-0 mt-4 md:text-end">
                            <h3 className="text-xl  dark:text-gray-400">
                                <p className="text-sm">Overdue ( <small>Previous Months</small> )</p>
                                <p> ৳ 418,957</p>
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="w-full p-6 bg-white grid gap-2 md:grid-cols-2 dark:shadow-none shadow-xl shadow-[#8080800e]  dark:bg-light-dark dark:border-gray-700 border rounded-lg">
                    <div className="">
                        <h4 className="font-semibold text-xl dark:text-gray-400">ITEM DETAILS
                        </h4>
                        <ul>
                            <li className="flex text-red-600 mb-3 items-center w-full justify-between">
                                <span className="">Low Stock Items</span>
                                <span className="">376</span>
                            </li>
                            <li className="flex text-blue-600 mb-3 items-center w-full justify-between">
                                <span className="">All Active Items</span>
                                <span className="">3486</span>
                            </li>
                            <li className="flex text-blue-600 mb-3 items-center w-full justify-between">
                                <span className="">All Item Groups</span>
                                <span className="">3486</span>
                            </li>
                            <li className="flex text-blue-600 mb-3 items-center w-full justify-between">
                                <span className="">All Active Items</span>
                                <span className="">3486</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center md:justify-end justify-center md:mt-0 mt-6">
                        <Flex gap="large" wrap>
                            <div className="stock-progress">
                                <Progress type="dashboard" percent={75} strokeWidth={10} size={'large'} />
                            </div>
                            {/* <Progress type="dashboard" percent={75} gapDegree={30} /> */}
                        </Flex>
                    </div>
                </div>
            </div>
            <br />
            <TopSaleingItems />
            <EmployeeAttendance />
            <br />
        </div>
    );
};

export default DashboardHomeModule;
