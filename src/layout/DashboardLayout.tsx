// src/components/MainLayout.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../Pages/Modules/CommonComponents/DashboardSidebar';
import Dashboardnav from '../Pages/Modules/CommonComponents/DashboardNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import 'antd/dist/antd.css'; // Make sure to import antd styles

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    // const [position, setPosition] = useState<'start' | 'end'>('end');

    useEffect(() => {
        const handleScroll = () => {
            const isTop = window.scrollY < 50;
            setScrolled(!isTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const location = useLocation();
    const [responsive, setResponsive] = useState(false);
    const paths = location.pathname.split('/').filter(path => path !== '');
    function convertToTitleCase(str) {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className="fixed  w-full h-screen overflow-y-auto">
            <div className={`flex dark:bg-dark bg-light md:pb-2 pb-12  `}>
                {isSidebarOpen && (
                    <div
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className=" fixed right-0 w-full h-screen z-[1000]"
                    ></div>
                )}

                {/* Sidebar */}
                <div
                    className={`fixed dark:bg-dark inset-y-0 left-0 w-64 dark:border-gray-800 border-r ${isSidebarOpen ? 'md:translate-x-0 translate-x-0' : 'md:translate-x-0 translate-x-[-300px]'} duration-200 lg:block pr-[2px] z-[1000] `}
                >
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        scrolled={scrolled}
                        setIsSidebarOpen={setIsSidebarOpen}
                        darkMode={false}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1  lg:ml-64  ">
                    <Dashboardnav
                        isSidebarOpen={isSidebarOpen}
                        scrolled={scrolled}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                    <div className="p-4 h-screen dark:bg-dark bg  ">
                        <nav
                            aria-label="breadcrumb"
                            className="md:w-full rounded dark:bg-gray-800 bg-light border px-2 md:hidden flex justify-start dark:border-gray-700 dark:text-gray-100 text-dark md:text-md text-xs h-auto md:py-0 py-1"
                        >
                            <ol className="flex flex-wrap justify-start bg-gray-800 h-8 space-x-2">
                                <li className="flex items-center">
                                    <Link
                                        rel="noopener noreferrer"
                                        to="/dashboard"
                                        title="Back to homepage"
                                        className="hover:underline"
                                    >
                                        Home{' '}
                                        {/* <AiTwotoneHome className="w-5 h-5 pr-1 text-gray-400" /> */}
                                    </Link>
                                </li>
                                {paths.slice(1).map((path, index) => (
                                    <li
                                        className="flex items-center space-x-2"
                                        key={index + path}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 32 32"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            className="w-2 h-2 mt-1 transform rotate-90 fill-current text-gray-600"
                                        >
                                            <path d="M32 30.031h-32l16-28.061z"></path>
                                        </svg>

                                        <Link
                                            rel="noopener noreferrer"
                                            to={`/${paths.slice(0, index + 2).join('/')}`}
                                            className="flex items-center px-1 capitalize hover:underline"
                                        >
                                            {convertToTitleCase(path)}
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
