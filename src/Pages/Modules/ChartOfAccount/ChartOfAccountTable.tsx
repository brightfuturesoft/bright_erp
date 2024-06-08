import React from 'react';
import DashboardTitle from '../CommonComponents/DashboardTitle';
import { Tabs, TabsProps } from 'antd';
import ExpenseTable from './Expense/Expense';
import Expense from './Expense/Expense';


const ChartOfAccountTable: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'EXPENSE',
            children: <>
                <Expense />
            </>,
        },
        {
            key: '2',
            label: 'INCOME',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: "OWNER'S EQUITY",
            children: 'Content of Tab Pane 3',
        },
        {
            key: '3',
            label: 'LIABILITIES',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '3',
            label: 'ASSETS',
            children: 'Content of Tab Pane 3',
        }
    ];
    return (
        <div className='bg-light dark:bg-dark text-dark dark:text-light'>
            <div className="flex items-center justify-between mt-3">
                <DashboardTitle title="Chart of Accounts" />
                <input placeholder='Search...' type="text" className="border bg-transparent px-2 dark:border-gray-600 border-gray-400 dark:text-gray-400 text-black py-1 rounded w-[230px] text-sm" />
            </div>

            <Tabs
                className='bg-light dark:bg-dark text-dark dark:!text-light'
                defaultActiveKey="1"
                items={items}
                onChange={onChange} />
        </div>
    );
};

export default ChartOfAccountTable;