'use client';

import {
    Dropdown,
    Space,
    Table,
    TableProps,
    Image,
    message,
    Modal,
    Button,
} from 'antd';
import { EllipsisVertical } from 'lucide-react';
import React, { useState } from 'react';
import Status from '@/Pages/Modules/common/components/Status';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
import { useOrdersData } from './data_get_api';
import { SalesInvoice } from './Invoice';
import { useNavigate } from 'react-router-dom';

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
    const { editOrder, deleteOrder, refetch } = useOrdersData();
    const navigate = useNavigate();
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

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

    // Dropdown items including new status options
    const items = (record: any) => [
        {
            key: '1',
            label: (
                <div onClick={() => handleStatusChange(record, 'Processing')}>
                    Processing
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={() => handleStatusChange(record, 'Delivery')}>
                    Delivery
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={() => handleStatusChange(record, 'Delivered')}>
                    Delivered
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div onClick={() => handleStatusChange(record, 'Return')}>
                    Return
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
            key: '6',
            label: (
                <div onClick={() => handleGenerateInvoice(record)}>
                    Generate Invoice
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
                        navigate(`/dashboard/e-commerce/orders/${record._id}`)
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
                    <div>{record.delivery_address.full_name}</div>
                    <div>{record.delivery_address.phone_number}</div>
                    <div>{record.payment.method?.toUpperCase()}</div>
                </div>
            ),
        },
        {
            title: 'EMAIL',
            key: 'email',
            render: (text, record) => (
                <div>{record.products[0]?.user_email}</div>
            ),
        },
        {
            title: 'DELIVERY ADDRESS',
            key: 'delivery_address',
            render: (text, record) => (
                <div>
                    <div>{record.delivery_address.street}</div>
                    <div>
                        {record.delivery_address.city},{' '}
                        {record.delivery_address.state}
                    </div>
                    <div>{record.delivery_address.country || 'N/A'}</div>
                </div>
            ),
        },
        { title: 'SUB TOTAL', dataIndex: 'total_amount', key: 'total_amount' },
        { title: 'TOTAL TAX', dataIndex: 'tax_amount', key: 'tax_amount' },
        {
            title: 'GRAND TOTAL',
            dataIndex: 'total_amount',
            key: 'total_amount',
        },
        {
            title: 'ORDER STATUS',
            dataIndex: 'order_status',
            key: 'order_status',
            render: (status: string) => <Status status={status} />,
        },
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

    return (
        <>
            <Table
                columns={tableHead}
                dataSource={data}
                rowKey="_id"
                scroll={{ x: 1800 }}
            />

            {/* Modal for Invoice */}
            <Modal
                open={!!selectedInvoice}
                onCancel={() => setSelectedInvoice(null)}
                footer={null}
                width={800}
                title={`Invoice #${selectedInvoice?.order_number || ''}`}
            >
                {selectedInvoice && <SalesInvoice order={selectedInvoice} />}
            </Modal>
        </>
    );
};

export default DataTable;
