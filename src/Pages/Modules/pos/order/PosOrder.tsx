import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import StockCard from '../../common/components/StockCard';

const PosOrder = () => {
    const { user, workspace } = useContext(Erp_context);
    // Fetch orders data
    const {
        data: orders_data = [],
        isLoading: customer_pos_order_loading,
        isError: is_customer_pos_order_error,
        refetch: customer_pos_order_refetch,
    } = useQuery({
        queryKey: ['customer_pos_order'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}customers-order/pos/order/get-orders`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch customers');
            const data = await response.json();
            return data.data;
        },
    });

    // Sub total calculation
    const sub_total_amount = useCallback((orders: any[]) => {
        let total = 0;
        orders.forEach(order => {
            order.products.forEach(product => {
                total +=
                    product.quantity *
                    (product.offer_price || product.normal_price);
            });
        });
        return total;
    }, []);

    // Tax calculation
    const sub_total_tax = useCallback((orders: any[]) => {
        return orders.reduce((acc, order) => acc + (order.tax_amount || 0), 0);
    }, []);

    // Grand total calculation
    const grand_total_amount = useCallback((orders: any[]) => {
        return orders.reduce(
            (acc, order) => acc + (order.total_amount || 0),
            0
        );
    }, []);

    return (
        <Section
            title="POS Orders"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Sub Total Amount"
                    amount={sub_total_amount(orders_data)}
                    icon={<Briefcase />}
                />
                <StockCard
                    title="Sub Total Tax"
                    amount={sub_total_tax(orders_data)}
                    icon={<LineChart />}
                />
                <StockCard
                    title="Grand Total Amount"
                    amount={grand_total_amount(orders_data)}
                    icon={<Plus />}
                />
            </div>
            <TableFilter />
            <DataTable orders={orders_data} />
        </Section>
    );
};

export default PosOrder;
