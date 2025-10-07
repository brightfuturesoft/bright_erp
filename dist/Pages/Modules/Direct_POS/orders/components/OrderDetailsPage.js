import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Image } from 'antd';
import Status from '@/Pages/Modules/common/components/Status';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
import { usePosOrdersData } from './data_get_api';
const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { pos_orders } = usePosOrdersData();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        if (!id) return;
        const orderData = pos_orders?.find(o => o._id === id);
        if (orderData) setOrder(orderData);
    }, [id, pos_orders]);
    if (!order) return _jsx('div', { children: 'Loading...' });
    const productColumns = [
        {
            title: 'Image',
            dataIndex: 'cover_photo',
            key: 'cover_photo',
            render: cover_photo =>
                _jsx(Image, { width: 50, src: cover_photo[0] }),
        },
        { title: 'Product Name', dataIndex: 'item_name', key: 'item_name' },
        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: color => {
                const hex = rgbToHex(color || 'rgb(0,0,0)');
                const name = rgbToColorName(color || 'rgb(0,0,0)');
                return _jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                        _jsx('span', {
                            style: {
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                backgroundColor: hex,
                                border: '1px solid #000',
                            },
                        }),
                        name,
                    ],
                });
            },
        },
        { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Offer Price',
            dataIndex: 'offer_price',
            key: 'offer_price',
            render: price => `$${price}`,
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) =>
                `$${record.offer_price * record.quantity}`,
        },
    ];
    return _jsxs('div', {
        className:
            'p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100',
        children: [
            _jsxs('h1', {
                className: 'text-3xl font-bold mb-4',
                children: ['Order Details: #', order.order_number],
            }),
            _jsxs('section', {
                className:
                    'mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-semibold mb-2',
                        children: 'Customer Info',
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Name:' }),
                            ' ',
                            order.delivery_address?.full_name,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Phone:' }),
                            ' ',
                            order.delivery_address?.phone || 'N/A',
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Payment Method:' }),
                            ' ',
                            order.payment?.payment_method?.toUpperCase(),
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Payment Status:' }),
                            ' ',
                            order.payment?.payment_status,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Order Status:' }),
                            ' ',
                            _jsx(Status, { status: order.order_status }),
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Cashier:' }),
                            ' ',
                            order.cashier_name,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Order At:' }),
                            ' ',
                            new Date(order.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs('section', {
                className: 'mb-6',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-semibold mb-2',
                        children: 'Products',
                    }),
                    _jsx(Table, {
                        columns: productColumns,
                        dataSource: order.products,
                        rowKey: '_id',
                        pagination: false,
                        className: 'bg-white dark:bg-gray-800 rounded-lg',
                    }),
                ],
            }),
            _jsxs('section', {
                className:
                    'mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-semibold mb-2',
                        children: 'Promo & Totals',
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Promo Used:' }),
                            ' ',
                            order.promo?.used ? 'Yes' : 'No',
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Discount Amount:' }),
                            ' Tk.',
                            order.promo?.discount_amount,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Shipping Charge:' }),
                            ' Tk.',
                            order.shipping_charge,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Sub Total:' }),
                            ' Tk.',
                            order.total_amount - order.tax_amount,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Tax:' }),
                            ' Tk.',
                            order.tax_amount,
                        ],
                    }),
                    _jsxs('p', {
                        className: 'text-green-600 font-bold',
                        children: ['Grand Total: Tk.', order.total_amount],
                    }),
                ],
            }),
            _jsxs('section', {
                className: 'p-4 bg-white dark:bg-gray-800 rounded-lg shadow',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-semibold mb-2',
                        children: 'Payment Details',
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Amount Paid:' }),
                            ' Tk.',
                            order.payment?.amount,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Change:' }),
                            ' Tk.',
                            order.payment?.change,
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Transaction ID:' }),
                            ' ',
                            order.payment?.transaction_id || 'N/A',
                        ],
                    }),
                    _jsxs('p', {
                        children: [
                            _jsx('b', { children: 'Payment Reference:' }),
                            ' ',
                            order.payment?.payment_reference || 'N/A',
                        ],
                    }),
                ],
            }),
        ],
    });
};
export default OrderDetailsPage;
