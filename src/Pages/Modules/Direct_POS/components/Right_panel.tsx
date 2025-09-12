import React from 'react';
import { Select, Input, Button } from 'antd';
import Cart_product from '../components/Cart_product';
import CreatableSelect from 'react-select/creatable';

const { Option } = Select;

const Right_panel = ({
    order_id,
    cart_items,
    clearAll,
    remove_from_cart,
    update_quantity,
    selected_customer,
    selected_customer_id,
    customer_options,
    openAddCustomer,
    set_selected_customer_id,
    isDark,
    customStyles,
    tax,
    setTax,
    shipping,
    set_shipping,
    discount,
    setDiscount,
    subtotal,
    tax_amount,
    safe_fixed,
    discount_amount,
    total,
    payment_method,
    set_payment_method,
    cashReceived,
    setCashReceived,
    handle_hold_order,
    handle_payment,
    set_payment_id,
    payment_id,
}: any) => {
    console.log(selected_customer_id, 'cashReceived, total');
    return (
        <div className="w-96 dark:bg-gray-800 bg-gray-50  p-6 border-l border-gray-600 h-screen overflow-y-auto">
            <div className="mb-6">
                <h2 className="text-xl font-bold dark:text-white text-dark mb-2">
                    Order List
                </h2>
                <div className="text-sm dark:text-gray-300 text-gray-800">
                    Transaction ID: {order_id}
                </div>
            </div>
            {/* Customer Selection */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm dark:text-gray-300 text-gray-800">
                        Customer
                    </div>
                    <button
                        onClick={openAddCustomer}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                    >
                        + Add Customer
                    </button>
                </div>
                <Select
                    showSearch
                    placeholder="Select customer"
                    className="w-full"
                    value={selected_customer_id}
                    onSelect={value => set_selected_customer_id(value)}
                    filterOption={(input, option) =>
                        (option?.label as string)
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                    }
                >
                    {customer_options.map((customer: any) => (
                        <Option
                            value={customer.data._id}
                            label={customer.label}
                        >
                            {customer.label}
                        </Option>
                    ))}
                </Select>
                <div className="mt-3 dark:bg-gray-700 bg-gray-200 rounded p-3">
                    <div className="font-medium text-gray-800 dark:text-white text-base mb-2">
                        {selected_customer?.name || 'Walk-in Customer'}
                    </div>
                    <div className="space-y-1">
                        {selected_customer?.phone && (
                            <div className="text-xs dark:text-gray-300 text-gray-800">
                                Phone: {selected_customer.phone}
                            </div>
                        )}
                        {selected_customer?.email && (
                            <div className="text-xs dark:text-gray-300 text-gray-800">
                                Email: {selected_customer.email}
                            </div>
                        )}
                        {selected_customer?.address && (
                            <div className="text-xs dark:text-gray-300 text-gray-800">
                                Address: {selected_customer.address}
                            </div>
                        )}
                        {selected_customer?.id === 'walk-in' && (
                            <div className="text-xs dark:text-blue-300 text-blue-600 mt-2">
                                Default walk-in customer
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Product Added Counter and Clear All */}
            <div className="flex justify-between items-center mb-4">
                <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    Product Added:{' '}
                    {cart_items.reduce(
                        (sum: number, item: any) => sum + item.quantity,
                        0
                    )}
                </div>
                <button
                    onClick={clearAll}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                    Clear all
                </button>
            </div>
            {/* Products Header */}
            <h3 className="font-semibold dark:text-white text-gray-800 mb-4">
                Products
            </h3>
            <div className="mb-6 max-h-64 overflow-y-auto">
                {cart_items.map((item: any) => (
                    <Cart_product
                        key={item._id}
                        item={item}
                        remove_from_cart={remove_from_cart}
                        update_quantity={update_quantity}
                    />
                ))}
            </div>
            {/* Order Details */}
            <div className="space-y-4 mb-6">
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label className="text-sm dark:text-gray-300 text-gray-800 block mb-1">
                            Order Tax
                        </label>
                        <CreatableSelect
                            styles={customStyles(isDark)}
                            isClearable
                            placeholder="Tax"
                            className=""
                            options={[
                                { value: 5, label: '5%' },
                                { value: 10, label: '10%' },
                                { value: 15, label: '15%' },
                            ]}
                            formatCreateLabel={(inputValue: any) =>
                                `Add "${inputValue}%"`
                            }
                            isValidNewOption={(inputValue: any) => {
                                const num = Number(inputValue);
                                return !isNaN(num) && num >= 0 && num <= 100;
                            }}
                            components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                            }}
                            onChange={(e: any) => setTax(e?.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300 text-gray-800 block mb-1">
                            Shipping
                        </label>
                        <CreatableSelect
                            styles={customStyles(isDark)}
                            isClearable
                            placeholder="Shipping"
                            className=""
                            options={[
                                { value: 0, label: '0' },
                                { value: 60, label: '60' },
                                { value: 120, label: '120' },
                            ]}
                            onChange={(e: any) => set_shipping(e?.value)}
                            formatCreateLabel={(inputValue: any) =>
                                `Add "${inputValue}"`
                            }
                            components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                            }}
                        />
                    </div>
                    <div>
                        <label className="text-sm dark:text-gray-300 text-gray-800 block mb-1">
                            Discount
                        </label>
                        <CreatableSelect
                            isClearable
                            styles={customStyles(isDark)}
                            components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null,
                            }}
                            placeholder="Discount"
                            className=""
                            onChange={(e: any) => setDiscount(e?.value)}
                            options={[
                                { value: 5, label: '5%' },
                                { value: 10, label: '10%' },
                                { value: 15, label: '15%' },
                            ]}
                            formatCreateLabel={(inputValue: any) =>
                                `Add "${inputValue}%"`
                            }
                            isValidNewOption={(inputValue: any) => {
                                const num = Number(inputValue);
                                return !isNaN(num) && num >= 0 && num <= 100;
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Summary */}
            {cart_items.length > 0 && (
                <div className="space-y-2 mb-6 dark:bg-gray-700 bg-gray-300 p-4 rounded-lg">
                    <div className="flex justify-between dark:text-gray-300 text-gray-800">
                        <span>Sub Total</span>
                        <span>
                            <span className="kalpurush-font">৳</span>
                            {subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between dark:text-gray-300 text-gray-800">
                        <span>Tax (GST {tax}%)</span>
                        <span>
                            <span className="kalpurush-font">৳</span>
                            {tax_amount.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between dark:text-gray-300 text-gray-800">
                        <span>Shipping</span>
                        <span>
                            <span className="kalpurush-font">৳</span>
                            {safe_fixed(shipping, 2)}
                        </span>
                    </div>
                    <div className="flex justify-between dark:text-gray-300 text-gray-800">
                        <span>Sub Total</span>
                        <span>
                            <span className="kalpurush-font">৳</span>
                            {(
                                subtotal +
                                tax_amount +
                                parseFloat(safe_fixed(shipping, 2))
                            ).toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between text-red-400">
                        <span>Discount ({discount}%)</span>
                        <span>
                            -<span className="kalpurush-font">৳</span>
                            {discount_amount.toFixed(2)}
                        </span>
                    </div>
                    <hr className="border-gray-600" />
                    <div className="flex justify-between font-semibold text-lg dark:text-gray-300 text-gray-800">
                        <span>Total</span>
                        <span>
                            <span className="kalpurush-font">৳</span>
                            {total.toFixed(2)}
                        </span>
                    </div>
                </div>
            )}
            {/* Total Button */}
            {cart_items.length > 0 && (
                <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold mb-3 hover:bg-blue-800">
                    Grand Total: <span className="kalpurush-font">৳</span>
                    {total.toFixed(2)}
                </button>
            )}
            {/* Payment Method */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3 dark:text-white text-gray-800">
                    Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                        onClick={() => set_payment_method('cash')}
                        className={
                            payment_method === 'cash'
                                ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white bg-white text-black hover:bg-gray-600 '
                        }
                    >
                        💵
                        <br />
                        Cash
                    </button>
                    <button
                        onClick={() => set_payment_method('card')}
                        className={
                            payment_method === 'card'
                                ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white bg-white text-black hover:bg-gray-600'
                        }
                    >
                        💳
                        <br />
                        Card
                    </button>
                    <button
                        onClick={() => set_payment_method('scan')}
                        className={
                            payment_method === 'scan'
                                ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white bg-white text-black hover:bg-gray-600'
                        }
                    >
                        📱
                        <br />
                        Scan
                    </button>
                </div>
                {/* Render Input only if payment method is cash */}
                {payment_method === 'cash' && (
                    <div className="mt-4">
                        <Input
                            type="number"
                            placeholder="Enter cash received"
                            value={cashReceived}
                            onChange={e =>
                                setCashReceived(Number(e.target.value))
                            }
                            className="dark:text-white text-black"
                        />
                        <p className="dark:text-white text-black mt-2">
                            Return Amount:{' '}
                            <span className="font-semibold">
                                <span className="kalpurush-font">৳</span>
                                {isFinite(cashReceived - total)
                                    ? (cashReceived - total).toFixed(2)
                                    : '0.00'}
                            </span>
                        </p>
                    </div>
                )}

                {payment_method === 'scan' && (
                    <div className="mt-4">
                        <Input
                            placeholder="Enter transaction id"
                            value={payment_id}
                            onChange={e => set_payment_id(e.target.value)}
                            className="dark:text-white text-black"
                        />
                    </div>
                )}
            </div>
            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={handle_hold_order}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    📱 Hold
                </button>
                <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
                    🗑️ Void
                </button>
                <button
                    onClick={handle_payment}
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    💳 Payment
                </button>
            </div>
        </div>
    );
};

export default Right_panel;
