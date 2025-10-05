import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useRef, useContext } from 'react';
import { Layout, Select, Tooltip, Modal } from 'antd';
import { Settings, Printer, Calculator, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
import ThemeToggle from '@/Hooks/ThemeToggle';
import logoDark from '@/assets/logo/white_logo.webp';
import logoLight from '@/assets/logo/logo.png';
import Calculator_app from '../small_applications/Calculator';
import { useQuery } from '@tanstack/react-query';
const { Header: AntHeader } = Layout;
const { Option } = Select;
const Header = () => {
    const [menu, setMenu] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedBranch, setSelectedBranch] = useState('main');
    const menuRef = useRef(null);
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
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
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
    const formatTime = date => {
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
    const handleBranchChange = value => {
        setSelectedBranch(value);
        console.log('Selected branch:', value);
    };
    return _jsxs('header', {
        className:
            'dark:bg-gray-900 bg-gray-50 border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50',
        children: [
            _jsx('div', {
                className: 'mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8',
                children: _jsxs('div', {
                    className: 'flex h-16 items-center justify-between ',
                    children: [
                        _jsxs('div', {
                            className: '',
                            children: [
                                _jsx(Link, {
                                    to: '/',
                                    children: _jsx('img', {
                                        src: logoDark,
                                        alt: 'logo',
                                        className: 'block dark:hidden w-32',
                                    }),
                                }),
                                _jsx(Link, {
                                    to: '/',
                                    children: _jsx('img', {
                                        src: logoLight,
                                        alt: 'logo',
                                        className: 'dark:block hidden w-32',
                                    }),
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className: 'md:flex md:items-center md:gap-12',
                            children: [
                                _jsx('nav', {
                                    'aria-label': 'Global',
                                    className: 'hidden md:block',
                                    children: _jsxs('ul', {
                                        className:
                                            'flex items-center gap-6 text-sm',
                                        children: [
                                            _jsx('li', {
                                                children: _jsxs('div', {
                                                    className:
                                                        'flex items-center gap-2 px-3 py-2 dark:bg-gray-800 bg-gray-300 rounded-lg border border-gray-300 dark:border-gray-700',
                                                    children: [
                                                        _jsx(Clock, {
                                                            size: 16,
                                                            className:
                                                                'text-blue-400',
                                                        }),
                                                        _jsx('span', {
                                                            className:
                                                                'text-black dark:text-gray-100 font-mono text-sm',
                                                            children:
                                                                formatTime(
                                                                    currentTime
                                                                ),
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            _jsx('li', {
                                                children: _jsxs(Link, {
                                                    to: '/dashboard',
                                                    className:
                                                        'flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80',
                                                    children: [
                                                        _jsxs('svg', {
                                                            xmlns: 'http://www.w3.org/2000/svg',
                                                            width: '18',
                                                            height: '18',
                                                            viewBox:
                                                                '0 0 24 24',
                                                            fill: 'none',
                                                            stroke: 'currentColor',
                                                            strokeWidth: '2',
                                                            strokeLinecap:
                                                                'round',
                                                            strokeLinejoin:
                                                                'round',
                                                            className:
                                                                'lucide lucide-layout-dashboard-icon lucide-layout-dashboard',
                                                            children: [
                                                                _jsx('rect', {
                                                                    width: '7',
                                                                    height: '9',
                                                                    x: '3',
                                                                    y: '3',
                                                                    rx: '1',
                                                                }),
                                                                _jsx('rect', {
                                                                    width: '7',
                                                                    height: '5',
                                                                    x: '14',
                                                                    y: '3',
                                                                    rx: '1',
                                                                }),
                                                                _jsx('rect', {
                                                                    width: '7',
                                                                    height: '9',
                                                                    x: '14',
                                                                    y: '12',
                                                                    rx: '1',
                                                                }),
                                                                _jsx('rect', {
                                                                    width: '7',
                                                                    height: '5',
                                                                    x: '3',
                                                                    y: '16',
                                                                    rx: '1',
                                                                }),
                                                            ],
                                                        }),
                                                        _jsx('span', {
                                                            className: 'mx-1',
                                                            children:
                                                                'Dashboard',
                                                        }),
                                                    ],
                                                }),
                                            }),
                                            _jsx('li', {
                                                children: _jsx(Select, {
                                                    value: selectedBranch,
                                                    onChange:
                                                        handleBranchChange,
                                                    className:
                                                        'min-w-[140px] bg-black',
                                                    placeholder:
                                                        'Select Branch',
                                                    loading: !outletsData,
                                                    children:
                                                        outletsData &&
                                                        outletsData.length > 0
                                                            ? outletsData.map(
                                                                  outlet =>
                                                                      _jsx(
                                                                          Option,
                                                                          {
                                                                              value: outlet._id,
                                                                              children:
                                                                                  outlet.name,
                                                                          },
                                                                          outlet._id
                                                                      )
                                                              )
                                                            : _jsx(Option, {
                                                                  value: 'main',
                                                                  children:
                                                                      'Main Branch',
                                                              }),
                                                }),
                                            }),
                                            _jsx('li', {
                                                children: _jsx(Tooltip, {
                                                    title: 'Calculator',
                                                    placement: 'right',
                                                    className:
                                                        '!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg',
                                                    children: _jsx('button', {
                                                        onClick: () =>
                                                            set_is_calculator_modal_visible(
                                                                !is_calculator_modal_visible
                                                            ),
                                                        className:
                                                            'flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200',
                                                        children: _jsx(
                                                            Calculator,
                                                            { size: 20 }
                                                        ),
                                                    }),
                                                }),
                                            }),
                                            _jsx('li', {
                                                children: _jsx(Tooltip, {
                                                    className:
                                                        '!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg',
                                                    title: 'Print Reports',
                                                    placement: 'right',
                                                    children: _jsx(Link, {
                                                        className:
                                                            'flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200',
                                                        to: '/dashboard/pos/orders',
                                                        children: _jsx(
                                                            Printer,
                                                            { size: 20 }
                                                        ),
                                                    }),
                                                }),
                                            }),
                                            _jsx('li', {
                                                children: _jsx(Tooltip, {
                                                    className:
                                                        '!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg',
                                                    title: 'Analytics & Reports',
                                                    placement: 'right',
                                                    children: _jsx(Link, {
                                                        className:
                                                            'flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200',
                                                        to: '/analytics',
                                                        children: _jsxs('svg', {
                                                            xmlns: 'http://www.w3.org/2000/svg',
                                                            width: '20',
                                                            height: '20',
                                                            viewBox:
                                                                '0 0 24 24',
                                                            fill: 'none',
                                                            stroke: 'currentColor',
                                                            strokeWidth: '2',
                                                            strokeLinecap:
                                                                'round',
                                                            strokeLinejoin:
                                                                'round',
                                                            className:
                                                                'lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined',
                                                            children: [
                                                                _jsx('path', {
                                                                    d: 'M12 16v5',
                                                                }),
                                                                _jsx('path', {
                                                                    d: 'M16 14v7',
                                                                }),
                                                                _jsx('path', {
                                                                    d: 'M20 10v11',
                                                                }),
                                                                _jsx('path', {
                                                                    d: 'm22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15',
                                                                }),
                                                                _jsx('path', {
                                                                    d: 'M4 18v3',
                                                                }),
                                                                _jsx('path', {
                                                                    d: 'M8 14v7',
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                }),
                                            }),
                                            _jsx('li', {
                                                children: _jsx(Tooltip, {
                                                    className:
                                                        '!bg-white border dark:border-gray-700 border-gray-300 dark:!bg-gray-900 !text-gray-800 dark:!text-gray-200 !shadow-lg rounded-lg',
                                                    title: 'System Settings',
                                                    placement: 'right',
                                                    children: _jsx(Link, {
                                                        className:
                                                            'flex items-center justify-center size-10 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700  hover:text-gray-900 dark:hover:text-white   rounded-lg transition-colors duration-200',
                                                        to: '/dashboard/settings/company-settings/company-info',
                                                        children: _jsx(
                                                            Settings,
                                                            { size: 20 }
                                                        ),
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                }),
                                _jsxs('div', {
                                    className: 'hidden md:relative md:block',
                                    ref: menuRef,
                                    children: [
                                        _jsxs('div', {
                                            className:
                                                'flex items-center space-x-2',
                                            children: [
                                                _jsxs('button', {
                                                    onClick: () =>
                                                        setMenu(!menu),
                                                    type: 'button',
                                                    className:
                                                        'overflow-hidden rounded-full border border-gray-300 shadow-inner hover:border-gray-200 transition-colors duration-200',
                                                    children: [
                                                        _jsx('span', {
                                                            className:
                                                                'sr-only',
                                                            children:
                                                                'Toggle dashboard menu',
                                                        }),
                                                        _jsx('img', {
                                                            src: workspace?.image,
                                                            alt: 'User Avatar',
                                                            className:
                                                                'size-10 p-2 object-cover ',
                                                        }),
                                                    ],
                                                }),
                                                _jsx(ThemeToggle, {}),
                                            ],
                                        }),
                                        menu &&
                                            _jsxs('div', {
                                                className:
                                                    'absolute end-0 z-10 mt-1 w-56 divide-y divide-gray-700 rounded-md border border-gray-800 bg-gray-900 shadow-lg',
                                                role: 'menu',
                                                children: [
                                                    _jsxs('div', {
                                                        className: 'p-2',
                                                        children: [
                                                            _jsx('a', {
                                                                href: '#',
                                                                className:
                                                                    'block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-100',
                                                                role: 'menuitem',
                                                                children:
                                                                    'My profile',
                                                            }),
                                                            _jsx('a', {
                                                                href: '#',
                                                                className:
                                                                    'block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-100',
                                                                role: 'menuitem',
                                                                children:
                                                                    'Billing summary',
                                                            }),
                                                            _jsx('a', {
                                                                href: '#',
                                                                className:
                                                                    'block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-800 hover:text-gray-100',
                                                                role: 'menuitem',
                                                                children:
                                                                    'Team settings',
                                                            }),
                                                        ],
                                                    }),
                                                    _jsx('div', {
                                                        className: 'p-2',
                                                        children: _jsxs(
                                                            'button',
                                                            {
                                                                className:
                                                                    'flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-800 hover:text-gray-100',
                                                                role: 'menuitem',
                                                                children: [
                                                                    _jsx(
                                                                        'svg',
                                                                        {
                                                                            xmlns: 'http://www.w3.org/2000/svg',
                                                                            fill: 'none',
                                                                            viewBox:
                                                                                '0 0 24 24',
                                                                            strokeWidth:
                                                                                '1.5',
                                                                            stroke: 'currentColor',
                                                                            className:
                                                                                'size-4',
                                                                            children:
                                                                                _jsx(
                                                                                    'path',
                                                                                    {
                                                                                        strokeLinecap:
                                                                                            'round',
                                                                                        strokeLinejoin:
                                                                                            'round',
                                                                                        d: 'M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3',
                                                                                    }
                                                                                ),
                                                                        }
                                                                    ),
                                                                    'Logout',
                                                                ],
                                                            }
                                                        ),
                                                    }),
                                                ],
                                            }),
                                    ],
                                }),
                                _jsx('div', {
                                    className: 'block md:hidden',
                                    children: _jsx('button', {
                                        className:
                                            'rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75',
                                        children: _jsx('svg', {
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            className: 'size-5',
                                            fill: 'none',
                                            viewBox: '0 0 24 24',
                                            stroke: 'currentColor',
                                            strokeWidth: '2',
                                            children: _jsx('path', {
                                                strokeLinecap: 'round',
                                                strokeLinejoin: 'round',
                                                d: 'M4 6h16M4 12h16M4 18h16',
                                            }),
                                        }),
                                    }),
                                }),
                            ],
                        }),
                    ],
                }),
            }),
            _jsx(Modal, {
                title: 'Calculator',
                open: is_calculator_modal_visible,
                onOk: () => set_is_calculator_modal_visible(false),
                onCancel: () => set_is_calculator_modal_visible(false),
                footer: null,
                children: _jsx(Calculator_app, {}),
            }),
        ],
    });
};
export default Header;
