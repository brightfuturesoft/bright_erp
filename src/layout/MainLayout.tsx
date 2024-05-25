// src/components/MainLayout.tsx
import { AlignJustify, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Radio, Space, Button } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
// import 'antd/dist/antd.css'; // Make sure to import antd styles

const MainLayout: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [position, setPosition] = useState<'start' | 'end'>('end');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 shadow-md border-r ${isSidebarOpen ? 'md:translate-x-0 translate-x-0' : 'md:translate-x-0 translate-x-[-300px]'} duration-200 lg:block ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'text-dark border-gray-200 bg-light'} pr-[2px] z-[1000]`}>
                <div className="sidebar overflow-y-auto h-full">
                    <div className="px-4 pt-2 flex items-center justify-between text-center font-bold">
                        <div>
                            Modernize
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden block text-black rounded">
                            <X size={28} strokeWidth={1} />
                        </button>

                    </div>
                    <ul>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">Tickets</li>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">Roll Base Access</li>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">Treeview</li>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">Pricing</li>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">Account Setting</li>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">FAQ</li>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">Landingpage</li>
                        <li className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700">Widgets</li>
                        {/* Other list items */}
                    </ul>
                    <div className="p-4">
                        <div className="flex items-center">
                            <img src="https://via.placeholder.com/32" alt="User" className="rounded-full" />
                            <span className="ml-2">Mathew - Designer</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-6 overflow-y-auto">
                <div className="flex items-center gap-2">

                    <div className="md:hidden block">
                        <Button
                            type="primary"
                            shape="circle"
                            size='large'
                            ghost="text"
                            icon={<AlignJustify strokeWidth={1} />}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`mb-6 custom-icon-button shadow-none border-none ${darkMode ? 'text-light' : 'text-black'} hover:bg-transparent bg-[#ff000000]   flex items-center justify-center text-xl`}
                        />
                    </div>
                    <Button
                        type="primary"
                        shape="circle"
                        ghost="text"
                        size='large'
                        icon={darkMode ? <BulbFilled /> : <BulbOutlined />}
                        onClick={() => setDarkMode(!darkMode)}
                        className="mb-6" />
                </div>


                <Space className="ml-4">
                    <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
                        <Radio.Button value="start">start</Radio.Button>
                        <Radio.Button value="end">end</Radio.Button>
                    </Radio.Group>
                </Space>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                        <div className="text-blue-500 text-2xl font-bold">96</div>
                        <div className="dark:text-gray-200">Employees</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                        <div className="text-yellow-500 text-2xl font-bold">3,650</div>
                        <div className="dark:text-gray-200">Clients</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                        <div className="text-blue-500 text-2xl font-bold">356</div>
                        <div className="dark:text-gray-200">Projects</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                        <div className="text-red-500 text-2xl font-bold">696</div>
                        <div className="dark:text-gray-200">Events</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                        <div className="text-green-500 text-2xl font-bold">$96k</div>
                        <div className="dark:text-gray-200">Payroll</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
                        <div className="text-blue-500 text-2xl font-bold">59</div>
                        <div className="dark:text-gray-200">Reports</div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Revenue Updates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold dark:text-gray-200">$63,489.50</span>
                            <span className="text-gray-500 dark:text-gray-400">Total Earnings</span>
                            <div className="mt-2">
                                <span className="text-lg font-bold dark:text-gray-200">Earnings this month:</span>
                                <span className="text-lg text-green-500 ml-2">$48,820</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-lg font-bold dark:text-gray-200">Expenses this month:</span>
                                <span className="text-lg text-red-500 ml-2">$26,498</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-full h-64 bg-blue-100 dark:bg-gray-700 rounded-lg"> {/* Placeholder for chart */}</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Yearly Breakup</h2>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold dark:text-gray-200">$36,358</span>
                            <span className="text-gray-500 dark:text-gray-400">+9% last year</span>
                            <div className="mt-2">
                                <span className="text-lg font-bold dark:text-gray-200">2022:</span>
                                <span className="text-lg text-gray-500 dark:text-gray-400 ml-2">$33,358</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-lg font-bold dark:text-gray-200">2023:</span>
                                <span className="text-lg text-blue-500 dark:text-blue-400 ml-2">$36,358</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Monthly Earnings</h2>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold dark:text-gray-200">$6,820</span>
                            <span className="text-gray-500 dark:text-gray-400">+9% last year</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
