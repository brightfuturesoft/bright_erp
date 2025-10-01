// src/Pages/Modules/Wishlist/components/DataTable.tsx
import { Table, Image, Tooltip, message, Space, Dropdown } from 'antd';
import React from 'react';
import { useWishlistData } from './data_get_api';
import { EllipsisVertical } from 'lucide-react';

const DataTable: React.FC<{ data: any[] }> = ({ data }) => {
    const { deleteWishlistItem, refetch } = useWishlistData();

    const handleDelete = async (record: any) => {
        try {
            await deleteWishlistItem(record._id);
            message.success('Wishlist item deleted successfully');
            refetch();
        } catch (err) {
            message.error('Failed to delete wishlist item');
        }
    };

    const items = (record: any) => [
        {
            key: 'delete',
            label: <div onClick={() => handleDelete(record)}>Delete</div>,
        },
    ];

    const columns = [
        {
            title: 'CUSTOMER',
            key: 'customer',
            render: (_: any, record: any) => {
                const firstProduct = record.products[0];
                return (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold dark:text-gray-200">
                            {firstProduct.user_name}
                        </span>
                        <span className="text-gray-500 text-sm dark:text-gray-400">
                            {firstProduct.user_email}
                        </span>
                        <span className="text-gray-500 text-sm dark:text-gray-400">
                            {firstProduct.user_number}
                        </span>
                    </div>
                );
            },
        },
        {
            title: 'PRODUCTS',
            key: 'products',
            render: (_: any, record: any) => {
                return (
                    <div className="flex flex-col gap-2">
                        {record.products.map((p: any) => (
                            <div
                                key={p.product_id}
                                className="flex items-center gap-3 p-2 border rounded-md shadow-sm hover:shadow-md transition-shadow dark:bg-gray-700 dark:border-gray-600 dark:hover:shadow-lg"
                            >
                                <Image
                                    width={60}
                                    height={60}
                                    src={
                                        p.product_image ||
                                        'https://via.placeholder.com/60'
                                    }
                                    alt={p.product_name}
                                />
                                <div className="flex flex-col gap-1">
                                    <Tooltip title={p.product_name}>
                                        <span className="font-medium truncate max-w-xs dark:text-white">
                                            {p.product_name}
                                        </span>
                                    </Tooltip>
                                    <span className="text-gray-600 text-sm dark:text-gray-400">
                                        Qty: {p.quantity}
                                    </span>
                                    <span className="text-gray-600 text-sm dark:text-gray-400">
                                        Price: ৳{p.order_price}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            },
        },
        {
            title: 'TOTAL',
            key: 'total',
            render: (_: any, record: any) => {
                const total = record.products.reduce(
                    (acc: number, p: any) => acc + p.quantity * p.order_price,
                    0
                );
                return (
                    <span className="font-semibold dark:text-white">
                        ৳{total}
                    </span>
                );
            },
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
        <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            className="bg-white rounded-md shadow dark:bg-gray-800 dark:text-white"
            scroll={{ x: 'max-content' }}
        />
    );
};

export default DataTable;
