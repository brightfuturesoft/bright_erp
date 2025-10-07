import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
    return _jsx('div', {
        className: 'min-h-screen bg-background',
        children: _jsx('div', {
            className: 'flex',
            children: _jsxs('main', {
                className: 'flex-1 p-6',
                children: [
                    _jsxs('div', {
                        className:
                            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8',
                        children: [
                            _jsxs('div', {
                                className:
                                    'bg-card rounded-lg p-6 border border-border shadow-sm',
                                children: [
                                    _jsxs('div', {
                                        className:
                                            'flex items-center justify-between mb-4',
                                        children: [
                                            _jsx('div', {
                                                className:
                                                    'w-12 h-12 bg-chart-1 rounded-lg flex items-center justify-center text-white text-xl',
                                                children: '\uD83C\uDFEA',
                                            }),
                                            _jsxs('span', {
                                                className:
                                                    'text-sm text-green-600 bg-green-50 px-2 py-1 rounded',
                                                children: [
                                                    '+',
                                                    mockData.shops.growth,
                                                    '%',
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsx('h3', {
                                        className:
                                            'text-2xl font-bold text-card-foreground mb-1',
                                        children: mockData.shops.total,
                                    }),
                                    _jsx('p', {
                                        className:
                                            'text-muted-foreground text-sm',
                                        children: 'Total Shops',
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'mt-3 text-xs text-muted-foreground',
                                        children: [
                                            mockData.shops.active,
                                            ' active \u2022',
                                            ' ',
                                            mockData.shops.inactive,
                                            ' inactive',
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className:
                                    'bg-card rounded-lg p-6 border border-border shadow-sm',
                                children: [
                                    _jsxs('div', {
                                        className:
                                            'flex items-center justify-between mb-4',
                                        children: [
                                            _jsx('div', {
                                                className:
                                                    'w-12 h-12 bg-chart-2 rounded-lg flex items-center justify-center text-white text-xl',
                                                children: '\uD83D\uDCBE',
                                            }),
                                            _jsxs('span', {
                                                className:
                                                    'text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded',
                                                children: [
                                                    mockData.database
                                                        .performance,
                                                    '%',
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsx('h3', {
                                        className:
                                            'text-2xl font-bold text-card-foreground mb-1',
                                        children:
                                            mockData.database.totalRecords.toLocaleString(),
                                    }),
                                    _jsx('p', {
                                        className:
                                            'text-muted-foreground text-sm',
                                        children: 'Database Records',
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'mt-3 text-xs text-muted-foreground',
                                        children: [
                                            '+',
                                            mockData.database.todayInserts,
                                            ' today \u2022',
                                            ' ',
                                            mockData.database.storageUsed,
                                            ' used',
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className:
                                    'bg-card rounded-lg p-6 border border-border shadow-sm',
                                children: [
                                    _jsxs('div', {
                                        className:
                                            'flex items-center justify-between mb-4',
                                        children: [
                                            _jsx('div', {
                                                className:
                                                    'w-12 h-12 bg-chart-3 rounded-lg flex items-center justify-center text-white text-xl',
                                                children: '\uD83D\uDCC8',
                                            }),
                                            _jsxs('span', {
                                                className:
                                                    'text-sm text-muted-foreground',
                                                children: [
                                                    mockData.traffic.bounceRate,
                                                    '% bounce',
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsx('h3', {
                                        className:
                                            'text-2xl font-bold text-card-foreground mb-1',
                                        children:
                                            mockData.traffic.totalVisitors.toLocaleString(),
                                    }),
                                    _jsx('p', {
                                        className:
                                            'text-muted-foreground text-sm',
                                        children: 'Total Visitors',
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'mt-3 text-xs text-muted-foreground',
                                        children: [
                                            mockData.traffic.pageViews.toLocaleString(),
                                            ' ',
                                            'views \u2022 ',
                                            mockData.traffic.avgSessionTime,
                                            ' avg',
                                        ],
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className:
                                    'bg-card rounded-lg p-6 border border-border shadow-sm',
                                children: [
                                    _jsxs('div', {
                                        className:
                                            'flex items-center justify-between mb-4',
                                        children: [
                                            _jsx('div', {
                                                className:
                                                    'w-12 h-12 bg-chart-4 rounded-lg flex items-center justify-center text-white text-xl',
                                                children: '\uD83D\uDCB0',
                                            }),
                                            _jsxs('span', {
                                                className:
                                                    'text-sm text-green-600 bg-green-50 px-2 py-1 rounded',
                                                children: [
                                                    '+',
                                                    mockData.revenue.growth,
                                                    '%',
                                                ],
                                            }),
                                        ],
                                    }),
                                    _jsxs('h3', {
                                        className:
                                            'text-2xl font-bold text-card-foreground mb-1',
                                        children: [
                                            '$',
                                            mockData.revenue.today.toLocaleString(),
                                        ],
                                    }),
                                    _jsx('p', {
                                        className:
                                            'text-muted-foreground text-sm',
                                        children: "Today's Revenue",
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'mt-3 text-xs text-muted-foreground',
                                        children: [
                                            '$',
                                            mockData.revenue.thisMonth.toLocaleString(),
                                            ' ',
                                            'this month',
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8',
                        children: [
                            _jsxs('div', {
                                className:
                                    'bg-card rounded-lg p-6 border border-border shadow-sm',
                                children: [
                                    _jsx('h3', {
                                        className:
                                            'text-lg font-semibold text-card-foreground mb-4',
                                        children: 'Traffic Overview',
                                    }),
                                    _jsx('div', {
                                        className:
                                            'h-64 flex items-end justify-between gap-2',
                                        children: chartData.map((item, index) =>
                                            _jsxs(
                                                'div',
                                                {
                                                    className:
                                                        'flex flex-col items-center flex-1',
                                                    children: [
                                                        _jsx('div', {
                                                            className:
                                                                'w-full bg-chart-1 rounded-t',
                                                            style: {
                                                                height: `${(item.visitors / 4000) * 200}px`,
                                                                minHeight:
                                                                    '20px',
                                                            },
                                                        }),
                                                        _jsx('span', {
                                                            className:
                                                                'text-xs text-muted-foreground mt-2',
                                                            children: item.name,
                                                        }),
                                                    ],
                                                },
                                                item.name
                                            )
                                        ),
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className:
                                    'bg-card rounded-lg p-6 border border-border shadow-sm',
                                children: [
                                    _jsx('h3', {
                                        className:
                                            'text-lg font-semibold text-card-foreground mb-4',
                                        children: 'Sales Performance',
                                    }),
                                    _jsx('div', {
                                        className:
                                            'h-64 flex items-end justify-between gap-2',
                                        children: chartData.map((item, index) =>
                                            _jsxs(
                                                'div',
                                                {
                                                    className:
                                                        'flex flex-col items-center flex-1',
                                                    children: [
                                                        _jsx('div', {
                                                            className:
                                                                'w-full bg-chart-5 rounded-t',
                                                            style: {
                                                                height: `${(item.sales / 10000) * 200}px`,
                                                                minHeight:
                                                                    '20px',
                                                            },
                                                        }),
                                                        _jsx('span', {
                                                            className:
                                                                'text-xs text-muted-foreground mt-2',
                                                            children: item.name,
                                                        }),
                                                    ],
                                                },
                                                item.name
                                            )
                                        ),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className:
                            'bg-card rounded-lg p-6 border border-border shadow-sm',
                        children: [
                            _jsx('h3', {
                                className:
                                    'text-lg font-semibold text-card-foreground mb-4',
                                children: 'Recent Activity',
                            }),
                            _jsx('div', {
                                className: 'space-y-4',
                                children: [
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
                                ].map((activity, index) =>
                                    _jsxs(
                                        'div',
                                        {
                                            className:
                                                'flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors',
                                            children: [
                                                _jsx('div', {
                                                    className: `w-2 h-2 rounded-full ${
                                                        activity.type ===
                                                        'success'
                                                            ? 'bg-green-500'
                                                            : activity.type ===
                                                                'warning'
                                                              ? 'bg-yellow-500'
                                                              : 'bg-blue-500'
                                                    }`,
                                                }),
                                                _jsxs('div', {
                                                    className: 'flex-1',
                                                    children: [
                                                        _jsx('p', {
                                                            className:
                                                                'text-sm text-card-foreground',
                                                            children:
                                                                activity.action,
                                                        }),
                                                        _jsx('p', {
                                                            className:
                                                                'text-xs text-muted-foreground',
                                                            children:
                                                                activity.shop,
                                                        }),
                                                    ],
                                                }),
                                                _jsx('span', {
                                                    className:
                                                        'text-xs text-muted-foreground',
                                                    children: activity.time,
                                                }),
                                            ],
                                        },
                                        index
                                    )
                                ),
                            }),
                        ],
                    }),
                ],
            }),
        }),
    });
}
