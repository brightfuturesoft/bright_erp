import React, { useState } from 'react';
import { categories } from './Category.demo';
import RenderCategories from './Category.utils';
import { Button, Empty, Typography } from 'antd';
import AddCategoryModal from './components/AddCategoryModal';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { Search } from 'lucide-react';
import {
    DownloadOutlined,
    HomeOutlined,
    PlusOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CategoryDashboard from './CategoryDashboard';

const Category = () => {
    return (
        <div className="mx-auto mt-3 text-black dark:text-white">
            <div className="flex justify-between items-center">
                <DashboardTitle title="All Category" />
            </div>
            <CategoryDashboard />
        </div>
    );
};

export default Category;
