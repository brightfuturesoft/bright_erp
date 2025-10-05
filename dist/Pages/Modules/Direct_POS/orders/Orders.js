import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import { useState, useEffect } from 'react';
import moment from 'moment';
import TableFilter from './components/Table_Filter';
import DataTable from './components/Orders_Table';
import { usePosOrdersData } from './components/data_get_api';
import StockCard from '../../common/components/StockCard';
const Direct_Pos_Order = () => {
    const { pos_orders } = usePosOrdersData();
    const [filters, setFilters] = useState({});
    const [filteredOrders, setFilteredOrders] = useState([]);
    useEffect(() => {
        if (!pos_orders) return;
        const filtered = pos_orders.filter(order => {
            const orderDate = moment(order.created_at);
            const matchesGlobalSearch =
                !filters.globalSearch ||
                order.order_number
                    ?.toLowerCase()
                    .includes(filters.globalSearch.toLowerCase()) ||
                order.delivery_address?.full_name
                    ?.toLowerCase()
                    .includes(filters.globalSearch.toLowerCase()) ||
                order.products?.some(p =>
                    (p.item_name || p.name || '')
                        .toLowerCase()
                        .includes(filters.globalSearch.toLowerCase())
                );
            const matchesPayment =
                !filters.paymentMethod ||
                order.payment?.payment_method?.toLowerCase() ===
                    filters.paymentMethod.toLowerCase();
            const matchesDateRange =
                !filters.dateRange ||
                (orderDate.isSameOrAfter(filters.dateRange[0]) &&
                    orderDate.isSameOrBefore(filters.dateRange[1]));
            return matchesGlobalSearch && matchesPayment && matchesDateRange;
        });
        setFilteredOrders(filtered);
    }, [pos_orders, filters]);
    const handleClearFilter = () => setFilters({});
    const totals = (
        filteredOrders.length ? filteredOrders : pos_orders
    )?.reduce(
        (acc, order) => {
            const subTotal =
                order.total_amount -
                (order.tax_amount || 0) -
                (order.shipping_charge || 0) +
                (order.discount || 0);
            acc.subTotalAmount += subTotal;
            acc.subTotalTax += order.tax_amount || 0;
            acc.grandTotalAmount += order.total_amount || 0;
            return acc;
        },
        { subTotalAmount: 0, subTotalTax: 0, grandTotalAmount: 0 }
    );
    return _jsxs(Section, {
        title: 'Direct POS Orders',
        children: [
            _jsxs('div', {
                className: 'flex flex-wrap gap-5',
                children: [
                    _jsx(StockCard, {
                        title: 'Sub Total Amount',
                        amount: totals?.subTotalAmount,
                        icon: _jsx(Briefcase, {}),
                    }),
                    _jsx(StockCard, {
                        title: 'Sub Total Tax',
                        amount: totals?.subTotalTax,
                        icon: _jsx(LineChart, {}),
                    }),
                    _jsx(StockCard, {
                        title: 'Grand Total Amount',
                        amount: totals?.grandTotalAmount,
                        icon: _jsx(Plus, {}),
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex items-center gap-3 my-3',
                children: [
                    _jsx('p', { children: 'Order Type : ' }),
                    _jsx(Radio.Group, {
                        defaultValue: 'Direct_POS',
                        buttonStyle: 'solid',
                        children: _jsx(Radio.Button, {
                            value: 'Direct_POS',
                            children: 'Direct_POS',
                        }),
                    }),
                ],
            }),
            _jsx(TableFilter, {
                filters: filters,
                setFilters: setFilters,
                onClear: handleClearFilter,
            }),
            _jsx(DataTable, {
                data: filteredOrders.length ? filteredOrders : pos_orders,
            }),
            ' ',
        ],
    });
};
export default Direct_Pos_Order;
