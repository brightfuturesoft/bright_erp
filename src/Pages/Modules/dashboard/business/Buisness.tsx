import { Link } from 'react-router-dom';
import { BadgeDollarSign, UserPlus } from 'lucide-react';
import { FileAddFilled } from '@ant-design/icons';
import { Flex, Progress } from 'antd';
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
import pay from '../../../../assets/icons/pay.png';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import TopSaleingItems from './components/TopSaleingItems';
import EmployeeAttendance from './components/EmployeAttendance';
import SalesReportCart from './components/SalesReportCart';
import { useOrdersData } from '../../E_Commerce/Order/components/data_get_api';
import { usePosOrdersData } from '../../Direct_POS/orders/components/data_get_api';
import { generatePosMonthlyReport } from './components/posReport';
import { generateEcommerceMonthlyReport } from './components/ecommerceReport';
import { useEffect } from 'react';
import EcommereceSalesReport from './components/EcommereceSalesReport';
import Pos_Order_Report from './components/Pos_Order_Report';
import PurchaseReport from './components/PurchaseReport';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
);

const Card: React.FC<{ title: string; amount: string; isPurple?: boolean }> = ({
    title,
    amount,
    isPurple,
}) => (
    <div
        className={`p-6 rounded-lg shadow-md ${
            isPurple
                ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white'
                : 'bg-white text-purple-800'
        }`}
    >
        <h2
            className={`text-lg font-semibold ${isPurple ? 'text-white' : 'text-purple-800'}`}
        >
            {title}
        </h2>
        <p
            className={`text-2xl font-bold mt-2 ${isPurple ? 'text-white' : 'text-purple-600'}`}
        >
            {amount}
        </p>
    </div>
);

const Buisness: React.FC = () => {
    const dashboardButtons = [
        {
            name: 'Accounting',
            path: '/dashboard/accounting/chart_of_account',
            bg: '#266bff16',
            color: '#3e74e7',
            icon: <UserPlus className="text-xl" />,
        },
        {
            name: 'Item',
            path: '/dashboard/item/items',
            bg: '#f33d8916',
            color: '#f33d89',
            icon: <FileAddFilled className="text-xl" />,
        },
        {
            name: 'Customer',
            path: '/dashboard/customer',
            bg: '#70f80016',
            color: '#119632',
            icon: <BadgeDollarSign className="text-xl" />,
        },
        {
            name: 'Sale',
            path: '/dashboard/sale/direct-sale',
            bg: '#01f7a511',
            color: '#158088',
            icon: <UserPlus className="text-xl" />,
        },
        {
            name: 'POS',
            path: '/direct-pos',
            bg: '#ffbb0014',
            color: '#ad6b14',
            icon: <UserPlus className="text-xl" />,
        },
        {
            name: 'E-Commerce',
            path: '/dashboard/e-commerce/settings',
            bg: '#ff080016',
            color: '#a5302c',
            icon: <UserPlus className="text-xl" />,
        },
    ];

    return (
        <div className="mt-3">
            <DashboardTitle title={'Dashboard'} />
            <div className="gap-2 grid grid-cols-2 md:grid-cols-6 mt-4">
                {dashboardButtons.map((itm, index) => (
                    <Link
                        to={itm.path}
                        key={index}
                    >
                        <div
                            style={{
                                backgroundColor: itm.bg,
                                color: itm.color,
                            }}
                            className={`p-4 rounded-lg flex items-center justify-center`}
                        >
                            {itm.icon}
                            <h4 className="ml-2 font-bold text-md">
                                {itm.name}
                            </h4>
                        </div>
                    </Link>
                ))}
            </div>

            {/* sales report */}

            <div className="mt-6">
                <DashboardTitle title={'Sales Report'} />
            </div>

            {/* pos report */}
            <div className="gap-3 grid md:grid-cols-3 mt-3">
                <Pos_Order_Report
                    strokeWidth={8}
                    strokeColor={'#1869ff'}
                    trailColor={'#c9c9c930'}
                />
                <EcommereceSalesReport
                    strokeWidth={8}
                    strokeColor={'#1869ff'}
                    trailColor={'#c9c9c930'}
                />
                <PurchaseReport
                    strokeWidth={8}
                    strokeColor={'#1869ff'}
                    trailColor={'#c9c9c930'}
                />
            </div>

            <div className="gap-3 grid md:grid-cols-2 mt-10">
                <div className="dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full">
                    <div className="flex justify-between items-start">
                        <div className="">
                            <h4 className="font-semibold text-dark text-xl dark:text-gray-400">
                                TOTAL PAYABLES
                            </h4>
                            <p className="text-dark dark:text-gray-500">
                                <span className="kalpurush-font text-lg">
                                    ৳{' '}
                                </span>{' '}
                                418,957,857.48
                            </p>
                        </div>
                        <div>
                            <img
                                src={pay}
                                alt=""
                                className="w-16 md:w-auto"
                            />
                        </div>
                    </div>
                    <div className="md:flex justify-between items-center border-gray-700 mt-5 p-2 border rounded text-dark dark:text-gray-400 overflow-hidden">
                        <div className="md:w-1/2">
                            <h3 className="text-xl dark:text-gray-400">
                                <p className="text-sm">
                                    Current ( <small>This Month</small> )
                                </p>
                                <p>
                                    {' '}
                                    <span className="kalpurush-font text-lg">
                                        ৳{' '}
                                    </span>{' '}
                                    418,957
                                </p>
                            </h3>
                        </div>
                        <div className="md:float-end mt-4 md:mt-0 md:w-1/2 md:text-end">
                            <h3 className="text-xl dark:text-gray-400">
                                <p className="text-sm">
                                    Overdue ( <small>Previous Months</small> )
                                </p>
                                <p>
                                    {' '}
                                    <span className="kalpurush-font text-lg">
                                        ৳{' '}
                                    </span>{' '}
                                    418,957
                                </p>
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="gap-2 dark:border-gray-700 grid md:grid-cols-2 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full">
                    <div className="">
                        <h4 className="font-semibold text-xl dark:text-gray-400">
                            ITEM DETAILS
                        </h4>
                        <ul>
                            <li className="flex justify-between items-center mb-3 w-full text-red-600">
                                <span className="">Low Stock Items</span>
                                <span className="">376</span>
                            </li>
                            <li className="flex justify-between items-center mb-3 w-full text-blue-600">
                                <span className="">All Active Items</span>
                                <span className="">3486</span>
                            </li>
                            <li className="flex justify-between items-center mb-3 w-full text-blue-600">
                                <span className="">All Item Groups</span>
                                <span className="">3486</span>
                            </li>
                            <li className="flex justify-between items-center mb-3 w-full text-blue-600">
                                <span className="">All Active Items</span>
                                <span className="">3486</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-center md:justify-end items-center mt-6 md:mt-0">
                        <Flex
                            gap="large"
                            wrap
                        >
                            <div className="stock-progress">
                                <Progress
                                    type="dashboard"
                                    percent={75}
                                    strokeWidth={10}
                                    size={10}
                                />
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

export default Buisness;
