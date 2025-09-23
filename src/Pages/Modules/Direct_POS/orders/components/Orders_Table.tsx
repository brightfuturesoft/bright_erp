import {
    Dropdown,
    Space,
    Table,
    TableProps,
    Image,
    message,
    Modal,
} from 'antd';
import { EllipsisVertical } from 'lucide-react';
import React, { useState } from 'react';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
import { SalesInvoice } from './Invoice';
import { useNavigate } from 'react-router-dom';
import { usePosOrdersData } from './data_get_api';

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
    const navigate = useNavigate();
    const { editOrder, deleteOrder, refetch } = usePosOrdersData();
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const [detailsModal, setDetailsModal] = useState<any>(null);

    const handleStatusChange = async (record: any, newStatus: string) => {
        try {
            await editOrder({ id: record._id, order_status: newStatus });
            message.success(`Order status updated to ${newStatus}`);
            refetch();
        } catch (err) {
            message.error('Failed to update order status');
        }
    };

    const handleDelete = async (record: any) => {
        try {
            await deleteOrder(record._id);
            message.success('Order deleted successfully');
            refetch();
        } catch (err) {
            message.error('Failed to delete order');
        }
    };

    const handleGenerateInvoice = (record: any) => {
        setSelectedInvoice(record);
    };

    const handleDetails = (record: any) => {
        setDetailsModal(record);
    };

    const items = (record: any) => [
        {
            key: '8',
            label: <div onClick={() => handleDetails(record)}>Details</div>,
        },
        {
            key: '1',
            label: (
                <div onClick={() => handleStatusChange(record, 'Processing')}>
                    Processing
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div onClick={() => handleStatusChange(record, 'Refund')}>
                    Refund
                </div>
            ),
        },
        {
            key: '7',
            label: <div onClick={() => handleDelete(record)}>Delete</div>,
        },
    ];

    const tableHead: TableProps<any>['columns'] = [
        {
            title: 'ORDER NUMBER',
            dataIndex: 'order_number',
            key: 'order_number',
            render: (order_number: string, record: any) => (
                <span
                    className="text-blue-600 hover:underline cursor-pointer"
                    // ORDER NUMBER column
                    onClick={() =>
                        navigate(`/dashboard/pos/orders/${record._id}`)
                    }
                >
                    {order_number}
                </span>
            ),
        },
        {
            title: 'DATE',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'CUSTOMER',
            key: 'customer',
            render: (text, record) => (
                <div>
                    <div>{record.delivery_address?.full_name}</div>
                    <div>{record.delivery_address?.phone || 'N/A'}</div>
                    <div>{record.payment?.payment_method?.toUpperCase()}</div>
                </div>
            ),
        },
        {
            title: 'PROMO',
            key: 'promo',
            render: (text, record) => (
                <div>
                    <div>
                        Used: {record.promo?.used === false ? 'N/A' : 'Used'}
                    </div>
                    <div>Amount:{record.promo?.discount_amount || 'N/A'}</div>
                </div>
            ),
        },
        {
            title: 'SUB TOTAL',
            key: 'sub_total',
            render: (text, record) =>
                `Tk.${record.total_amount - record.tax_amount}`,
        },

        { title: 'TOTAL TAX', dataIndex: 'tax_amount', key: 'tax_amount' },
        { title: 'GRAND TOTAL', dataIndex: 'total_amount', key: 'grand_total' },
        {
            title: 'ACTION',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Dropdown
                        menu={{ items: items(record) }}
                        trigger={['click']}
                    >
                        <a>
                            <EllipsisVertical className="hover:cursor-pointer" />
                        </a>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    // Columns for Details Modal Table
    const detailsColumns = [
        {
            title: 'Image',
            dataIndex: 'cover_photo',
            key: 'cover_photo',
            render: (cover_photo: string[]) => (
                <Image
                    width={50}
                    src={cover_photo[0]}
                />
            ),
        },
        { title: 'Product Name', dataIndex: 'item_name', key: 'item_name' },
        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: (color: string) => {
                const hex = rgbToHex(color || 'rgb(0,0,0)');
                const name = rgbToColorName(color || 'rgb(0,0,0)');
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
                        ></span>
                        {name}
                    </div>
                );
            },
        },
        { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Offer Price',
            dataIndex: 'offer_price',
            key: 'offer_price',
            render: (price: number) => `$${price}`,
        },
        {
            title: 'Total',
            key: 'total',
            render: (text: any, record: any) =>
                `$${record.offer_price * record.quantity}`,
        },
    ];

    return (
        <>
            <Table
                columns={tableHead}
                dataSource={data}
                rowKey="_id"
                scroll={{ x: 1800 }}
            />

            {/* Invoice Modal */}
            <Modal
                open={!!selectedInvoice}
                onCancel={() => setSelectedInvoice(null)}
                footer={null}
                width={800}
                title={`Invoice #${selectedInvoice?.order_number || ''}`}
            >
                {selectedInvoice && <SalesInvoice order={selectedInvoice} />}
            </Modal>

            {/* Details Modal */}
            <Modal
                open={!!detailsModal}
                onCancel={() => setDetailsModal(null)}
                footer={null}
                width={900}
                title={`Order Details #${detailsModal?.order_number || ''}`}
            >
                {detailsModal && (
                    <>
                        <Table
                            columns={detailsColumns}
                            dataSource={detailsModal.products}
                            rowKey="_id"
                            pagination={false}
                        />

                        <div className="flex flex-col items-end mt-4 gap-1 text-lg text-white">
                            <div className="text-yellow-600">
                                <span className="text-white">
                                    <div className="text-yellow-600">
                                        <b>Sub Total:</b>{' '}
                                        <span className="text-white">
                                            Tk.
                                            {Number(detailsModal.total_amount) -
                                                Number(detailsModal.tax_amount)}
                                        </span>
                                    </div>
                                </span>
                            </div>
                            <div className="text-red-600">
                                <b>Tax:</b>{' '}
                                <span className="text-white">
                                    Tk.{detailsModal.tax_amount}
                                </span>
                            </div>
                            <div className="text-lime-600">
                                <b>Grand Total:</b>{' '}
                                <span className="text-white">
                                    Tk.
                                    {detailsModal.total_amount +
                                        detailsModal.tax_amount}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
};

export default DataTable;
