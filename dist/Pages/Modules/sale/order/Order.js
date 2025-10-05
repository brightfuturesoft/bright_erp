import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import {
    DataTable,
    HeaderComponent,
    TableFilter,
} from '../batchPayment/components';
import StockCard from '../../common/components/StockCard';
const Order = () => {
    return _jsxs(Section, {
        title: 'Sales Orders',
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
                        icon: _jsx(LineChart, {}),
                    }),
                    _jsx(StockCard, {
                        title: 'Grand Total Amount',
                        amount: 96720078.63,
                        icon: _jsx(Plus, {}),
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex items-center gap-3 my-3',
                children: [
                    _jsx('p', { children: 'Order Type : ' }),
                    _jsx('div', {
                        className: 'flex items-center gap-2',
                        children: _jsxs(Radio.Group, {
                            defaultValue: 'Standard',
                            buttonStyle: 'solid',
                            children: [
                                _jsx(Radio.Button, {
                                    value: 'Standard',
                                    children: 'Standard',
                                }),
                                _jsx(Radio.Button, {
                                    value: 'Ecommerce',
                                    children: 'Ecommerce',
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            _jsx(TableFilter, {}),
            _jsx(DataTable, {}),
        ],
    });
};
export default Order;
