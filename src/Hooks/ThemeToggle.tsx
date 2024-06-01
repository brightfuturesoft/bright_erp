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
        <div className='flex items-center'>
            <div
                className="lg:block hidden"
            >
                <Button
                    className='dark:bg-light-dark shadow-none'
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
                    onClick={toggleTheme}
                />
            </div>
            <div
                className="block lg:hidden"
            >
                <Button
                    className='dark:bg-light-dark shadow-none'
                    type="primary"
                    shape="circle"
                    size="middle"
                    icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
                    onClick={toggleTheme}
                />
            </div>

        </div>
    );
};

export default ThemeToggle;
