import {
    jsx as _jsx,
    jsxs as _jsxs,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Dropdown, Space, Table, Modal, Descriptions, theme } from 'antd';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const items = [
    {
        key: '1',
        label: _jsx('div', {
            onClick: () => console.log('Details clicked'),
            children: 'Details',
        }),
    },
    {
        key: '2',
        label: _jsx('div', {
            onClick: () => console.log('Edit clicked'),
            children: 'Edit',
        }),
    },
    {
        key: '3',
        label: _jsx('div', {
            onClick: () => console.log('Approve clicked'),
            children: 'Approve',
        }),
    },
    {
        key: '4',
        label: _jsx('div', {
            onClick: () => console.log('Cancel Order clicked'),
            children: 'Cancel Order',
        }),
    },
    {
        key: '5',
        label: _jsx('div', {
            onClick: () => console.log('Create Delivery clicked'),
            children: 'Create Delivery',
        }),
    },
    {
        key: '6',
        label: _jsx('div', {
            onClick: () => console.log('Create Invoice clicked'),
            children: 'Create Invoice',
        }),
    },
    {
        key: '7',
        label: _jsx('div', {
            onClick: () => console.log('Delete clicked'),
            children: 'Delete',
        }),
    },
];
const DataTable = ({ orders }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const handleCustomerClick = customer => {
        setSelectedCustomer(customer);
        setIsModalVisible(true);
    };
    /** 🔹 Format numbers to 2 decimal places */
    const formatAmount = value => {
        if (value == null || isNaN(value)) return '0.00';
        return Number(value).toFixed(2);
    };
    const dataSource = orders?.map((order, index) => {
        const subTotal =
            order.products?.reduce(
                (sum, p) =>
                    sum +
                    (p.offer_price || p.normal_price || 0) * (p.quantity || 1),
                0
            ) || 0;
        return {
            key: order.order_number || index,
            orderNumber: order.order_number,
            date: new Date(order.created_at).toLocaleDateString(),
            customer: {
                id: order.delivery_address?.customer_id,
                name: order.delivery_address?.full_name,
            },
            subTotal: subTotal,
            discount: order.discount || 0,
            shipping: order.shipping_charge || 0,
            totalTax: order.tax_amount || 0,
            grandTotal: order.total_amount || subTotal,
            orderStatus: order.order_status || 'Pending',
            change: order.payment?.change || 0,
            createAt: order.createAt,
            updatedAt: order.updatedAt,
            delete: order.delete || false,
        };
    });
    const tableHead = [
        {
            title: 'ORDER NUMBER',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (_, record) =>
                _jsx('a', {
                    className: 'text-blue-600 cursor-pointer',
                    onClick: () =>
                        navigate(
                            `/dashboard/pos/order/invoice/${record.orderNumber}`,
                            {
                                state: { order: record },
                            }
                        ),
                    children: record.orderNumber,
                }),
        },
        {
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
            render: date =>
                _jsx('span', { children: new Date(date).toLocaleString() }),
        },
        {
            title: 'CUSTOMER',
            dataIndex: 'customer',
            key: 'customer',
            render: customer =>
                _jsx('a', {
                    onClick: () => handleCustomerClick(customer),
                    className: 'cursor-pointer',
                    children: customer?.name,
                }),
        },
        {
            title: 'SUB TOTAL',
            dataIndex: 'subTotal',
            key: 'subTotal',
            render: val => formatAmount(val),
        },
        {
            title: 'DISCOUNT',
            dataIndex: 'discount',
            key: 'discount',
            render: val => formatAmount(val),
        },
        {
            title: 'SHIPPING',
            dataIndex: 'shipping',
            key: 'shipping',
            render: val => formatAmount(val),
        },
        {
            title: 'TOTAL TAX',
            dataIndex: 'totalTax',
            key: 'totalTax',
            render: val => formatAmount(val),
        },
        {
            title: 'GRAND TOTAL',
            dataIndex: 'grandTotal',
            key: 'grandTotal',
            render: val => formatAmount(val),
        },
        {
            title: 'CHANGE',
            dataIndex: 'change',
            key: 'change',
            // render: (val: number) => formatAmount(val),
        },
        {
            title: 'ACTION',
            key: 'action',
            render: () =>
                _jsx(Space, {
                    size: 'middle',
                    children: _jsx(Dropdown, {
                        menu: { items },
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
            console.log(selectedCustomer, 'selectedCustomer'),
            _jsx(Table, { columns: tableHead, dataSource: dataSource }),
            _jsx(Modal, {
                title: 'Customer Details',
                open: isModalVisible,
                onCancel: () => setIsModalVisible(false),
                footer: null,
                centered: true,
                className: 'dark:text-white text-gray-900',
                children:
                    selectedCustomer &&
                    _jsxs(Descriptions, {
                        className: 'dark:text-white text-gray-900',
                        column: 1,
                        bordered: true,
                        children: [
                            _jsx(Descriptions.Item, {
                                label: 'Name',
                                children: selectedCustomer.name,
                            }),
                            _jsx(Descriptions.Item, {
                                label: 'ID',
                                children: selectedCustomer.id,
                            }),
                        ],
                    }),
            }),
        ],
    });
};
export default DataTable;
