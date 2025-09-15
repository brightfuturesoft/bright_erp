// CustomerAllOrders.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import moment from 'moment';
import TableFilter from './TableFilter';
import { useOrdersData } from '@/Pages/Modules/E_Commerce/Order/components/data_get_api';

const CustomerAllOrders = () => {
    const { customerId } = useParams();
    const { orders } = useOrdersData(customerId);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [filters, setFilters] = useState<any>({});

    useEffect(() => {
        if (orders) setCustomerOrders(orders);
    }, [orders]);

    const applyFilter = () => {
        let filtered = [...orders];

        // Filter by customer name
        if (filters.customer) {
            filtered = filtered.filter(order =>
                order.user_name
                    ?.toLowerCase()
                    .includes(filters.customer.toLowerCase())
            );
        }

        // Filter by product name
        if (filters.productName) {
            filtered = filtered.filter(order =>
                order.products?.some((p: any) =>
                    p.product_name
                        .toLowerCase()
                        .includes(filters.productName.toLowerCase())
                )
            );
        }

        // Filter by order status
        if (filters.orderStatus) {
            filtered = filtered.filter(
                order => order.order_status === filters.orderStatus
            );
        }

        // Filter by payment status
        if (filters.paymentStatus) {
            filtered = filtered.filter(
                order => order.payment.status === filters.paymentStatus
            );
        }

        // Filter by payment method
        if (filters.paymentMethod) {
            filtered = filtered.filter(
                order => order.payment.method === filters.paymentMethod
            );
        }

        // Filter by date range
        if (filters.dateRange && filters.dateRange.length === 2) {
            filtered = filtered.filter(order => {
                const orderDate = moment(order.created_at);
                return orderDate.isBetween(
                    filters.dateRange[0],
                    filters.dateRange[1],
                    'day',
                    '[]'
                );
            });
        }

        setCustomerOrders(filtered);
    };

    const clearFilter = () => {
        setFilters({});
        setCustomerOrders(orders);
    };

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: text => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            render: text => `৳ ${text}`,
        },
        { title: 'Status', dataIndex: 'order_status', key: 'order_status' },
    ];

    const totalAmount = customerOrders.reduce(
        (sum, order) => sum + (order.total_amount || 0),
        0
    );

    return (
        <div className="p-4 dark:text-light text-dark">
            <h2 className="text-xl font-semibold mb-4">All Orders</h2>
            <TableFilter
                filters={filters}
                setFilters={setFilters}
                onApply={applyFilter}
                onClear={clearFilter}
            />
            <Table
                columns={columns}
                dataSource={customerOrders}
                rowKey="id"
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell
                            index={0}
                            className="font-bold"
                        >
                            Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell
                            index={2}
                            className="font-bold"
                        >
                            ৳ {totalAmount}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
        </div>
    );
};

export default CustomerAllOrders;
