'use client';
import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Dropdown, Space, Table, Image, message, Modal } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import Status from '@/Pages/Modules/common/components/Status';
import { rgbToHex, rgbToColorName } from '@/utils/colorConvert';
import { useRefundOrdersData } from './data_get_api';
const DataTable = ({ data }) => {
    const { editOrder, deleteOrder, refetch } = useRefundOrdersData();
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [detailsModal, setDetailsModal] = useState(null);
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
    const handleDetails = record => {
        setDetailsModal(record);
    };
    const items = record => [
        {
            key: '1',
            label: _jsx('div', {
                onClick: () => handleDetails(record),
                children: 'Details',
            }),
        },
        {
            key: '2',
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
                            children: record.delivery_address?.full_name,
                        }),
                        _jsx('div', {
                            children: record.delivery_address?.phone || 'N/A',
                        }),
                        _jsx('div', {
                            children:
                                record.payment?.payment_method?.toUpperCase(),
                        }),
                    ],
                }),
        },
        {
            title: 'PROMO',
            key: 'promo',
            render: (text, record) =>
                _jsxs('div', {
                    children: [
                        _jsxs('div', {
                            children: [
                                'Used: ',
                                record.promo?.used === false ? 'N/A' : 'Used',
                            ],
                        }),
                        _jsxs('div', {
                            children: [
                                'Amount:',
                                record.promo?.discount_amount || 'N/A',
                            ],
                        }),
                    ],
                }),
        },
        { title: 'SUB TOTAL', dataIndex: 'total_amount', key: 'total_amount' },
        { title: 'TOTAL TAX', dataIndex: 'tax_amount', key: 'tax_amount' },
        { title: 'GRAND TOTAL', dataIndex: 'total_amount', key: 'grand_total' },
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
    // Columns for Details Modal Table
    const detailsColumns = [
        {
            title: 'Image',
            dataIndex: 'cover_photo',
            key: 'cover_photo',
            render: cover_photo =>
                _jsx(Image, { width: 50, src: cover_photo[0] }),
        },
        { title: 'Product Name', dataIndex: 'item_name', key: 'item_name' },
        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            render: color => {
                const hex = rgbToHex(color || 'rgb(0,0,0)');
                const name = rgbToColorName(color || 'rgb(0,0,0)');
                return _jsxs('div', {
                    className: 'flex items-center gap-2',
                    children: [
                        _jsx('span', {
                            style: {
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                backgroundColor: hex,
                                border: '1px solid #000',
                            },
                        }),
                        name,
                    ],
                });
            },
        },
        { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Offer Price',
            dataIndex: 'offer_price',
            key: 'offer_price',
            render: price => `$${price}`,
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) =>
                `$${record.offer_price * record.quantity}`,
        },
    ];
    return _jsxs(_Fragment, {
        children: [
            _jsx(Table, {
                columns: tableHead,
                dataSource: data,
                rowKey: '_id',
                scroll: { x: 1200 },
            }),
            _jsx(Modal, {
                open: !!detailsModal,
                onCancel: () => setDetailsModal(null),
                footer: null,
                width: 900,
                title: `Order Details #${detailsModal?.order_number || ''}`,
                children:
                    detailsModal &&
                    _jsxs(_Fragment, {
                        children: [
                            _jsx(Table, {
                                columns: detailsColumns,
                                dataSource: detailsModal.products,
                                rowKey: '_id',
                                pagination: false,
                            }),
                            _jsxs('div', {
                                className:
                                    'flex flex-col items-end mt-4 gap-1 text-lg text-white',
                                children: [
                                    _jsxs('div', {
                                        className: 'text-yellow-600',
                                        children: [
                                            _jsx('b', {
                                                children: 'Sub Total:',
                                            }),
                                            ' ',
                                            _jsxs('span', {
                                                className: 'text-white',
                                                children: [
                                                    'Tk.',
                                                    detailsModal.total_amount,
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className: 'text-red-600',
                                        children: [
                                            _jsx('b', { children: 'Tax:' }),
                                            ' ',
                                            _jsxs('span', {
                                                className: 'text-white',
                                                children: [
                                                    'Tk.',
                                                    detailsModal.tax_amount,
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className: 'text-lime-600',
                                        children: [
                                            _jsx('b', {
                                                children: 'Grand Total:',
                                            }),
                                            ' ',
                                            _jsxs('span', {
                                                className: 'text-white',
                                                children: [
                                                    'Tk.',
                                                    detailsModal.total_amount +
                                                        detailsModal.tax_amount,
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
            }),
        ],
    });
};
export default DataTable;
