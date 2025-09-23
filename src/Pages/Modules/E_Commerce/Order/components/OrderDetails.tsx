import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Image } from 'antd';
import Status from '@/Pages/Modules/common/components/Status';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
import { useOrdersData } from './data_get_api';

const EcommerceOrderDetailsPage: React.FC = () => {
    const { id } = useParams();
    const { orders } = useOrdersData();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (!id) return;
        const orderData = orders?.find((o: any) => o.id === id || o._id === id);
        if (orderData) setOrder(orderData);
    }, [id, orders]);

    if (!order) return <div>Loading...</div>;

    const productColumns = [
        {
            title: 'Image',
            dataIndex: 'product_image',
            key: 'product_image',
            render: (src: string) => (
                <Image
                    width={50}
                    src={src}
                />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
        {
            title: 'Color',
            dataIndex: 'variation',
            key: 'color',
            render: (variation: any) => {
                const hex = rgbToHex(variation?.color || 'rgb(0,0,0)');
                const name = rgbToColorName(variation?.color || 'rgb(0,0,0)');
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
        { title: 'Size', dataIndex: ['variation', 'size'], key: 'size' },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Price',
            dataIndex: 'order_price',
            key: 'order_price',
            render: (price: number) => `Tk.${price}`,
        },
        {
            title: 'Total',
            key: 'total',
            render: (text: any, record: any) =>
                `Tk.${record.order_price * record.quantity}`,
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
                    <b>Phone:</b>{' '}
                    {order.delivery_address?.phone_number || 'N/A'}
                </p>
                <p>
                    <b>Payment Method:</b>{' '}
                    {order.payment?.method?.toUpperCase()}
                </p>
                <p>
                    <b>Payment Status:</b>{' '}
                    {order.payment?.status?.toUpperCase()}
                </p>
                <p>
                    <b>Order Status:</b> <Status status={order.order_status} />
                </p>
                <p>
                    <b>Order At:</b>{' '}
                    {new Date(order.created_at).toLocaleString()}
                </p>
            </section>

            {/* Products Table */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Products</h2>
                <Table
                    columns={productColumns}
                    dataSource={order.products}
                    rowKey="product_id"
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
                    <b>Discount Amount:</b> Tk.
                    {order.promo?.discount_amount || 0}
                </p>
                <p>
                    <b>Shipping Charge:</b> Tk.{order.shipping_charge || 0}
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
                    <b>Transaction ID:</b>{' '}
                    {order.payment?.transaction_id || 'N/A'}
                </p>
                <p>
                    <b>Payment Reference:</b>{' '}
                    {order.payment?.payment_reference || 'N/A'}
                </p>
                <p>
                    <b>Amount Paid:</b> Tk.{order.total_amount}
                </p>
                <p>
                    <b>Change:</b> Tk.0
                </p>
            </section>
        </div>
    );
};

export default EcommerceOrderDetailsPage;
