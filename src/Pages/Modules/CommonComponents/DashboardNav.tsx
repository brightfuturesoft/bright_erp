import React from 'react';
import { Breadcrumb, Button } from 'antd'; // Assuming you are using Ant Design for buttons
import { BulbOutlined, BulbFilled, HomeOutlined } from '@ant-design/icons';
import { AlignJustify, ShoppingBasket } from 'lucide-react';
import ThemeToggle from '../../../Hooks/ThemeToggle';
import second from '../../../assets/'
import { Link } from 'react-router-dom';
interface SidebarProps {
    darkMode: boolean;
    isSidebarOpen: boolean;
    scrolled: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    setDarkMode: (mode: boolean) => void;
}
// Step 2: Create the component using the props interface
const Dashboardnav
    : React.FC<SidebarProps> = ({ isSidebarOpen, scrolled, setIsSidebarOpen }) => {
        return (
            <nav className={`dark:bg-dark h-[75px] dark:border-gray-800 border-gray-200 border-b duration-300 ${scrolled ? 'shadow-xl border-b border-[#8080804f]' : 'border-[#80808000]'} flex justify-between md:w-[84%] w-full md:px-8 px-2 py-3 fixed top-0 items-center gap-2 z-[900]`}>


                <div className="">
                    <Link className='md:hidden block' to={'/'}>
                        <img
                            src="https://brightfuturesoft.com/static/media/logo%20full%20name%20png%202-01%20(1)%20(1).f35f04f782ea6b4a59b2.png"
                            alt="logo"
                            className="w-24"
                        /></Link>


                </div>
                <div className="flex items-center justify-end w-full gap-2">
                    <Button
                        type='primary'
                        className='flex items-center shadow-none h-[40px] dark:bg-light-dark hover:bg-dark'
                        icon={<ShoppingBasket />}
                    >Visite eCommerce</Button> <ThemeToggle />

                    <div className="md:hidden flex items-center">
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<AlignJustify strokeWidth={1} />}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`custom-icon-button shadow-none border-none  hover:bg-transparent bg-[#ff000000] flex items-center justify-center text-xl`}
                        />
                    </div>
                </div>
            </nav>
        );
    };

export default Dashboardnav
    ;
