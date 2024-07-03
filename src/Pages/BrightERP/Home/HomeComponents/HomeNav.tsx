import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import ThemeToggle from '../../../../Hooks/ThemeToggle';
import { Link } from 'react-router-dom';
import { LogOutIcon, User } from 'lucide-react';
import logoDark from '../../../../assets/logoDark.png';
import logoLight from '../../../../assets/logoLight.png';
const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
];

const HomeNav: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(true);

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

    const toggleDropdown = () => {
        setShow(!show);
    };
    const theme = localStorage.getItem('theme');
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
                                    to={`/signin`}
                                    className={({ isActive }) =>
                                        `text-base font-medium ${
                                            isActive
                                                ? 'text-blue-500 dark:'
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
                                            src="https://randomuser.me/api/portraits/men/85.jpg"
                                            alt="logo"
                                            className="w-full h-full"
                                        />
                                    </button>

                                    {show && (
                                        <div className="absolute right-2 top-[50px] w-[250px] p-2 bg-light shadow dark:bg-light-dark dark:text-light text-gray-600 border border-gray-900 dark:border-gray-600 rounded">
                                            <ul className="space-y-3">
                                                <li className="">
                                                    <Link to="/profile">
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
                                                    <button className="bg-[#ad233af5] text-white rounded w-full py-1 px-2">
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
                                    to={`/signin`}
                                    className={({ isActive }) =>
                                        `text-base font-medium ${
                                            isActive
                                                ? 'text-blue-500 dark:'
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
                                        className="flex items-center justify-center overflow-hidden w-[40px] h-[40px] text-white  rounded-full"
                                    >
                                        <img
                                            src="https://randomuser.me/api/portraits/men/85.jpg"
                                            alt="logo"
                                            className="w-full h-full"
                                        />
                                    </button>

                                    {show && (
                                        <div className="absolute right-2 top-[50px] w-[250px] p-2 bg-light shadow dark:bg-light-dark dark:text-light text-gray-600 border border-gray-900 dark:border-gray-600 rounded">
                                            <ul className="space-y-3">
                                                <li className="">
                                                    <Link to="/profile">
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
                                                    <button className="bg-[#ad233af5] text-white rounded w-full py-1 px-2">
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
