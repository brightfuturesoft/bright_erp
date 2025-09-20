import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Layout,
    Button,
    Dropdown,
    Avatar,
    Badge,
    Space,
    Select,
    Tooltip,
    Modal,
} from 'antd';
import type { MenuProps } from 'antd';
import {
    LayoutDashboard,
    Settings,
    Printer,
    Calculator,
    Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
import ThemeToggle from '@/Hooks/ThemeToggle';
import logoDark from '@/assets/logoDark.png';
import logoLight from '@/assets/logoLight.png';
import Calculator_app from '../small_applications/Calculator';
import { useQuery } from '@tanstack/react-query';

const { Header: AntHeader } = Layout;
const { Option } = Select;

const Header: React.FC = () => {
    const [menu, setMenu] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedBranch, setSelectedBranch] = useState('main');
    const menuRef = useRef<HTMLDivElement>(null);
    const { user, workspace } = useContext(Erp_context);
    const [is_calculator_modal_visible, set_is_calculator_modal_visible] =
        useState(false);

    const { data: outletsData, refetch } = useQuery({
        queryKey: ['outletsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}direct-pos/outlets/get-outlets`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch outlets');
            const data = await res.json();
            return data.data;
        },
    });

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle outside click to close menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenu(false);
            }
        };

        // Add event listener when menu is open
        if (menu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menu]);

    // Format time to HH:MM:SS
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    // Sample branches - replace with your actual branch data
    const branches = [
        { value: 'main', label: 'Main Branch' },
        { value: 'development', label: 'Development' },
        { value: 'staging', label: 'Staging' },
        { value: 'production', label: 'Production' },
    ];

    const handleBranchChange = (value: string) => {
        setSelectedBranch(value);
        console.log('Selected branch:', value);
    };

    return (
        <header className="dark:bg-gray-900 bg-gray-50 border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between ">
                    <div className="">
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

                    <div className="md:flex md:items-center md:gap-12">
                        <nav
                            aria-label="Global"
                            className="hidden md:block"
                        >
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    {/* Real-time clock */}
                                    <div className="flex items-center gap-2 px-3 py-2 dark:bg-gray-800 bg-gray-300 rounded-lg border border-gray-300 dark:border-gray-700">
                                        <Clock
                                            size={16}
                                            className="text-blue-400"
                                        />
                                        <span className="text-black dark:text-gray-100 font-mono text-sm">
                                            {formatTime(currentTime)}
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
                                        >
                                            <rect
                                                width="7"
                                                height="9"
                                                x="3"
                                                y="3"
                                                rx="1"
                                            />
                                            <rect
                                                width="7"
                                                height="5"
                                                x="14"
                                                y="3"
                                                rx="1"
                                            />
                                            <rect
                                                width="7"
                                                height="9"
                                                x="14"
                                                y="12"
                                                rx="1"
                                            />
                                            <rect
                                                width="7"
                                                height="5"
                                                x="3"
                                                y="16"
                                                rx="1"
                                            />
                                        </svg>
                                        <span className="mx-1">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Select
                                        value={selectedBranch}
                                        onChange={handleBranchChange}
                                        className="min-w-[140px] bg-black"
                                        placeholder="Select Branch"
                                        loading={!outletsData}
                                    >
                                        {outletsData &&
                                        outletsData.length > 0 ? (
                                            outletsData.map((outlet: any) => (
                                                <Option
                                                    key={outlet._id}
                                                    value={outlet._id}
                                                >
                                                    {outlet.name}
                                                </Option>
                                            ))
                                        ) : (
                                            <Option value="main">
                                                Main Branch
                                            </Option>
                                        )}
                                    </Select>
                                </li>

                                <li>
                                    <Tooltip
                                        title="Calculator"
                                        placement="right"
                                        className="!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg"
                                    >
                                        <button
                                            onClick={() =>
                                                set_is_calculator_modal_visible(
                                                    !is_calculator_modal_visible
                                                )
                                            }
                                            className="flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200"
                                        >
                                            <Calculator size={20} />
                                        </button>
                                    </Tooltip>
                                </li>

                                <li>
                                    <Tooltip
                                        className="!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg"
                                        title="Print Reports"
                                        placement="right"
                                    >
                                        <Link
                                            className="flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200"
                                            to="/print"
                                        >
                                            <Printer size={20} />
                                        </Link>
                                    </Tooltip>
                                </li>

                                <li>
                                    <Tooltip
                                        className="!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg"
                                        title="Discount Management"
                                        placement="right"
                                    >
                                        <Link
                                            className="flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200"
                                            to="/discounts"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-badge-percent-icon lucide-badge-percent"
                                            >
                                                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                                <path d="m15 9-6 6" />
                                                <path d="M9 9h.01" />
                                                <path d="M15 15h.01" />
                                            </svg>
                                        </Link>
                                    </Tooltip>
                                </li>

                                <li>
                                    <Tooltip
                                        className="!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg"
                                        title="Analytics & Reports"
                                        placement="right"
                                    >
                                        <Link
                                            className="flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200"
                                            to="/analytics"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined"
                                            >
                                                <path d="M12 16v5" />
                                                <path d="M16 14v7" />
                                                <path d="M20 10v11" />
                                                <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
                                                <path d="M4 18v3" />
                                                <path d="M8 14v7" />
                                            </svg>
                                        </Link>
                                    </Tooltip>
                                </li>

                                <li>
                                    <Tooltip
                                        className="!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg"
                                        title="System Settings"
                                        placement="right"
                                    >
                                        <Link
                                            className="flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200"
                                            to="/settings"
                                        >
                                            <Settings size={20} />
                                        </Link>
                                    </Tooltip>
                                </li>
                            </ul>
                        </nav>

                        <div
                            className="hidden md:relative md:block"
                            ref={menuRef}
                        >
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setMenu(!menu)}
                                    type="button"
                                    className="overflow-hidden rounded-full border border-gray-300 shadow-inner hover:border-gray-200 transition-colors duration-200"
                                >
                                    <span className="sr-only">
                                        Toggle dashboard menu
                                    </span>
                                    <img
                                        src={workspace?.image}
                                        alt="User Avatar"
                                        className="size-10 p-2 object-cover "
                                    />
                                </button>
                                <ThemeToggle />
                            </div>

                            {menu && (
                                <div
                                    className="absolute end-0 z-10 mt-1 w-56 divide-y divide-gray-700 rounded-md border border-gray-800 bg-gray-900 shadow-lg"
                                    role="menu"
                                >
                                    <div className="p-2">
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-100"
                                            role="menuitem"
                                        >
                                            My profile
                                        </a>

                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-100"
                                            role="menuitem"
                                        >
                                            Billing summary
                                        </a>

                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-100"
                                            role="menuitem"
                                        >
                                            Team settings
                                        </a>
                                    </div>

                                    <div className="p-2">
                                        <button
                                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-800 hover:text-gray-100"
                                            role="menuitem"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                                />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Calculator"
                open={is_calculator_modal_visible}
                onOk={() => set_is_calculator_modal_visible(false)}
                onCancel={() => set_is_calculator_modal_visible(false)}
                footer={null}
            >
                <Calculator_app />
            </Modal>
        </header>
    );
};

export default Header;
