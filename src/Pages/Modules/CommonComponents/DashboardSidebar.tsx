import { useState } from 'react';
import {
    BadgeDollarSign,
    Box,
    ChevronDown,
    ChevronRight,
    Gauge,
    Power,
    ShoppingCart,
    Store,
    Users,
    X,
} from 'lucide-react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import logoDark from '../../../assets/logoDark.png';
import logoLight from '../../../assets/logoLight.png';

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
    id: number;
    name: string;
    path: string;
    isDropdown: boolean;
    icon: React.ReactNode;
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

const nav: NavItem[] = [
    {
        id: 0,
        name: 'Dashboard',
        path: 'dashboard',
        isDropdown: true,
        icon: <Gauge size={20} />,
        children: [
            {
                id: 0.1,
                name: 'Business',
                path: 'business',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 0.2,
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
                id: 1.1,
                name: 'Chart of Accounting',
                path: 'accounting/chart_of_account',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 1.2,
                name: 'Transition',
                path: 'accounting/chart_of_account',
                isDropdown: true,
                icon: null,
                children: [
                    {
                        id: '1.2s',
                        name: 'Journals',
                        path: 'accounting/chart_of_account/journals',
                        isDropdown: false,
                        icon: null,
                    },
                    {
                        id: '1.3s',
                        name: 'Expenses',
                        path: 'accounting/chart_of_account/expenses',
                        isDropdown: false,
                        icon: null,
                    },
                    {
                        id: '1.4s',
                        name: 'Income',
                        path: 'accounting/chart_of_account/income',
                        isDropdown: false,
                        icon: null,
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
        icon: <Users size={20} />, // Example icon
        children: [
            {
                id: 2.1,
                name: 'Category',
                path: 'item/category',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 2.2,
                name: 'Manufacturer',
                path: 'item/manufacturer',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 2.3,
                name: 'Brand',
                path: 'item/brand',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 2.4,
                name: 'Color',
                path: 'item/color',
                isDropdown: true,
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
        icon: <Users size={20} />, // Example icon
        children: [
            {
                id: 3.1,
                name: 'Customer Type',
                path: 'customer/customer-type',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 3.2,
                name: 'Customers',
                path: 'customer/customers',
                isDropdown: true,
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
        icon: <Users size={20} />, // Example icon
        children: [
            {
                id: 4.1,
                name: 'Direct Sale',
                path: 'sale/direct-sale',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.2,
                name: 'Order',
                path: 'sale/order',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.3,
                name: 'Delivery',
                path: 'sale/delivery',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.4,
                name: 'Invoice',
                path: 'sale/invoice',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.5,
                name: 'Order',
                path: 'sale/order',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.6,
                name: 'Return',
                path: 'sale/return',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.7,
                name: 'Batch Payment',
                path: 'sale/batch-payment',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.8,
                name: 'Payment',
                path: 'sale/payment',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 4.9,
                name: 'Refund',
                path: 'sale/refund',
                isDropdown: true,
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
        icon: <Store size={20} />, // Example icon
        children: [
            {
                id: 5.1,
                name: 'Outlet',
                path: 'pos/outlet',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 5.2,
                name: 'Counter',
                path: 'pos/counter',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 5.3,
                name: 'Outlet Sessions',
                path: 'pos/outlet-sessions',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 5.4,
                name: 'Counter Sessions',
                path: 'pos/counter-sessions',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 5.5,
                name: 'Orders',
                path: 'pos/orders',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 5.6,
                name: 'Return',
                path: 'pos/return',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 5.7,
                name: 'Barcode',
                path: 'pos/barcode',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 5.8,
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
        icon: <ShoppingCart size={20} />, // Example icon
        children: [
            {
                id: 6.1,
                name: 'Settings',
                path: 'e-commerce/settings',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.2,
                name: 'Orders',
                path: 'e-commerce/orders',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.3,
                name: 'Customers',
                path: 'e-commerce/customers',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.4,
                name: 'Customers Wishlist',
                path: 'e-commerce/customers-wishlist',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.5,
                name: 'Banners',
                path: 'e-commerce/banners',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.6,
                name: 'Blogs',
                path: 'e-commerce/blogs',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.7,
                name: 'Contact Us',
                path: 'e-commerce/contact-us',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.8,
                name: 'Newsletter',
                path: 'e-commerce/newsletter',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.9,
                name: 'Policy',
                path: 'e-commerce/policy',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.1,
                name: 'Topics',
                path: 'e-commerce/topics',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.11,
                name: 'Partnership Brands',
                path: 'e-commerce/partnership-brands',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.12,
                name: 'Achievements',
                path: 'e-commerce/achievements',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.13,
                name: 'Testimonials',
                path: 'e-commerce/testimonials',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.14,
                name: 'Reviews',
                path: 'e-commerce/reviews',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.15,
                name: 'Integrations',
                path: 'e-commerce/integrations',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.16,
                name: 'General SEO',
                path: 'e-commerce/general-seo',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.17,
                name: 'Questions',
                path: 'e-commerce/questions',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.18,
                name: 'Custom Sections',
                path: 'e-commerce/custom-sections',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 6.19,
                name: 'Promotions',
                path: 'e-commerce/promotions',
                isDropdown: true,
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
        icon: <Box size={20} />, // Example icon
        children: [
            {
                id: 7.1,
                name: 'Stock Adjustment',
                path: 'inventory/stock-adjustment',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 7.2,
                name: 'Stock Movement',
                path: 'inventory/stock-movement',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 7.3,
                name: 'Receivable Stock',
                path: 'inventory/receivable-stock',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 7.4,
                name: 'Warehouse Access',
                path: 'inventory/warehouse-access',
                isDropdown: true,
                icon: null,
                children: [],
            },
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
            return undefined; // Return undefined if navItem is not found
        })
        .filter((item): item is NavItem => Boolean(item)); // Remove any undefined entries and enforce type

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
    const navbarItems = generateNavbar();
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [openSubDropdown, setOpenSubDropdown] = useState<number | null>(null);

    const handleDropdownToggle = (id: number) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };
    const handleDropdownToggle2 = (id: number) => {
        setOpenSubDropdown(openSubDropdown === id ? null : id);
    };

    console.log(navbarItems);

    return (
        <div
            className={`sidebar relative overflow-y-auto h-full ${isSidebarOpen ? 'open' : 'closed'
                }`}
        >
            <div
                className={`  fixed justify-between top-0 w-full flex items-center px-4 py-2`}
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
                    className={`${!darkMode ? 'text-black' : 'text-light'
                        } lg:hidden block rounded`}
                >
                    <X
                        size={28}
                        strokeWidth={1}
                    />
                </button>
            </div>

            <ul className="space-y-4 mt-20 pb-4 h-[76vh] overflow-y-auto sidebar">
                {navbarItems?.map((item, index) => (
                    <li
                        key={index}
                        className="mb-2 px-4"
                    >
                        {item?.isDropdown ? (
                            <div>
                                <div
                                    onClick={() =>
                                        handleDropdownToggle(item.id)
                                    }
                                    className={`${!darkMode
                                        ? 'text-gray-900 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark  hover:bg-gray-100 '
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
                                        {item.children.map(child => (
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
                                                            className={` ${!darkMode
                                                                ? 'text-gray-800 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark  hover:bg-gray-100 '
                                                                : 'text-blue-400 hover:bg-light-dark duration-200'
                                                                } cursor-pointer flex items-center gap-2 p-2 justify-between w-full `}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {child?.name}
                                                            </div>
                                                            {openSubDropdown ===
                                                                child.id ? (
                                                                <ChevronDown
                                                                    size={18}
                                                                    strokeWidth={
                                                                        1
                                                                    }
                                                                />
                                                            ) : (
                                                                <ChevronRight
                                                                    size={18}
                                                                    strokeWidth={
                                                                        1
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                        {openSubDropdown ===
                                                            child.id && (
                                                                <ul className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#3a678926] border-t">
                                                                    {child.children.map(
                                                                        child => (
                                                                            <li
                                                                                key={
                                                                                    child.id
                                                                                }
                                                                                className="px-4"
                                                                            >
                                                                                <Link
                                                                                    to={
                                                                                        child.path
                                                                                    }
                                                                                    className={`${!darkMode
                                                                                        ? 'text-gray-900 dark:text-gray-300 duration-200 dark:hover:text-blue-400 hover:text-blue-500     '
                                                                                        : 'text-blue-400 hover:bg-light-dark duration-200'
                                                                                        } cursor-pointer flex items-center gap-2 p-2 justify-between w-full `}
                                                                                >
                                                                                    {
                                                                                        child.name
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
                                                        className={`dark:bg-[#25445b26] bg-gray-100 ${!darkMode
                                                            ? 'text-gray-900 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark  hover:bg-gray-100 '
                                                            : 'text-blue-400 hover:bg-light-dark duration-200'
                                                            } cursor-pointer flex items-center gap-2 p-2 justify-start w-full`}
                                                    >
                                                        {/* {item.icon && <span className="mr-2">{item.icon}</span>} */}
                                                        {child.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={item.path}
                                className={`${!darkMode
                                    ? 'text-gray-800 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark  hover:bg-gray-100 '
                                    : 'text-blue-400 hover:bg-light-dark duration-200'
                                    } cursor-pointer flex items-center gap-2 p-2 justify-start w-full rounded`}
                            >
                                {item.icon && (
                                    <span className="mr-2">{item.icon}</span>
                                )}
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            <div className={` fixed left-0 right-0 bottom-0 p-2`}>
                <div
                    className={`dark:bg-dark bg-light dark:text-light text-dark ring-[0.3px] ring-[#46464663] rounded-lg w-full p-4`}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img
                                src="https://avatars.githubusercontent.com/u/76812306?v=4"
                                alt="User"
                                className="border border-blue-500 rounded-full w-12 h-12"
                            />
                            <div className="flex flex-col gap-0 ml-2 w-[120px] font-semibold text-md text-mt-3">
                                Nahid
                                <span className="font-[100] text-xs">
                                    Admin
                                </span>
                            </div>
                        </div>
                        <Button
                            title="Logout"
                            danger={true}
                            ghost={'text'}
                            type="default"
                            size="small"
                            className="flex justify-center items-center hover:bg-red-500 p-0 rounded-full w-[25px] h-[25px] text-white"
                            onClick={() => console.log('Logging out')}
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
