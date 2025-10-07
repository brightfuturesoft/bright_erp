import React, { useState } from 'react';
import { Table, Space, Dropdown, Modal, Image, message } from 'antd';
import { EllipsisVertical } from 'lucide-react';

const PosTable: React.FC<{ data: any[] }> = ({ data }) => {
    const [detailsModal, setDetailsModal] = useState<any>(null);

    const handleDelete = (record: any) => {
        message.info(`Delete order: ${record.order_number}`);
        // ekhane API call diye order delete korte paro
    };

    const handleDetails = (record: any) => {
        setDetailsModal(record);
    };

    const items = (record: any) => [
        {
            key: '1',
            label: <div onClick={() => handleDetails(record)}>Details</div>,
        },
    ];

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: 'Customer',
            key: 'customer',
            render: (text: any, record: any) => (
                <div>
                    {record.delivery_address?.full_name || 'N/A'} <br />
                    {record.delivery_address?.phone || 'N/A'}
                </div>
            ),
        },
        {
            title: 'Products',
            key: 'products',
            render: (text: any, record: any) => (
                <div>
                    {record.products.map((p: any) => (
                        <div
                            key={p._id}
                            className="flex items-center gap-2 mb-1"
                        >
                            <Image
                                width={40}
                                src={p.cover_photo[0]}
                            />
                            <span>
                                {p.item_name} ({p.quantity})
                            </span>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Total Amount',
            dataIndex: 'total_amount',
            key: 'total_amount',
            render: (amount: number) => `Tk.${amount}`,
        },
        {
            title: 'Order Status',
            dataIndex: 'order_status',
            key: 'order_status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Dropdown
                    menu={{ items: items(record) }}
                    trigger={['click']}
                >
                    <a>
                        <EllipsisVertical className="hover:cursor-pointer" />
                    </a>
                </Dropdown>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record._id}
                scroll={{ x: 1000 }}
            />

            {/* Details Modal */}
            <Modal
                open={!!detailsModal}
                onCancel={() => setDetailsModal(null)}
                footer={null}
                width={800}
                title={`Order Details: ${detailsModal?.order_number || ''}`}
            >
                {detailsModal && (
                    <div className="space-y-4">
                        {/* Products List */}
                        {detailsModal.products.map((p: any) => (
                            <div
                                key={p._id}
                                className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border dark:border-gray-700 border-gray-200 shadow-sm dark:bg-gray-800 bg-white"
                            >
                                <Image
                                    width={100}
                                    src={p.cover_photo[0]}
                                    className="rounded-md"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {p.item_name}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            <b>SKU:</b> {p.sku}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            <b>Quantity:</b> {p.quantity}{' '}
                                            <b>Unit:</b> {p.unit || 'N/A'}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            <b>Price:</b> Tk.{p.offer_price}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            <b>Color:</b>{' '}
                                            <span
                                                className="inline-block w-4 h-4 rounded-full mr-1"
                                                style={{
                                                    backgroundColor: p.color,
                                                }}
                                            ></span>{' '}
                                            {p.color || 'N/A'}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            <b>Size:</b> {p.size || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Summary */}
                        <div className="mt-6 p-4 rounded-lg border dark:border-gray-700 border-gray-200 dark:bg-gray-900 bg-gray-50 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                Order Summary
                            </h3>
                            <div className="flex justify-between mb-1 text-gray-700 dark:text-gray-300">
                                <span>Subtotal:</span>
                                <span>
                                    Tk.
                                    {detailsModal.total_amount -
                                        detailsModal.tax_amount}
                                </span>
                            </div>
                            <div className="flex justify-between mb-1 text-gray-700 dark:text-gray-300">
                                <span>Tax:</span>
                                <span>Tk.{detailsModal.tax_amount}</span>
                            </div>
                            <div className="flex justify-between mb-1 text-gray-700 dark:text-gray-300">
                                <span>Discount:</span>
                                <span>Tk.{detailsModal.discount}</span>
                            </div>
                            <div className="flex justify-between mt-2 pt-2 border-t dark:border-gray-700 border-gray-300 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                <span>Grand Total:</span>
                                <span>Tk.{detailsModal.total_amount}</span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default PosTable;
