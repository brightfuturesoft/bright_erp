'use client';

import { useParams } from 'react-router-dom';
import { Card, Table } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';

interface SaleDetails {
    _id: string;
    order_number: string;
    order_status: string;
    subtotal: number;
    total_discount: number;
    total_vat: number;
    grand_total: number;
    paid_amount: number;
    due_amount: number;
    customer: {
        name: string;
        phone: string;
        email: string;
    };
    customer_phone: string;
    customer_email: string;
    sales_person: {
        name: string;
    };
    created_at: string;
    items: {
        item_name: string;
        brand: string;
        category: string;
        quantity: number;
        price: number;
        subtotal: number;
        discount: number;
        vat: number;
        total: number;
    }[];
}

const DirectSaleDetails = () => {
    const { id } = useParams();
    const { user } = useContext(Erp_context);
    const [details, setDetails] = useState<SaleDetails | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}sale/direct_sale/get-direct-sales`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${user?._id}`,
                            workspace_id: `${user?.workspace_id}`,
                        },
                    }
                );
                const data = await res.json();
                if (!data.error) {
                    const order = data.data.find(
                        (sale: SaleDetails) => sale._id === id
                    );
                    setDetails(order || null);
                }
            } catch (err) {
                console.error('Failed to fetch details', err);
            }
        };
        if (id) fetchDetails();
    }, [id, user]);

    if (!details)
        return <p className="text-gray-600 dark:text-gray-300">Loading...</p>;

    return (
        <div className="p-5 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Card className="mb-5 border-gray-600   bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg">
                <p className="mb-5 text-2xl font-bold bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg">
                    Order Details - ${details.order_number}
                </p>
                <p>
                    <b>Customer:</b> {details.customer?.name}
                </p>
                <p>
                    <b>Phone:</b> {details.customer?.phone}
                </p>
                <p>
                    <b>Email:</b> {details.customer?.email}
                </p>
                <p>
                    <b>Sales Person:</b> {details.sales_person?.name || 'N/A'}
                </p>
                <p>
                    <b>Status:</b> {details.order_status}
                </p>
                <p>
                    <b>Grand Total:</b> ৳ {details.grand_total?.toFixed(2)}
                </p>
                <p>
                    <b>Paid:</b> ৳ {details.paid_amount.toFixed(2)}
                </p>
                <p>
                    <b>Due:</b> ৳ {details.due_amount.toFixed(2)}
                </p>
            </Card>

            <Card className="bg-white border-gray-600 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md rounded-lg">
                <p className="mb-5 text-2xl font-bold bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md rounded-lg">
                    Items
                </p>
                <Table
                    columns={[
                        {
                            title: 'Item Name',
                            dataIndex: 'item_name',
                            key: 'item_name',
                        },
                        { title: 'Brand', dataIndex: 'brand', key: 'brand' },
                        {
                            title: 'Category',
                            dataIndex: 'category',
                            key: 'category',
                        },
                        {
                            title: 'Qty',
                            dataIndex: 'quantity',
                            key: 'quantity',
                        },
                        {
                            title: 'Price',
                            dataIndex: 'price',
                            key: 'price',
                            render: (val: number) => `৳ ${val?.toFixed(2)}`,
                        },
                        {
                            title: 'Total',
                            dataIndex: 'total',
                            key: 'total',
                            render: (val: number) => `৳ ${val?.toFixed(2)}`,
                        },
                    ]}
                    dataSource={details.items}
                    rowKey={record => record.item_name + record.price}
                    pagination={false}
                    className="dark:text-gray-200"
                    bordered
                />
            </Card>
        </div>
    );
};

export default DirectSaleDetails;
