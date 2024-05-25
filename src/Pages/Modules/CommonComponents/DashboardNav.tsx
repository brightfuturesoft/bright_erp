import React from 'react';
import { Button } from 'antd'; // Assuming you are using Ant Design for buttons
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { AlignJustify } from 'lucide-react';

interface SidebarProps {
    darkMode: boolean;
    isSidebarOpen: boolean;
    scrolled: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    setDarkMode: (mode: boolean) => void;
}
// Step 2: Create the component using the props interface
const Dashboardnav
    : React.FC<SidebarProps> = ({ darkMode, isSidebarOpen, scrolled, setIsSidebarOpen, setDarkMode }) => {
        return (
            <nav className={`${darkMode ? 'bg-dark shadow-[#0e0d0d21]' : 'shadow-[#35333317] bg-light'} duration-300 ${scrolled ? 'shadow-xl border-b border-[#8080804f]' : 'border-[#80808000]'} flex w-full px-3 py-3 fixed top-0 items-center gap-2 z-[900]`}>
                <div className="md:hidden flex items-center">
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<AlignJustify strokeWidth={1} />}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`custom-icon-button shadow-none border-none ${darkMode ? 'text-light' : 'text-black'} hover:bg-transparent bg-[#ff000000] flex items-center justify-center text-xl`}
                    />
                </div>
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={darkMode ? <BulbFilled /> : <BulbOutlined />}
                    onClick={() => setDarkMode(!darkMode)}
                    className=""
                />
            </nav>
        );
    };

export default Dashboardnav
    ;
