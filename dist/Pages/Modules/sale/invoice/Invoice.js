import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Briefcase, CreditCard, FileText } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import StockCard from '../../common/components/StockCard';
import TableController from '../../common/components/TableController';
import { useState } from 'react';
const Invoice = () => {
    const [searchValue, setSearchValue] = useState('');
    return _jsxs(Section, {
        title: 'Sales Invoices',
        sideComponent: _jsx(HeaderComponent, {}),
        children: [
            _jsxs('div', {
                className: 'flex flex-wrap gap-5',
                children: [
                    _jsx(StockCard, {
                        title: 'Sub Total Amount',
                        amount: 96560887.52,
                        icon: _jsx(Briefcase, {}),
                    }),
                    _jsx(StockCard, {
                        title: 'Sub Total Tax',
                        amount: 171749.35,
                        icon: _jsx(CreditCard, {}),
                    }),
                    _jsx(StockCard, {
                        title: 'Grand Total Amount',
                        amount: 96720078.63,
                        icon: _jsx(FileText, {}),
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
export default Invoice;
