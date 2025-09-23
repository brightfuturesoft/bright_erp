import { useState } from 'react';

// Mock data for demonstration
const mockData = {
    shops: {
        total: 247,
        active: 198,
        inactive: 49,
        growth: 12.5,
    },
    database: {
        totalRecords: 15847,
        todayInserts: 342,
        storageUsed: '2.4 GB',
        performance: 98.2,
    },
    traffic: {
        totalVisitors: 8924,
        pageViews: 23847,
        bounceRate: 34.2,
        avgSessionTime: '3m 42s',
    },
    revenue: {
        today: 12847,
        thisMonth: 284950,
        growth: 18.3,
    },
};

const chartData = [
    { name: 'Jan', visitors: 4000, sales: 2400 },
    { name: 'Feb', visitors: 3000, sales: 1398 },
    { name: 'Mar', visitors: 2000, sales: 9800 },
    { name: 'Apr', visitors: 2780, sales: 3908 },
    { name: 'May', visitors: 1890, sales: 4800 },
    { name: 'Jun', visitors: 2390, sales: 3800 },
];

export default function Admin_dashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Shops Card */}
                        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-chart-1 rounded-lg flex items-center justify-center text-white text-xl">
                                    🏪
                                </div>
                                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                                    +{mockData.shops.growth}%
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-1">
                                {mockData.shops.total}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Total Shops
                            </p>
                            <div className="mt-3 text-xs text-muted-foreground">
                                {mockData.shops.active} active •{' '}
                                {mockData.shops.inactive} inactive
                            </div>
                        </div>

                        {/* Database Records Card */}
                        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-chart-2 rounded-lg flex items-center justify-center text-white text-xl">
                                    💾
                                </div>
                                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {mockData.database.performance}%
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-1">
                                {mockData.database.totalRecords.toLocaleString()}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Database Records
                            </p>
                            <div className="mt-3 text-xs text-muted-foreground">
                                +{mockData.database.todayInserts} today •{' '}
                                {mockData.database.storageUsed} used
                            </div>
                        </div>

                        {/* Traffic Card */}
                        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-chart-3 rounded-lg flex items-center justify-center text-white text-xl">
                                    📈
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {mockData.traffic.bounceRate}% bounce
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-1">
                                {mockData.traffic.totalVisitors.toLocaleString()}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Total Visitors
                            </p>
                            <div className="mt-3 text-xs text-muted-foreground">
                                {mockData.traffic.pageViews.toLocaleString()}{' '}
                                views • {mockData.traffic.avgSessionTime} avg
                            </div>
                        </div>

                        {/* Revenue Card */}
                        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-chart-4 rounded-lg flex items-center justify-center text-white text-xl">
                                    💰
                                </div>
                                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                                    +{mockData.revenue.growth}%
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-card-foreground mb-1">
                                ${mockData.revenue.today.toLocaleString()}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                Today's Revenue
                            </p>
                            <div className="mt-3 text-xs text-muted-foreground">
                                ${mockData.revenue.thisMonth.toLocaleString()}{' '}
                                this month
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Traffic Chart */}
                        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <h3 className="text-lg font-semibold text-card-foreground mb-4">
                                Traffic Overview
                            </h3>
                            <div className="h-64 flex items-end justify-between gap-2">
                                {chartData.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex flex-col items-center flex-1"
                                    >
                                        <div
                                            className="w-full bg-chart-1 rounded-t"
                                            style={{
                                                height: `${(item.visitors / 4000) * 200}px`,
                                                minHeight: '20px',
                                            }}
                                        />
                                        <span className="text-xs text-muted-foreground mt-2">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sales Chart */}
                        <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <h3 className="text-lg font-semibold text-card-foreground mb-4">
                                Sales Performance
                            </h3>
                            <div className="h-64 flex items-end justify-between gap-2">
                                {chartData.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex flex-col items-center flex-1"
                                    >
                                        <div
                                            className="w-full bg-chart-5 rounded-t"
                                            style={{
                                                height: `${(item.sales / 10000) * 200}px`,
                                                minHeight: '20px',
                                            }}
                                        />
                                        <span className="text-xs text-muted-foreground mt-2">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                        <h3 className="text-lg font-semibold text-card-foreground mb-4">
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {[
                                {
                                    action: 'New shop registered',
                                    shop: 'Tech Store Pro',
                                    time: '2 minutes ago',
                                    type: 'success',
                                },
                                {
                                    action: 'Database backup completed',
                                    shop: 'System',
                                    time: '15 minutes ago',
                                    type: 'info',
                                },
                                {
                                    action: 'High traffic detected',
                                    shop: 'Fashion Hub',
                                    time: '1 hour ago',
                                    type: 'warning',
                                },
                                {
                                    action: 'Payment processed',
                                    shop: 'Book Corner',
                                    time: '2 hours ago',
                                    type: 'success',
                                },
                                {
                                    action: 'Shop updated profile',
                                    shop: 'Gadget World',
                                    time: '3 hours ago',
                                    type: 'info',
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            activity.type === 'success'
                                                ? 'bg-green-500'
                                                : activity.type === 'warning'
                                                  ? 'bg-yellow-500'
                                                  : 'bg-blue-500'
                                        }`}
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm text-card-foreground">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {activity.shop}
                                        </p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
