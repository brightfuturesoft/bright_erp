import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
    return (
        <div className="flex gap-2">
            <Tooltip title="export">
                <Button
                    className=" "
                    shape="circle"
                    icon={<DownloadOutlined className="text-red-500" />}
                />
            </Tooltip>
        </div>
    );
};

export default HeaderComponent;
