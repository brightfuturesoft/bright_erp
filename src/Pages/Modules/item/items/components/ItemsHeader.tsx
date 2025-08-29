import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Radio, Tooltip } from 'antd';
import DashboardContentHeader from '@/wraper/DashboardContentHeader';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';

const ItemsHeader: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex justify-between items-center">
                <DashboardTitle title="All Items" />
            </div>

            <div className="flex gap-2">
                <Tooltip title="export">
                    <Button
                        shape="circle"
                        icon={<DownloadOutlined />}
                        className="!bg-gray-200 !hover:bg-gray-500 dark:!bg-gray-800 dark:!hover:bg-gray-700 !border-none"
                    />
                </Tooltip>

                <Tooltip title="import">
                    <Button
                        shape="circle"
                        icon={<UploadOutlined />}
                        className="!bg-blue-600 !hover:bg-blue-500 dark:!bg-blue-800 dark:!hover:bg-blue-700 !border-none"
                    />
                </Tooltip>

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
