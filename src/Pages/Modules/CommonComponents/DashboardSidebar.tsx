import React, { useContext, useState } from 'react';
import {
    BadgeDollarSign,
    Box,
    ChevronDown,
    ChevronRight,
    CircleUserRound,
    Gauge,
    Headset,
    NotepadText,
    Power,
    Settings,
    ShoppingCart,
    Store,
    Users,
    X,
} from 'lucide-react';

import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoDark from '../../../assets/logoDark.png';
import logoLight from '../../../assets/logoLight.png';
import { getFromLocalStorage } from '@/helpers/local-storage';
import { Erp_context } from '@/provider/ErpContext';
import { getBaseUrl } from '@/helpers/config/envConfig';

interface SidebarProps {
    darkMode: boolean;
    isSidebarOpen: boolean;
    scrolled: boolean;
    setIsSidebarOpen: (open: boolean) => void;
}

type Permission = {
    name: string;
};

type NavItem = {
    id: number | string;
    name: string;
    path: string;
    isDropdown: boolean;
    icon: React.ReactNode | null;
    children: NavItem[];
};

// Sample data
const price: { permission: Permission[] } = {
    permission: [{ name: 'Dashboard' }, { name: 'Product' }],
};

const staff: { permission: Permission[] } = {
    permission: [{ name: 'Dashboard' }, { name: 'Product' }],
};

const checkingpath: Permission[] = [{ name: 'Staff' }, { name: 'Product' }];

