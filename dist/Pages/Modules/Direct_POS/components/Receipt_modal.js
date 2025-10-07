import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import Barcode from 'react-barcode';
import { usePosOrdersData } from '../orders/components/data_get_api';
const Receipt_modal = ({
    is_receipt_modal_visible,
    set_is_receipt_modal_visible,
    workspace,
    user,
    current_order_data,
    cart_items,
    subtotal,
    discount_amount,
    shipping,
    tax,
    tax_amount,
    total,
    printReceipt,
    continue_without_print,
    payment_method,
    cashReceived,
}) => {
    const { pos_orders, isLoading, refetch } = usePosOrdersData();
    const [nextTransactionId, setNextTransactionId] = useState(
        `${workspace?.name?.toLowerCase() || 'order'}_0001`
    );
    useEffect(() => {
        if (!isLoading && pos_orders?.length > 0) {
            const sortedOrders = [...pos_orders].sort(
                (a, b) =>
                    new Date(a.created_at || a.createdAt).getTime() -
                    new Date(b.created_at || b.createdAt).getTime()
            );
            const lastOrder = sortedOrders[sortedOrders.length - 1];
            const lastId =
                lastOrder.order_number ||
                `${workspace?.name?.toLowerCase() || 'green'}_0000`;
            const [prefix, number] = lastId.split('_');
            const nextNumber = String(Number(number) + 1).padStart(4, '0');
            setNextTransactionId(`${prefix}_${nextNumber}`);
        }
    }, [pos_orders, isLoading, workspace?.name]);
    useEffect(() => {
        if (!is_receipt_modal_visible) {
            refetch();
        }
    }, [is_receipt_modal_visible, refetch]);
    const handleContinue = async () => {
        await continue_without_print?.();
        set_is_receipt_modal_visible(false);
    };
    const handlePrint = async () => {
        await printReceipt?.();
        set_is_receipt_modal_visible(false);
    };
    return _jsxs(Modal, {
        title: 'Print Receipt',
        open: is_receipt_modal_visible,
        footer: null,
        onCancel: () => set_is_receipt_modal_visible(false),
        width: 400,
        className: 'receipt-modal',
        children: [
            _jsxs('div', {
                className:
                    'receipt-content bg-white text-black p-4 font-mono text-sm',
                children: [
                    _jsxs('div', {
                        className: 'text-center mb-4',
                        children: [
                            _jsx('div', {
                                className: 'font-bold text-lg',
                                children: workspace?.name || 'Store Name',
                            }),
                            _jsxs('div', {
                                className: 'text-sm',
                                children: [
                                    'Phone Number:',
                                    ' ',
                                    workspace?.contact_info
                                        ?.phone_number?.[0] || '+1 5656665656',
                                ],
                            }),
                            _jsxs('div', {
                                className: 'text-sm',
                                children: [
                                    'Email:',
                                    ' ',
                                    workspace?.contact_info?.official_email ||
                                        'example@gmail.com',
                                ],
                            }),
                            _jsxs('div', {
                                className: 'text-sm',
                                children: [
                                    'Issue By: ',
                                    user?.name || 'example@gmail.com',
                                ],
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className:
                            'border-t border-dashed border-gray-400 my-4',
                    }),
                    _jsx('div', {
                        className: 'text-center font-bold mb-4',
                        children: 'Tax Invoice',
                    }),
                    _jsxs('div', {
                        className: 'mb-4',
                        children: [
                            _jsxs('div', {
                                children: [
                                    'Name:',
                                    ' ',
                                    current_order_data?.delivery_address
                                        ?.full_name || 'Walk-in Customer',
                                ],
                            }),
                            _jsxs('div', {
                                children: ['Invoice No: ', nextTransactionId],
                            }),
                            _jsxs('div', {
                                children: [
                                    'Customer: #',
                                    current_order_data?.delivery_address
                                        ?.customer_id || 'WALKIN',
                                ],
                            }),
                            _jsxs('div', {
                                children: [
                                    'Date:',
                                    ' ',
                                    current_order_data?.date ||
                                        new Date().toLocaleDateString(),
                                ],
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className:
                            'border-t border-dashed border-gray-400 my-4',
                    }),
                    _jsx('div', {
                        className: 'w-full text-xs mb-4',
                        children: _jsxs('table', {
                            className: 'w-full border-collapse',
                            children: [
                                _jsx('thead', {
                                    children: _jsxs('tr', {
                                        className: 'font-bold text-left',
                                        children: [
                                            _jsx('th', {
                                                className: 'w-6 text-left',
                                                children: '#',
                                            }),
                                            _jsx('th', {
                                                className: 'text-left',
                                                children: 'Item',
                                            }),
                                            _jsx('th', {
                                                className: 'w-16 text-right',
                                                children: 'Price',
                                            }),
                                            _jsx('th', {
                                                className: 'w-10 text-center',
                                                children: 'Qty',
                                            }),
                                            _jsx('th', {
                                                className: 'w-16 text-right',
                                                children: 'Total',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    children: (
                                        current_order_data?.items || cart_items
                                    )?.map((item, index) =>
                                        _jsxs(
                                            'tr',
                                            {
                                                children: [
                                                    _jsxs('td', {
                                                        className:
                                                            'w-6 text-left',
                                                        children: [
                                                            index + 1,
                                                            '.',
                                                        ],
                                                    }),
                                                    _jsx('td', {
                                                        className: 'text-left',
                                                        children:
                                                            item.item_name ||
                                                            item.name,
                                                    }),
                                                    _jsxs('td', {
                                                        className:
                                                            'w-16 text-right',
                                                        children: [
                                                            '\u09F3',
                                                            parseFloat(
                                                                item.offer_price ||
                                                                    item.normal_price ||
                                                                    0
                                                            ),
                                                        ],
                                                    }),
                                                    _jsx('td', {
                                                        className:
                                                            'w-10 text-center',
                                                        children: item.quantity,
                                                    }),
                                                    _jsxs('td', {
                                                        className:
                                                            'w-16 text-right',
                                                        children: [
                                                            '\u09F3',
                                                            (
                                                                (parseFloat(
                                                                    item.offer_price ||
                                                                        item.normal_price ||
                                                                        0
                                                                ) || 0) *
                                                                item.quantity
                                                            ).toFixed(2),
                                                        ],
                                                    }),
                                                ],
                                            },
                                            item._id || item.id
                                        )
                                    ),
                                }),
                            ],
                        }),
                    }),
                    _jsx('div', {
                        className:
                            'border-t border-dashed border-gray-400 my-4',
                    }),
                    _jsxs('div', {
                        className: 'space-y-1',
                        children: [
                            _jsxs('div', {
                                className: 'flex justify-between',
                                children: [
                                    _jsx('span', { children: 'Sub Total:' }),
                                    _jsxs('span', {
                                        children: [
                                            '\u09F3',
                                            (
                                                current_order_data?.subtotal ??
                                                subtotal
                                            ).toFixed(2),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'flex justify-between',
                                children: [
                                    _jsx('span', { children: 'Discount:' }),
                                    _jsxs('span', {
                                        children: [
                                            '-\u09F3',
                                            (
                                                current_order_data?.discount_amount ??
                                                discount_amount
                                            ).toFixed(2),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'flex justify-between',
                                children: [
                                    _jsx('span', { children: 'Shipping:' }),
                                    _jsxs('span', {
                                        children: [
                                            '\u09F3',
                                            (
                                                current_order_data?.shipping ??
                                                shipping
                                            ).toFixed(2),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'flex justify-between',
                                children: [
                                    _jsxs('span', {
                                        children: [
                                            'Tax (',
                                            current_order_data?.tax ?? tax,
                                            '%):',
                                        ],
                                    }),
                                    _jsxs('span', {
                                        children: [
                                            '\u09F3',
                                            (
                                                current_order_data?.tax_amount ??
                                                tax_amount
                                            ).toFixed(2),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'flex justify-between font-bold',
                                children: [
                                    _jsx('span', { children: 'Total Bill:' }),
                                    _jsxs('span', {
                                        children: [
                                            '\u09F3',
                                            (
                                                current_order_data?.total ??
                                                total
                                            ).toFixed(2),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'flex justify-between',
                                children: [
                                    _jsx('span', { children: 'Due:' }),
                                    _jsx('span', { children: '\u09F30.00' }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'flex justify-between font-bold',
                                children: [
                                    _jsx('span', {
                                        children: 'Total Payable:',
                                    }),
                                    _jsxs('span', {
                                        children: [
                                            '\u09F3',
                                            (
                                                current_order_data?.total ??
                                                total
                                            ).toFixed(2),
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'flex justify-between font-bold',
                                children: [
                                    _jsx('span', {
                                        children: 'Payment Method',
                                    }),
                                    _jsx('span', {
                                        className: 'capitalize',
                                        children: payment_method,
                                    }),
                                ],
                            }),
                            payment_method === 'cash' &&
                                _jsxs('div', {
                                    className: 'flex justify-between font-bold',
                                    children: [
                                        _jsx('span', {
                                            children: 'Return Amount:',
                                        }),
                                        _jsxs('span', {
                                            children: [
                                                '\u09F3',
                                                isFinite(cashReceived - total)
                                                    ? (
                                                          cashReceived - total
                                                      ).toFixed(2)
                                                    : '0.00',
                                            ],
                                        }),
                                    ],
                                }),
                        ],
                    }),
                    _jsx('div', {
                        className:
                            'border-t border-dashed border-gray-400 my-4',
                    }),
                    _jsx('div', {
                        className: 'text-center my-4',
                        style: {
                            width: '80%',
                            margin: 'auto',
                            height: '80px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        },
                        children: _jsx(Barcode, { value: nextTransactionId }),
                    }),
                    _jsx('div', {
                        className: 'text-center text-xs',
                        children:
                            'Thank You For Shopping With Us. Please Come Again',
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex gap-4 justify-center mt-4',
                children: [
                    _jsx(Button, {
                        type: 'primary',
                        onClick: handlePrint,
                        className: 'bg-blue-600',
                        children: 'Print Receipt',
                    }),
                    _jsx(Button, {
                        onClick: handleContinue,
                        children: 'Continue',
                    }),
                ],
            }),
        ],
    });
};
export default Receipt_modal;
