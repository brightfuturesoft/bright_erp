import React from 'react';
import { Card } from 'antd';
import {
    FolderOpenOutlined,
    AppstoreOutlined,
    EditOutlined,
    BarChartOutlined,
} from '@ant-design/icons';

interface Stats {
    total?: number;
    active?: number;
    draft?: number;
    totalItems?: number;
}

export default function Category_stats_cards({ stats }: { stats: Stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="dark:bg-gray-900 dark:text-gray-100">
                <div className="flex flex-row items-center justify-between pb-2">
                    <span className="text-sm font-medium">
                        Total Categories
                    </span>
                    <FolderOpenOutlined className="text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className={`text-xs dark:text-gray-400`}>All categories</p>
            </Card>
            <Card className="dark:bg-gray-900 dark:text-gray-100">
                <div className="flex flex-row items-center justify-between pb-2">
                    <span className="text-sm font-medium">Active</span>
                    <AppstoreOutlined className="text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">
                    {stats?.active}
                </div>
                <p className={`text-xs dark:text-gray-400`}>Currently active</p>
            </Card>
            <Card className="dark:bg-gray-900 dark:text-gray-100">
                <div className="flex flex-row items-center justify-between pb-2">
                    <span className="text-sm font-medium">Draft</span>
                    <EditOutlined className="text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                    {stats?.draft}
                </div>
                <p className={`text-xs dark:text-gray-400`}>In draft status</p>
            </Card>
            <Card className="dark:bg-gray-900 dark:text-gray-100">
                <div className="flex flex-row items-center justify-between pb-2">
                    <span className="text-sm font-medium">Total Items</span>
                    <BarChartOutlined className="text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">
                    {stats?.totalItems?.toLocaleString()}
                </div>
                <p className={`text-xs dark:text-gray-400`}>
                    Items across all categories
                </p>
            </Card>
            <Card className="dark:bg-gray-900 dark:text-gray-100">
                <div className="flex flex-row items-center justify-between pb-2">
                    <span className="text-sm font-medium">
                        Avg Items/Category
                    </span>
                    <BarChartOutlined className="text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">
                    {stats?.total
                        ? Math.round(stats?.totalItems / stats?.total)
                        : 0}
                </div>
                <p className={`text-xs dark:text-gray-400 text-gray-500'}`}>
                    Average distribution
                </p>
            </Card>
        </div>
    );
}
