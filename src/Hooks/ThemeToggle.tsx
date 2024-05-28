import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');

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

    return (
        <Button
            onClick={toggleTheme}
            type="primary"
            shape="circle"
            className="transition-all duration-200 ease-in-out
                 sm:w-8 sm:h-8 sm:text-xs
                 md:w-10 md:h-10 md:text-sm
                 lg:w-12 lg:h-12 lg:text-base"
            icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
        />
    );
};

export default ThemeToggle;
