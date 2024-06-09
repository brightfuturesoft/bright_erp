import React, { useState } from 'react';

const TestDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 mx">
            {/* Sidebar */}
            <div className={`fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 text-white ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <span className="text-2xl font-semibold">Dashboard</span>
                    </div>
                </div>
                <nav className="mt-10">
                    <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" href="#home">Home</a>
                    <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" href="#services">Services</a>
                    <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" href="#clients">Clients</a>
                    <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" href="#contact">Contact</a>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between p-4 bg-white shadow-md">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 focus:outline-none md:hidden">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard...</h1>

                    <button className='bg-[red]'>
                        Home
                    </button>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <h2 className="text-2xl font-semibold text-gray-700">Dashboard Content</h2>
                    <p className="mt-4 text-gray-600">This is a responsive dashboard layout using Tailwind CSS and React.</p>
                    {/* Add your content here */}
                </main>
            </div>
        </div>
    );
};

export default TestDashboardLayout;
