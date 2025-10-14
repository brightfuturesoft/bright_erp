import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import InfoCard from '../../common/components/InfoCard';
import TableFilter from './components/TableFilter';
import DataTable from './components/DataTable';
import { useOrdersData } from './components/data_get_api';
import { useState, useEffect } from 'react';
import moment from 'moment';
import StockCard from '../../common/components/StockCard';

const Ecommerce_Order = () => {
    const { orders } = useOrdersData();
    const [filters, setFilters] = useState<any>({});
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

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
                    order.products.some((p: any) =>
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

    return (
        <Section title="E-Commerce Orders">
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
                    defaultValue="Ecommerce"
                    buttonStyle="solid"
                >
                    <Radio.Button value="Ecommerce">Ecommerce</Radio.Button>
                </Radio.Group>
            </div>

            <TableFilter
                filters={filters}
                setFilters={setFilters}
                onClear={handleClearFilter}
            />

            <DataTable data={filteredOrders.length ? orders : filteredOrders} />
        </Section>
    );
};

export default Ecommerce_Order;
