import { Button, Dropdown, Menu, Modal, Form, Input } from 'antd';
import { MoreVertical, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import EditCategoryModal from './EditItemModal';

const data = [
    {
        type: 'category',
        name: 'Electronics',
        children: [
            {
                type: 'subcategory',
                name: 'Mobile Phones',
                children: [
                    {
                        type: 'product',
                        name: 'iPhone 12',
                        price: 799,
                        stock: 120,
                        children: [
                            {
                                type: 'product',
                                name: 'MacBook Pro',
                                price: 1299,
                                stock: 60,
                            },
                            {
                                type: 'product',
                                name: 'Dell XPS 13',
                                price: 999,
                                stock: 45,
                            },
                        ],
                    },
                    {
                        type: 'product',
                        name: 'Samsung Galaxy S21',
                        price: 699,
                        stock: 85,
                    },
                ],
            },
            {
                type: 'subcategory',
                name: 'Laptops',
                children: [
                    {
                        type: 'product',
                        name: 'MacBook Pro',
                        price: 1299,
                        stock: 60,
                    },
                    {
                        type: 'product',
                        name: 'Dell XPS 13',
                        price: 999,
                        stock: 45,
                    },
                ],
            },
        ],
    },
    {
        type: 'food',
        name: 'Fast Food'
    }
];


const Accordion: React.FC<{ data: any, topLevel?: boolean, path?: string }> = ({ data, topLevel = false, path = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null); // State to track edited category
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleEditClick = () => {
        setEditCategory(data);
        setModalVisible(true);
    };

    const onCancelModal = () => {
        setModalVisible(false);
    };

    const onFinishModal = (values: any) => {
        console.log(values); // Handle form submission here
        setModalVisible(false);
    };

    const itemName = path ? `${path} >> ${data.name}` : data.name;

    const menu = (
        <Menu className='w-[160px]'>
            <Menu.Item key="1" onClick={handleEditClick}>Edit</Menu.Item>
            {/* Add more menu items as needed */}
        </Menu>
    );

    return (
        <div className={`${topLevel ? 'border border-gray-300 rounded' : ''}`}>
            <div className="flex items-center cursor-pointer p-2">

                {data.children ? (
                    <ArrowRight onClick={toggleAccordion} size={17} className="mr-2 text-gray-500" />
                ) : (<div className='w-[20px]'></div>)}
                <span onClick={toggleAccordion} className={`ml-2 ${path && !data.children ? 'text-sm' : path ? 'font-bold text-sm' : 'font-bold text-primary'}`}>{itemName}</span>

                {(
                    <Dropdown
                        overlay={menu}
                        placement="bottomRight"
                        trigger={['click']} // Ensure dropdown opens on click
                    >
                        <Button
                            type='primary'
                            shape='circle'
                            icon={<MoreVertical size={17} />}
                            className="ml-auto bg-gray-100 px-2 py-1 rounded-md"
                        />
                    </Dropdown>
                )}
            </div>
            {isOpen && data.children && (
                <div>
                    {data.children.map((child: any, index: number) => (
                        <Accordion key={index} data={child} path={itemName} />
                    ))}
                </div>
            )}

            {/* Modal for editing category */}
            <EditCategoryModal
                visible={modalVisible}
                onCancel={onCancelModal}
                initialValues={{
                    parentCategory: 'Electronics', // Example default value
                    categoryName: editCategory?.name,
                    categoryPosition: '1', // Example default value
                    categoryImage: 'https://example.com/image.jpg' // Example default value
                }}
                onFinish={onFinishModal}
            />
        </div>
    );
};


const Demo: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Folder Structure</h1>

            <div className="flex flex-col gap-2">
                {data.map((item, index) => (
                    <Accordion key={index} data={item} topLevel={true} />
                ))}
            </div>

        </div>
    );
};

export default Demo;