// Make sure all ids are unique. Use string for submenus.
const nav: NavItem[] = [
    {
        id: 0,
        name: 'Dashboard',
        path: 'dashboard',
        isDropdown: true,
        icon: <Gauge size={20} />,
        children: [
            {
                id: '0.1',
                name: 'Business',
                path: 'business',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '0.2',
                name: 'Accounting',
                path: 'accounting',
                isDropdown: false,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 1,
        name: 'Accounting',
        path: 'accounting',
        isDropdown: true,
        icon: <BadgeDollarSign size={20} />,
        children: [
            {
                id: '1.1',
                name: 'Chart of Accounting',
                path: 'accounting/chart_of_account',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '1.2',
                name: 'Transition',
                path: 'accounting/chart_of_account',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '1.2.1',
                        name: 'Journals',
                        path: 'accounting/chart_of_account/journals',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '1.2.2',
                        name: 'Expenses',
                        path: 'accounting/chart_of_account/expenses',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '1.2.3',
                        name: 'Income',
                        path: 'accounting/chart_of_account/income',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        name: 'Item',
        path: 'item',
        isDropdown: true,
        icon: <Users size={20} />,
        children: [
            {
                id: '2.1',
                name: 'Category',
                path: 'item/category',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '2.2',
                name: 'Items',
                path: 'item/items',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '2.3',
                name: 'Manufacturer',
                path: 'item/manufacturer',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '2.4',
                name: 'Brand',
                path: 'item/brand',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '2.5',
                name: 'Color',
                path: 'item/color',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '2.6',
                name: 'Size Type',
                path: 'item/size_type',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '2.7',
                name: 'Attribute Set',
                path: 'item/attribute_set',
                isDropdown: false,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 3,
        name: 'Customer',
        path: 'customer',
        isDropdown: true,
        icon: <Users size={20} />,
        children: [
            {
                id: '3.1',
                name: 'Customer Type',
                path: 'customer/customer-type',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '3.2',
                name: 'Customers',
                path: '/dashboard/customer',
                isDropdown: false,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 4,
        name: 'Sale',
        path: 'sale',
        isDropdown: true,
        icon: <Users size={20} />,
        children: [
            {
                id: '4.1',
                name: 'Direct Sale',
                path: 'sale/direct-sale',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.2',
                name: 'Quotation',
                path: 'sale/quotation',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.3',
                name: 'Order',
                path: 'sale/order',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.4',
                name: 'Delivery',
                path: 'sale/delivery',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.5',
                name: 'Invoice',
                path: 'sale/invoice',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.6',
                name: 'Return',
                path: 'sale/return',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.7',
                name: 'Batch Payment',
                path: 'sale/batch-payment',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.8',
                name: 'Payment',
                path: 'sale/payment',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.9',
                name: 'Customer Debit',
                path: 'sale/customer-debit',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '4.10',
                name: 'Refund',
                path: 'sale/refund',
                isDropdown: false,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 5,
        name: 'POS',
        path: 'pos',
        isDropdown: true,
        icon: <Store size={20} />,
        children: [
            {
                id: '5.0',
                name: 'Direct POS',
                path: '/direct-pos',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '5.1',
                name: 'Outlet',
                path: 'pos/outlet',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '5.2',
                name: 'Counter',
                path: 'pos/counter',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '5.3',
                name: 'Outlet Sessions',
                path: 'pos/outlet-sessions',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '5.4',
                name: 'Counter Sessions',
                path: 'pos/counter-sessions',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '5.5',
                name: 'Orders',
                path: 'pos/orders',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '5.6',
                name: 'Return',
                path: 'pos/return',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '5.7',
                name: 'Barcode',
                path: 'pos/barcode',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '5.8',
                name: 'Outlet Access',
                path: 'pos/outlet-access',
                isDropdown: true,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 6,
        name: 'E-Commerce',
        path: 'e-commerce',
        isDropdown: true,
        icon: <ShoppingCart size={20} />,
        children: [
            {
                id: '6.1',
                name: 'Settings',
                path: 'e-commerce/settings',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '6.2',
                name: 'Orders',
                path: 'e-commerce/orders',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.3',
                name: 'Customers',
                path: 'e-commerce/customers',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.4',
                name: 'Customers Carts',
                path: 'e-commerce/customers-carts',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.5',
                name: 'Banners',
                path: 'e-commerce/banners',
                isDropdown: false,
                icon: null,
                children: [],
            },

            {
                id: '6.6',
                name: 'Blogs',
                path: 'e-commerce/blogs',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '6.6',
                        name: 'Blogs Category',
                        path: 'e-commerce/blog-category',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '6.6',
                        name: 'Manage Blogs',
                        path: 'e-commerce/blogs',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
            {
                id: '6.7',
                name: 'Contact Us',
                path: 'e-commerce/contact-us',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.8',
                name: 'Coupon ',
                path: 'e-commerce/coupon',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.8',
                name: 'Newsletter',
                path: 'e-commerce/newsletter',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '6.9',
                name: 'Policy',
                path: 'e-commerce/policy',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.10',
                name: 'Topics',
                path: 'e-commerce/topics',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '6.11',
                name: 'Partnership Brands',
                path: 'e-commerce/partnership-brands',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.12',
                name: 'Achievements',
                path: 'e-commerce/achievements',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '6.13',
                name: 'Testimonials',
                path: 'e-commerce/testimonials',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '6.14',
                name: 'Reviews',
                path: 'e-commerce/reviews',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.15',
                name: 'Integrations',
                path: 'e-commerce/integrations',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.16',
                name: 'General SEO',
                path: 'e-commerce/general-seo',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '6.17',
                name: 'Questions',
                path: 'e-commerce/questions',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.18',
                name: 'Custom Sections',
                path: 'e-commerce/custom-sections',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '6.19',
                name: 'Promotions',
                path: 'e-commerce/promotions',
                isDropdown: false,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 7,
        name: 'Inventory',
        path: 'inventory',
        isDropdown: true,
        icon: <Box size={20} />,
        children: [
            {
                id: '7.1',
                name: 'Stock Adjustment',
                path: 'inventory/stock-adjustment',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '7.2',
                name: 'Stock Movement',
                path: 'inventory/stock-movement',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '7.3',
                name: 'Receivable Stock',
                path: 'inventory/receivable-stock',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '7.4',
                name: 'Warehouse Access',
                path: 'inventory/warehouse-access',
                isDropdown: true,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 8,
        name: 'HR Module',
        path: 'hr-module',
        isDropdown: true,
        icon: <CircleUserRound size={20} />,
        children: [
            {
                id: '8.1',
                name: 'Stock Adjustment',
                path: 'hr-module/stock-adjustment',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '8.2',
                name: 'Stock Movement',
                path: 'hr-module/stock-movement',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '8.3',
                name: 'Receivable Stock',
                path: 'hr-module/receivable-stock',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: '8.4',
                name: 'Warehouse Access',
                path: 'hr-module/warehouse-access',
                isDropdown: true,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 9,
        name: 'Settings',
        path: 'settings',
        isDropdown: true,
        icon: <Settings size={20} />,
        children: [
            {
                id: '9.1',
                name: 'Account Settings',
                path: 'settings/account-settings',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '9.1.1',
                        name: 'Profile Info',
                        path: 'settings/account-settings/profile-info',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.1.2',
                        name: 'Change Password',
                        path: 'settings/account-settings/change-password',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.1.3',
                        name: 'Security',
                        path: 'settings/account-settings/security',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.1.4',
                        name: 'Notifications',
                        path: 'settings/account-settings/notifications',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
            {
                id: '9.2',
                name: 'Company Settings',
                path: 'settings/company-settings',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '9.2.1',
                        name: 'Company Info',
                        path: 'settings/company-settings/company-info',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.2.2',
                        name: 'Branding (Logo, Favicon)',
                        path: 'settings/company-settings/branding',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.2.3',
                        name: 'Domain & URL',
                        path: 'settings/company-settings/domain',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.2.4',
                        name: 'Business Locations',
                        path: 'settings/company-settings/locations',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
            {
                id: '9.3',
                name: 'User & Roles',
                path: 'settings/user-roles',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '9.3.1',
                        name: 'Users',
                        path: 'settings/user-roles/users',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.3.2',
                        name: 'Roles & Permissions',
                        path: 'settings/user-roles/roles',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
            {
                id: '9.4',
                name: 'Payment Settings',
                path: 'settings/payment',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '9.4.1',
                        name: 'Payment Methods',
                        path: 'settings/payment/methods',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.4.2',
                        name: 'Currencies',
                        path: 'settings/payment/currencies',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.4.3',
                        name: 'Tax & VAT',
                        path: 'settings/payment/tax',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
            {
                id: '9.5',
                name: 'Shipping Settings',
                path: 'settings/shipping',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '9.5.1',
                        name: 'Shipping Zones',
                        path: 'settings/shipping/zones',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.5.2',
                        name: 'Shipping Methods',
                        path: 'settings/shipping/methods',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.5.3',
                        name: 'Carriers',
                        path: 'settings/shipping/carriers',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
            {
                id: '9.6',
                name: 'Integrations',
                path: 'settings/integrations',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '9.6.1',
                        name: 'Email Providers',
                        path: 'settings/integrations/email',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.6.2',
                        name: 'SMS Gateways',
                        path: 'settings/integrations/sms',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.6.3',
                        name: 'Third-Party APIs',
                        path: 'settings/integrations/third-party',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
            {
                id: '9.7',
                name: 'General Settings',
                path: 'settings/general',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '9.7.1',
                        name: 'Languages',
                        path: 'settings/general/language',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.7.2',
                        name: 'Currency',
                        path: 'settings/general/currency',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.7.3',
                        name: 'Timezones',
                        path: 'settings/general/timezones',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                    {
                        id: '9.7.4',
                        name: 'Units & Measurements',
                        path: 'settings/general/units',
                        isDropdown: false,
                        icon: null,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: 10,
        name: 'Support',
        path: 'support',
        isDropdown: true,
        icon: <Headset size={20} />,
        children: [
            {
                id: '10.1',
                name: 'Ticket',
                path: 'support/ticket',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '10.2',
                name: 'Knowledge Base',
                path: 'support/knowledge-base',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: '10.3',
                name: 'FAQ',
                path: 'support/faq',
                isDropdown: false,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 11,
        name: 'Report',
        path: 'report',
        isDropdown: true,
        icon: <NotepadText size={20} />,
        children: [
            // need all type of report on e-comarce erp system
        ],
    },
];

const hasPermission = (
    permissionList: Permission[],
    path: Permission
): boolean => {
    return permissionList.some(permission => permission.name === path.name);
};

const generateNavbar = (): NavItem[] => {
    const navbar: Permission[] = [];

    // Filter the checkingpath based on permissions
    checkingpath.forEach(path => {
        if (
            hasPermission(price.permission, path) &&
            hasPermission(staff.permission, path)
        ) {
            navbar.push(path);
        }
    });

    // Map the navbar items to their corresponding paths in nav
    const mappedNavbar = navbar
        .map(item => {
            const navItem = nav.find(navEntry => navEntry.name === item.name);
            if (navItem) {
                return navItem;
            }
            return undefined;
        })
        .filter((item): item is NavItem => Boolean(item));

    // Add common paths (entries not in checkingpath)
    nav.forEach(navItem => {
        const existsInCheckingPath = checkingpath.some(
            path => path.name === navItem.name
        );
        if (!existsInCheckingPath) {
            mappedNavbar.push(navItem);
        }
    });

    return mappedNavbar;
};

const DashboardNav: React.FC<SidebarProps> = ({
    darkMode,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const navigate = useNavigate();
    const { user, workspace, setUser, set_workspace } = useContext(Erp_context);
    const fallbackImg =
        'https://ui-avatars.com/api/?name=Admin&background=random&size=96';

    const navbarItems = generateNavbar();
    const [allowedPaths, setAllowedPaths] = useState<Set<string>>(new Set());

    const getPermissionForPath = (path: string): string | null => {
        // Map sidebar routes to permission keys used in backend
        // Extend as needed for other modules
        if (path === 'business' || path === 'dashboard')
            return 'dashboard:view';
        if (path.startsWith('customer')) return 'customer:view';
        if (path.startsWith('item/items/edit_item')) return 'items:update';
        if (path === 'item/items/create_item') return 'items:create';
        if (path.startsWith('item')) return 'items:view';
        if (path.startsWith('accounting')) return 'accounting:view';
        if (path.startsWith('sale')) return 'sales:view';
        if (path.startsWith('inventory')) return 'inventory:view';
        if (path.startsWith('pos')) return 'pos:view';
        if (path.startsWith('hr-module')) return 'hr:view';
        if (path.startsWith('support')) return 'support:view';
        if (path.startsWith('report')) return 'report:view';
        if (path.startsWith('e-commerce')) return 'ecommerce:view';
        if (path.startsWith('settings/user-roles')) return 'roles:view';
        if (path.startsWith('settings')) return 'settings:view';
        return null; // default to hidden if no mapping
    };

    const [permissionSet, setPermissionSet] = useState<Set<string>>(new Set());

    const fetchMyPermissions = async (): Promise<Set<string>> => {
        try {
            const userId = (user as any)?._id || (user as any)?.id;
            if (!userId) {
                return new Set();
            }
            const res = await fetch(
                `${getBaseUrl}/settings/user-role/users-with-roles?user_id=${encodeURIComponent(userId)}`,
                { credentials: 'include' }
            );
            const data = await res.json();
            const users: any[] = data?.data || [];
            const me = users[0];
            let perms: string[] = [];
            if (me?.role?.permissions && Array.isArray(me.role.permissions))
                perms = me.role.permissions;
            else if (me?.role_permissions && Array.isArray(me.role_permissions))
                perms = me.role_permissions;
            // Normalize: add group and group:view variants + synonyms
            const norm = new Set<string>();
            perms.forEach(p => {
                const base = String(p).split(':')[0];
                const group = base;
                norm.add(group);
                norm.add(`${group}:view`);
                if (group === 'item' || group === 'items') {
                    norm.add('item');
                    norm.add('items');
                    norm.add('items:view');
                    norm.add('item:view');
                }
                if (group === 'sale' || group === 'sales') {
                    norm.add('sale');
                    norm.add('sales');
                    norm.add('sales:view');
                    norm.add('sale:view');
                }
                if (group === 'ecommerce' || group === 'e-commerce') {
                    norm.add('ecommerce');
                    norm.add('e-commerce');
                    norm.add('ecommerce:view');
                    norm.add('e-commerce:view');
                }
            });
            return norm;
        } catch {
            return new Set();
        }
    };

    const mapToGroup = (perm: string): string | null => {
        if (perm.startsWith('items:')) return 'items';
        if (perm.startsWith('item:')) return 'items';
        if (perm.startsWith('sales:')) return 'sales';
        if (perm.startsWith('sale:')) return 'sales';
        if (perm.startsWith('ecommerce:')) return 'ecommerce';
        if (perm.startsWith('e-commerce:')) return 'ecommerce';
        if (perm.startsWith('inventory:')) return 'inventory';
        if (perm.startsWith('pos:')) return 'pos';
        if (perm.startsWith('roles:') || perm.startsWith('settings:'))
            return 'settings';
        if (perm.startsWith('support:')) return 'support';
        if (perm.startsWith('report:')) return 'report';
        if (perm.startsWith('customer:')) return 'customer';
        if (perm.startsWith('dashboard:')) return 'dashboard';
        return null;
    };

    const checkPermission = (perm: string, perms: Set<string>): boolean => {
        const group = mapToGroup(perm);
        if (perms.has(perm)) return true;
        if (!group) return false;
        const groupSynonyms = new Set(
            [
                group,
                group === 'items' ? 'item' : '',
                group === 'sales' ? 'sale' : '',
                group === 'ecommerce' ? 'e-commerce' : '',
            ].filter(Boolean) as string[]
        );
        for (const g of groupSynonyms) {
            if (perms.has(g) || perms.has(`${g}:*`)) return true;
        }
        return false;
    };

    React.useEffect(() => {
        let mounted = true;
        const evalPermissions = async () => {
            // Wait for a real user before evaluating
            if (!user) {
                setAllowedPaths(new Set());
                return;
            }
            const perms = await fetchMyPermissions();
            setPermissionSet(perms);
            const pending: Array<Promise<[string, boolean]>> = [];
            const collect = (items: NavItem[]) => {
                items.forEach(it => {
                    if (it.path) {
                        const perm = getPermissionForPath(it.path);
                        const result = perm
                            ? checkPermission(perm, perms)
                            : false;
                        pending.push(Promise.resolve([it.path, result]));
                    }
                    if (it.children?.length) collect(it.children);
                });
            };
            collect(navbarItems);
            const results = await Promise.all(pending);
            if (!mounted) return;
            const allowed = new Set<string>();
            results.forEach(([p, ok]) => {
                if (ok) allowed.add(p);
            });
            // If no permissions assigned, allow all paths to prevent lockout
            if (perms.size === 0) {
                const allPaths = new Set<string>();
                const addAll = (items: NavItem[]) => {
                    items.forEach(it => {
                        if (it.path) allPaths.add(it.path);
                        if (it.children?.length) addAll(it.children);
                    });
                };
                addAll(navbarItems);
                setAllowedPaths(allPaths);
                return;
            }
            setAllowedPaths(allowed);
        };
        evalPermissions();
        return () => {
            mounted = false;
        };
    }, [user?._id, (user as any)?.id]);

    const pathAllowed = (path: string) => allowedPaths.has(path);

    const itemHasAnyAllowedChild = (item: NavItem): boolean => {
        if (item.children?.length) {
            return item.children.some(
                child =>
                    pathAllowed(child.path) || itemHasAnyAllowedChild(child)
            );
        }
        return false;
    };
    const [openDropdown, setOpenDropdown] = useState<number | string | null>(
        null
    );
    const [openSubDropdown, setOpenSubDropdown] = useState<
        number | string | null
    >(null);

    const handleDropdownToggle = (id: number | string) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };
    const handleDropdownToggle2 = (id: number | string) => {
        setOpenSubDropdown(openSubDropdown === id ? null : id);
    };

    const handleSignOut = async () => {
        try {
            // need to remove all cookies
            document.cookie.split(';').forEach(function (cookie) {
                document.cookie = cookie
                    .replace(/^ +/, '')
                    .replace(
                        /=.+$/,
                        '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/'
                    );
            });
            localStorage.removeItem('erp_user_id');
            setUser(null);
            set_workspace(null);
            navigate('/');
        } catch (err) {
            console.error('Failed to sign out:', err);
        }
    };

    return (
        <div
            className={`sidebar dark:bg-light-dark bg-light relative overflow-y-auto h-full ${
                isSidebarOpen ? 'open' : 'closed'
            }`}
        >
            <div
                className={`fixed justify-between top-0 w-full flex items-center px-4 py-2`}
            >
                <div>
                    <Link to={'/'}>
                        <img
                            src={logoDark}
                            alt="logo"
                            className="block dark:hidden w-32"
                        />
                    </Link>
                    <Link to={'/'}>
                        <img
                            src={logoLight}
                            alt="logo"
                            className="dark:block hidden w-32"
                        />
                    </Link>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`${
                        !darkMode ? 'text-black' : 'text-light'
                    } lg:hidden block rounded`}
                >
                    <X
                        size={28}
                        strokeWidth={1}
                    />
                </button>
            </div>

            <ul className="space-y-4 mt-20 pb-4 h-[76vh] overflow-y-auto sidebar">
                {navbarItems
                    ?.filter(item =>
                        item.isDropdown
                            ? itemHasAnyAllowedChild(item) ||
                              pathAllowed(item.path)
                            : pathAllowed(item.path)
                    )
                    .map(item => (
                        <li
                            key={item.id}
                            className="mb-2 px-4"
                        >
                            {item?.isDropdown ? (
                                <div>
                                    <div
                                        onClick={() =>
                                            handleDropdownToggle(item.id)
                                        }
                                        className={`${
                                            !darkMode
                                                ? 'text-gray-900 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark hover:bg-gray-100 '
                                                : 'text-blue-400 hover:bg-light-dark duration-200'
                                        } cursor-pointer flex items-center gap-2 p-2 justify-between w-full rounded`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.icon && (
                                                <span className="text-xs">
                                                    {item.icon}
                                                </span>
                                            )}
                                            {item.name}
                                        </div>
                                        {openDropdown === item.id ? (
                                            <ChevronDown
                                                size={18}
                                                strokeWidth={1}
                                            />
                                        ) : (
                                            <ChevronRight
                                                size={18}
                                                strokeWidth={1}
                                            />
                                        )}
                                    </div>
                                    {openDropdown === item.id && (
                                        <ul className="space-y-1 mt-2 ml-4">
                                            {item.children
                                                .filter(
                                                    child =>
                                                        pathAllowed(
                                                            child.path
                                                        ) ||
                                                        itemHasAnyAllowedChild(
                                                            child
                                                        )
                                                )
                                                .map(child => (
                                                    <li
                                                        key={child?.id}
                                                        className="bg-gray-100 dark:bg-[#25445b26] rounded text-sm whitespace-nowrap overflow-hidden"
                                                    >
                                                        {child?.isDropdown ? (
                                                            <div>
                                                                <div
                                                                    onClick={() =>
                                                                        handleDropdownToggle2(
                                                                            child.id
                                                                        )
                                                                    }
                                                                    className={`${
                                                                        !darkMode
                                                                            ? 'text-gray-800 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark hover:bg-gray-100 '
                                                                            : 'text-blue-400 hover:bg-light-dark duration-200'
                                                                    } cursor-pointer flex items-center gap-2 p-2 justify-between w-full `}
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        {
                                                                            child?.name
                                                                        }
                                                                    </div>
                                                                    {openSubDropdown ===
                                                                    child.id ? (
                                                                        <ChevronDown
                                                                            size={
                                                                                18
                                                                            }
                                                                            strokeWidth={
                                                                                1
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <ChevronRight
                                                                            size={
                                                                                18
                                                                            }
                                                                            strokeWidth={
                                                                                1
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                                {openSubDropdown ===
                                                                    child.id && (
                                                                    <ul className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#3a678926] border-t">
                                                                        {child.children
                                                                            .filter(
                                                                                sc =>
                                                                                    pathAllowed(
                                                                                        sc.path
                                                                                    )
                                                                            )
                                                                            .map(
                                                                                subchild => (
                                                                                    <li
                                                                                        key={
                                                                                            subchild.id
                                                                                        }
                                                                                        className="px-4"
                                                                                    >
                                                                                        <Link
                                                                                            to={
                                                                                                subchild.path
                                                                                            }
                                                                                            className={`${
                                                                                                !darkMode
                                                                                                    ? 'text-gray-900 dark:text-gray-300 duration-200 dark:hover:text-blue-400 hover:text-blue-500'
                                                                                                    : 'text-blue-400 hover:bg-light-dark duration-200'
                                                                                            } cursor-pointer flex items-center gap-2 p-2 justify-between w-full `}
                                                                                        >
                                                                                            {
                                                                                                subchild.name
                                                                                            }
                                                                                        </Link>
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                    </ul>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <Link
                                                                to={child.path}
                                                                className={`dark:bg-[#25445b26] bg-gray-100 ${
                                                                    !darkMode
                                                                        ? 'text-gray-900 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark hover:bg-gray-100 '
                                                                        : 'text-blue-400 hover:bg-light-dark duration-200'
                                                                } cursor-pointer flex items-center gap-2 p-2 justify-start w-full`}
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        )}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                            ) : allowedPaths.has(item.path) ? (
                                <Link
                                    to={item.path}
                                    className={`${
                                        !darkMode
                                            ? 'text-gray-800 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark hover:bg-gray-100 '
                                            : 'text-blue-400 hover:bg-light-dark duration-200'
                                    } cursor-pointer flex items-center gap-2 p-2 justify-start w-full rounded`}
                                >
                                    {item.icon && (
                                        <span className="mr-2">
                                            {item.icon}
                                        </span>
                                    )}
                                    {item.name}
                                </Link>
                            ) : null}
                        </li>
                    ))}
            </ul>

            <div className={`fixed left-0 right-0 bottom-0 p-2`}>
                <div
                    className={`dark:bg-dark bg-light dark:text-light text-dark ring-[0.3px] ring-[#46464663] rounded-lg w-full p-4`}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center w-[160px] overflow-hidden">
                            <img
                                src={workspace?.image || fallbackImg}
                                alt="User"
                                className="border border-blue-500 rounded-full size-8"
                            />
                            <div className="flex flex-col gap-0 ml-2 w-[120px] whitespace-nowrap text-xs font-semibold text-md text-mt-3">
                                {user?.name || ''}
                                <br />
                                <span className="text-sm">
                                    {workspace?.name || ''}
                                </span>
                            </div>
                        </div>
                        <Button
                            title="Logout"
                            danger={true}
                            type="default"
                            size="small"
                            className="flex justify-center items-center hover:bg-red-500 p-0 rounded-full w-[25px] h-[25px] text-white dark:text-black"
                            onClick={handleSignOut}
                        >
                            <Power
                                size={14}
                                strokeWidth={2}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
