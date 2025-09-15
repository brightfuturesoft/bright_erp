import React, { useState } from 'react';
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

    return (
        <>
            <Modal
                title="Pending Orders"
                open={is_hold_list_modal_visible}
                onCancel={() => set_is_hold_list_modal_visible(false)}
                footer={null}
                width={800}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 18,
                    }}
                >
                    {Array.isArray(heldOrders) && heldOrders.length > 0 ? (
                        heldOrders.map((order, idx) => (
                            <OrderCard
                                holdOrderReference={holdOrderReference}
                                user={user}
                                key={order.order_number || idx}
                                order={order}
                                hold_order_to_cart={hold_order_to_cart}
                                onViewProducts={() =>
                                    handleViewProducts(order.products)
                                }
                                onPrint={() => {
                                    /* handle print */
                                }}
                                delete_form_hold_order={delete_form_hold_order}
                            />
                        ))
                    ) : (
                        <div>No pending orders.</div>
                    )}
                </div>
            </Modal>

            {/* Products Modal */}
            <Modal
                title="Products"
                open={productModalVisible}
                onCancel={() => setProductModalVisible(false)}
                footer={null}
                width={700}
            >
                {selectedProducts.length > 0 ? (
                    <ProductsTable products={selectedProducts} />
                ) : (
                    <div>No products found.</div>
                )}
            </Modal>
        </>
    );
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

    return (
        <div className="border p-2 rounded">
            <div
                className="text-black dark:text-white"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                }}
            >
                <div>
                    <span className="text-black dark:text-white">
                        Reference : {order_number}
                    </span>
                    <div style={{ marginTop: 12 }}>
                        <span style={{ fontWeight: 500 }}>Cashier :</span>{' '}
                        {user?.name || 'N/A'}
                    </div>
                    <div>
                        <span style={{ fontWeight: 500 }}>Total :</span>{' '}
                        <span className="kalpurush-font">৳</span>
                        {total_amount || payment?.amount || '0'}
                    </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div>
                        <span style={{ fontWeight: 500 }}>Customer :</span>{' '}
                        {delivery_address?.full_name || 'Walk-in Customer'}
                    </div>
                    <div>
                        <span style={{ fontWeight: 500 }}>Date :</span>{' '}
                        {formattedDate}
                    </div>
                </div>
            </div>
            {/* //need here table for show items */}
            <ProductsTable products={products} />
            <div
                style={{
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'center',
                    marginTop: 8,
                }}
            >
                <Button
                    type="primary"
                    className=""
                    onClick={() => {
                        (hold_order_to_cart(order_number),
                            delete_form_hold_order(order_number));
                    }}
                >
                    Open Order
                </Button>
                <Button
                    danger
                    className=""
                    onClick={() => {
                        delete_form_hold_order(order_number);
                    }}
                >
                    Delete Order
                </Button>
            </div>
        </div>
    );
};

const ProductsTable = ({ products }) => {
    const columns = [
        {
            title: 'Image',
            dataIndex: 'cover_photo',
            key: 'cover_photo',
            render: (url, record) =>
                url ? (
                    <img
                        src={url}
                        alt={record.item_name}
                        style={{ width: 48, borderRadius: 4 }}
                    />
                ) : (
                    'N/A'
                ),
        },
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            render: sku => <span className="">{sku}</span>,
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
            render: price => <>৳{price}</>,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={products}
            rowKey={record => record._id || record.sku}
            pagination={false}
            size="small"
        />
    );
};
