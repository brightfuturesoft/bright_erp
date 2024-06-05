import React, { useState } from 'react';
import { Breadcrumb, Button } from 'antd'; // Assuming you are using Ant Design for buttons
import { BulbOutlined, BulbFilled, HomeOutlined } from '@ant-design/icons';
import { AlignJustify, ShoppingBasket } from 'lucide-react';
import ThemeToggle from '../../../Hooks/ThemeToggle';
import second from '../../../assets/'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoDark from '../../../assets/logoDark.png';
import logoLight from '../../../assets/logoLight.png';

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

        const location = useLocation();
        const [responsive, setResponsive] = useState(false);
        const paths = location.pathname.split("/").filter((path) => path !== "");
        function convertToTitleCase(str) {
            return str
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }
        const navigate = useNavigate();

        return (
            <nav className={`dark:bg-dark h-[75px] dark:border-gray-800 bg-light border-gray-200 border-b duration-300 ${scrolled ? 'shadow-xl border-b border-[#8080804f]' : 'border-[#80808000]'} flex justify-between md:w-[84%] w-full md:px-8 px-2 py-3 fixed top-0 items-center gap-2 z-[900]`}>


                <div className="">
                    <div className="md:hidden block">
                        <div className="flex-shrink-0  dark:block hidden">
                            <Link to="/" className="flex">
                                <img
                                    className="w-[140px] "
                                    src={logoLight}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="flex-shrink-0 dark:hidden block">
                            <Link to="/" className="flex">
                                <img
                                    className="w-[140px] "
                                    src={logoDark}
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>

                    <nav
                        aria-label="breadcrumb"
                        className="w-full rounded px-2 md:block hidden dark:border-gray-700 dark:text-gray-100 text-black"
                    >
                        <ol className="flex h-8 space-x-2">
                            <li>
                                <Button className='dark:!bg-light-dark shadow-none !text-white !border-none !rounded' onClick={() => navigate(-1)} type='primary'>Back</Button>
                            </li>
                            <li className="flex items-center">
                                <Link
                                    rel="noopener noreferrer"
                                    to="/dashboard"
                                    title="Back to homepage"
                                    className="hover:underline"
                                >
                                    Home   {/* <AiTwotoneHome className="w-5 h-5 pr-1 text-gray-400" /> */}
                                </Link>
                            </li>
                            {paths.slice(1).map((path, index) => (
                                <li
                                    className="flex items-center whitespace-nowrap space-x-2"
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
                                        to={`/${paths.slice(0, index + 2).join("/")}`}
                                        className="flex items-center px-1 capitalize hover:underline"
                                    >
                                        {convertToTitleCase(path)}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>

                </div>
                <div className="flex items-center justify-end w-full gap-2">
                    <Button
                        type='primary'
                        className=' items-center shadow-none md:flex hidden h-[40px] dark:bg-light-dark hover:bg-dark'
                        icon={<ShoppingBasket />}
                    >Visite eCommerce</Button> <ThemeToggle />

                    <div className="md:hidden flex items-center">
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<AlignJustify strokeWidth={1} />}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`custom-icon-button dark:!text-light !text-dark shadow-none border-none  hover:bg-transparent bg-[#ff000000] flex items-center justify-center text-xl`}
                        />
                    </div>
                </div>
            </nav>
        );
    };

export default Dashboardnav
    ;

