import {
    Dropdown,
    Space,
    Table,
    TableProps,
    Image,
    message,
    Button,
} from 'antd';
import { EllipsisVertical } from 'lucide-react';
import React from 'react';
import { useBannersData } from './data_get_api';

const BannersTable: React.FC<{ data: any[] }> = ({ data }) => {
    const { editBanner, deleteBanner, refetch } = useBannersData();

    const handleDelete = async (record: any) => {
        try {
            await deleteBanner(record._id);
            message.success('Banner deleted successfully');
            refetch();
        } catch (err) {
            message.error('Failed to delete banner');
        }
    };

    const items = (record: any) => [
        {
            key: '1',
            label: <div onClick={() => handleDelete(record)}>Delete</div>,
        },
    ];

    const tableHead: TableProps<any>['columns'] = [
        {
            title: 'BANNER IMAGE',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (url: string) => (
                <Image
                    width={150}
                    height={80}
                    src={url}
                    alt="banner"
                    style={{ objectFit: 'cover', borderRadius: 6 }}
                />
            ),
        },
        {
            title: 'WORKSPACE ID',
            dataIndex: 'workspace_id',
            key: 'workspace_id',
        },
        {
            title: 'BANNER ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Dropdown
                        menu={{ items: items(record) }}
                        trigger={['click']}
                    >
                        <a>
                            <EllipsisVertical className="hover:cursor-pointer" />
                        </a>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={tableHead}
            dataSource={data}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
        />
    );
};

export default BannersTable;
