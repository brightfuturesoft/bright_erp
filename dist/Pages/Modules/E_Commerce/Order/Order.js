import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import TableFilter from './components/TableFilter';
import DataTable from './components/DataTable';
import { useOrdersData } from './components/data_get_api';
import { useState, useEffect } from 'react';
import moment from 'moment';
import StockCard from '../../common/components/StockCard';
const Ecommerce_Order = () => {
    const { orders } = useOrdersData();
    const [filters, setFilters] = useState({});
    const [filteredOrders, setFilteredOrders] = useState([]);
    useEffect(() => {
        if (!orders) return;
        const filtered = orders.filter(order => {
            const orderDate = moment(order.created_at);
            return (
                (!filters.customer ||
                    order.delivery_address.full_name
                        .toLowerCase()
                        .includes(filters.customer.toLowerCase())) &&
                (!filters.productName ||
                    order.products.some(p =>
                        p.product_name
                            .toLowerCase()
                            .includes(filters.productName.toLowerCase())
                    )) &&
                (!filters.orderStatus ||
                    order.order_status === filters.orderStatus) &&
                (!filters.paymentStatus ||
                    order.payment.status === filters.paymentStatus) &&
                (!filters.paymentMethod ||
                    order.payment.method === filters.paymentMethod) &&
                (!filters.dateRange ||
                    (orderDate.isSameOrAfter(filters.dateRange[0], 'day') &&
                        orderDate.isSameOrBefore(filters.dateRange[1], 'day')))
            );
        });
        setFilteredOrders(filtered);
    }, [orders, filters]);
    const handleClearFilter = () => {
        setFilters({});
    };
    const totals = (filteredOrders.length ? filteredOrders : orders)?.reduce(
        (acc, order) => {
            const subTotal =
                order.total_amount -
                order.tax_amount -
                order.shipping_charge +
                order.discount;
            acc.subTotalAmount += subTotal;
            acc.subTotalTax += order.tax_amount;
            acc.grandTotalAmount += order.total_amount;
            return acc;
        },
        { subTotalAmount: 0, subTotalTax: 0, grandTotalAmount: 0 }
    );
    return _jsxs(Section, {
        title: 'E-Commerce Orders',
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
                        defaultValue: 'Ecommerce',
                        buttonStyle: 'solid',
                        children: _jsx(Radio.Button, {
                            value: 'Ecommerce',
                            children: 'Ecommerce',
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
                data: filteredOrders.length ? orders : filteredOrders,
            }),
        ],
    });
};
export default Ecommerce_Order;
