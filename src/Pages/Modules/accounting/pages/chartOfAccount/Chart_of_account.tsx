
import React from 'react';
import { Tabs, TabsProps } from 'antd';
import Income from './components/income/IncomeSection';
import OwnersEquity from './components/ownersEquity/Owners_Equity';
import ExpenseSection from './components/expense/ExpenseSection';
import LiabilitiesSection from './components/LiabilitiesSection/LiabilitiesSection';
import AssetsSection from './components/AssetsSection/AssetsSection';

const Chart_of_account: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'EXPENSE',
            children: <ExpenseSection />,
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
            children: <LiabilitiesSection />,
        },
        {
            key: '5',
            label: 'ASSETS',
            children: <AssetsSection />,
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

export default Chart_of_account;
