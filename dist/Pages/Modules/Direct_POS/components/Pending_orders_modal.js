import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import { useState } from 'react';
import { Button, Modal, Table } from 'antd';
const Pending_orders_modal = ({
    is_hold_list_modal_visible,
    set_is_hold_list_modal_visible,
    heldOrders,
    user,
    holdOrderReference,
    hold_order_to_cart,
    delete_form_hold_order,
}) => {
    const [productModalVisible, setProductModalVisible] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    // Handler for "View Products"
    const handleViewProducts = products => {
        setSelectedProducts(products || []);
        setProductModalVisible(true);
    };
    return _jsxs(_Fragment, {
        children: [
            _jsx(Modal, {
                title: 'Pending Orders',
                open: is_hold_list_modal_visible,
                onCancel: () => set_is_hold_list_modal_visible(false),
                footer: null,
                width: 800,
                children: _jsx('div', {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 18,
                    },
                    children:
                        Array.isArray(heldOrders) && heldOrders.length > 0
                            ? heldOrders.map((order, idx) =>
                                  _jsx(
                                      OrderCard,
                                      {
                                          holdOrderReference:
                                              holdOrderReference,
                                          user: user,
                                          order: order,
                                          hold_order_to_cart:
                                              hold_order_to_cart,
                                          onViewProducts: () =>
                                              handleViewProducts(
                                                  order.products
                                              ),
                                          onPrint: () => {
                                              /* handle print */
                                          },
                                          delete_form_hold_order:
                                              delete_form_hold_order,
                                      },
                                      order.order_number || idx
                                  )
                              )
                            : _jsx('div', { children: 'No pending orders.' }),
                }),
            }),
            _jsx(Modal, {
                title: 'Products',
                open: productModalVisible,
                onCancel: () => setProductModalVisible(false),
                footer: null,
                width: 700,
                children:
                    selectedProducts.length > 0
                        ? _jsx(ProductsTable, { products: selectedProducts })
                        : _jsx('div', { children: 'No products found.' }),
            }),
        ],
    });
};
export default Pending_orders_modal;
const OrderCard = ({
    order,
    hold_order_to_cart,
    onViewProducts,
    onPrint,
    user,
    holdOrderReference,
    delete_form_hold_order,
}) => {
    const {
        order_number,
        delivery_address,
        payment,
        created_at,
        payment_reference,
        user_id,
        total_amount,
        products,
    } = order;
    console.log(order, 'order');
    const formattedDate = created_at
        ? new Date(created_at).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
          })
        : '';
    return _jsxs('div', {
        className: 'border p-2 rounded',
        children: [
            _jsxs('div', {
                className: 'text-black dark:text-white',
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                },
                children: [
                    _jsxs('div', {
                        children: [
                            _jsxs('span', {
                                className: 'text-black dark:text-white',
                                children: ['Reference : ', order_number],
                            }),
                            _jsxs('div', {
                                style: { marginTop: 12 },
                                children: [
                                    _jsx('span', {
                                        style: { fontWeight: 500 },
                                        children: 'Cashier :',
                                    }),
                                    ' ',
                                    user?.name || 'N/A',
                                ],
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('span', {
                                        style: { fontWeight: 500 },
                                        children: 'Total :',
                                    }),
                                    ' ',
                                    _jsx('span', {
                                        className: 'kalpurush-font',
                                        children: '\u09F3',
                                    }),
                                    total_amount || payment?.amount || '0',
                                ],
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        style: { textAlign: 'right' },
                        children: [
                            _jsxs('div', {
                                children: [
                                    _jsx('span', {
                                        style: { fontWeight: 500 },
                                        children: 'Customer :',
                                    }),
                                    ' ',
                                    delivery_address?.full_name ||
                                        'Walk-in Customer',
                                ],
                            }),
                            _jsxs('div', {
                                children: [
                                    _jsx('span', {
                                        style: { fontWeight: 500 },
                                        children: 'Date :',
                                    }),
                                    ' ',
                                    formattedDate,
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            _jsx(ProductsTable, { products: products }),
            _jsxs('div', {
                style: {
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'center',
                    marginTop: 8,
                },
                children: [
                    _jsx(Button, {
                        type: 'primary',
                        className: '',
                        onClick: () => {
                            (hold_order_to_cart(order_number),
                                delete_form_hold_order(order_number));
                        },
                        children: 'Open Order',
                    }),
                    _jsx(Button, {
                        danger: true,
                        className: '',
                        onClick: () => {
                            delete_form_hold_order(order_number);
                        },
                        children: 'Delete Order',
                    }),
                ],
            }),
        ],
    });
};
const ProductsTable = ({ products }) => {
    const columns = [
        {
            title: 'Image',
            dataIndex: 'cover_photo',
            key: 'cover_photo',
            render: (url, record) =>
                url
                    ? _jsx('img', {
                          src: url,
                          alt: record.item_name,
                          style: { width: 48, borderRadius: 4 },
                      })
                    : 'N/A',
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: sku => _jsx('span', { className: '', children: sku }),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Offer Price',
            dataIndex: 'offer_price',
            key: 'offer_price',
            render: price => _jsxs(_Fragment, { children: ['\u09F3', price] }),
        },
    ];
    return _jsx(Table, {
        columns: columns,
        dataSource: products,
        rowKey: record => record._id || record.sku,
        pagination: false,
        size: 'small',
    });
};
