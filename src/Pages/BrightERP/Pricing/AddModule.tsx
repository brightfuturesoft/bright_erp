import React, { useState } from 'react';
import {
    DeleteOutlined,
    DownCircleOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';

import {
    accounting,
    inventory,
    hr,
    crm,
    sale,
    custom_module_development,
    e_commerce_Integration,
    procurement,
    production_planning,
    report,
    project_management,
    api,
    apps,
} from '../../../assets/index.js';

const AddModule = ({ openModal, setOpenModal }) => {
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    const [cart, setCart] = useState([]);
    console.log(cart);

    const onChange = checked => {
        setLoading(!checked);
    };

    // Example module data
    const modules = [
        {
            _id: 1,
            name: 'Accounting',
            description: 'Manage financial records, invoicing, and taxes.',
            features: ['Invoice management', 'Tax calculation'],
            imageUrl: accounting,
            price: 99.99,
        },
        {
            _id: 2,
            name: 'Inventory',
            description:
                'Track stock levels, manage suppliers, and automate reorders.',
            features: ['Inventory management', 'Reorder management'],
            imageUrl: inventory,
            price: 149.99,
        },
        {
            _id: 3,
            name: 'Sales',
            description: 'Manage leads, sales pipelines, and customer orders.',
            features: ['Lead management', 'Sales pipelines'],
            imageUrl: sale,
            price: 199.99,
        },
        {
            _id: 4,
            name: 'HR',
            description:
                'Employee management, payroll, and attendance tracking.',
            features: ['Payroll management', 'Timekeeping'],
            imageUrl: hr,
            price: 299.99,
        },
        {
            _id: 5,
            name: 'CRM',
            description:
                'Customer relationship management, including sales tracking and customer interaction history.',
            features: ['Sales tracking', 'Customer relationship management'],
            imageUrl: crm,
            price: 249.99,
        },
        //Project Management ,Procurement,Production Planning,E-commerce Integration,Custom Reporting, API Access,Custom module development,Integration with third-party apps
        // Add more modules as needed
        {
            _id: 6,
            name: 'Project Management',
            description: 'Manage projects, tasks, and budgets.',
            features: ['Project management', 'Task management'],
            imageUrl: project_management,
            price: 199.99,
        },
        {
            _id: 7,
            name: 'Procurement',
            description: 'Manage inventory, suppliers, and purchase orders.',
            features: ['Inventory management', 'Supplier management'],
            imageUrl: procurement,
            price: 199.99,
        },
        {
            _id: 8,
            name: 'Production Planning',
            description:
                'Manage production schedules, inventory, and production planning.',
            features: ['Production scheduling', 'Inventory management'],
            imageUrl: production_planning,
            price: 199.99,
        },
        {
            _id: 9,
            name: 'E-commerce Integration',
            description: 'Integrate with e-commerce platforms and APIs.',
            features: ['e-commerce integration', 'API integration'],
            imageUrl: e_commerce_Integration,
            price: 199.99,
        },
        {
            _id: 10,
            name: 'Custom Reporting',
            description: 'Customize reports and analytics for your business.',
            features: ['Custom reports', 'Analytics'],
            imageUrl: report,
            price: 199.99,
        },
        {
            _id: 11,
            name: 'API Access',
            description: 'Access your data and integrations from anywhere.',
            features: ['Data access', 'Integrations'],
            imageUrl: api,
            price: 199.99,
        },
        {
            _id: 12,
            name: 'Custom module',
            description: 'Develop custom modules for your business.',
            features: ['Custom modules', 'Module development'],
            imageUrl: custom_module_development,
            price: 199.99,
        },
        {
            _id: 13,
            name: 'Integration with third-party apps',
            description: 'Integrate with third-party apps and APIs.',
            features: ['Third-party integration', 'API integration'],
            imageUrl: apps,
            price: 199.99,
        },
    ];

    const toggleDetails = id => {
        setShowDetails(showDetails === id ? null : id);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? `${text.slice(0, maxLength)}...`
            : text;
    };

    const addToCart = module => {
        const isAlreadyInCart = cart.some(item => item._id === module._id);
        if (isAlreadyInCart) {
            message.warning('This module is already in your cart.');
        } else {
            setCart(prevCart => [...prevCart, module]);
            message.success('Module added to cart.');
        }
    };

    const removeFromCart = id => {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    };

    const [searchValue, setSearchValue] = useState('');

    const filteredModules = searchValue
        ? modules.filter(item =>
              Object.values(item).some(
                  value =>
                      typeof value === 'string' &&
                      value.toLowerCase().includes(searchValue.toLowerCase())
              )
          )
        : modules;

    const Tooltip = ({ text }) => (
        <div className="absolute bg-gray-700 text-white text-xs rounded px-2 py-1 z-10">
            {text}
        </div>
    );

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div>
            <div className="mx-auto flex items-center justify-center">
                <div
                    className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} duration-300 inset-0 backdrop-blur-lg w-full h-full`}
                >
                    <div
                        onClick={e_ => e_.stopPropagation()}
                        className={`absolute  w-[90%] h-[90%] md:flex  justify-center drop-shadow-2xl rounded-lg ${openModal ? 'translate-y-0 opacity-1 duration-300' : 'translate-y-32 opacity-0 duration-100'} overflow-x-hidden overflow-y-auto dark:bg-dark bg-white  `}
                    >
                        <main className="w-full  p-8">
                            <div className="flex items-center justify-between pb-6 dark:border-b-gray-500 border-gray-600 border-b mb-6">
                                <h1 className="text-2xl dark:text-white text-dark">
                                    Add New Plan
                                </h1>
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="flex dark:bg-light-dark dark:text-white bg-slate-950 text-white px-3 py-2 rounded-lg"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="md:grid gap-2 lg:grid-cols-3 rounded-lg">
                                <div className="space-y-8 h-screen  custom-scroll px-3 col-span-2 lg:mb-6">
                                    <div className="rounded-lg border dark:text-light text-black dark:bg-light-dark bg-[white] text-card-foreground shadow-sm">
                                        <div className="lg:p-6 p-2">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">
                                                        Package Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        onChange={e =>
                                                            setSearchValue(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="bg-transparent flex h-10 w-full rounded-md border px-3"
                                                        placeholder="Enter your package name"
                                                    />
                                                </div>
                                                <h3 className="text-xl font-semibold whitespace-nowrap">
                                                    Modules
                                                </h3>
                                                <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
                                                    {filteredModules.map(
                                                        (item, index) => (
                                                            <div
                                                                key={item._id}
                                                                className={`${showDetails === item._id ? '' : 'h-[90px]'} p-4 border dark:border-gray-900 border-gray-200 hover:border-gray-500 duration-200 gap-4 dark:bg-dark rounded-lg`}
                                                            >
                                                                <div
                                                                    onMouseEnter={() =>
                                                                        setHoveredIndex(
                                                                            index
                                                                        )
                                                                    }
                                                                    onMouseLeave={() =>
                                                                        setHoveredIndex(
                                                                            null
                                                                        )
                                                                    }
                                                                    className="flex gap-2 justify-between relative"
                                                                >
                                                                    <div className=" flex gap-2">
                                                                        <div
                                                                            className="w-14 h-14 rounded border bg-cover object-cover"
                                                                            style={{
                                                                                backgroundImage: `url(${item.imageUrl})`,
                                                                            }}
                                                                        >
                                                                            {hoveredIndex ===
                                                                                index && (
                                                                                <Tooltip
                                                                                    text={
                                                                                        item.name
                                                                                    }
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <h1>
                                                                                {truncateText(
                                                                                    item.name,
                                                                                    18
                                                                                )}
                                                                            </h1>
                                                                            <div className="text-xs">
                                                                                $
                                                                                {
                                                                                    item.price
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Button
                                                                            icon={
                                                                                <ShoppingCartOutlined className="text-lg" />
                                                                            }
                                                                            title="Add to Cart"
                                                                            type="primary"
                                                                            onClick={() =>
                                                                                addToCart(
                                                                                    item
                                                                                )
                                                                            }
                                                                        >
                                                                            Buy
                                                                        </Button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                toggleDetails(
                                                                                    item._id
                                                                                )
                                                                            }
                                                                            title="Details"
                                                                            className="text-2xl duration-200 hover:text-success text-gray-400 dark:text-gray-600"
                                                                        >
                                                                            <DownCircleOutlined className="hover:text-info duration-200" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                {/* Details container */}
                                                                {showDetails ===
                                                                    item._id && (
                                                                    <div>
                                                                        <p className="text-xs mt-2 text-justify">
                                                                            {
                                                                                item.description
                                                                            }
                                                                        </p>
                                                                        <h5 className="text-xs mt-3 font-semibold">
                                                                            Features:
                                                                        </h5>
                                                                        <ul className="text-xs list-disc">
                                                                            {item.features.map(
                                                                                (
                                                                                    feature,
                                                                                    index
                                                                                ) => (
                                                                                    <li
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className="ml-[12.8px]"
                                                                                    >
                                                                                        {
                                                                                            feature
                                                                                        }
                                                                                    </li>
                                                                                )
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8 lg:mb-0 md:mb-6">
                                    <div className="rounded-lg border dark:text-light text-black dark:bg-light-dark bg-[white] text-card-foreground shadow-sm">
                                        <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                                            <h3 className="text-2xl font-semibold whitespace-nowrap">
                                                Order Summary
                                            </h3>
                                        </div>
                                        <div className="lg:p-6 p-2">
                                            <div className="space-y-4">
                                                {cart.map(item => (
                                                    <div
                                                        key={item._id}
                                                        className="flex items-start justify-between"
                                                    >
                                                        <div className="flex gap-2">
                                                            <img
                                                                src={
                                                                    item?.imageUrl
                                                                }
                                                                alt=""
                                                                className="w-10 h-10 rounded object-cover border"
                                                            />

                                                            <div className="">
                                                                <div className="  w-[230px] text-sm font-semibold">
                                                                    {item.name}
                                                                </div>
                                                                <div className="text-xs">
                                                                    {
                                                                        item.duration
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span>
                                                                ${item.price}
                                                            </span>
                                                            <Button
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        item._id
                                                                    )
                                                                }
                                                                type="circle"
                                                                ghost="true"
                                                                className="bg-[#ff003741] text-[rgb(255,111,111)]  "
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
                                                    <span>Total</span>
                                                    <span>
                                                        $
                                                        {cart
                                                            .reduce(
                                                                (total, item) =>
                                                                    total +
                                                                    item.price,
                                                                0
                                                            )
                                                            .toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center lg:p-6 p-2">
                                            <Link
                                                to={`/payment`}
                                                className="inline-flex items-center bg-slate-950 text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                            >
                                                Complete Purchase
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddModule;
