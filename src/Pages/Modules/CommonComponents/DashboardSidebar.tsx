import React, { useState } from 'react';
import { BadgeDollarSign, ChevronDown, ChevronRight, Gauge, Power, Users, X } from 'lucide-react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

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
        path: '/dashboard',
        isDropdown: false,
        icon: <Gauge size={20} />, // Use icon component here
        children: [],
    },
    {
        id: 1,
        name: 'Sale',
        path: '/sale',
        isDropdown: true,
        icon: <BadgeDollarSign size={20} />, // Example icon
        children: [
            {
                id: 1.1,
                name: 'New Sale',
                path: 'new_sale',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 1.2,
                name: 'Manage Sale',
                path: 'manage-sale',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 1.3,
                name: 'POS Sale',
                path: 'pos-sale',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 1.4,
                name: 'Sales Terms List',
                path: '/sales-terms-list',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 1.5,
                name: 'Add Sales Terms',
                path: 'add-sales-terms',
                isDropdown: false,
                icon: null,
                children: [],
            },
        ],
    },
    {
        id: 2,
        name: 'Customer',
        path: '/customer',
        isDropdown: true,
        icon: <Users size={20} />, // Example icon
        children: [
            {
                id: 2.1,
                name: 'Add Customer',
                path: 'add-customer',
                isDropdown: false,
                icon: null,
                children: [],
            },
            {
                id: 2.2,
                name: 'Add Customer',
                path: 'add-customer',
                isDropdown: false,
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

const DashboardNav: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const navbarItems = generateNavbar();
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleDropdownToggle = (id: number) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    console.log(navbarItems);

    return (
        <div className={`sidebar  dark:bg-light-dark bg-[white] dark:text-gray-300 text-black dark:border-[white] relative overflow-y-auto h-full ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className={` fixed justify-between top-0 w-full flex items-center px-4 py-2`}>
                <Link to={'/'}>
                    <img
                        src="https://brightfuturesoft.com/static/media/logo%20full%20name%20png%202-01%20(1)%20(1).f35f04f782ea6b4a59b2.png"
                        alt="logo"
                        className="w-32"
                    /></Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={` lg:hidden block rounded`}
                >
                    <X size={28} strokeWidth={1} />
                </button>
            </div>

            <ul className='mt-20'>
                {navbarItems?.map((item, index) => (
                    <li key={index} className="px-4 mb-2">
                        {item?.isDropdown ? (
                            <div>
                                <div
                                    onClick={() => handleDropdownToggle(item.id)}
                                    className={`  cursor-pointer duration-200 dark:hover:bg-dark hover:bg-[#5D87FF] hover:text-white flex items-center gap-2 p-3 rounded-lg w-full justify-between`}
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
                                            <li key={child.id} className="px-4 mb-2 ">
                                                <Link
                                                    to={child.path}
                                                    className={`hover:text-blue-500 group cursor-pointer flex items-center gap-2 p-2 rounded `}
                                                >
                                                    <div className="w-2 h-2 group:hover:border-[blue] rounded-full bg-transparent border-[2px] border-gray-700"></div>  {child.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={item.path}
                                className={` cursor-pointer duration-200 dark:hover:bg-dark hover:bg-[#5D87FF] hover:text-white flex items-center gap-2 p-3 rounded-lg `}
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span>}
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
            <div className={`  fixed left-0 right-0 bottom-0 p-2`}>
                <div className={` ring-[0.3px] ring-[#46464663] rounded-lg w-full p-4`}>
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
