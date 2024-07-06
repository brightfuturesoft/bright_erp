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
    const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
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



            <div className="flex items-center justify-between">
                <DashboardTitle title="All Categories" className="text-xl" />
                <div className="flex items-center gap-2">
                    <Button onClick={handleAddClick} type="primary">Add New</Button>
                    <Button
                        onClick={() => setSearchToggle(!searchToggle)}
                        type='primary'
                        icon={<Search size={16} />}
                        shape='circle' />
                    <input
                        type="text"
                        className="bg-transparent md:block hidden border focus-within:border-none focus:border dark:border-gray-600 focus:border-gray-400 focus:outline-gray-100 py-1 px-2 rounded"
                        placeholder='Search...'
                        value={search}
                        onChange={handleSearchChange}
                    />

                </div>
            </div>
            {searchToggle &&
                <input
                    type="text"
                    className="bg-transparent md:hidden block w-full mt-3 border focus-within:border-none focus:border dark:border-gray-600 focus:border-gray-400 focus:outline-gray-100 py-1 px-2 rounded"
                    placeholder='Search...'
                    value={search}
                    onChange={handleSearchChange}
                />
            }
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
                    <div className="flex mt-20 justify-center flex-col items-center py-6">
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            description={
                                <Typography.Text className='dark:text-light text-dark'>
                                    No Data Found
                                </Typography.Text>
                            }
                        >
                            <Button onClick={handleAddClick} type="primary">Create Now</Button>
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
