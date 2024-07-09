import React, { useState } from 'react';
import { categories } from './Category.demo';
import RenderCategories from './Category.utils';
import { Button, Empty, Typography } from 'antd';
import AddCategoryModal from './components/AddCategoryModal';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { Search } from 'lucide-react';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Category = () => {
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [showDropdown, setShowDropdown] = useState<boolean | null>(null);
    const [addCategoryModalVisible, setAddCategoryModalVisible] =
        useState(false);
    const [searchToggle, setSearchToggle] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleAddClick = () => {
        setAddCategoryModalVisible(true);
        setShowDropdown(false); // Assuming you want to hide any dropdown menu on modal open
    };

    const handleFinishAddCategory = (values: any) => {
        console.log('New category:', values);
        setAddCategoryModalVisible(false); // Close modal after adding category
        // Add further logic if needed after adding a category
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mx-auto mt-3 text-black dark:text-white">
            <div className="flex justify-between items-center">
                <DashboardTitle
                    title="All Categories"
                    className="text-xl"
                />
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleAddClick}
                        type="primary"
                    >
                        Add New
                    </Button>
                    <Button
                        onClick={() => setSearchToggle(!searchToggle)}
                        type="primary"
                        icon={<Search size={16} />}
                        shape="circle"
                    />
                    <input
                        type="text"
                        className="md:block focus:border-gray-400 dark:border-gray-600 hidden bg-transparent px-2 py-1 border focus:border focus-within:border-none focus:outline-gray-100 rounded"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            {searchToggle && (
                <input
                    type="text"
                    className="block focus:border-gray-400 dark:border-gray-600 md:hidden bg-transparent mt-3 px-2 py-1 border focus:border focus-within:border-none w-full focus:outline-gray-100 rounded"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                />
            )}
            <div className="">
                {filteredCategories.length > 0 ? (
                    <RenderCategories
                        filteredCategories={filteredCategories}
                        addCategoryModalVisible={addCategoryModalVisible}
                        setAddCategoryModalVisible={setAddCategoryModalVisible}
                        setSelectedItem={setSelectedItem}
                        selectedItem={selectedItem} // Ensure selectedItem is passed here if needed
                        setShowDropdown={setShowDropdown}
                        showDropdown={showDropdown}
                    />
                ) : (
                    <div className="flex flex-col justify-center items-center mt-20 py-6">
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            description={
                                <Typography.Text className="text-dark dark:text-light">
                                    No Data Found
                                </Typography.Text>
                            }
                        >
                            <Button
                                onClick={handleAddClick}
                                type="primary"
                            >
                                Create Now
                            </Button>
                        </Empty>
                    </div>
                )}
            </div>

            {/* AddCategoryModal */}
            <AddCategoryModal
                visible={addCategoryModalVisible}
                onCancel={() => setAddCategoryModalVisible(false)}
                onOk={handleFinishAddCategory}
            />
        </div>
    );
};

export default Category;
