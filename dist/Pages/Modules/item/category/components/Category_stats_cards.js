import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Card } from 'antd';
import {
    FolderOpenOutlined,
    AppstoreOutlined,
    EditOutlined,
    BarChartOutlined,
} from '@ant-design/icons';
import { useItemsData } from '../../items/components/data_get_api';
export default function Category_stats_cards({ stats }) {
    const { itemsData: fetchedItemsData, isLoading } = useItemsData();
    return _jsxs('div', {
        className: 'grid grid-cols-1 md:grid-cols-5 gap-4',
        children: [
            _jsxs(Card, {
                className: 'dark:bg-gray-900 dark:text-gray-100',
                children: [
                    _jsxs('div', {
                        className:
                            'flex flex-row items-center justify-between pb-2',
                        children: [
                            _jsx('span', {
                                className: 'text-sm font-medium',
                                children: 'Total Categories',
                            }),
                            _jsx(FolderOpenOutlined, {
                                className: 'text-muted-foreground',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'text-2xl font-bold',
                        children: stats.total,
                    }),
                    _jsx('p', {
                        className: `text-xs dark:text-gray-400`,
                        children: 'All categories',
                    }),
                ],
            }),
            _jsxs(Card, {
                className: 'dark:bg-gray-900 dark:text-gray-100',
                children: [
                    _jsxs('div', {
                        className:
                            'flex flex-row items-center justify-between pb-2',
                        children: [
                            _jsx('span', {
                                className: 'text-sm font-medium',
                                children: 'Active',
                            }),
                            _jsx(AppstoreOutlined, {
                                className: 'text-green-600',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'text-2xl font-bold text-green-600',
                        children: stats?.active,
                    }),
                    _jsx('p', {
                        className: `text-xs dark:text-gray-400`,
                        children: 'Currently active',
                    }),
                ],
            }),
            _jsxs(Card, {
                className: 'dark:bg-gray-900 dark:text-gray-100',
                children: [
                    _jsxs('div', {
                        className:
                            'flex flex-row items-center justify-between pb-2',
                        children: [
                            _jsx('span', {
                                className: 'text-sm font-medium',
                                children: 'Draft',
                            }),
                            _jsx(EditOutlined, {
                                className: 'text-yellow-600',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'text-2xl font-bold text-yellow-600',
                        children: stats?.draft,
                    }),
                    _jsx('p', {
                        className: `text-xs dark:text-gray-400`,
                        children: 'In draft status',
                    }),
                ],
            }),
            _jsxs(Card, {
                className: 'dark:bg-gray-900 dark:text-gray-100',
                children: [
                    _jsxs('div', {
                        className:
                            'flex flex-row items-center justify-between pb-2',
                        children: [
                            _jsx('span', {
                                className: 'text-sm font-medium',
                                children: 'Total Items',
                            }),
                            _jsx(BarChartOutlined, {
                                className: 'text-blue-600',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'text-2xl font-bold text-blue-600',
                        children: fetchedItemsData?.length.toLocaleString(),
                    }),
                    _jsx('p', {
                        className: `text-xs dark:text-gray-400`,
                        children: 'Items across all categories',
                    }),
                ],
            }),
            _jsxs(Card, {
                className: 'dark:bg-gray-900 dark:text-gray-100',
                children: [
                    _jsxs('div', {
                        className:
                            'flex flex-row items-center justify-between pb-2',
                        children: [
                            _jsx('span', {
                                className: 'text-sm font-medium',
                                children: 'Avg Items/Category',
                            }),
                            _jsx(BarChartOutlined, {
                                className: 'text-purple-600',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'text-2xl font-bold text-purple-600',
                        children: stats?.total
                            ? Math.round(stats?.totalItems / stats?.total)
                            : 0,
                    }),
                    _jsx('p', {
                        className: `text-xs dark:text-gray-400 text-gray-500'}`,
                        children: 'Average distribution',
                    }),
                ],
            }),
        ],
    });
}
