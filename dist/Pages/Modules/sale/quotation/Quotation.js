import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import StockCard from '../../common/components/StockCard';
import TableController from '../../common/components/TableController';
import { useState } from 'react';
const Quotation = () => {
    const [searchValue, setSearchValue] = useState('');
    return _jsxs(Section, {
        title: 'Quotations',
        sideComponent: _jsx(HeaderComponent, {}),
        children: [
            _jsx('div', {
                className: 'flex flex-wrap gap-5',
                children: _jsx(StockCard, {
                    title: 'Total Amount',
                    amount: 42212558.0,
                    icon: _jsx(Briefcase, {}),
                }),
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
export default Quotation;
