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
    const [filters, setFilters] = useState<any>({});
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

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

    return (
        <Section title="Direct POS Orders">
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Sub Total Amount"
                    amount={totals?.subTotalAmount}
                    icon={<Briefcase />}
                />
                <StockCard
                    title="Sub Total Tax"
                    amount={totals?.subTotalTax}
                    icon={<LineChart />}
                />
                <StockCard
                    title="Grand Total Amount"
                    amount={totals?.grandTotalAmount}
                    icon={<Plus />}
                />
            </div>
            <div className="flex items-center gap-3 my-3">
                <p>Order Type : </p>
                <Radio.Group
                    defaultValue="Direct_POS"
                    buttonStyle="solid"
                >
                    <Radio.Button value="Direct_POS">Direct_POS</Radio.Button>
                </Radio.Group>
            </div>
            <TableFilter
                filters={filters}
                setFilters={setFilters}
                onClear={handleClearFilter}
            />
            {/* Filtered data only */}
            <DataTable
                data={filteredOrders.length ? filteredOrders : pos_orders}
            />{' '}
        </Section>
    );
};

export default Direct_Pos_Order;
