import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import ThemeToggle from '../../../../Hooks/ThemeToggle';
import { Link } from 'react-router-dom';
import {
    Bell,
    LayoutDashboard,
    LogOut,
    LogOutIcon,
    Settings,
    User,
} from 'lucide-react';
import logoDark from '../../../../assets/logo/white_logo.webp';
import logoLight from '../../../../assets/logo/logo.webp';
import { Erp_context } from '@/provider/ErpContext';
const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
];
const HomeNav = () => {
    const [visible, setVisible] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [show, setShow] = useState(false);
    const { user, workspace, setUser, set_workspace } = useContext(Erp_context);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = event => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleLogout = () => {
        setIsOpen(false);
    };
    const toggleDropdown = () => setIsOpen(!isOpen);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 180) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const theme = localStorage.getItem('theme');
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
            setUser(null);
            set_workspace(null);
            navigate('/');
        } catch (err) {
            console.error('Failed to sign out:', err);
        }
    };
    return _jsxs('div', {
        children: [
            _jsx('header', {
                className: `w-full ${theme === 'dark' ? ' ' : ''} bg-light dark:bg-light-dark text-dark dark:text-light border-b border-gray fixed top-0 left-0 z-50  border-gray-200 dark:border-gray-800 transition-shadow duration-300 ${scrolling ? 'shadow-md ' : ''}`,
                children: _jsx('div', {
                    className: 'px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl',
                    children: _jsxs('nav', {
                        className:
                            'relative flex items-center justify-between h-16 lg:h-20',
                        children: [
                            _jsxs('div', {
                                className: '',
                                children: [
                                    _jsx('div', {
                                        className:
                                            'flex-shrink-0  dark:block hidden',
                                        children: _jsx(Link, {
                                            to: '/',
                                            className: 'flex',
                                            children: _jsx('img', {
                                                className: 'w-[140px] ',
                                                src: logoLight,
                                                alt: '',
                                            }),
                                        }),
                                    }),
                                    _jsx('div', {
                                        className:
                                            'flex-shrink-0 dark:hidden block',
                                        children: _jsx(Link, {
                                            to: '/',
                                            className: 'flex',
                                            children: _jsx('img', {
                                                className: 'w-[140px] ',
                                                src: logoDark,
                                                alt: '',
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className:
                                    'lg:hidden flex gap-2 items-center ml-auto',
                                children: [
                                    !user &&
                                        _jsx(NavLink, {
                                            to: `/sign-in`,
                                            className: ({ isActive }) =>
                                                `text-base font-medium py-2 px-6 rounded-lg ${
                                                    isActive
                                                        ? 'bg-primary text-blue-500 dark:text-light'
                                                        : 'bg-primary text-white dark:text-gray-300'
                                                }`,
                                            children: 'Sign in',
                                        }),
                                    _jsx(ThemeToggle, {}),
                                    user &&
                                        _jsxs('div', {
                                            className: 'relative',
                                            children: [
                                                _jsx('button', {
                                                    onClick: toggleDropdown,
                                                    title: '',
                                                    className:
                                                        'flex items-center justify-center overflow-hidden w-[35px] h-[35px] text-white  rounded-full',
                                                    children: _jsx('img', {
                                                        src: workspace?.image,
                                                        alt: 'logo',
                                                        className:
                                                            'w-full h-full',
                                                    }),
                                                }),
                                                show &&
                                                    _jsx('div', {
                                                        className:
                                                            'absolute right-2 top-[50px] w-[250px] p-2 bg-light shadow dark:bg-light-dark dark:text-light text-gray-600 border border-gray-900 dark:border-gray-600 rounded',
                                                        children: _jsxs('ul', {
                                                            className:
                                                                'space-y-3',
                                                            children: [
                                                                _jsx('li', {
                                                                    className:
                                                                        '',
                                                                    children:
                                                                        _jsx(
                                                                            Link,
                                                                            {
                                                                                to: '/dashboard/settings/account-settings/profile-info',
                                                                                children:
                                                                                    _jsxs(
                                                                                        'p',
                                                                                        {
                                                                                            className:
                                                                                                'cursor-pointer hover:text-blue-500 flex items-center gap-2',
                                                                                            children:
                                                                                                [
                                                                                                    _jsx(
                                                                                                        User,
                                                                                                        {
                                                                                                            className:
                                                                                                                'text-lg',
                                                                                                        }
                                                                                                    ),
                                                                                                    ' ',
                                                                                                    'Profile',
                                                                                                    ' ',
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                }),
                                                                _jsx('li', {
                                                                    className:
                                                                        '',
                                                                    children:
                                                                        _jsx(
                                                                            Link,
                                                                            {
                                                                                to: '/dashboard',
                                                                                children:
                                                                                    _jsxs(
                                                                                        'p',
                                                                                        {
                                                                                            className:
                                                                                                'cursor-pointer hover:text-blue-500 flex items-center gap-2',
                                                                                            children:
                                                                                                [
                                                                                                    _jsx(
                                                                                                        DashboardOutlined,
                                                                                                        {
                                                                                                            className:
                                                                                                                'text-xl',
                                                                                                        }
                                                                                                    ),
                                                                                                    ' ',
                                                                                                    'Dashboard',
                                                                                                    ' ',
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                }),
                                                                _jsx('li', {
                                                                    className:
                                                                        '',
                                                                    children:
                                                                        _jsx(
                                                                            'button',
                                                                            {
                                                                                onClick:
                                                                                    handleSignOut,
                                                                                className:
                                                                                    'bg-[#ad233af5] text-white rounded w-full py-1 px-2',
                                                                                children:
                                                                                    _jsxs(
                                                                                        'p',
                                                                                        {
                                                                                            className:
                                                                                                'cursor-pointer justify-center flex items-center gap-2',
                                                                                            children:
                                                                                                [
                                                                                                    _jsx(
                                                                                                        LogOutIcon,
                                                                                                        {
                                                                                                            className:
                                                                                                                'text-sm',
                                                                                                        }
                                                                                                    ),
                                                                                                    ' ',
                                                                                                    'Logout',
                                                                                                    ' ',
                                                                                                ],
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                            ],
                                        }),
                                    _jsx(Button, {
                                        type: 'primary',
                                        shape: 'circle',
                                        icon: _jsx(MenuOutlined, {}),
                                        onClick: showDrawer,
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className:
                                    'hidden lg:flex lg:items-center lg:space-x-2',
                                children: [
                                    navLinks?.map(link =>
                                        _jsx(
                                            NavLink,
                                            {
                                                to: link.path,
                                                className: ({ isActive }) =>
                                                    `text-base font-medium ${
                                                        isActive
                                                            ? 'text-blue-500 dark:'
                                                            : 'text-dark dark:text-light'
                                                    } px-2`,
                                                children: link.name,
                                            },
                                            link.name
                                        )
                                    ),
                                    !user &&
                                        _jsx(NavLink, {
                                            to: '/sign-in',
                                            className: ({ isActive }) =>
                                                `text-base font-medium py-2 px-6 rounded-lg transition-colors duration-300 ${
                                                    isActive
                                                        ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white' // active → background blue, text white
                                                        : 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white hover:bg-blue-500 dark:hover:bg-blue-500' // inactive → background blue, hover slightly lighter blue
                                                }`,
                                            children: 'Sign in',
                                        }),
                                    _jsx(ThemeToggle, {}),
                                    user &&
                                        _jsxs('div', {
                                            className: 'relative',
                                            ref: dropdownRef,
                                            children: [
                                                _jsx('button', {
                                                    onClick: toggleDropdown,
                                                    children: _jsxs('div', {
                                                        className: 'relative',
                                                        children: [
                                                            _jsx('div', {
                                                                className:
                                                                    'size-9 mt-1 p-1 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-700 shadow-lg group-hover:ring-blue-300 dark:group-hover:ring-blue-500 transition-all duration-300',
                                                                children:
                                                                    workspace?.image ||
                                                                    user?.image
                                                                        ? _jsx(
                                                                              'img',
                                                                              {
                                                                                  src:
                                                                                      workspace?.image ||
                                                                                      user?.image,
                                                                                  alt:
                                                                                      user?.name ||
                                                                                      'User',
                                                                                  className:
                                                                                      'w-full h-full object-cover',
                                                                              }
                                                                          )
                                                                        : _jsx(
                                                                              'div',
                                                                              {
                                                                                  className:
                                                                                      'w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg',
                                                                                  children:
                                                                                      user?.name
                                                                                          ?.charAt(
                                                                                              0
                                                                                          )
                                                                                          ?.toUpperCase() ||
                                                                                      'U',
                                                                              }
                                                                          ),
                                                            }),
                                                            _jsx('div', {
                                                                className:
                                                                    'absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsxs('div', {
                                                    className: `absolute right-0 top-14 mt-2 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-b-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 transform origin-top-right ${
                                                        isOpen
                                                            ? 'opacity-100 scale-100 translate-y-0'
                                                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                                    }`,
                                                    children: [
                                                        _jsx('div', {
                                                            className:
                                                                'p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 border-b border-gray-200/50 dark:border-gray-700/50',
                                                            children: _jsxs(
                                                                'div',
                                                                {
                                                                    className:
                                                                        'flex items-center space-x-4',
                                                                    children: [
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'relative',
                                                                                children:
                                                                                    [
                                                                                        _jsx(
                                                                                            'div',
                                                                                            {
                                                                                                className:
                                                                                                    'w-14 h-14 rounded-full overflow-hidden ring-3 ring-white dark:ring-gray-700 shadow-lg',
                                                                                                children:
                                                                                                    workspace?.image ||
                                                                                                    user?.image
                                                                                                        ? _jsx(
                                                                                                              'img',
                                                                                                              {
                                                                                                                  src:
                                                                                                                      workspace?.image ||
                                                                                                                      user?.image,
                                                                                                                  alt:
                                                                                                                      user?.name ||
                                                                                                                      'User',
                                                                                                                  className:
                                                                                                                      'w-full h-full object-cover',
                                                                                                              }
                                                                                                          )
                                                                                                        : _jsx(
                                                                                                              'div',
                                                                                                              {
                                                                                                                  className:
                                                                                                                      'w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl',
                                                                                                                  children:
                                                                                                                      user?.name
                                                                                                                          ?.charAt(
                                                                                                                              0
                                                                                                                          )
                                                                                                                          ?.toUpperCase() ||
                                                                                                                      'U',
                                                                                                              }
                                                                                                          ),
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'div',
                                                                                            {
                                                                                                className:
                                                                                                    'absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm',
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex-1 min-w-0',
                                                                                children:
                                                                                    [
                                                                                        _jsx(
                                                                                            'h3',
                                                                                            {
                                                                                                className:
                                                                                                    'text-lg font-semibold text-gray-900 dark:text-gray-100 truncate',
                                                                                                children:
                                                                                                    user?.name ||
                                                                                                    'User Name',
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'text-sm text-gray-500 dark:text-gray-400 truncate',
                                                                                                children:
                                                                                                    user?.email ||
                                                                                                    'user@example.com',
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'div',
                                                                                            {
                                                                                                className:
                                                                                                    'mt-1',
                                                                                                children:
                                                                                                    _jsx(
                                                                                                        'span',
                                                                                                        {
                                                                                                            className:
                                                                                                                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200',
                                                                                                            children:
                                                                                                                '\u2728 Pro Plan',
                                                                                                        }
                                                                                                    ),
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }
                                                            ),
                                                        }),
                                                        _jsxs('div', {
                                                            className: 'p-2',
                                                            children: [
                                                                _jsxs(Link, {
                                                                    to: '/dashboard/settings/account-settings/profile-info',
                                                                    onClick:
                                                                        () =>
                                                                            setIsOpen(
                                                                                false
                                                                            ),
                                                                    className:
                                                                        'group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950/30 dark:hover:to-blue-900/30 transition-all duration-200',
                                                                    children: [
                                                                        _jsx(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 group-hover:scale-110 transition-all duration-200',
                                                                                children:
                                                                                    _jsx(
                                                                                        User,
                                                                                        {
                                                                                            className:
                                                                                                'w-5 h-5 text-blue-600 dark:text-blue-400',
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex-1',
                                                                                children:
                                                                                    [
                                                                                        _jsx(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'font-medium text-gray-900 dark:text-gray-100',
                                                                                                children:
                                                                                                    'Profile Settings',
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'text-xs text-gray-500 dark:text-gray-400',
                                                                                                children:
                                                                                                    'Manage your account',
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                _jsxs(Link, {
                                                                    to: '/dashboard',
                                                                    onClick:
                                                                        () =>
                                                                            setIsOpen(
                                                                                false
                                                                            ),
                                                                    className:
                                                                        'group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/30 dark:hover:to-green-900/30 transition-all duration-200',
                                                                    children: [
                                                                        _jsx(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/50 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 group-hover:scale-110 transition-all duration-200',
                                                                                children:
                                                                                    _jsx(
                                                                                        LayoutDashboard,
                                                                                        {
                                                                                            className:
                                                                                                'w-5 h-5 text-green-600 dark:text-green-400',
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex-1',
                                                                                children:
                                                                                    [
                                                                                        _jsx(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'font-medium text-gray-900 dark:text-gray-100',
                                                                                                children:
                                                                                                    'Dashboard',
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'text-xs text-gray-500 dark:text-gray-400',
                                                                                                children:
                                                                                                    'View your analytics',
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                _jsxs(Link, {
                                                                    to: '/dashboard/settings/company-settings/company-info',
                                                                    onClick:
                                                                        () =>
                                                                            setIsOpen(
                                                                                false
                                                                            ),
                                                                    className:
                                                                        'group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-950/30 dark:hover:to-purple-900/30 transition-all duration-200',
                                                                    children: [
                                                                        _jsx(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 group-hover:scale-110 transition-all duration-200',
                                                                                children:
                                                                                    _jsx(
                                                                                        Settings,
                                                                                        {
                                                                                            className:
                                                                                                'w-5 h-5 text-purple-600 dark:text-purple-400',
                                                                                        }
                                                                                    ),
                                                                            }
                                                                        ),
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex-1',
                                                                                children:
                                                                                    [
                                                                                        _jsx(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'font-medium text-gray-900 dark:text-gray-100',
                                                                                                children:
                                                                                                    'Settings',
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'p',
                                                                                            {
                                                                                                className:
                                                                                                    'text-xs text-gray-500 dark:text-gray-400',
                                                                                                children:
                                                                                                    'Preferences & privacy',
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                _jsxs(Link, {
                                                                    to: '/notifications',
                                                                    onClick:
                                                                        () =>
                                                                            setIsOpen(
                                                                                false
                                                                            ),
                                                                    className:
                                                                        'group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-950/30 dark:hover:to-orange-900/30 transition-all duration-200',
                                                                    children: [
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/50 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 group-hover:scale-110 transition-all duration-200',
                                                                                children:
                                                                                    [
                                                                                        _jsx(
                                                                                            Bell,
                                                                                            {
                                                                                                className:
                                                                                                    'w-5 h-5 text-orange-600 dark:text-orange-400',
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'div',
                                                                                            {
                                                                                                className:
                                                                                                    'absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-pulse',
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'flex-1 flex items-center justify-between',
                                                                                children:
                                                                                    [
                                                                                        _jsxs(
                                                                                            'div',
                                                                                            {
                                                                                                children:
                                                                                                    [
                                                                                                        _jsx(
                                                                                                            'p',
                                                                                                            {
                                                                                                                className:
                                                                                                                    'font-medium text-gray-900 dark:text-gray-100',
                                                                                                                children:
                                                                                                                    'Notifications',
                                                                                                            }
                                                                                                        ),
                                                                                                        _jsx(
                                                                                                            'p',
                                                                                                            {
                                                                                                                className:
                                                                                                                    'text-xs text-gray-500 dark:text-gray-400',
                                                                                                                children:
                                                                                                                    '3 unread messages',
                                                                                                            }
                                                                                                        ),
                                                                                                    ],
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'span',
                                                                                            {
                                                                                                className:
                                                                                                    'inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full animate-bounce',
                                                                                                children:
                                                                                                    '3',
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                _jsx('div', {
                                                                    className:
                                                                        'my-2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent',
                                                                }),
                                                                _jsxs(
                                                                    'button',
                                                                    {
                                                                        onClick:
                                                                            handleSignOut,
                                                                        className:
                                                                            'group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-950/30 dark:hover:to-red-900/30 transition-all duration-200',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 group-hover:scale-110 transition-all duration-200',
                                                                                        children:
                                                                                            _jsx(
                                                                                                LogOut,
                                                                                                {
                                                                                                    className:
                                                                                                        'w-5 h-5 text-red-600 dark:text-red-400',
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                _jsxs(
                                                                                    'div',
                                                                                    {
                                                                                        className:
                                                                                            'flex-1',
                                                                                        children:
                                                                                            [
                                                                                                _jsx(
                                                                                                    'p',
                                                                                                    {
                                                                                                        className:
                                                                                                            'font-medium text-red-700 dark:text-red-400',
                                                                                                        children:
                                                                                                            'Sign Out',
                                                                                                    }
                                                                                                ),
                                                                                                _jsx(
                                                                                                    'p',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-xs text-red-500 dark:text-red-500',
                                                                                                        children:
                                                                                                            'End your session',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    }
                                                                ),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                ],
                            }),
                        ],
                    }),
                }),
            }),
            _jsx(Drawer, {
                className: 'dark:!bg-dark dark:!text-light',
                title: 'Menu',
                placement: 'left',
                onClose: onClose,
                open: visible,
                children: _jsx('div', {
                    className: 'flex flex-col space-y-2',
                    children: navLinks.map(link =>
                        _jsx(
                            NavLink,
                            {
                                to: link.path,
                                className: ({ isActive }) =>
                                    `py-2 text-base font-medium ${
                                        isActive
                                            ? 'text-blue-600'
                                            : 'dark:!text-light text-black'
                                    } transition-all duration-200`,
                                onClick: onClose,
                                children: link.name,
                            },
                            link.name
                        )
                    ),
                }),
            }),
        ],
    });
};
export default HomeNav;
