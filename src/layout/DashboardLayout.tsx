// src/components/MainLayout.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../Pages/Modules/CommonComponents/DashboardSidebar';
import Dashboardnav from '../Pages/Modules/CommonComponents/DashboardNav';
import { Outlet } from 'react-router-dom';

// import 'antd/dist/antd.css'; // Make sure to import antd styles

const DashboardLayout: React.FC = () => {
    const [darkMode, setDarkMode] = useState(true);
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

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`flex  min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} relative`}>
            {isSidebarOpen &&
                <div
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="bg-[#00000070] fixed right-0 w-full h-screen z-[1000]"></div>}
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 shadow-md border-r ${isSidebarOpen ? 'md:translate-x-0 translate-x-0' : 'md:translate-x-0 translate-x-[-300px]'} duration-200 lg:block ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'text-dark border-gray-200 bg-light'} pr-[2px] z-[1000] `}>
                <Sidebar darkMode={darkMode} isSidebarOpen={isSidebarOpen} scrolled={scrolled} setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 overflow-y-auto">

                <Dashboardnav darkMode={darkMode} isSidebarOpen={isSidebarOpen} scrolled={scrolled} setIsSidebarOpen={setIsSidebarOpen} setDarkMode={setDarkMode} />

                <div className="p-4 mt-16">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
