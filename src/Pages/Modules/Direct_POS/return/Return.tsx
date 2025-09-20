import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import InfoCard from '../../common/components/InfoCard';
import { useState, useEffect } from 'react';
import moment from 'moment';
import TableFilter from './components/Table_Filter';
import { useReturnOrdersData } from './components/data_get_api';
import DataTable from './components/Return_Table';

const Return_Order = () => {
    const { orders } = useReturnOrdersData();
    const [filters, setFilters] = useState<any>({});
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

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
                    order?.products.some((p: any) =>
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

    return (
        <Section title="Return Orders">
            <div className="flex flex-wrap gap-5">
                <InfoCard
                    title="Sub Total Amount"
                    amount={totals?.subTotalAmount}
                    icon={<Briefcase />}
                />
                <InfoCard
                    title="Sub Total Tax"
                    amount={totals?.subTotalTax}
                    icon={<LineChart />}
                />
                <InfoCard
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
            <DataTable data={filteredOrders} />
        </Section>
    );
};

export default Return_Order;
