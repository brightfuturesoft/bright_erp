import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { CheckCircle } from 'lucide-react';
const featuresData = [
    {
        title: 'Hosted Storefront',
        points: [
            'Launch instantly with your own subdomain',
            'Upgrade to a custom domain for full brand identity',
            'Mobile-friendly, responsive design',
            'Customizable theme with logo, colors, hero text',
        ],
    },
    {
        title: 'Inventory & Product Management',
        points: [
            'Add unlimited products with SKU, price, description, and images',
            'Manage stock levels in real-time',
            'Set low-stock alerts to avoid running out of items',
            'Optional product variants (size, color, style)',
        ],
    },
    {
        title: 'Sales & Invoicing',
        points: [
            'Order tracking from new to fulfilled',
            'Generate branded invoices in PDF format with tax and legal footer',
            'Secure checkout for customers with COD or online payment options',
            'Guest checkout enabled for faster purchases',
        ],
    },
    {
        title: 'Accounting & Finance',
        points: [
            'Automatically record revenue from sales',
            'Track expenses by category and vendor',
            'See your cash flow and net balance in one dashboard',
            'Export all finance data to CSV or PDF',
        ],
    },
    {
        title: 'Reports & Insights',
        points: [
            'Daily/weekly/monthly sales summaries',
            'Best-selling product lists',
            'Inventory stock reports',
            'Downloadable reports for business planning',
        ],
    },
    {
        title: 'POS (Point of Sale)',
        points: [
            'Sell directly from your outlet with POS integration',
            'Accept cash and manual payments instantly',
            'Sync POS orders with your online inventory',
            'Print or download receipts for customers',
        ],
    },
    {
        title: 'Customer Relationship Management (CRM)',
        points: [
            'Build a database of all your customers',
            'View lifetime value, purchase history, and contact details',
            'Add notes for customer preferences',
            'Import or export customers via CSV',
        ],
    },
    {
        title: 'Support & Helpdesk',
        points: [
            'Create and manage customer support tickets',
            'Organize FAQ pages to reduce repetitive questions',
            'Assign tickets to staff for faster resolution',
        ],
    },
    {
        title: 'Roles & Permissions',
        points: [
            'Invite staff and assign roles: Owner, Admin, Accountant, Staff, POS Cashier, Support Agent',
            'Fine-grained access control to keep data safe',
        ],
    },
];
export function Features() {
    return _jsx('section', {
        className: 'bg-white dark:bg-gray-900',
        children: _jsxs('div', {
            className: 'mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20',
            children: [
                _jsxs('div', {
                    className: 'flex flex-col items-center text-center mb-12',
                    children: [
                        _jsx('h2', {
                            className:
                                'text-3xl md:text-5xl font-bold text-gray-900 dark:text-white',
                            children: 'Make every step user-centric',
                        }),
                        _jsx('p', {
                            className:
                                'mt-4 max-w-xl text-base text-gray-500 dark:text-gray-400 md:text-lg',
                            children:
                                'Our platform combines the power of ERP with the simplicity of hosted e-commerce. Here\u2019s what you get:',
                        }),
                    ],
                }),
                _jsx('div', {
                    className: 'grid gap-6 sm:grid-cols-2 md:grid-cols-3',
                    children: featuresData.map((feature, idx) =>
                        _jsxs(
                            'div',
                            {
                                className:
                                    'flex flex-col gap-4 rounded-md border border-gray-300 dark:border-gray-700 p-6 md:p-8 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow',
                                children: [
                                    _jsxs('h3', {
                                        className:
                                            'text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2',
                                        children: [
                                            _jsx(CheckCircle, {
                                                className:
                                                    'h-5 w-5 text-blue-500 dark:text-blue-400',
                                            }),
                                            feature.title,
                                        ],
                                    }),
                                    _jsx('ul', {
                                        className:
                                            'list-disc list-inside text-gray-500 dark:text-gray-400 text-sm',
                                        children: feature.points.map(
                                            (point, i) =>
                                                _jsx(
                                                    'li',
                                                    { children: point },
                                                    i
                                                )
                                        ),
                                    }),
                                ],
                            },
                            idx
                        )
                    ),
                }),
            ],
        }),
    });
}
