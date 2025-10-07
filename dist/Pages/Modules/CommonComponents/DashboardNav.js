import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { AlignJustify, ShoppingBasket } from 'lucide-react';
import ThemeToggle from '../../../Hooks/ThemeToggle';
import logoDark from '../../../assets/logo/logo.webp';
import logoLight from '../../../assets/logo/white_logo.webp';
import { useContext } from 'react';
import { Erp_context } from '@/provider/ErpContext';
const Dashboardnav = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter(path => path !== '');
    const { workspace } = useContext(Erp_context);
    function convertToTitleCase(str) {
        return str
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    const navigate = useNavigate();
    return _jsxs('nav', {
        className: `dark:bg-dark h-[75px] sticky top-0  w-full dark:border-gray-800 bg-light border-gray-200 border-b duration-300 flex items-center  !z-[700]`,
        children: [
            _jsxs('div', {
                children: [
                    _jsxs('div', {
                        className: 'block md:hidden',
                        children: [
                            _jsx('div', {
                                className: 'dark:block flex-shrink-0 hidden',
                                children: _jsx(Link, {
                                    to: '/',
                                    className: 'flex',
                                    children: _jsx('img', {
                                        className: 'w-[140px]',
                                        src: logoLight,
                                        alt: 'Logo Light',
                                    }),
                                }),
                            }),
                            _jsx('div', {
                                className: 'block flex-shrink-0 dark:hidden',
                                children: _jsx(Link, {
                                    to: '/',
                                    className: 'flex',
                                    children: _jsx('img', {
                                        className: 'w-[140px]',
                                        src: logoDark,
                                        alt: 'Logo Dark',
                                    }),
                                }),
                            }),
                        ],
                    }),
                    _jsx('nav', {
                        'aria-label': 'breadcrumb',
                        className:
                            'md:block dark:border-gray-700 hidden px-2 rounded w-full text-black dark:text-gray-100',
                        children: _jsxs('ol', {
                            className: 'flex space-x-2 h-8',
                            children: [
                                _jsx('li', {
                                    children: _jsx(Button, {
                                        className:
                                            'dark:!bg-light-dark shadow-none !border-none !rounded !text-white',
                                        onClick: () => navigate(-1),
                                        type: 'primary',
                                        children: 'Back',
                                    }),
                                }),
                                _jsx('li', {
                                    className: 'flex items-center',
                                    children: _jsx(Link, {
                                        rel: 'noopener noreferrer',
                                        to: '/dashboard',
                                        title: 'Back to homepage',
                                        className: 'hover:underline',
                                        children: 'Home',
                                    }),
                                }),
                                paths
                                    .slice(1)
                                    .map((path, index) =>
                                        _jsxs(
                                            'li',
                                            {
                                                className:
                                                    'flex items-center space-x-2 whitespace-nowrap',
                                                children: [
                                                    _jsx('svg', {
                                                        xmlns: 'http://www.w3.org/2000/svg',
                                                        viewBox: '0 0 32 32',
                                                        'aria-hidden': 'true',
                                                        fill: 'currentColor',
                                                        className:
                                                            'mt-1 w-2 h-2 text-gray-600 transform fill-current rotate-90',
                                                        children: _jsx('path', {
                                                            d: 'M32 30.031h-32l16-28.061z',
                                                        }),
                                                    }),
                                                    _jsx(Link, {
                                                        rel: 'noopener noreferrer',
                                                        to: `/${paths.slice(0, index + 2).join('/')}`,
                                                        className:
                                                            'flex items-center px-1 hover:underline capitalize',
                                                        children:
                                                            convertToTitleCase(
                                                                path
                                                            ),
                                                    }),
                                                ],
                                            },
                                            index + path
                                        )
                                    ),
                            ],
                        }),
                    }),
                ],
            }),
            _jsxs('div', {
                className: 'flex justify-end items-center gap-2 mr-3 w-full',
                children: [
                    (() => {
                        const host =
                            workspace?.domain_info?.domain ||
                            workspace?.domain_info?.subdomain ||
                            '';
                        const externalUrl = host
                            ? host.startsWith('http')
                                ? host
                                : `https://${host}`
                            : undefined;
                        return _jsx('a', {
                            href: externalUrl || '#',
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            onClick: e => {
                                if (!externalUrl) e.preventDefault();
                            },
                            children: _jsx(Button, {
                                type: 'primary',
                                className:
                                    'md:flex items-center hidden hover:bg-dark dark:bg-light-dark shadow-none h-[40px]',
                                icon: _jsx(ShoppingBasket, {}),
                                children: 'Visit eCommerce',
                            }),
                        });
                    })(),
                    _jsx(ThemeToggle, {}),
                    _jsx('div', {
                        className: 'flex items-center md:hidden',
                        children: _jsx(Button, {
                            type: 'primary',
                            shape: 'circle',
                            size: 'large',
                            icon: _jsx(AlignJustify, { strokeWidth: 1 }),
                            onClick: () => setIsSidebarOpen(!isSidebarOpen),
                            className: `custom-icon-button dark:!text-light !text-dark shadow-none border-none hover:bg-transparent bg-[#ff000000] flex items-center justify-center text-xl`,
                        }),
                    }),
                ],
            }),
        ],
    });
};
export default Dashboardnav;
