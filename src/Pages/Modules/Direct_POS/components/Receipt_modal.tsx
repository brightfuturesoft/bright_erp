import React, { useState, useEffect } from 'react';
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
}: any) => {
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

    return (
        <Modal
            title="Print Receipt"
            open={is_receipt_modal_visible}
            footer={null}
            onCancel={() => set_is_receipt_modal_visible(false)}
            width={400}
            className="receipt-modal"
        >
            <div className="receipt-content bg-white text-black p-4 font-mono text-sm">
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="font-bold text-lg">
                        {workspace?.name || 'Store Name'}
                    </div>
                    <div className="text-sm">
                        Phone Number:{' '}
                        {workspace?.contact_info?.phone_number?.[0] ||
                            '+1 5656665656'}
                    </div>
                    <div className="text-sm">
                        Email:{' '}
                        {workspace?.contact_info?.official_email ||
                            'example@gmail.com'}
                    </div>
                    <div className="text-sm">
                        Issue By: {user?.name || 'example@gmail.com'}
                    </div>
                </div>

                <div className="border-t border-dashed border-gray-400 my-4"></div>

                <div className="text-center font-bold mb-4">Tax Invoice</div>
                <div className="mb-4">
                    <div>
                        Name:{' '}
                        {current_order_data?.delivery_address?.full_name ||
                            'Walk-in Customer'}
                    </div>
                    <div>Invoice No: {nextTransactionId}</div>
                    <div>
                        Customer: #
                        {current_order_data?.delivery_address?.customer_id ||
                            'WALKIN'}
                    </div>
                    <div>
                        Date:{' '}
                        {current_order_data?.date ||
                            new Date().toLocaleDateString()}
                    </div>
                </div>

                <div className="border-t border-dashed border-gray-400 my-4"></div>

                {/* Items Table */}
                <div className="w-full text-xs mb-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="font-bold text-left">
                                <th className="w-6 text-left">#</th>
                                <th className="text-left">Item</th>
                                <th className="w-16 text-right">Price</th>
                                <th className="w-10 text-center">Qty</th>
                                <th className="w-16 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(current_order_data?.items || cart_items)?.map(
                                (item: any, index: number) => (
                                    <tr key={item._id || item.id}>
                                        <td className="w-6 text-left">
                                            {index + 1}.
                                        </td>
                                        <td className="text-left">
                                            {item.item_name || item.name}
                                        </td>
                                        <td className="w-16 text-right">
                                            ৳
                                            {parseFloat(
                                                item.offer_price ||
                                                    item.normal_price ||
                                                    0
                                            )}
                                        </td>
                                        <td className="w-10 text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="w-16 text-right">
                                            ৳
                                            {(
                                                (parseFloat(
                                                    item.offer_price ||
                                                        item.normal_price ||
                                                        0
                                                ) || 0) * item.quantity
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="border-t border-dashed border-gray-400 my-4"></div>
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <span>Sub Total:</span>
                        <span>
                            ৳
                            {(current_order_data?.subtotal ?? subtotal).toFixed(
                                2
                            )}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount:</span>
                        <span>
                            -৳
                            {(
                                current_order_data?.discount_amount ??
                                discount_amount
                            ).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>
                            ৳
                            {(current_order_data?.shipping ?? shipping).toFixed(
                                2
                            )}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax ({current_order_data?.tax ?? tax}%):</span>
                        <span>
                            ৳
                            {(
                                current_order_data?.tax_amount ?? tax_amount
                            ).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total Bill:</span>
                        <span>
                            ৳{(current_order_data?.total ?? total).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Due:</span>
                        <span>৳0.00</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total Payable:</span>
                        <span>
                            ৳{(current_order_data?.total ?? total).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Payment Method</span>
                        <span className="capitalize">{payment_method}</span>
                    </div>
                    {payment_method === 'cash' && (
                        <div className="flex justify-between font-bold">
                            <span>Return Amount:</span>
                            <span>
                                ৳
                                {isFinite(cashReceived - total)
                                    ? (cashReceived - total).toFixed(2)
                                    : '0.00'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Barcode */}
                <div className="border-t border-dashed border-gray-400 my-4"></div>
                <div
                    className="text-center my-4"
                    style={{
                        width: '80%',
                        margin: 'auto',
                        height: '80px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Barcode value={nextTransactionId} />
                </div>

                <div className="text-center text-xs">
                    Thank You For Shopping With Us. Please Come Again
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-4">
                <Button
                    type="primary"
                    onClick={handlePrint}
                    className="bg-blue-600"
                >
                    Print Receipt
                </Button>
                <Button onClick={handleContinue}>Continue</Button>
            </div>
        </Modal>
    );
};

export default Receipt_modal;
