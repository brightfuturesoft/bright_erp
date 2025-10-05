import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import Title from '../../../../Hooks/Title';
import { Button } from 'antd';
const features = [
    {
        icon: 'ShopOutlined',
        iconClass: 'text-blue-500 text-4xl',
        title: 'Multi-Tenant Storefront Creation',
        description: [
            'The moment you sign up, our system automatically creates a dedicated online store for you. Each business gets a unique subdomain and default settings such as currency, tax, and placeholder logos, so you don’t have to worry about technical setup.',
            'The storefront is fully customizable—you can upload your logo, select your preferred color theme, update store name, and configure payment methods in just a few clicks.',
            'Whether you are transitioning from selling on social media or starting a professional e-commerce journey, this feature gives you a branded store you truly own.',
            'It establishes trust with customers while giving you complete independence to grow your business.',
        ],
    },
    {
        icon: 'AppstoreOutlined',
        iconClass: 'text-green-500 text-4xl',
        title: 'Smart Inventory Tracking',
        description: [
            'Managing inventory is one of the toughest challenges for businesses of all sizes. Our smart inventory system helps you monitor stock in real time, ensuring you never run into overselling or out-of-stock issues.',
            'Low-stock alerts notify you when it’s time to restock, and manual adjustments allow you to log damaged items, audit corrections, or supplier returns.',
            'With multi-warehouse support, you can track stock across different locations from a single dashboard. This reduces errors, saves time, and ensures smooth order fulfillment.',
            'By always knowing what’s available, you can confidently serve customers and avoid unnecessary business losses.',
        ],
    },
    {
        icon: 'DatabaseOutlined',
        iconClass: 'text-purple-500 text-4xl',
        title: 'Product Management',
        description: [
            'Our product management module gives you complete control over your product catalog. Adding new items is simple—include product name, SKU, price, images, category, and tax details in a few clicks.',
            'You can also create product variations such as size and color, which is ideal for fashion, electronics, and lifestyle businesses.',
            'Bulk editing features make it easy to update multiple products at once, saving valuable time for larger stores.',
            'A clean and organized catalog not only improves customer shopping experiences but also strengthens your brand’s professional image.',
        ],
    },
    {
        icon: 'ShoppingCartOutlined',
        iconClass: 'text-red-500 text-4xl',
        title: 'Order & Invoice Management',
        description: [
            'Tracking orders and generating invoices can be stressful without automation. Our system streamlines the entire process.',
            'Each order goes through a clear lifecycle: “New” when placed, “Paid” once the payment is confirmed, and “Fulfilled” after delivery.',
            'Every order automatically generates a branded invoice containing your logo, customer details, product list, and total price. Invoices can be downloaded or shared as PDFs.',
            'Refunds can also be managed directly from the system, ensuring flexibility and accuracy while building customer trust.',
        ],
    },
    {
        icon: 'WalletOutlined',
        iconClass: 'text-yellow-500 text-4xl',
        title: 'Integrated Accounting',
        description: [
            'Understanding your finances is critical for making the right business decisions. Our integrated accounting system automatically records every successful sale into your ledger while also letting you manually log expenses.',
            'The dashboard gives you a clear view of revenue, expenses, and net profit in real time.',
            'You can export all records in CSV format for backup or external analysis, eliminating the need for complicated third-party software.',
            'With everything in one place, small and medium-sized businesses can track profitability, manage cash flow, and make smarter financial decisions effortlessly.',
        ],
    },
    {
        icon: 'UsergroupAddOutlined',
        iconClass: 'text-orange-500 text-4xl',
        title: 'Customer Management (CRM)',
        description: [
            'Building long-term relationships with customers is vital for growth. Our CRM helps you store detailed profiles, including names, emails, phone numbers, and purchase history.',
            'Track total spending, order frequency, and engagement to identify your most loyal buyers.',
            'This information makes it easy to personalize promotions, send exclusive offers, or provide better support.',
            'Import existing customer lists for a smooth transition and organize data in one place to increase retention and strengthen your brand reputation.',
        ],
    },
    {
        icon: 'CustomerServiceOutlined',
        iconClass: 'text-blue-300 text-4xl',
        title: 'Support & Ticketing System',
        description: [
            'Customer satisfaction is key to business success. Our built-in support and ticketing system ensures that all customer issues are handled professionally.',
            'Every inquiry becomes a ticket with a status such as “Open,” “In Progress,” or “Resolved,” making it easy for your team to stay organized.',
            'Customers get faster responses, and your support agents can track their workload effectively.',
            'A reliable support system improves customer confidence, enhances your brand’s credibility, and ensures smoother business operations.',
        ],
    },
    {
        icon: 'TeamOutlined',
        iconClass: 'text-green-300 text-4xl',
        title: 'Employee Management (HR Basic)',
        description: [
            'Managing a team without proper tools often leads to confusion. Our basic HR module gives you a simple yet effective employee directory.',
            'Store employee details such as name, email, phone number, role, and status. Adding new employees or deactivating former ones is straightforward.',
            'Role-based permissions ensure staff only access the features relevant to their job, maintaining security and accountability.',
            'For small companies, it’s an ideal starting point to organize teams, delegate responsibilities, and monitor performance efficiently.',
        ],
    },
    {
        icon: 'ShopOutlined',
        iconClass: 'text-purple-300 text-4xl',
        title: 'POS Integration',
        description: [
            'If you run a physical store alongside your online business, our POS integration bridges the gap.',
            'In-store transactions can be processed seamlessly by scanning products or searching from the catalog, adding them to a cart, and completing payments in cash or digitally.',
            'Each POS transaction syncs instantly with your online store, keeping inventory updated in real time.',
            'Receipts can be printed or downloaded instantly. This unified system eliminates double entry, reduces errors, and increases efficiency.',
        ],
    },
    {
        icon: 'SettingOutlined',
        iconClass: 'text-red-300 text-4xl',
        title: 'Customizable Settings',
        description: [
            'Every business has its own identity, and customization is essential to reflect that.',
            'Upload your business logo, update address and contact details, configure currency, tax rates, and time zone, and choose preferred payment methods.',
            'Even order confirmation and invoice email templates can be tailored to match your brand voice.',
            'This ensures every customer touchpoint feels consistent and professional, creating strong impressions and building credibility.',
        ],
    },
];
const Features = () => {
    const [showInfo, setShowInfo] = useState(features[0]);
    return _jsxs('div', {
        className: 'dark:bg-dark pt-20 pb-12 text-black dark:text-white',
        children: [
            _jsx(Title, {
                subtitle: 'Features',
                title: 'Features of GST Billing and Accounting Software',
            }),
            _jsx('div', {
                className:
                    'flex flex-wrap justify-center items-center space-x-4 space-y-4 sm:space-y-0 mx-auto mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl',
                children: _jsxs('div', {
                    className:
                        'border-gray-400 hover:border-gray-300 md:grid grid-cols-3 border w-full',
                    children: [
                        _jsx('ul', {
                            className:
                                'space-y-2 custom-scroll p-4 h-[510px] overflow-y-auto',
                            children: features?.map(itm =>
                                _jsx(
                                    'li',
                                    {
                                        className: 'w-full',
                                        children: _jsx(Button, {
                                            onClick: () => setShowInfo(itm),
                                            size: 'large',
                                            type: 'dashed',
                                            className:
                                                'flex items-center gap-2 bg-white dark:hover:bg-gray-900 hover:bg-gray-200 dark:bg-light-dark px-3 border-b rounded-md w-full text-black hover:text-blue-600 dark:text-white duration-200 cursor-pointer',
                                            children: _jsx('div', {
                                                children: itm?.title,
                                            }),
                                        }),
                                    },
                                    itm?.title
                                )
                            ),
                        }),
                        _jsxs('div', {
                            className: 'col-span-2 px-4 md:px-2 py-4 w-full',
                            children: [
                                _jsx('h1', {
                                    className: 'text-4xl',
                                    children: showInfo?.title,
                                }),
                                _jsx('p', {
                                    className:
                                        'mt-6 w-full text-gray-500 text-justify',
                                    children: showInfo?.description,
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
};
export default Features;
