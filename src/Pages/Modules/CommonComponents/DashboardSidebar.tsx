import React from 'react';
import { Power, X } from 'lucide-react';
// src/components/MainLayout.tsx
import Sidebar from '../Pages/Modules/CommonComponents/DashboardSidebar';

// Step 1: Define the props interface
interface SidebarProps {
    darkMode: boolean;
    isSidebarOpen: boolean;
    scrolled: boolean;
    setIsSidebarOpen: (open: boolean) => void;
}

// Step 2: Create the component using the props interface
const DashboardNav: React.FC<SidebarProps> = ({ darkMode, isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <div className={`sidebar relative overflow-y-auto h-full ${isSidebarOpen ? 'open' : 'closed'}`}>
            <div className={`${!darkMode ? 'bg-light' : 'bg-dark'} fixed justify-between top-0 w-full flex items-center px-4 py-2`}>
                <img
                    src="https://brightfuturesoft.com/static/media/logo%20full%20name%20png%202-01%20(1)%20(1).f35f04f782ea6b4a59b2.png"
                    alt="logo"
                    className="w-32"
                />
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`${!darkMode ? 'text-black' : 'text-light'} lg:hidden block rounded`}
                >
                    <X size={28} strokeWidth={1} />
                </button>
            </div>

            <ul>
                {[
                    'Tickets',
                    'Roll Base Access',
                    'Treeview',
                    'Pricing',
                    'Account Setting',
                    'FAQ',
                    'Landingpage',
                    'Widgets'
                ].map((item, index) => (
                    <li key={index} className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">
                        {item}
                    </li>
                ))}
            </ul>

            <div className={`${!darkMode ? 'bg-light' : 'bg-dark'} fixed left-0 right-0 bottom-0 p-2`}>
                <div className={`${darkMode ? 'bg-light-dark' : 'bg-light'} ring-[0.3px] ring-[#46464663] rounded-lg w-full p-4`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <img src="https://via.placeholder.com/32" alt="User" className="rounded-full" />
                            <div className="ml-2 text-mt-3 text-xs font-semibold w-[120px]">
                                Mathew - Designer
                                <span>Admin</span>
                            </div>
                        </div>
                        <button
                            className="hover:bg-red-500 text-white rounded-full p-2"
                            onClick={() => console.log('Logging out')}
                        >
                            <Power size={16} strokeWidth={2} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
