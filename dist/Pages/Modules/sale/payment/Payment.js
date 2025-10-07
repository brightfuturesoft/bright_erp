import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import HeaderComponent from './components/HeaderComponent';
import TableFilter from './components/TableFilter';
import DataTable from './components/DataTable';
import StockCard from '../../common/components/StockCard';
import { useState } from 'react';
const Payment = () => {
    const [searchValue, setSearchValue] = useState('');
    return _jsxs(Section, {
        title: 'Payment Log',
        sideComponent: _jsx(HeaderComponent, {}),
        children: [
            _jsxs('div', {
                className: 'flex flex-wrap gap-5',
                children: [
                    _jsx(StockCard, {
                        title: 'Total Paid Amount',
                        amount: 96560887.52,
                        icon: _jsx(Briefcase, {}),
                    }),
                    _jsx(StockCard, {
                        title: 'Total Discount Amount',
                        amount: 171749.35,
                        icon: _jsx(Briefcase, {}),
                    }),
                    _jsx(StockCard, {
                        title: 'Total Amount with Discount',
                        amount: 96720078.63,
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
    });
};
export default Payment;
