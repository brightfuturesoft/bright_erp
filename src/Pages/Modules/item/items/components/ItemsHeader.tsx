import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';

const ItemsHeader: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex justify-between items-center">
                <DashboardTitle title="All Items" />
            </div>

            <div className="flex gap-2">
                <Link to="create_item">
                    <Button className="!bg-blue-600 !text-white !hover:bg-gray-500 dark:!bg-gray-800 dark:!text-white dark:!hover:bg-gray-700 !border-none">
                        Add Single Item
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ItemsHeader;
