// src/components/MainLayout.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../Pages/Modules/CommonComponents/DashboardSidebar';
import Dashboardnav from '../Pages/Modules/CommonComponents/DashboardNav';
import { Outlet } from 'react-router-dom';

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

    return (
        <div className={`flex  min-h-screen  relative`}>
            {isSidebarOpen &&
                <div
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className=" fixed right-0 w-full h-screen z-[1000]"></div>}
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 dark:border-gray-800 border-r ${isSidebarOpen ? 'md:translate-x-0 translate-x-0' : 'md:translate-x-0 translate-x-[-300px]'} duration-200 lg:block pr-[2px] z-[1000] `}>
                <Sidebar isSidebarOpen={isSidebarOpen} scrolled={scrolled} setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            {/* Main Content */}
            <div className="flex-1 relative lg:ml-64 overflow-y-auto">
                <Dashboardnav isSidebarOpen={isSidebarOpen} scrolled={scrolled} setIsSidebarOpen={setIsSidebarOpen} />

                <div className="p-4  mt-16">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
