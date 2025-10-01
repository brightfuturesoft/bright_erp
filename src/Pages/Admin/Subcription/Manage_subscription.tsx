import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom'; // assuming React Router

const Manage_subscription = () => {
    const {
        data: subscriptions = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}admin/subscription/get-all`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch subscriptions');
            const data = await response.json();
            return data.data; // assuming API returns { data: [...] }
        },
    });

    const columns = [
        {
            title: 'Title',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => `$${price}`,
        },
        {
            title: 'Duration',
            dataIndex: 'subscription',
            key: 'subscription',
        },
        {
            title: 'Core Features',
            dataIndex: 'coreFeatures',
            key: 'coreFeatures',
            render: coreFeatures => coreFeatures.join(', '),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        size="small"
                    >
                        Edit
                    </Button>
                    <Button size="small">Delete</Button>
                </div>
            ),
        },
    ];

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading subscriptions</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Manage Subscriptions</h2>
                <Link to="/admin/manage-subscription/add-subscription">
                    <Button type="primary">Add New</Button>
                </Link>
            </div>

            <Table
                columns={columns}
                dataSource={subscriptions}
                rowKey={record => record.id} // assuming each subscription has a unique id
            />
        </div>
    );
};

export default Manage_subscription;
