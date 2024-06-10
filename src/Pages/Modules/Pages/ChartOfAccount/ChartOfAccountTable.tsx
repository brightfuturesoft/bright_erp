import React from 'react';
import { Tabs, TabsProps } from 'antd';
import Expense from './Expense/Expense';
import Income from './Income/Income';
import OwnersEquity from './OwnersEquity/OwnersEquity';
import Liabilities from './Liabilities/Liabilities';
import Assets from './Assets/Assets';
import DashboardTitle from '../../CommonComponents/DashboardTitle';

const ChartOfAccountTable: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'EXPENSE',
            children: <Expense />,
        },
        {
            key: '2',
            label: 'INCOME',
            children: <Income />,
        },
        {
            key: '3',
            label: "OWNER'S EQUITY",
            children: <OwnersEquity />,
        },
        {
            key: '4',
            label: 'LIABILITIES',
            children: <Liabilities />,
        },
        {
            key: '5',
            label: 'ASSETS',
            children: <Assets />,
        }
    ];

    return (
        <div className='bg-light dark:bg-dark text-dark dark:text-light'>
            <div className="flex items-center justify-between mt-3">
                {/* <DashboardTitle title="Chart of Accounts" /> */}
                {/* <input placeholder='Search...' type="text" className="border bg-transparent px-2 dark:border-gray-600 border-gray-400 dark:text-gray-400 text-black py-1 rounded w-[230px] text-sm" /> */}
            </div>

            <Tabs
                className='custom-tabs'
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                tabBarStyle={{ display: 'flex', flexWrap: 'wrap' }}
            />
        </div>
    );
};

export default ChartOfAccountTable;
