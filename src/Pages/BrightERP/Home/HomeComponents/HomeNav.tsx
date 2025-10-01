import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import ThemeToggle from '../../../../Hooks/ThemeToggle';
import { Link } from 'react-router-dom';
import {
    Bell,
    ChevronDown,
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

const HomeNav: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [show, setShow] = useState(false);
    const { user, workspace, setUser, set_workspace } = useContext(Erp_context);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
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

    return (
        <div>
            <header
                className={`w-full ${
                    theme === 'dark' ? ' ' : ''
                } bg-light dark:bg-light-dark text-dark dark:text-light border-b border-gray fixed top-0 left-0 z-50  border-gray-200 dark:border-gray-800 transition-shadow duration-300 ${
                    scrolling ? 'shadow-md ' : ''
                }`}
            >
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <nav className="relative flex items-center justify-between h-16 lg:h-20">
                        <div className="">
                            <div className="flex-shrink-0  dark:block hidden">
                                <Link
                                    to="/"
                                    className="flex"
                                >
                                    <img
                                        className="w-[140px] "
                                        src={logoLight}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="flex-shrink-0 dark:hidden block">
                                <Link
                                    to="/"
                                    className="flex"
                                >
                                    <img
                                        className="w-[140px] "
                                        src={logoDark}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="lg:hidden flex gap-2 items-center ml-auto">
                            {!user && (
                                <NavLink
                                    to={`/sign-in`}
                                    className={({ isActive }) =>
                                        `text-base !text-white font-medium ${
                                            isActive
                                                ? 'text-blue-500 dark:!text-light'
                                                : 'text-light dark:text-light'
                                        } bg-primary  py-2 px-6 rounded-lg`
                                    }
                                >
                                    Sign in
                                </NavLink>
                            )}
                            <ThemeToggle />

                            {user && (
                                <div className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        title=""
                                        className="flex items-center justify-center overflow-hidden w-[35px] h-[35px] text-white  rounded-full"
                                    >
                                        <img
                                            src={workspace?.image}
                                            alt="logo"
                                            className="w-full h-full"
                                        />
                                    </button>

                                    {show && (
                                        <div className="absolute right-2 top-[50px] w-[250px] p-2 bg-light shadow dark:bg-light-dark dark:text-light text-gray-600 border border-gray-900 dark:border-gray-600 rounded">
                                            <ul className="space-y-3">
                                                <li className="">
                                                    <Link to="/dashboard/settings/account-settings/profile-info">
                                                        <p className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
                                                            <User className="text-lg" />{' '}
                                                            Profile{' '}
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="">
                                                    <Link to="/dashboard">
                                                        <p className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
                                                            <DashboardOutlined className="text-xl" />{' '}
                                                            Dashboard{' '}
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="">
                                                    <button
                                                        onClick={handleSignOut}
                                                        className="bg-[#ad233af5] text-white rounded w-full py-1 px-2"
                                                    >
                                                        <p className="cursor-pointer justify-center flex items-center gap-2">
                                                            <LogOutIcon className="text-sm" />{' '}
                                                            Logout{' '}
                                                        </p>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<MenuOutlined />}
                                onClick={showDrawer}
                            />
                        </div>

                        <div className="hidden lg:flex lg:items-center lg:space-x-2">
                            {navLinks?.map(link => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-base font-medium ${
                                            isActive
                                                ? 'text-blue-500 dark:'
                                                : 'text-dark dark:text-light'
                                        } px-2`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            {!user && (
                                <NavLink
                                    to={`/sign-in`}
                                    className={({ isActive }) =>
                                        `text-base font-medium ${
                                            isActive
                                                ? ' text-light'
                                                : 'text-light dark:text-light'
                                        } bg-primary  py-2 px-6 rounded-lg`
                                    }
                                >
                                    Sign in
                                </NavLink>
                            )}

                            <ThemeToggle />
                            {user && (
                                <div
                                    className="relative"
                                    ref={dropdownRef}
                                >
                                    {/* Profile Button */}
                                    <button
                                        onClick={toggleDropdown}
                                        // className="group relative flex items-center space-x-2 p-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md"
                                    >
                                        {/* Avatar */}
                                        <div className="relative">
                                            <div className="size-9 mt-1 p-1 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-700 shadow-lg group-hover:ring-blue-300 dark:group-hover:ring-blue-500 transition-all duration-300">
                                                {workspace?.image ||
                                                user?.image ? (
                                                    <img
                                                        src={
                                                            workspace?.image ||
                                                            user?.image
                                                        }
                                                        alt={
                                                            user?.name || 'User'
                                                        }
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                                                        {user?.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            'U'}
                                                    </div>
                                                )}
                                            </div>
                                            {/* Online Status */}
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse" />
                                        </div>

                                        {/* Chevron Icon */}
                                        {/* <ChevronDown
                                                                  className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                                        }`}
                                                            /> */}
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div
                                        className={`absolute right-0 top-14 mt-2 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-b-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 transform origin-top-right ${
                                            isOpen
                                                ? 'opacity-100 scale-100 translate-y-0'
                                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                        }`}
                                    >
                                        {/* User Info Header */}
                                        <div className="p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 border-b border-gray-200/50 dark:border-gray-700/50">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <div className="w-14 h-14 rounded-full overflow-hidden ring-3 ring-white dark:ring-gray-700 shadow-lg">
                                                        {workspace?.image ||
                                                        user?.image ? (
                                                            <img
                                                                src={
                                                                    workspace?.image ||
                                                                    user?.image
                                                                }
                                                                alt={
                                                                    user?.name ||
                                                                    'User'
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                                                                {user?.name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() ||
                                                                    'U'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                                        {user?.name ||
                                                            'User Name'}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                        {user?.email ||
                                                            'user@example.com'}
                                                    </p>
                                                    <div className="mt-1">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200">
                                                            ✨ Pro Plan
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="p-2">
                                            {/* Profile */}
                                            <Link
                                                to="/dashboard/settings/account-settings/profile-info"
                                                onClick={() => setIsOpen(false)}
                                                className="group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950/30 dark:hover:to-blue-900/30 transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 group-hover:scale-110 transition-all duration-200">
                                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        Profile Settings
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Manage your account
                                                    </p>
                                                </div>
                                            </Link>

                                            {/* Dashboard */}
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setIsOpen(false)}
                                                className="group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-950/30 dark:hover:to-green-900/30 transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/50 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 group-hover:scale-110 transition-all duration-200">
                                                    <LayoutDashboard className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        Dashboard
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        View your analytics
                                                    </p>
                                                </div>
                                            </Link>

                                            {/* Settings */}
                                            <Link
                                                to="/dashboard/settings/company-settings/company-info"
                                                onClick={() => setIsOpen(false)}
                                                className="group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-950/30 dark:hover:to-purple-900/30 transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 group-hover:scale-110 transition-all duration-200">
                                                    <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        Settings
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Preferences & privacy
                                                    </p>
                                                </div>
                                            </Link>

                                            {/* Notifications */}
                                            <Link
                                                to="/notifications"
                                                onClick={() => setIsOpen(false)}
                                                className="group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-950/30 dark:hover:to-orange-900/30 transition-all duration-200"
                                            >
                                                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/50 group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 group-hover:scale-110 transition-all duration-200">
                                                    <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-pulse" />
                                                </div>
                                                <div className="flex-1 flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                                            Notifications
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            3 unread messages
                                                        </p>
                                                    </div>
                                                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full animate-bounce">
                                                        3
                                                    </span>
                                                </div>
                                            </Link>

                                            {/* Divider */}
                                            <div className="my-2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

                                            {/* Logout */}
                                            <button
                                                onClick={handleSignOut}
                                                className="group flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-950/30 dark:hover:to-red-900/30 transition-all duration-200"
                                            >
                                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 group-hover:bg-red-200 dark:group-hover:bg-red-800/50 group-hover:scale-110 transition-all duration-200">
                                                    <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-red-700 dark:text-red-400">
                                                        Sign Out
                                                    </p>
                                                    <p className="text-xs text-red-500 dark:text-red-500">
                                                        End your session
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            <Drawer
                className="dark:!bg-dark dark:!text-light"
                title="Menu"
                placement="left"
                onClose={onClose}
                open={visible}
            >
                <div className="flex flex-col space-y-2">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `py-2 text-base font-medium ${
                                    isActive
                                        ? 'text-blue-600'
                                        : 'dark:!text-light text-black'
                                } transition-all duration-200`
                            }
                            onClick={onClose}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

export default HomeNav;
