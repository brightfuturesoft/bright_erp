import React from 'react';
import { Table, Button } from 'antd';
import { Fullscreen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrdersData } from '@/Pages/Modules/E_Commerce/Order/components/data_get_api';

const Deliveries = ({ customerId }) => {
    const { orders } = useOrdersData();
    const customerDeliveries = orders?.filter(
        o => o.user_id === customerId && o.order_status !== 'cancelled'
    );

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: 'Product Name',
            dataIndex: ['products', 0, 'product_name'],
            key: 'product_name',
        },
        {
            title: 'Quantity',
            dataIndex: ['products', 0, 'quantity'],
            key: 'quantity',
        },
        {
            title: 'Delivery Address',
            dataIndex: 'delivery_address',
            key: 'delivery_address',
            render: addr => `${addr.street}, ${addr.city}, ${addr.state}`,
        },
        { title: 'Status', dataIndex: 'order_status', key: 'order_status' },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={customerDeliveries}
                pagination={false}
                rowKey="id"
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}></Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={3}></Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
            {customerId && customerDeliveries.length > 0 && (
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
            )}
        </div>
    );
};

export default Deliveries;
