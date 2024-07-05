import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Radio, Tooltip } from 'antd';

const ItemsHeader: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
                <Radio.Group
                    defaultValue="items"
                    buttonStyle="solid"
                >
                    <Radio.Button value="items">Items</Radio.Button>
                    <Radio.Button value="itemsGroup">Item Groups</Radio.Button>
                </Radio.Group>
            </div>
            <div className="flex gap-2">
                <Tooltip title="export">
                    <Button
                        shape="circle"
                        icon={<DownloadOutlined color="red" />}
                    />
                </Tooltip>
                <Tooltip title="import">
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<UploadOutlined />}
                    />
                </Tooltip>
                <Link to="/item/items/create-item">
                    <Button>Add Single Item</Button>
                </Link>
            </div>
        </div>
    );
};

export default ItemsHeader;
