import DashboardTitle from '../../CommonComponents/DashboardTitle';
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
