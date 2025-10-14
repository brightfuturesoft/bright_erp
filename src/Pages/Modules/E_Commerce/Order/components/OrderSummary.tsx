import React, { useState } from 'react';

interface DeliveryAddress {
    full_name: string;
    phone_number: string;
    street: string;
    city: string;
    state: string;
}

interface Payment {
    method: string;
    transaction_id: string;
    status: string;
}

interface Promo {
    used: boolean;
    promo_id: string | null;
    discount_amount: number;
}

interface Product {
    name: string;
    quantity: number;
    price: number;
}

export interface OrderData {
    order_number: string;
    order_status: string;
    order_type: string;
    total_amount: number;
    delivery_address: DeliveryAddress;
    payment: Payment;
    shipping_charge: number;
    tax_amount: number;
    discount: number;
    promo: Promo;
    products: Product[];
}

interface OrderSummaryProps {
    order: OrderData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
    // --- States ---
    const [deliveryZone, setDeliveryZone] = useState('Dhaka');

    // Number inputs controlled as string to fix cursor jump
    const [discountPercent, setDiscountPercent] = useState((0).toString());
    const [vatPercent, setVatPercent] = useState((0).toString());
    const [deliveryCharge, setDeliveryCharge] = useState(
        (order.shipping_charge || 120).toString()
    );
    const [paidAmount, setPaidAmount] = useState((0).toString());

    const [paymentStatus, setPaymentStatus] = useState(
        order.payment.status || 'Pending'
    );

    const deliveryZones = [
        'Dhaka',
        'Chattogram',
        'Khulna',
        'Barishal',
        'Sylhet',
        'Rajshahi',
        'Rangpur',
        'Mymensingh',
    ];

    const [paymentMethod, setPaymentMethod] = useState(
        order?.payment?.method || 'cod'
    );
    const paymentMethods = ['cod', 'bkash', 'nagad', 'bank', 'card'];

    const baseAmount = order.total_amount || 0;

    // --- Calculations ---
    const discountAmount =
        (baseAmount * Number(discountPercent)) / 100 +
        (order.promo.discount_amount || 0);
    const vatAmount =
        (baseAmount * Number(vatPercent)) / 100 + (order.tax_amount || 0);
    const grandTotal =
        baseAmount - discountAmount + vatAmount + Number(deliveryCharge);
    const dueAmount = Math.max(grandTotal - Number(paidAmount), 0);

    // --- Input Component ---
    const InputGroup: React.FC<{
        label: string;
        value: string;
        onChange?: (v: string) => void;
        type?: string;
    }> = ({ label, value, onChange, type = 'text' }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={e => onChange?.(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 dark:text-gray-100"
            />
        </div>
    );

    const DropdownGroup: React.FC<{
        label: string;
        options: string[];
        selected: string;
        onChange: (v: string) => void;
    }> = ({ label, options, selected, onChange }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
                {label}
            </label>
            <div className="relative">
                <select
                    value={selected}
                    onChange={e => onChange(e.target.value)}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm pr-10 bg-white dark:bg-gray-800 dark:text-gray-100"
                >
                    {options.map(option => (
                        <option key={option}>{option}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
    );

    return (
        <div className="my-5 mx-auto p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-colors duration-300">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Order Summary
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                {/* Discount */}
                <div>
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
                        Discount
                    </h3>
                    <InputGroup
                        label="Percentage (%)"
                        value={discountPercent}
                        onChange={setDiscountPercent}
                        type="number"
                    />
                    <InputGroup
                        label="Amount"
                        value={discountAmount.toFixed(2)}
                        type="number"
                    />
                </div>

                {/* VAT */}
                <div>
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
                        VAT/TAX
                    </h3>
                    <InputGroup
                        label="Percentage (%)"
                        value={vatPercent}
                        onChange={setVatPercent}
                        type="number"
                    />
                    <InputGroup
                        label="Amount"
                        value={vatAmount.toFixed(2)}
                        type="number"
                    />
                </div>

                {/* Delivery */}
                <div>
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
                        Delivery
                    </h3>
                    <DropdownGroup
                        label="Delivery Zone"
                        options={deliveryZones}
                        selected={deliveryZone}
                        onChange={setDeliveryZone}
                    />
                    <InputGroup
                        label="Delivery Charge"
                        value={deliveryCharge}
                        onChange={setDeliveryCharge}
                        type="number"
                    />
                </div>

                {/* Payment */}
                <div>
                    <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
                        Payment
                    </h3>
                    <DropdownGroup
                        label="Payment Method"
                        options={paymentMethods}
                        selected={paymentMethod}
                        onChange={setPaymentMethod}
                    />
                    <InputGroup
                        label="Paid Amount"
                        value={paidAmount}
                        onChange={setPaidAmount}
                        type="number"
                    />
                </div>
            </div>

            {/* Totals */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    Due Amount: BDT {dueAmount.toFixed(2)}
                </p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    Grand Total: BDT {grandTotal.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default OrderSummary;
