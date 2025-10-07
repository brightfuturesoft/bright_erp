import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import TableController from '../../common/components/TableController';
import StockCard from '../../common/components/StockCard';
import { useState } from 'react';
const CustomerDebit = () => {
    const [searchValue, setSearchValue] = useState('');
    return _jsx('div', {
        children: _jsxs(Section, {
            title: 'Customer Debit',
            sideComponent: _jsx(HeaderComponent, {}),
            children: [
                _jsxs('div', {
                    className: 'flex flex-wrap gap-5',
                    children: [
                        _jsx(StockCard, {
                            title: 'Total Debit Amount',
                            amount: 1234567.89,
                            icon: _jsx(Briefcase, {}),
                        }),
                        _jsx(StockCard, {
                            title: 'Total Customers Owing',
                            amount: 134,
                            icon: _jsx(Briefcase, {}),
                        }),
                    ],
                }),
                _jsx(TableFilter, {}),
                _jsx(TableController, {
                    searchValue: searchValue,
                    setSearchValue: setSearchValue,
                }),
                ' ',
                _jsx(DataTable, {}),
            ],
        }),
    });
};
export default CustomerDebit;
