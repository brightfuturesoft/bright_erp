import React, { useState } from 'react';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { categories } from './Category.demo';
import Accordion from './components/Accordion';
import AddCategoryModal from './components/AddCategoryModal';
import EditCategoryModal from './components/EditCategoryModal';
import { MoreVertical } from 'lucide-react';
import AddDiscountModal from './components/AddDiscountModal';

const data = categories;
interface RenderCategoriesProps {
    filteredCategories: any[];
    addCategoryModalVisible: boolean;
    setAddCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
    selectedItem: any;
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean | null>>;
    showDropdown: boolean | null;
}

const RenderCategories: React.FC<RenderCategoriesProps> = ({
    filteredCategories,
    addCategoryModalVisible,
    setAddCategoryModalVisible,
    setSelectedItem,
    selectedItem,
    setShowDropdown,
    showDropdown,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [editCategory, setEditCategory] = useState<any>(null);
    const [selectedActionData, setSelectedActionData] = useState<any>(null);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addDiscountModalVisible, setAddDiscountModalVisible] =
        useState(false);

    const handleButtonClick = (item: any) => {
        if (item.children && item.children.length > 1) {
            setSelectedItem(item);
            setModalVisible(true);
        }
    };

    const toggleDropdown = (itemName: string | null) => {
        setShowDropdown(itemName === showDropdown ? null : itemName);
    };

    const handleEditClick = (item: any) => {
        setEditCategory(item);
        setEditModalVisible(true);
        setShowDropdown(null);
    };

    const handleFinishEdit = (values: any) => {
        console.log('Updated category:', values);
        setEditModalVisible(false);
    };

    const handleFinishAddCategory = (values: any) => {
        console.log('New category:', values);
        setAddCategoryModalVisible(false);
    };

    const handleAddDiscountClick = () => {
        setAddDiscountModalVisible(true);
        setShowDropdown(null);
    };

    const handleFinishAddDiscount = (values: any) => {
        console.log('New discount:', values);
        setAddDiscountModalVisible(false);
    };

    const handleMove = (data: any) => {
        setSelectedActionData(data);
        console.log('Move data:', data);
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
        console.log('Status data:', id);
    };

    const handleDelete = (id: any) => {
        console.log('Delete data:', id);
    };

    const menu = (item: any) => (
        <Menu className="min-w-[160px]">
            <Menu.Item
                key="1"
                onClick={() => handleEditClick(item)}
            >
                Edit
            </Menu.Item>
            <Menu.Item
                key="2"
                onClick={() => handleAddCategoryClick(item)}
            >
                Add Category
            </Menu.Item>
            <Menu.Item
                key="3"
                onClick={() => handleMove(item)}
            >
                Move {item?.name}
            </Menu.Item>
            <Menu.Item
                key="4"
                onClick={() => handleStatus(item)}
            >
                Inactive
            </Menu.Item>
            <Menu.Item
                key="5"
                onClick={() => handleDelete(item)}
            >
                Delete
            </Menu.Item>
            <Menu.Item
                key="6"
                onClick={handleAddDiscountClick}
            >
                Add Discount
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="mt-3">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {filteredCategories?.map((itm, index) => (
                    <div
                        key={itm?.name}
                        className="relative border-gray-200 dark:border-gray-700 bg-gray-10 dark:hover:bg-gray-800 border rounded-lg transition-all duration-200 overflow-hidden"
                    >
                        <div className="flex justify-between items-center lg:px-2 lg:py-2 p-2">
                            {/* Display category information */}
                            <div className="flex justify-start items-center space-x-2">
                                <img
                                    src={itm?.img}
                                    alt={index}
                                    className="border-gray-600 border rounded w-16 h-16"
                                />
                                <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-700 w-px h-16" />
                                <div>
                                    <h3 className="font-bold text-gray-500 text-sm sm:text-base lg:text-md">
                                        <a
                                            href="#"
                                            title=""
                                        >
                                            {itm.name}
                                            <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </h3>
                                    <p className="mt-2 font-medium text-gray-500 text-sm">
                                        {itm?.type}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Dropdown for actions */}
                                <Dropdown
                                    overlay={() => menu(itm)}
                                    placement="bottomRight"
                                    visible={showDropdown === itm.name}
                                    onVisibleChange={() =>
                                        toggleDropdown(itm.name)
                                    }
                                >
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        size="small"
                                        icon={<MoreVertical size={17} />}
                                        className="bg-gray-50 hover:!bg-transparent dark:bg-light-dark hover:opacity-1 shadow-none !text-gray-500"
                                    />
                                </Dropdown>

                                {/* Display expand icon if category has children */}
                                {itm.children && (
                                    <Button
                                        onClick={() => handleButtonClick(itm)}
                                        type="default"
                                        shape="circle"
                                        size="small"
                                        icon={<CaretDownOutlined size={10} />}
                                        className="bg-gray-50 hover:!bg-transparent dark:bg-light-dark hover:opacity-1 shadow-none !text-gray-500"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals for editing and adding categories */}
            <Modal
                title="Categories"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {selectedItem && <Accordion data={selectedItem} />}
            </Modal>

            <EditCategoryModal
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onOk={handleFinishEdit}
                category={editCategory}
            />

            <AddCategoryModal
                visible={addCategoryModalVisible}
                onCancel={() => setAddCategoryModalVisible(false)}
                onOk={handleFinishAddCategory}
                parentCategory={selectedItem}
            />

            {/* AddDiscountModal */}
            <AddDiscountModal
                visible={addDiscountModalVisible}
                onCancel={() => setAddDiscountModalVisible(false)}
                onOk={handleFinishAddDiscount}
            />
        </div>
    );
};

export default RenderCategories;
