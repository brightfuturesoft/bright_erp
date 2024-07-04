import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { MoreVertical, ArrowRight } from 'lucide-react';
import EditCategoryModal from './EditItemModal';

const Accordion: React.FC<{ data: any, topLevel?: boolean, path?: string }> = ({ data, topLevel = false, path = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null); // State to track edited category
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const itemName = path ? `${path} >> ${data.name}` : data.name;

    const handleEditClick = () => {
        setEditCategory(data);
        setModalVisible(true);
        setShowDropdown(false);
    };

    const handleFinishEdit = (values: any) => {
        console.log('Updated category:', values);
        setModalVisible(false);
    };

    const menu = (
        <Menu className='w-[160px]'>
            <Menu.Item key="1" onClick={handleEditClick}>Edit</Menu.Item>
        </Menu>
    );

    return (
        <div className={`${topLevel ? 'border border-gray-300 rounded' : ''}`}>
            <div className="flex items-center cursor-pointer p-2">
                {data.children ? (
                    <ArrowRight onClick={toggleAccordion} size={17} className="mr-2 text-gray-500" />
                ) : (<div className='w-[20px]'></div>)}
                <span onClick={toggleAccordion} className={`ml-2 ${path && !data.children ? 'text-sm text-gray-500' : path ? 'font-bold text-gray-400 text-sm' : 'font-bold dark:text-gray-100 text-primary'}`}>{itemName}</span>

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

            {modalVisible && (
                <EditCategoryModal
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    onOk={handleFinishEdit}
                    category={editCategory}
                />
            )}
        </div>
    );
};

export default Accordion;
