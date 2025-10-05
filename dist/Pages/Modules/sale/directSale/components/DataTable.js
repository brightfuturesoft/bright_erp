import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Dropdown, Space, Table, message, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
const DirectSaleTable = ({ refetch, tableData }) => {
    const { user } = useContext(Erp_context);
    const navigate = useNavigate();
    // 🔹 Update Order Status
    const handleUpdateStatus = async (record, status) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}sale/direct_sale/update-direct-sale`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify({
                        id: record?._id,
                        order_status: status,
                    }),
                }
            );
            const result = await res.json();
            refetch();
            if (result.error) message.error(result.message);
            else message.success(`Order marked as ${status}`);
        } catch (error) {
            console.error(error);
            message.error('Failed to update status');
        }
    };
    // 🔹 Delete Order
    const handleDelete = async record => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}sale/direct_sale/delete-direct-sale`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify({ id: record?._id }),
                }
            );
            const result = await res.json();
            refetch();
            if (result.error) message.error(result.message);
            else message.success('Order deleted successfully');
        } catch (error) {
            console.error(error);
            message.error('Failed to delete order');
        }
    };
    // 🔹 Columns for order-level table
    const columns = [
        { title: 'ORDER NO', dataIndex: 'order_number', key: 'order_number' },
        { title: 'CUSTOMER', dataIndex: 'customer_name', key: 'customer_name' },
        { title: 'PHONE', dataIndex: 'customer_phone', key: 'customer_phone' },
        {
            title: 'SALES PERSON',
            dataIndex: 'sales_person',
            key: 'sales_person',
        },
        {
            title: 'GRAND TOTAL',
            dataIndex: 'grand_total',
            key: 'grand_total',
            render: amount =>
                _jsxs('p', {
                    children: [
                        _jsx('span', {
                            className: 'kalpurush-font text-lg',
                            children: '\u09F3 ',
                        }),
                        amount.toFixed(2),
                    ],
                }),
        },
        {
            title: 'PAID',
            dataIndex: 'paid_amount',
            key: 'paid_amount',
            render: amount =>
                _jsxs('p', {
                    children: [
                        _jsx('span', {
                            className: 'kalpurush-font text-lg',
                            children: '\u09F3 ',
                        }),
                        amount.toFixed(2),
                    ],
                }),
        },
        {
            title: 'DUE',
            dataIndex: 'due_amount',
            key: 'due_amount',
            render: amount =>
                _jsxs('p', {
                    children: [
                        _jsx('span', {
                            className: 'kalpurush-font text-lg',
                            children: '\u09F3 ',
                        }),
                        amount.toFixed(2),
                    ],
                }),
        },
        {
            title: 'STATUS',
            dataIndex: 'order_status',
            key: 'order_status',
            render: order_status => {
                let color = 'default';
                let label = order_status || 'Unknown';
                switch (order_status?.toLowerCase()) {
                    case 'processing':
                        color = 'blue';
                        label = 'Processing';
                        break;
                    case 'delivered':
                        color = 'green';
                        label = 'Delivered';
                        break;
                    case 'cancelled':
                        color = 'red';
                        label = 'Cancelled';
                        break;
                    case 'refuned':
                        color = 'orange';
                        label = 'Refuned';
                        break;
                    default:
                        color = 'default';
                }
                return _jsx(Tag, {
                    color: color,
                    className: ' font-semibold',
                    children: label.toUpperCase(),
                });
            },
        },
        {
            title: 'ACTIONS',
            key: 'actions',
            render: (_, record) => {
                const menuItems = [
                    {
                        key: 'details',
                        label: _jsx('div', {
                            onClick: () =>
                                navigate(
                                    `/dashboard/sale/direct-sale/${record._id}`
                                ),
                            children: 'View Details',
                        }),
                    },
                    {
                        key: 'delivered',
                        label: _jsx('div', {
                            onClick: () =>
                                handleUpdateStatus(record, 'Delivered'),
                            children: 'Mark as Delivered',
                        }),
                    },
                    {
                        key: 'cancel',
                        label: _jsx('div', {
                            onClick: () =>
                                handleUpdateStatus(record, 'Cancelled'),
                            children: 'Mark as Cancelled',
                        }),
                    },
                    {
                        key: 'refuned',
                        label: _jsx('div', {
                            onClick: () =>
                                handleUpdateStatus(record, 'Refuned'),
                            children: 'Mark as Refuned',
                        }),
                    },
                    {
                        key: 'delete',
                        label: _jsx('div', {
                            onClick: () => handleDelete(record),
                            children: 'Delete Order',
                        }),
                    },
                ];
                return _jsx(Space, {
                    size: 'middle',
                    children: _jsx(Dropdown, {
                        menu: { items: menuItems },
                        trigger: ['click'],
                        children: _jsx('a', {
                            children: _jsx(EllipsisVertical, {
                                className: 'hover:cursor-pointer',
                            }),
                        }),
                    }),
                });
            },
        },
    ];
    return _jsx(Table, {
        columns: columns,
        dataSource: tableData,
        rowKey: '_id',
        pagination: { pageSize: 10 },
    });
};
export default DirectSaleTable;
