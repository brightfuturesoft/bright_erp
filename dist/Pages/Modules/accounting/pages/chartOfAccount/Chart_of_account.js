import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Tabs } from 'antd';
import Income from './components/income/IncomeSection';
import OwnersEquity from './components/ownersEquity/Owners_Equity';
import ExpenseSection from './components/expense/ExpenseSection';
import LiabilitiesSection from './components/LiabilitiesSection/LiabilitiesSection';
import AssetsSection from './components/AssetsSection/AssetsSection';
const Chart_of_account = () => {
    const onChange = key => {};
    const items = [
        {
            key: '1',
            label: 'EXPENSE',
            children: _jsx(ExpenseSection, {}),
        },
        {
            key: '2',
            label: 'INCOME',
            children: _jsx(Income, {}),
        },
        {
            key: '3',
            label: "OWNER'S EQUITY",
            children: _jsx(OwnersEquity, {}),
        },
        {
            key: '4',
            label: 'LIABILITIES',
            children: _jsx(LiabilitiesSection, {}),
        },
        {
            key: '5',
            label: 'ASSETS',
            children: _jsx(AssetsSection, {}),
        },
    ];
    return _jsxs('div', {
        className: 'bg-light dark:bg-dark text-dark dark:text-light',
        children: [
            _jsx('div', {
                className: 'flex justify-between items-center mt-3',
            }),
            _jsx(Tabs, {
                className: 'custom-tabs text-gray-600 dark:text-gray-400 ',
                defaultActiveKey: '1',
                items: items,
                onChange: onChange,
                tabBarStyle: { display: 'flex', flexWrap: 'wrap' },
            }),
        ],
    });
};
export default Chart_of_account;
