import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <div className="flex gap-2">
            <Tooltip title="export">
                <Button
                    shape="circle"
                    icon={<DownloadOutlined color="red" />}
                />
            </Tooltip>
            <Link to={'direct-sale-create'}>
                <Button>Add Direct Sale</Button>
            </Link>
        </div>
    );
};

export default HeaderComponent;
