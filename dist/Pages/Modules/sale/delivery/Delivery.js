import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { DataTable, TableFilter } from './components';
const Delivery = () => {
    const [searchValue, setSearchValue] = useState('');
    return _jsx('div', {
        className: 'w-full overflow-x-scroll',
        children: _jsxs(Section, {
            title: 'Sales Deliveries ',
            children: [
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
export default Delivery;
