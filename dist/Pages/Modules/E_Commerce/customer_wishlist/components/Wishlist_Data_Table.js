import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// src/Pages/Modules/Wishlist/components/DataTable.tsx
import { Table, Image, Tooltip, message, Space, Dropdown } from 'antd';
import { useWishlistData } from './data_get_api';
import { EllipsisVertical } from 'lucide-react';
const DataTable = ({ data }) => {
    const { deleteWishlistItem, refetch } = useWishlistData();
    const handleDelete = async record => {
        try {
            await deleteWishlistItem(record._id);
            message.success('Wishlist item deleted successfully');
            refetch();
        } catch (err) {
            message.error('Failed to delete wishlist item');
        }
    };
    const items = record => [
        {
            key: 'delete',
            label: _jsx('div', {
                onClick: () => handleDelete(record),
                children: 'Delete',
            }),
        },
    ];
    const columns = [
        {
            title: 'CUSTOMER',
            key: 'customer',
            render: (_, record) => {
                const firstProduct = record.products[0];
                return _jsxs('div', {
                    className: 'flex flex-col gap-1',
                    children: [
                        _jsx('span', {
                            className: 'font-semibold dark:text-gray-200',
                            children: firstProduct.user_name,
                        }),
                        _jsx('span', {
                            className:
                                'text-gray-500 text-sm dark:text-gray-400',
                            children: firstProduct.user_email,
                        }),
                        _jsx('span', {
                            className:
                                'text-gray-500 text-sm dark:text-gray-400',
                            children: firstProduct.user_number,
                        }),
                    ],
                });
            },
        },
        {
            title: 'PRODUCTS',
            key: 'products',
            render: (_, record) => {
                return _jsx('div', {
                    className: 'flex flex-col gap-2',
                    children: record.products.map(p =>
                        _jsxs(
                            'div',
                            {
                                className:
                                    'flex items-center gap-3 p-2 border rounded-md shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:hover:shadow-lg',
                                children: [
                                    _jsx(Image, {
                                        width: 60,
                                        height: 60,
                                        src:
                                            p.product_image ||
                                            'https://via.placeholder.com/60',
                                        alt: p.product_name,
                                    }),
                                    _jsxs('div', {
                                        className: 'flex flex-col gap-1',
                                        children: [
                                            _jsx(Tooltip, {
                                                title: p.product_name,
                                                children: _jsx('span', {
                                                    className:
                                                        'font-medium truncate max-w-xs dark:text-white',
                                                    children: p.product_name,
                                                }),
                                            }),
                                            _jsxs('span', {
                                                className:
                                                    'text-gray-600 text-sm dark:text-gray-400',
                                                children: ['Qty: ', p.quantity],
                                            }),
                                            _jsxs('span', {
                                                className:
                                                    'text-gray-600 text-sm dark:text-gray-400',
                                                children: [
                                                    'Price: \u09F3',
                                                    p.order_price,
                                                ],
                                            }),
                                        ],
                                    }),
                                ],
                            },
                            p.product_id
                        )
                    ),
                });
            },
        },
        {
            title: 'TOTAL',
            key: 'total',
            render: (_, record) => {
                const total = record.products.reduce(
                    (acc, p) => acc + p.quantity * p.order_price,
                    0
                );
                return _jsxs('span', {
                    className: 'font-semibold dark:text-white',
                    children: ['\u09F3', total],
                });
            },
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
    return _jsx(Table, {
        columns: columns,
        dataSource: data,
        rowKey: '_id',
        pagination: { pageSize: 5 },
        className:
            'bg-white rounded-md shadow dark:bg-gray-800 dark:text-white',
        scroll: { x: 'max-content' },
    });
};
export default DataTable;
