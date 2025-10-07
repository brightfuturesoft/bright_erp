import React from 'react';
import { Table, Image, Button, Dropdown, Menu } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';

interface CartItem {
    _id: string;
    '0': {
        product_id: string;
        user_id: string;
        user_name: string;
        user_email: string;
        user_number: string;
        product_name: string;
        sku: string;
        quantity: number;
        order_price: number;
        variation: {
            color: string;
            size: string;
        };
        product_image: string;
    };
}

interface Props {
    data: CartItem[];
}

const CartTable: React.FC<Props> = ({ data }) => {
    const columns = [
        {
            title: 'Product',
            dataIndex: ['0', 'product_name'],
            render: (_: any, record: CartItem) => (
                <div className="flex items-center gap-2">
                    <Image
                        src={record['0'].product_image}
                        width={50}
                        height={50}
                        alt={record['0'].product_name}
                    />
                    <span>{record['0'].product_name}</span>
                </div>
            ),
        },
        {
            title: 'User',
            render: (_: any, record: CartItem) => (
                <div>
                    <div>{record['0'].user_name}</div>
                    <div className="text-gray-500 text-sm">
                        {record['0'].user_email}
                    </div>
                </div>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: ['0', 'quantity'],
        },
        {
            title: 'Price',
            dataIndex: ['0', 'order_price'],
            render: (price: number) => `$${price}`,
        },
        {
            title: 'Variation',
            render: (_: any, record: CartItem) => (
                <div>
                    Color:{' '}
                    <span
                        style={{
                            background: record['0'].variation.color,
                            padding: '0 8px',
                        }}
                    ></span>
                    , Size: {record['0'].variation.size}
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
        />
    );
};

export default CartTable;
