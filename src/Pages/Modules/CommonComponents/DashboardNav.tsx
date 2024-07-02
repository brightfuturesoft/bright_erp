import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { AlignJustify, ShoppingBasket } from "lucide-react";
import ThemeToggle from "../../../Hooks/ThemeToggle";
import logoDark from "../../../assets/logoDark.png";
import logoLight from "../../../assets/logoLight.png";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Dashboardnav: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "");

  function convertToTitleCase(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const navigate = useNavigate();

  return (
    <nav
      className={`dark:bg-dark h-[75px] sticky top-0  w-full dark:border-gray-800 bg-light border-gray-200 border-b duration-300 flex items-center  !z-[700]`}
    >
      <div>
        <div className="block md:hidden">
          <div className="dark:block flex-shrink-0 hidden">
            <Link to="/" className="flex">
              <img className="w-[140px]" src={logoLight} alt="Logo Light" />
            </Link>
          </div>
          <div className="block flex-shrink-0 dark:hidden">
            <Link to="/" className="flex">
              <img className="w-[140px]" src={logoDark} alt="Logo Dark" />
            </Link>
          </div>
        </div>

        <nav
          aria-label="breadcrumb"
          className="md:block dark:border-gray-700 hidden px-2 rounded w-full text-black dark:text-gray-100"
        >
          <ol className="flex space-x-2 h-8">
            <li>
              <Button
                className="dark:!bg-light-dark shadow-none !border-none !rounded !text-white"
                onClick={() => navigate(-1)}
                type="primary"
              >
                Back
              </Button>
            </li>
            <li className="flex items-center">
              <Link
                rel="noopener noreferrer"
                to="/dashboard"
                title="Back to homepage"
                className="hover:underline"
              >
                Home
              </Link>
            </li>
            {paths.slice(1).map((path, index) => (
              <li
                className="flex items-center space-x-2 whitespace-nowrap"
                key={index + path}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  fill="currentColor"
                  className="mt-1 w-2 h-2 text-gray-600 transform fill-current rotate-90"
                >
                  <path d="M32 30.031h-32l16-28.061z"></path>
                </svg>

                <Link
                  rel="noopener noreferrer"
                  to={`/${paths.slice(0, index + 2).join("/")}`}
                  className="flex items-center px-1 hover:underline capitalize"
                >
                  {convertToTitleCase(path)}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="flex justify-end items-center gap-2 mr-3 w-full">
        <Button
          type="primary"
          className="md:flex items-center hidden hover:bg-dark dark:bg-light-dark shadow-none h-[40px]"
          icon={<ShoppingBasket />}
        >
          Visit eCommerce
        </Button>
        <ThemeToggle />

        <div className="flex items-center md:hidden">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<AlignJustify strokeWidth={1} />}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`custom-icon-button dark:!text-light !text-dark shadow-none border-none hover:bg-transparent bg-[#ff000000] flex items-center justify-center text-xl`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Dashboardnav;
