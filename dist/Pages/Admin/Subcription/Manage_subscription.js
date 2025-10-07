import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
            render: (_, record) =>
                _jsxs('div', {
                    className: 'flex gap-2',
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            size: 'small',
                            children: 'Edit',
                        }),
                        _jsx(Button, { size: 'small', children: 'Delete' }),
                    ],
                }),
        },
    ];
    if (isLoading) return _jsx('p', { children: 'Loading...' });
    if (isError) return _jsx('p', { children: 'Error loading subscriptions' });
    return _jsxs('div', {
        className: 'p-4',
        children: [
            _jsxs('div', {
                className: 'flex justify-between items-center mb-4',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-bold',
                        children: 'Manage Subscriptions',
                    }),
                    _jsx(Link, {
                        to: '/admin/manage-subscription/add-subscription',
                        children: _jsx(Button, {
                            type: 'primary',
                            children: 'Add New',
                        }),
                    }),
                ],
            }),
            _jsx(Table, {
                columns: columns,
                dataSource: subscriptions,
                rowKey: record => record.id,
            }),
        ],
    });
};
export default Manage_subscription;
