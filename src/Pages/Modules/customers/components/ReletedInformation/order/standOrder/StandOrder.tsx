import React from 'react';
import { Table, Button } from 'antd';
import { Fullscreen } from 'lucide-react';
import { Link } from 'react-router-dom';

const StanderdOrder = ({ orders = [], customerId }) => {
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
            render: text => <span>৳ {text}</span>,
        },
        { title: 'Status', dataIndex: 'order_status', key: 'order_status' },
    ];

    // Total amount calculate
    const totalAmount = orders.reduce(
        (sum, order) => sum + (order.total_amount || 0),
        0
    );

    return (
        <div className="">
            <Table
                columns={columns}
                dataSource={orders}
                pagination={false}
                rowKey="id"
                summary={() => (
                    <>
                        {/* Total row */}
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
                    </>
                )}
            />

            {/* View All button only if orders exist */}
            {/* {customerId && orders.length > 0 && (
                <Link to={`orders`}>
                    <Button
                        icon={
                            <Fullscreen
                                size={16}
                                strokeWidth={2}
                            />
                        }
                        className="bg-transparent !rounded-sm border-blue-500 text-primary flex items-center mt-2"
                    >
                        View All...
                    </Button>
                </Link>
            )} */}
        </div>
    );
};

export default StanderdOrder;
