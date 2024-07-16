import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
    return (
        <div className="flex gap-2">
            <Tooltip title="export">
                <Button
                    shape="circle"
                    icon={<DownloadOutlined color="red" />}
                />
            </Tooltip>
        </div>
    );
};

export default HeaderComponent;
