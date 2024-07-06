/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { MoreVertical, ArrowRight } from 'lucide-react';
import EditCategoryModal from './EditCategoryModal';
import AddDiscountModal from './AddDiscountModal';

const Accordion: React.FC<{ data: any, topLevel?: boolean, path?: string }> = ({ data, topLevel = false, path = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null); // State to track edited category
    const [addCategoryParent, setAddCategoryParent] = useState<any>(null); // State to track parent for new category
    const [editModalVisible, setEditModalVisible] = useState(false); // State to control edit modal visibility
    const [addModalVisible, setAddModalVisible] = useState(false); // State to control add modal visibility
    const [selectedActionData, setSelectedActionData] = useState<any>(null); // State to store data for move or inactive action

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const itemName = path ? `${path} >> ${data.name}` : data.name;

    const handleEditClick = () => {
        setEditCategory(data);
        setEditModalVisible(true);
        setShowDropdown(false);
    };

    const handleAddClick = () => {
        setAddCategoryParent(data);
        setAddModalVisible(true);
        setShowDropdown(false);
    };
    const handleFinishAdd = (values: any) => {
        console.log('New category:', values);
        setAddModalVisible(false);
    };

    const handleFinishEdit = (values: any) => {
        console.log('Updated category:', values);
        setEditModalVisible(false);
    };



    const handleMove = (data: any) => {
        setSelectedActionData(data);
        console.log("Move data:", data);
        Modal.confirm({
            title: 'Confirm Move',
            content: `Move category: ${data.name}`,
            okText: 'Move',
            cancelText: 'Cancel',
            onOk() {
                // Perform move action here if needed
                console.log('Category moved:', data);
            },
        });
    };

    const handleStatus = (id: any) => {
        console.log("Status data:", id);
    };

    const handleDelete = (id: any) => {
        console.log("Delete data:", id);
    };

    const handleDiscount = () => {
        setAddModalVisible(true); // Set addModalVisible to true to show AddDiscountComponent
        setShowDropdown(false); // Close dropdown after clicking "Add Discount"
    };

    const menu = (
        <Menu className='min-w-[160px]'>
            <Menu.Item key="1" onClick={handleEditClick}>Edit</Menu.Item>
            <Menu.Item key="2" onClick={handleAddClick}>Add Category</Menu.Item>
            <Menu.Item key="3" onClick={() => handleMove(data)}>Move {data?.name}</Menu.Item>
            <Menu.Item key="4" onClick={() => handleStatus(data)}>Inactive</Menu.Item>
            <Menu.Item key="5" onClick={() => handleDelete(data)}>Delete</Menu.Item>
            <Menu.Item key="6" onClick={handleDiscount}>Add Discount</Menu.Item>
        </Menu>
    );

    return (
        <div className={`${topLevel ? 'border border-gray-300 rounded' : ''}`}>
            <div className="flex items-center cursor-pointer p-2">
                {data.children ? (
                    <ArrowRight onClick={toggleAccordion} size={17} className="mr-2 text-gray-500" />
                ) : (<div className='w-[20px]'></div>)}
                <span onClick={toggleAccordion} className={`ml-2 w-full ${path && !data.children ? 'text-sm text-gray-500' : path ? 'font-bold text-gray-400 text-sm' : 'font-bold dark:text-gray-100 text-primary'}`}>{itemName}</span>

                {/* Dropdown menu */}
                <Dropdown
                    overlay={menu}
                    placement="bottomRight"
                    visible={showDropdown}
                    onVisibleChange={toggleDropdown}
                >
                    <Button
                        type='primary'
                        shape='circle'
                        icon={<MoreVertical size={17} />}
                        className="ml-auto dark:bg-gray-700 bg-gray-100 shadow-none text-gray-600 px-2 py-1 rounded-md"
                    />
                </Dropdown>
            </div>

            {isOpen && data.children && (
                <div>
                    {data.children.map((child: any, index: number) => (
                        <Accordion key={index} data={child} path={itemName} />
                    ))}
                </div>
            )}

            {editModalVisible && (
                <EditCategoryModal
                    visible={editModalVisible}
                    onCancel={() => setEditModalVisible(false)}
                    onOk={handleFinishEdit}
                    category={editCategory}
                />
            )}

            {addModalVisible && (
                <AddDiscountModal
                    visible={addModalVisible}
                    onCancel={() => setAddModalVisible(false)}
                    onOk={handleFinishAdd}
                />
            )}

        </div>
    );
};

export default Accordion;
