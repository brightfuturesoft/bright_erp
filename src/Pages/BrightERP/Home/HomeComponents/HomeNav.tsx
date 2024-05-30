import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import ThemeToggle from '../../../../Hooks/ThemeToggle';
import { Link } from 'react-router-dom';
import { LogOutIcon, User } from 'lucide-react';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Sign up', path: '/signup' },
    { name: 'Sign in', path: '/signin' },
];

const HomeNav = () => {
    const [visible, setVisible] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [show, setShow] = useState(false);

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

    return (
        <div>
            <header className={`w-full bg-light dark:bg-light-dark text-dark dark:text-light border-b border-gray fixed top-0 left-0 z-50  border-gray-200 dark:border-gray-800 transition-shadow duration-300 ${scrolling ? 'shadow-md ' : ''}`}>
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between h-16 lg:h-20">
                        <div className="">
                            <div className="flex-shrink-0">
                                <NavLink to="/" className="flex">
                                    <img
                                        className="w-auto h-8 lg:h-10"
                                        src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                                        alt=""
                                    />
                                </NavLink>
                            </div>
                        </div>

                        <div className="lg:hidden flex gap-2 items-center ml-auto">
                            <ThemeToggle />
                            <Button type="primary" shape="circle" icon={<MenuOutlined />} onClick={showDrawer} />

                        </div>

                        <div className="hidden lg:flex lg:items-center lg:space-x-2">
                            {navLinks?.map(link => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-base font-medium ${isActive ? 'text-blue-500 dark:' : 'text-dark dark:text-light'} px-2`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <ThemeToggle />
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    title=""
                                    className="flex items-center justify-center overflow-hidden w-[44px] h-[44px] text-white  rounded-full">
                                    <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="logo" className="w-full h-full" />
                                </button>

                                {show &&
                                    <div className="absolute right-2 top-[50px] w-[250px] p-2 bg-light shadow dark:bg-light-dark dark:text-light text-gray-600 border border-gray-900 dark:border-gray-600 rounded">
                                        <ul className='space-y-3'>
                                            <li className=''>
                                                <Link to="/profile">
                                                    <p className="cursor-pointer hover:text-blue-500 flex items-center gap-2"><User className='text-lg' /> Profile </p>
                                                </Link>
                                            </li>
                                            <li className=''>
                                                <Link to="/dashboard">
                                                    <p className="cursor-pointer hover:text-blue-500 flex items-center gap-2"><DashboardOutlined className='text-xl' /> Dashboard </p>
                                                </Link>
                                            </li>
                                            <li className=''>
                                                <button className='bg-[#ad233af5] text-white rounded w-full py-1 px-2'>
                                                    <p className="cursor-pointer justify-center flex items-center gap-2"><LogOutIcon className='text-sm' /> Logout </p>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>}
                            </div>

                        </div>
                    </nav>
                </div>
            </header>

            <Drawer title="Menu" placement="left" onClose={onClose} visible={visible}>
                <div className="flex flex-col space-y-2">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `py-2 text-base font-medium ${isActive ? 'text-blue-600' : 'text-black'} transition-all duration-200`
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
