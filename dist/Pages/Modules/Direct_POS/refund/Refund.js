import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useRefundOrdersData } from './components/data_get_api';
import TableFilter from './components/TableFilter';
import DataTable from './components/Refund_Table';
import StockCard from '../../common/components/StockCard';
const Refund_Order = () => {
    const { orders } = useRefundOrdersData();
    const [filters, setFilters] = useState({});
    const [filteredOrders, setFilteredOrders] = useState([]);
    useEffect(() => {
        if (!orders) return;
        const filtered = orders.filter(order => {
            const orderDate = moment(order.created_at);
            return (
                (!filters.customer ||
                    order?.delivery_address?.full_name
                        ?.toLowerCase()
                        .includes(filters.customer.toLowerCase())) &&
                (!filters.productName ||
                    order?.products.some(p =>
                        (p?.item_name || p?.name || '')
                            .toLowerCase()
                            .includes(filters.productName.toLowerCase())
                    )) &&
                (!filters.orderNumber ||
                    order.order_number
                        ?.toLowerCase()
                        .includes(filters.orderNumber.toLowerCase())) &&
                (!filters.orderStatus ||
                    order.order_status.toLowerCase() ===
                        filters.orderStatus.toLowerCase()) &&
                (!filters.paymentMethod ||
                    order.payment?.payment_method?.toLowerCase() ===
                        filters.paymentMethod.toLowerCase()) &&
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
        title: 'Return Orders',
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
            _jsx(DataTable, { data: filteredOrders }),
        ],
    });
};
export default Refund_Order;
