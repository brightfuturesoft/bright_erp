import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';
const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );
    useEffect(() => {
        const htmlElement = document.documentElement;
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    return _jsxs('div', {
        className: 'flex items-center',
        children: [
            _jsx('div', {
                className: 'lg:block hidden',
                children: _jsx(Button, {
                    className:
                        'dark:bg-light-dark  shadow-none border border-gray-700',
                    type: 'primary',
                    shape: 'circle',
                    size: 'large',
                    icon:
                        theme === 'light'
                            ? _jsx(SunOutlined, {})
                            : _jsx(MoonOutlined, {}),
                    onClick: toggleTheme,
                }),
            }),
            _jsx('div', {
                className: 'block lg:hidden',
                children: _jsx(Button, {
                    className:
                        'dark:bg-light-dark !w-[35px] !h-[35px] shadow-none border border-gray-700',
                    type: 'primary',
                    shape: 'circle',
                    size: 'middle',
                    icon:
                        theme === 'light'
                            ? _jsx(SunOutlined, {})
                            : _jsx(MoonOutlined, {}),
                    onClick: toggleTheme,
                }),
            }),
        ],
    });
};
export default ThemeToggle;
