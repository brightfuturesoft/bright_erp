import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Radio, Tooltip } from 'antd';

interface ItemsHeaderProps {
    showModal: () => void;
}

const ItemsHeader: React.FC<ItemsHeaderProps> = ({ showModal }) => {
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
                <Button onClick={showModal}>Add Single Item</Button>
            </div>
        </div>
    );
};

export default ItemsHeader;
