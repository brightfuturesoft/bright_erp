import { Link } from 'react-router-dom';
import { BadgeDollarSign, UserPlus } from 'lucide-react';
import { FileAddFilled } from '@ant-design/icons';
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
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import TopSaleingItems from './components/TopSaleingItems';
import EcommereceSalesReport from './components/EcommereceSalesReport';
import Pos_Order_Report from './components/Pos_Order_Report';
import PurchaseReport from './components/PurchaseReport';
import TotalPayableItems from './components/TotalPayableItems';
import ItemDetails from './components/ItemDetails';

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
            <div className="gap-2 grid grid-cols-2 md:grid-cols-2 mt-4">
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
            <div className="gap-3 grid md:grid-cols-2 mt-3">
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
                <TotalPayableItems />
                <ItemDetails />
            </div>

            <br />
            <TopSaleingItems />
            <br />
        </div>
    );
};

export default Buisness;
