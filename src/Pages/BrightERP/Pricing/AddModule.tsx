import React, { useState } from 'react';
import { DeleteOutlined, DownCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';

const AddModule = ({ openModal, setOpenModal }) => {
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    const [cart, setCart] = useState([]);

    const onChange = (checked) => {
        setLoading(!checked);
    };

    // Example module data
    const modules = [
        {
            _id: 1,
            name: 'Pos system',
            duration: '6 months',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            features: ['Manage customers', 'Maintenance Products'],
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            price: 99.99,
        },
        {
            _id: 2,
            name: 'Inventory Management esaf;lsadlf sdkf hia sdhi aud shfpi asdf sfda',
            duration: '12 months',
            description: 'Track and manage your inventory in real-time with advanced features.',
            features: ['Real-time tracking', 'Automated stock updates'],
            imageUrl: 'https://images.unsplash.com/photo-1556742049-90848d862a68?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
            price: 149.99,
        },
        {
            _id: 3,
            name: 'Customer Relationship Management',
            duration: '6 month',
            description: 'Manage customer interactions and data efficiently with our CRM module.',
            features: ['Contact management', 'Sales automation'],
            imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
            price: 199.99,
        },
        {
            _id: 4,
            name: 'Human Resources Management',
            duration: '12 month',
            description: 'Streamline your HR processes including recruitment, payroll, and employee management.',
            features: ['Payroll management', 'Employee records'],
            imageUrl: 'https://img.freepik.com/premium-vector/automatic-conveyor-belt-illustration-concept-white-background_701961-1711.jpg',
            price: 299.99,
        },
        {
            _id: 5,
            name: 'Project Management',
            duration: '6 month',
            description: 'Plan, track, and manage projects with our comprehensive project management module.',
            features: ['Task management', 'Gantt charts'],
            imageUrl: 'https://png.pngtree.com/png-vector/20200319/ourmid/pngtree-time-management-concept-with-people-planning-a-schedule-business-leadership-partnership-png-image_2158018.jpg',
            price: 249.99,
        },
        {
            _id: 6,
            name: 'Accounting and Finance',
            duration: '12 month',
            description: 'Automate your financial operations and gain insights with our accounting module.',
            features: ['Expense tracking', 'Financial reporting'],
            imageUrl: 'https://thumbs.dreamstime.com/b/cash-register-screen-card-payment-terminal-checkout-vector-illustration-retail-pos-system-financial-transaction-303643128.jpg',
            price: 199.99,
        }
    ];

    const toggleDetails = (id) => {
        setShowDetails(showDetails === id ? null : id);
    };

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    const addToCart = (module) => {
        const isAlreadyInCart = cart.some((item) => item._id === module._id);
        if (isAlreadyInCart) {
            message.warning('This module is already in your cart.');
        } else {
            setCart((prevCart) => [...prevCart, module]);
            message.success('Module added to cart.');
        }
    };

    return (
        <div>
            <div className="mx-auto flex items-center justify-center">
                <div className={`fixed flex justify-center items-center z-[100] ${openModal ? 'visible opacity-1' : 'invisible opacity-0'} duration-300 inset-0 backdrop-blur-lg w-full h-full`}>

                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute  w-[90%] h-[90%] md:flex  justify-center drop-shadow-2xl rounded-lg ${openModal ? 'translate-y-0 opacity-1 duration-300' : 'translate-y-32 opacity-0 duration-100'} overflow-x-hidden overflow-y-auto dark:bg-dark bg-white  `}>

                        <main className="w-full  p-8">
                            <div className="flex items-center justify-between pb-6 dark:border-b-gray-500 border-gray-600 border-b mb-6">
                                <h1 className="text-2xl dark:text-white text-dark">Add New Plan</h1>
                                <button onClick={() => setOpenModal(false)} className="flex dark:bg-light-dark dark:text-white bg-slate-950 text-white px-3 py-2 rounded-lg">Close</button>
                            </div>
                            <div className="md:grid gap-2 lg:grid-cols-3 rounded-lg">
                                <div className="space-y-8 h-screen  custom-scroll px-3 col-span-2 lg:mb-6">
                                    <div className="rounded-lg border dark:text-light text-black dark:bg-light-dark bg-[white] text-card-foreground shadow-sm">
                                        <div className="lg:p-6 p-2">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Package Name</label>
                                                    <input className="bg-transparent flex h-10 w-full rounded-md border px-3" placeholder="Enter your package name" />
                                                </div>
                                                <h3 className="text-xl font-semibold whitespace-nowrap">Modules</h3>
                                                <div className="grid md:grid-cols-2 gap-2 grid-cols-1">
                                                    {modules.map((item) => (
                                                        <div key={item._id} className={`${showDetails === item._id ? ' ' : 'h-[90px]'}  p-4 border dark:border-gray-900 border-gray-200 hover:border-gray-500 duration-200 gap-4 dark:bg-dark rounded-lg`}>
                                                            <div className="flex gap-2 justify-between">
                                                                <div className="flex gap-2">
                                                                    <div
                                                                        title={item.description}
                                                                        style={{ backgroundImage: `url(${item.imageUrl})` }}
                                                                        className="w-14 h-14 rounded border bg-cover object-cover"></div>
                                                                    <div>
                                                                        <h1>{truncateText(item.name, 18)}</h1>
                                                                        <div className="text-xs">{item.duration}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Button
                                                                        icon={<ShoppingCartOutlined className='text-lg' />}
                                                                        title="Add to Cart"
                                                                        type="primary"
                                                                        onClick={() => addToCart(item)}>
                                                                        Buy
                                                                    </Button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => toggleDetails(item._id)}
                                                                        title="Details"
                                                                        className="text-2xl duration-200 hover:text-success text-gray-400 dark:text-gray-600">
                                                                        <DownCircleOutlined className="hover:text-info duration-200" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            {/* down container */}
                                                            {showDetails === item._id && (
                                                                <div>
                                                                    <p className="text-xs mt-2 text-justify">{item.description}</p>
                                                                    <h5 className="text-xs mt-3 font-semibold">Features:</h5>
                                                                    <ul className="text-xs list-disc">
                                                                        {item.features.map((feature, index) => (
                                                                            <li key={index} className="ml-[12.8px]">
                                                                                {feature}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8 lg:mb-0 md:mb-6">
                                    <div className="rounded-lg border dark:text-light text-black dark:bg-light-dark bg-[white] text-card-foreground shadow-sm">
                                        <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                                            <h3 className="text-2xl font-semibold whitespace-nowrap">Order Summary</h3>
                                        </div>
                                        <div className="lg:p-6 p-2">
                                            <div className="space-y-4">
                                                {cart.map((item) => (
                                                    <div key={item._id} className="flex items-start justify-between">
                                                        <div className="flex gap-2">
                                                            <img src={item?.imageUrl} alt="" className="w-10 h-10 rounded object-cover border" />

                                                            <div className="">
                                                                <div className='  w-[230px] text-sm font-semibold'>{item.name}</div>
                                                                <div className="text-xs">{item.duration}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span>${item.price.toFixed(2)}</span>
                                                            <Button
                                                                type='circle'
                                                                ghost="true"
                                                                className='bg-[#ff003741] text-[rgb(255,111,111)]  '
                                                                icon={<DeleteOutlined />} />
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
                                                    <span>Total</span>
                                                    <span>
                                                        ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center lg:p-6 p-2">
                                            <Link to={`/payment`} className="inline-flex items-center bg-slate-950 text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
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
