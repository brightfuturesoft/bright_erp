import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import StockCard from '../../common/components/StockCard';
import { useState } from 'react';
import TableController from '../../common/components/TableController';
const Return = () => {
    const [searchValue, setSearchValue] = useState('');
    return _jsxs(Section, {
        title: 'Returns',
        sideComponent: _jsx(HeaderComponent, {}),
        children: [
            _jsx('div', {
                className: 'flex flex-wrap gap-5',
                children: _jsx(StockCard, {
                    title: 'Sub Total Returned',
                    amount: 96560887.52,
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
export default Return;
