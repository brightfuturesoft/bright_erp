import React, { useState } from 'react';
import { BadgeDollarSign, Box, ChevronDown, ChevronRight, Gauge, Power, ShoppingCart, Store, Users, X } from 'lucide-react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import logoDark from '../../../assets/logoDark.png';
import logoLight from '../../../assets/logoLight.png';
// types
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
    icon: React.ReactNode; // Change this to ReactNode to allow JSX elements
    children: NavItem[];
};

// Sample data
const price: { permission: Permission[] } = {
    permission: [
        { name: 'Dashboard' },
        { name: 'Product' }
    ]
};

const staff: { permission: Permission[] } = {
    permission: [
        { name: 'Dashboard' },
        { name: 'Product' }
    ]
};

const checkingpath: Permission[] = [
    { name: 'Staff' },
    { name: 'Product' }
];

const nav: NavItem[] = [
    {
        id: 0,
        name: 'Dashboard',
        path: 'dashboard',
        isDropdown: true,
        icon: <Gauge size={20} />, // Use icon component here
        children: [
            {
                id: 0.1,
                name: 'Business',
                path: 'business',
                isDropdown: true,
                icon: null,
                children: [],
            },
            {
                id: 0.2,
                name: 'Accounting',
                path: 'accounting',
                isDropdown: true,
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
        icon: <BadgeDollarSign size={20} />, // Example icon
        children: [
            {
                id: 1.1,
                name: 'Chart of Accounting',
                path: 'accounting/chart_of_account',
                isDropdown: true,
                icon: null,
                children: [],
            }
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
                isDropdown: true,
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
                isDropdown: true,
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
            }
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
            }
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
            }
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
                id: 6.10,
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
            }
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
            }
        ],
    },
];


const hasPermission = (permissionList: Permission[], path: Permission): boolean => {
    return permissionList.some(permission => permission.name === path.name);
};

const generateNavbar = (): NavItem[] => {
    const navbar: Permission[] = [];

    // Filter the checkingpath based on permissions
    checkingpath.forEach(path => {
        if (hasPermission(price.permission, path) && hasPermission(staff.permission, path)) {
            navbar.push(path);
        }
    });

    // Map the navbar items to their corresponding paths in nav
    const mappedNavbar = navbar.map(item => {
        const navItem = nav.find(navEntry => navEntry.name === item.name);
        if (navItem) {
            return navItem;
        }
        return undefined; // Return undefined if navItem is not found
    }).filter((item): item is NavItem => Boolean(item)); // Remove any undefined entries and enforce type

    // Add common paths (entries not in checkingpath)
    nav.forEach(navItem => {
        const existsInCheckingPath = checkingpath.some(path => path.name === navItem.name);
        if (!existsInCheckingPath) {
            mappedNavbar.push(navItem);
        }
    });

    return mappedNavbar;
};

const DashboardNav: React.FC<SidebarProps> = ({ darkMode, isSidebarOpen, setIsSidebarOpen }) => {
    const navbarItems = generateNavbar();
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleDropdownToggle = (id: number) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    console.log(navbarItems);

    return (
        <div className={`sidebar relative overflow-y-auto h-full ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className={`  fixed justify-between top-0 w-full flex items-center px-4 py-2`}>
                <div>
                    <Link to={'/'}>
                        <img
                            src={logoDark}
                            alt="logo"
                            className="w-32 dark:hidden block"
                        /></Link>
                    <Link to={'/'}>
                        <img
                            src={logoLight}
                            alt="logo"
                            className="w-32 dark:block hidden"
                        /></Link>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`${!darkMode ? 'text-black' : 'text-light'} lg:hidden block rounded`}
                >
                    <X size={28} strokeWidth={1} />
                </button>
            </div>

            <ul className='mt-20 space-y-4 sidebar h-[76vh] pb-4 overflow-y-auto'>
                {navbarItems?.map((item, index) => (
                    <li key={index} className="px-4 mb-2">
                        {item?.isDropdown ? (
                            <div>
                                <div
                                    onClick={() => handleDropdownToggle(item.id)}
                                    className={`${!darkMode ? 'text-gray-800 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark  hover:bg-gray-100 ' : 'text-blue-400 hover:bg-light-dark duration-200'} cursor-pointer flex items-center gap-2 p-2 justify-between w-full rounded`}
                                >
                                    <div className="flex items-center gap-2  ">
                                        {item.icon && <span className=" text-xs">{item.icon}</span>}
                                        {item.name}
                                    </div>
                                    {
                                        openDropdown === item.id ? (
                                            <ChevronDown size={18} strokeWidth={1} />
                                        ) : (
                                            <ChevronRight size={18} strokeWidth={1} />
                                        )
                                    }
                                </div>
                                {openDropdown === item.id && (
                                    <ul className="ml-4 mt-2">
                                        {item.children.map((child) => (
                                            <li key={child.id} className="px-4">
                                                <Link
                                                    to={child.path}
                                                    className={`${!darkMode ? 'text-gray-800 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark  hover:bg-gray-100 ' : 'text-blue-400 hover:bg-light-dark duration-200'} cursor-pointer flex items-center gap-2 p-2 justify-between w-full rounded`}
                                                >
                                                    {child.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={item.path}
                                className={`${!darkMode ? 'text-gray-800 dark:text-gray-300 duration-200 dark:hover:text-gray-200 hover:text-blue-500 dark:hover:bg-light-dark  hover:bg-gray-100 ' : 'text-blue-400 hover:bg-light-dark duration-200'} cursor-pointer flex items-center gap-2 p-2 justify-start w-full rounded`}
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            <div className={` fixed left-0 right-0 bottom-0 p-2`}>
                <div className={`dark:bg-dark bg-light dark:text-light text-dark ring-[0.3px] ring-[#46464663] rounded-lg w-full p-4`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src="https://avatars.githubusercontent.com/u/76812306?v=4" alt="User" className="rounded-full w-12 h-12 border border-blue-500 " />
                            <div className="ml-2 flex flex-col gap-0 text-mt-3 text-md font-semibold w-[120px]">
                                Nahid
                                <span className='text-xs font-[100]'>Admin</span>
                            </div>
                        </div>
                        <Button
                            title='Logout'
                            danger={true}
                            ghost={"text"}
                            type='default'
                            size='small'
                            className="hover:bg-red-500 h-[25px] w-[25px] flex items-center justify-center p-0  text-white rounded-full  "
                            onClick={() => console.log('Logging out')}
                        >
                            <Power size={14} strokeWidth={2} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;