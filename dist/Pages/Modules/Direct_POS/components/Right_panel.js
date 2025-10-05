import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { Select, Input } from 'antd';
import Cart_product from '../components/Cart_product';
import CreatableSelect from 'react-select/creatable';
import { usePosOrdersData } from '../orders/components/data_get_api';
const { Option } = Select;
const Right_panel = ({
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
    handleReset,
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
}) => {
    const { pos_orders, isLoading, workspace, refetch } = usePosOrdersData();
    const [nextTransactionId, setNextTransactionId] = useState(
        `${workspace?.name.toLowerCase()}_0001`
    );
    useEffect(() => {
        if (!isLoading && pos_orders?.length > 0) {
            const sortedOrders = [...pos_orders].sort(
                (a, b) =>
                    new Date(a.created_at || a.createdAt).getTime() -
                    new Date(b.created_at || b.createdAt).getTime()
            );
            const lastOrder = sortedOrders[sortedOrders.length - 1];
            const lastId = lastOrder.order_number || 'green_0000';
            const [prefix, number] = lastId.split('_');
            const nextNumber = String(Number(number) + 1).padStart(4, '0');
            setNextTransactionId(`${prefix}_${nextNumber}`);
        }
    }, [pos_orders, isLoading]);
    const handlePaymentClick = async () => {
        await handle_payment();
        refetch();
    };
    return _jsxs('div', {
        className:
            'w-96 dark:bg-gray-800 bg-gray-50  p-6 border-l border-gray-600 h-screen overflow-y-auto',
        children: [
            _jsxs('div', {
                className: 'mb-6',
                children: [
                    _jsx('h2', {
                        className:
                            'text-xl font-bold dark:text-white text-dark mb-2',
                        children: 'Order List',
                    }),
                    _jsxs('div', {
                        className: 'text-sm dark:text-gray-300 text-gray-800',
                        children: ['Transaction ID: ', nextTransactionId],
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'mb-6',
                children: [
                    _jsxs('div', {
                        className: 'flex items-center justify-between mb-2',
                        children: [
                            _jsx('div', {
                                className:
                                    'text-sm dark:text-gray-300 text-gray-800',
                                children: 'Customer',
                            }),
                            _jsx('button', {
                                onClick: openAddCustomer,
                                className:
                                    'text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded',
                                children: '+ Add Customer',
                            }),
                        ],
                    }),
                    _jsx(Select, {
                        showSearch: true,
                        placeholder: 'Select customer',
                        className: 'w-full',
                        value: selected_customer_id,
                        onSelect: value => set_selected_customer_id(value),
                        filterOption: (input, option) =>
                            option?.label
                                ?.toLowerCase()
                                .includes(input.toLowerCase()),
                        children: customer_options.map(customer =>
                            _jsx(Option, {
                                value: customer.data._id,
                                label: customer.label,
                                children: customer.label,
                            })
                        ),
                    }),
                    _jsxs('div', {
                        className:
                            'mt-3 dark:bg-gray-700 bg-gray-200 rounded p-3',
                        children: [
                            _jsx('div', {
                                className:
                                    'font-medium text-gray-800 dark:text-white text-base mb-2',
                                children:
                                    selected_customer?.name ||
                                    'Walk-in Customer',
                            }),
                            _jsxs('div', {
                                className: 'space-y-1',
                                children: [
                                    selected_customer?.phone &&
                                        _jsxs('div', {
                                            className:
                                                'text-xs dark:text-gray-300 text-gray-800',
                                            children: [
                                                'Phone: ',
                                                selected_customer.phone,
                                            ],
                                        }),
                                    selected_customer?.email &&
                                        _jsxs('div', {
                                            className:
                                                'text-xs dark:text-gray-300 text-gray-800',
                                            children: [
                                                'Email: ',
                                                selected_customer.email,
                                            ],
                                        }),
                                    selected_customer?.address &&
                                        _jsxs('div', {
                                            className:
                                                'text-xs dark:text-gray-300 text-gray-800',
                                            children: [
                                                'Address: ',
                                                selected_customer.address,
                                            ],
                                        }),
                                    selected_customer?.id === 'walk-in' &&
                                        _jsx('div', {
                                            className:
                                                'text-xs dark:text-blue-300 text-blue-600 mt-2',
                                            children:
                                                'Default walk-in customer',
                                        }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex justify-between items-center mb-4',
                children: [
                    _jsxs('div', {
                        className:
                            'bg-blue-600 text-white px-3 py-1 rounded text-sm',
                        children: [
                            'Product Added:',
                            ' ',
                            cart_items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            ),
                        ],
                    }),
                    _jsx('button', {
                        onClick: clearAll,
                        className:
                            'bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700',
                        children: 'Clear all',
                    }),
                ],
            }),
            _jsx('h3', {
                className: 'font-semibold dark:text-white text-gray-800 mb-4',
                children: 'Products',
            }),
            _jsx('div', {
                className: 'mb-6 max-h-64 overflow-y-auto',
                children: cart_items.map(item =>
                    _jsx(
                        Cart_product,
                        {
                            item: item,
                            remove_from_cart: remove_from_cart,
                            update_quantity: update_quantity,
                        },
                        item._id
                    )
                ),
            }),
            _jsx('div', {
                className: 'space-y-4 mb-6',
                children: _jsxs('div', {
                    className: 'grid grid-cols-3 gap-2',
                    children: [
                        _jsxs('div', {
                            children: [
                                _jsx('label', {
                                    className:
                                        'text-sm dark:text-gray-300 text-gray-800 block mb-1',
                                    children: 'Order Tax',
                                }),
                                _jsx(CreatableSelect, {
                                    styles: customStyles(isDark),
                                    isClearable: true,
                                    placeholder: 'Tax',
                                    className: '',
                                    options: [
                                        { value: 5, label: '5%' },
                                        { value: 10, label: '10%' },
                                        { value: 15, label: '15%' },
                                    ],
                                    formatCreateLabel: inputValue =>
                                        `Add "${inputValue}%"`,
                                    isValidNewOption: inputValue => {
                                        const num = Number(inputValue);
                                        return (
                                            !isNaN(num) &&
                                            num >= 0 &&
                                            num <= 100
                                        );
                                    },
                                    components: {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    },
                                    onChange: e => setTax(e?.value),
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            children: [
                                _jsx('label', {
                                    className:
                                        'text-sm dark:text-gray-300 text-gray-800 block mb-1',
                                    children: 'Shipping',
                                }),
                                _jsx(CreatableSelect, {
                                    styles: customStyles(isDark),
                                    isClearable: true,
                                    placeholder: 'Shipping',
                                    className: '',
                                    options: [
                                        { value: 0, label: '0' },
                                        { value: 60, label: '60' },
                                        { value: 120, label: '120' },
                                    ],
                                    onChange: e => set_shipping(e?.value),
                                    formatCreateLabel: inputValue =>
                                        `Add "${inputValue}"`,
                                    components: {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    },
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            children: [
                                _jsx('label', {
                                    className:
                                        'text-sm dark:text-gray-300 text-gray-800 block mb-1',
                                    children: 'Discount',
                                }),
                                _jsx(CreatableSelect, {
                                    isClearable: true,
                                    styles: customStyles(isDark),
                                    components: {
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                    },
                                    placeholder: 'Discount',
                                    className: '',
                                    onChange: e => setDiscount(e?.value),
                                    options: [
                                        { value: 5, label: '5%' },
                                        { value: 10, label: '10%' },
                                        { value: 15, label: '15%' },
                                    ],
                                    formatCreateLabel: inputValue =>
                                        `Add "${inputValue}%"`,
                                    isValidNewOption: inputValue => {
                                        const num = Number(inputValue);
                                        return (
                                            !isNaN(num) &&
                                            num >= 0 &&
                                            num <= 100
                                        );
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            cart_items.length > 0 &&
                _jsxs('div', {
                    className:
                        'space-y-2 mb-6 dark:bg-gray-700 bg-gray-300 p-4 rounded-lg',
                    children: [
                        _jsxs('div', {
                            className:
                                'flex justify-between dark:text-gray-300 text-gray-800',
                            children: [
                                _jsx('span', { children: 'Sub Total' }),
                                _jsxs('span', {
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font',
                                            children: '\u09F3',
                                        }),
                                        subtotal.toFixed(2),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className:
                                'flex justify-between dark:text-gray-300 text-gray-800',
                            children: [
                                _jsxs('span', {
                                    children: ['Tax (GST ', tax, '%)'],
                                }),
                                _jsxs('span', {
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font',
                                            children: '\u09F3',
                                        }),
                                        tax_amount.toFixed(2),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className:
                                'flex justify-between dark:text-gray-300 text-gray-800',
                            children: [
                                _jsx('span', { children: 'Shipping' }),
                                _jsxs('span', {
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font',
                                            children: '\u09F3',
                                        }),
                                        safe_fixed(shipping, 2),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className:
                                'flex justify-between dark:text-gray-300 text-gray-800',
                            children: [
                                _jsx('span', { children: 'Sub Total' }),
                                _jsxs('span', {
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font',
                                            children: '\u09F3',
                                        }),
                                        (
                                            subtotal +
                                            tax_amount +
                                            parseFloat(safe_fixed(shipping, 2))
                                        ).toFixed(2),
                                    ],
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'flex justify-between text-red-400',
                            children: [
                                _jsxs('span', {
                                    children: ['Discount (', discount, '%)'],
                                }),
                                _jsxs('span', {
                                    children: [
                                        '-',
                                        _jsx('span', {
                                            className: 'kalpurush-font',
                                            children: '\u09F3',
                                        }),
                                        discount_amount.toFixed(2),
                                    ],
                                }),
                            ],
                        }),
                        _jsx('hr', { className: 'border-gray-600' }),
                        _jsxs('div', {
                            className:
                                'flex justify-between font-semibold text-lg dark:text-gray-300 text-gray-800',
                            children: [
                                _jsx('span', { children: 'Total' }),
                                _jsxs('span', {
                                    children: [
                                        _jsx('span', {
                                            className: 'kalpurush-font',
                                            children: '\u09F3',
                                        }),
                                        total.toFixed(2),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            cart_items.length > 0 &&
                _jsxs('button', {
                    className:
                        'w-full bg-blue-900 text-white py-3 rounded-lg font-semibold mb-3 hover:bg-blue-800',
                    children: [
                        'Grand Total: ',
                        _jsx('span', {
                            className: 'kalpurush-font',
                            children: '\u09F3',
                        }),
                        total.toFixed(2),
                    ],
                }),
            _jsxs('div', {
                className: 'mb-6',
                children: [
                    _jsx('h3', {
                        className:
                            'font-semibold mb-3 dark:text-white text-gray-800',
                        children: 'Payment Method',
                    }),
                    _jsxs('div', {
                        className: 'grid grid-cols-3 gap-2 mb-4',
                        children: [
                            _jsxs('button', {
                                onClick: () => set_payment_method('cash'),
                                className:
                                    payment_method === 'cash'
                                        ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                        : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white bg-white text-black hover:bg-gray-600 ',
                                children: [
                                    '\uD83D\uDCB5',
                                    _jsx('br', {}),
                                    'Cash',
                                ],
                            }),
                            _jsxs('button', {
                                onClick: () => set_payment_method('card'),
                                className:
                                    payment_method === 'card'
                                        ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                        : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white bg-white text-black hover:bg-gray-600',
                                children: [
                                    '\uD83D\uDCB3',
                                    _jsx('br', {}),
                                    'Card',
                                ],
                            }),
                            _jsxs('button', {
                                onClick: () => set_payment_method('scan'),
                                className:
                                    payment_method === 'scan'
                                        ? 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center bg-gray-300 text-black'
                                        : 'px-3 py-2 border whitespace-nowrap border-gray-600 rounded-lg text-center dark:bg-gray-700 dark:text-white bg-white text-black hover:bg-gray-600',
                                children: [
                                    '\uD83D\uDCF1',
                                    _jsx('br', {}),
                                    'Scan',
                                ],
                            }),
                        ],
                    }),
                    payment_method === 'cash' &&
                        _jsxs('div', {
                            className: 'mt-4',
                            children: [
                                _jsx(Input, {
                                    type: 'number',
                                    placeholder: 'Enter cash received',
                                    value: cashReceived,
                                    onChange: e =>
                                        setCashReceived(Number(e.target.value)),
                                    className: 'dark:text-white text-black',
                                }),
                                _jsxs('p', {
                                    className:
                                        'dark:text-white text-black mt-2',
                                    children: [
                                        'Return Amount:',
                                        ' ',
                                        _jsxs('span', {
                                            className: 'font-semibold',
                                            children: [
                                                _jsx('span', {
                                                    className: 'kalpurush-font',
                                                    children: '\u09F3',
                                                }),
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
                    payment_method === 'scan' &&
                        _jsx('div', {
                            className: 'mt-4',
                            children: _jsx(Input, {
                                placeholder: 'Enter transaction id',
                                value: payment_id,
                                onChange: e => set_payment_id(e.target.value),
                                className: 'dark:text-white text-black',
                            }),
                        }),
                ],
            }),
            _jsxs('div', {
                className: 'grid grid-cols-3 gap-2',
                children: [
                    _jsx('button', {
                        onClick: handle_hold_order,
                        className:
                            'bg-blue-600 text-white py-2 rounded hover:bg-blue-700',
                        children: '\uD83D\uDCF1 Hold',
                    }),
                    _jsx('button', {
                        onClick: handleReset,
                        className:
                            'bg-red-600 text-white py-2 rounded hover:bg-red-700',
                        children: '\uD83D\uDDD1\uFE0F Void',
                    }),
                    _jsx('button', {
                        onClick: handlePaymentClick,
                        className:
                            'bg-green-600 text-white py-2 rounded hover:bg-green-700',
                        children: '\uD83D\uDCB3 Payment',
                    }),
                ],
            }),
        ],
    });
};
export default Right_panel;
