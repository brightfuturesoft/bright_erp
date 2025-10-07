'use client';
import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Dropdown, Space, Table, message, Modal } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import Status from '@/Pages/Modules/common/components/Status';
import { useOrdersData } from './data_get_api';
import { SalesInvoice } from './Invoice';
import { useNavigate } from 'react-router-dom';
const DataTable = ({ data }) => {
    const { editOrder, deleteOrder, refetch } = useOrdersData();
    const navigate = useNavigate();
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const handleStatusChange = async (record, newStatus) => {
        try {
            await editOrder({ id: record._id, order_status: newStatus });
            message.success(`Order status updated to ${newStatus}`);
            refetch();
        } catch (err) {
            message.error('Failed to update order status');
        }
    };
    const handleDelete = async record => {
        try {
            await deleteOrder(record._id);
            message.success('Order deleted successfully');
            refetch();
        } catch (err) {
            message.error('Failed to delete order');
        }
    };
    const handleGenerateInvoice = record => {
        setSelectedInvoice(record);
    };
    // Dropdown items including new status options
    const items = record => [
        {
            key: '1',
            label: _jsx('div', {
                onClick: () => handleStatusChange(record, 'Processing'),
                children: 'Processing',
            }),
        },
        {
            key: '2',
            label: _jsx('div', {
                onClick: () => handleStatusChange(record, 'Delivery'),
                children: 'Delivery',
            }),
        },
        {
            key: '3',
            label: _jsx('div', {
                onClick: () => handleStatusChange(record, 'Delivered'),
                children: 'Delivered',
            }),
        },
        {
            key: '4',
            label: _jsx('div', {
                onClick: () => handleStatusChange(record, 'Return'),
                children: 'Return',
            }),
        },
        {
            key: '5',
            label: _jsx('div', {
                onClick: () => handleStatusChange(record, 'Refund'),
                children: 'Refund',
            }),
        },
        {
            key: '6',
            label: _jsx('div', {
                onClick: () => handleGenerateInvoice(record),
                children: 'Generate Invoice',
            }),
        },
        {
            key: '7',
            label: _jsx('div', {
                onClick: () => handleDelete(record),
                children: 'Delete',
            }),
        },
    ];
    const tableHead = [
        {
            title: 'ORDER NUMBER',
            dataIndex: 'order_number',
            key: 'order_number',
            render: (order_number, record) =>
                _jsx('span', {
                    className: 'text-blue-600 hover:underline cursor-pointer',
                    // ORDER NUMBER column
                    onClick: () =>
                        navigate(`/dashboard/e-commerce/orders/${record._id}`),
                    children: order_number,
                }),
        },
        {
            title: 'DATE',
            dataIndex: 'created_at',
            key: 'created_at',
            render: date => new Date(date).toLocaleDateString(),
        },
        {
            title: 'CUSTOMER',
            key: 'customer',
            render: (text, record) =>
                _jsxs('div', {
                    children: [
                        _jsx('div', {
                            children: record.delivery_address.full_name,
                        }),
                        _jsx('div', {
                            children: record.delivery_address.phone_number,
                        }),
                        _jsx('div', {
                            children: record.payment.method?.toUpperCase(),
                        }),
                    ],
                }),
        },
        {
            title: 'EMAIL',
            key: 'email',
            render: (text, record) =>
                _jsx('div', { children: record.products[0]?.user_email }),
        },
        {
            title: 'DELIVERY ADDRESS',
            key: 'delivery_address',
            render: (text, record) =>
                _jsxs('div', {
                    children: [
                        _jsx('div', {
                            children: record.delivery_address.street,
                        }),
                        _jsxs('div', {
                            children: [
                                record.delivery_address.city,
                                ',',
                                ' ',
                                record.delivery_address.state,
                            ],
                        }),
                        _jsx('div', {
                            children: record.delivery_address.country || 'N/A',
                        }),
                    ],
                }),
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
            render: status => _jsx(Status, { status: status }),
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (text, record) =>
                _jsx(Space, {
                    size: 'middle',
                    children: _jsx(Dropdown, {
                        menu: { items: items(record) },
                        trigger: ['click'],
                        children: _jsx('a', {
                            children: _jsx(EllipsisVertical, {
                                className: 'hover:cursor-pointer',
                            }),
                        }),
                    }),
                }),
        },
    ];
    return _jsxs(_Fragment, {
        children: [
            _jsx(Table, {
                columns: tableHead,
                dataSource: data,
                rowKey: '_id',
                scroll: { x: 1800 },
            }),
            _jsx(Modal, {
                open: !!selectedInvoice,
                onCancel: () => setSelectedInvoice(null),
                footer: null,
                width: 800,
                title: `Invoice #${selectedInvoice?.order_number || ''}`,
                children:
                    selectedInvoice &&
                    _jsx(SalesInvoice, { order: selectedInvoice }),
            }),
        ],
    });
};
export default DataTable;
