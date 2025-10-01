import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Image } from 'antd';
import Status from '@/Pages/Modules/common/components/Status';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
import { usePosOrdersData } from './data_get_api';

const OrderDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pos_orders } = usePosOrdersData();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        const orderData = pos_orders?.find((o: any) => o._id === id);
        if (orderData) setOrder(orderData);
    }, [id, pos_orders]);

    if (!order) return <div>Loading...</div>;

    const productColumns = [
        {
            title: 'Image',
            dataIndex: 'cover_photo',
            key: 'cover_photo',
            render: (cover_photo: string[]) => (
                <Image
                    width={50}
                    src={cover_photo[0]}
                />
            ),
        },
        { title: 'Product Name', dataIndex: 'item_name', key: 'item_name' },
        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: (color: string) => {
                const hex = rgbToHex(color || 'rgb(0,0,0)');
                const name = rgbToColorName(color || 'rgb(0,0,0)');
                return (
                    <div className="flex items-center gap-2">
                        <span
                            style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                backgroundColor: hex,
                                border: '1px solid #000',
                            }}
                        />
                        {name}
                    </div>
                );
            },
        },
        { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Offer Price',
            dataIndex: 'offer_price',
            key: 'offer_price',
            render: (price: number) => `$${price}`,
        },
        {
            title: 'Total',
            key: 'total',
            render: (text: any, record: any) =>
                `$${record.offer_price * record.quantity}`,
        },
    ];

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <h1 className="text-3xl font-bold mb-4">
                Order Details: #{order.order_number}
            </h1>

            {/* Customer Info */}
            <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
                <p>
                    <b>Name:</b> {order.delivery_address?.full_name}
                </p>
                <p>
                    <b>Phone:</b> {order.delivery_address?.phone || 'N/A'}
                </p>
                <p>
                    <b>Payment Method:</b>{' '}
                    {order.payment?.payment_method?.toUpperCase()}
                </p>
                <p>
                    <b>Payment Status:</b> {order.payment?.payment_status}
                </p>
                <p>
                    <b>Order Status:</b> <Status status={order.order_status} />
                </p>
                <p>
                    <b>Cashier:</b> {order.cashier_name}
                </p>
                <p>
                    <b>Order At:</b>{' '}
                    {new Date(order.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    })}
                </p>
            </section>

            {/* Products Table */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                <Table
                    columns={productColumns}
                    dataSource={order.products}
                    rowKey="_id"
                    pagination={false}
                    className="bg-white dark:bg-gray-800 rounded-lg"
                />
            </section>

            {/* Promo & Totals */}
            <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Promo & Totals</h2>
                <p>
                    <b>Promo Used:</b> {order.promo?.used ? 'Yes' : 'No'}
                </p>
                <p>
                    <b>Discount Amount:</b> Tk.{order.promo?.discount_amount}
                </p>
                <p>
                    <b>Shipping Charge:</b> Tk.{order.shipping_charge}
                </p>
                <p>
                    <b>Sub Total:</b> Tk.{order.total_amount - order.tax_amount}
                </p>
                <p>
                    <b>Tax:</b> Tk.{order.tax_amount}
                </p>
                <p className="text-green-600 font-bold">
                    Grand Total: Tk.{order.total_amount}
                </p>
            </section>

            {/* Payment Details */}
            <section className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
                <p>
                    <b>Amount Paid:</b> Tk.{order.payment?.amount}
                </p>
                <p>
                    <b>Change:</b> Tk.{order.payment?.change}
                </p>
                <p>
                    <b>Transaction ID:</b>{' '}
                    {order.payment?.transaction_id || 'N/A'}
                </p>
                <p>
                    <b>Payment Reference:</b>{' '}
                    {order.payment?.payment_reference || 'N/A'}
                </p>
            </section>
        </div>
    );
};

export default OrderDetailsPage;
