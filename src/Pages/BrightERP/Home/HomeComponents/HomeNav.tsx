import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';
import ThemeToggle from '../../../../Hooks/ThemeToggle';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Resources', path: '/resources' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Sign up', path: '/signup' },
    { name: 'Sign in', path: '/signin' },
];

const HomeNav: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [scrolling, setScrolling] = useState(false);

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

    return (
        <div>
            <header className={`w-full bg-light dark:bg-light-dark text-dark dark:text-light border-b border-gray fixed top-0 left-0 z-50  border-gray-200 dark:border-gray-800 transition-shadow duration-300 ${scrolling ? 'shadow-md ' : ''}`}>
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between h-16 lg:h-20">
                        <div className="hidden lg:flex lg:items-center lg:space-x-10">
                            {navLinks.slice(0, 4).map(link => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-base font-medium ${isActive ? 'text-blue-500 dark:' : 'text-dark dark:text-light'}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
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
                            {navLinks.slice(4, 6).map(link => (
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


                            <a
                                href="#"
                                title=""
                                className="flex items-center justify-center overflow-hidden w-[42px] h-[42px] text-white bg-black rounded-full">
                                <img
                                    src="https://lh3.googleusercontent.com/a-/ALV-UjV-in5uJ3wBWAJlDbqsn-wgcubO1hhJ4XxrwQEZSUjCfhHx07o9hXLHB_dJG4qQNYMwFitdhJgv0aKUNg6tEkNM6uW_8BBXHvXCbFdxHLoh46WwOvjNDqNxk-5AS2XScGov4Fkytod4zWFGpPn-RZK3yInPHN58BnS036D7N5xqZWTOWCKM0IghYyoa7B_j0CTWBnHHn8rA6_OZlwaUs0EFA30UoH17ItichMiFUZjbko8eCw5cAwtLUO_BKcSCfUQ1HY_XM6p6HJavJGwafZorvtlWsmK_4HRhQArLY-7RK89a6b9UepxG9CQeP9l1OISW069Xrw8qG2T8Ux7JiWabsc7Rtyoi-xd9421ybAkBZS2kzMO4oxMImrMJC9VxBR1XCnnE2VVokx3A_hd8RISnRmh-PCtoFRgKQ8RjX1swB5uiiySqlbWATjVgeUkDVF-_LsTZcIIdaS7rOKjd_3gCsDcjQrZwowWJU2uvjiQlGRmI8MuC7YELyzKAPILmXTnkE5wvZvwIXARiYqxInKsS15FSk6yYr_njHxAncn8weCJ6F5wEq8b9QITRkH3Ubw-ZNcgvyA4HB6A-XNDlBdw1wSu6_ec4MtJIuA7JD5tktsjNjKU5gCZkg4TF91GZRV9VmG9Dq_tiZzTQXi3PaTdn6rWkRxZZUqFuQOgiW9GZrp4X0b-qT5Z843EB7F_5WXzeWUCLkoyNhYCbffazjBr31vVdvdeUn73QtYd0HwsUXUEuZIQhRotTpC1Xuz2xNdyYFppwHKmFnLIePMeRM1YFdpINzK1tdC-YQ0ZHSmGmKsi_zlzahiT3a3zXX2aJfEDOZFWlrE7ulO2w9fyvU08u2A4aj4KDfT9GLBlNSLCQRKQYvzi9_weQfl2MZ0W16DZtdXWh86LsSFvmPiITJ4EGwqiRmZye5sFzP_lN2Qkt5iE3yq9_oIwzigpe_p_IwLl8CTlfIWEXMKhnRJBxbXgA=s360-c-no"
                                    alt=""
                                    className="object-cover"
                                />
                            </a>
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



