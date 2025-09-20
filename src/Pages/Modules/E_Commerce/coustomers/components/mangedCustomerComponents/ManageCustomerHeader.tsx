// @ts-nocheck

import React from 'react';
import { Button, Dropdown, Menu, Select } from 'antd';
import {
    ReloadOutlined,
    SearchOutlined,
    PlusOutlined,
    ShareAltOutlined,
    FileUp,
    FileDown,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MessageSquareMore, Mail, Edit } from 'lucide-react';

const { Option } = Select;

interface ManageCustomerHeaderProps {
    searchText: string;
    setSearchOn: React.Dispatch<React.SetStateAction<boolean>>;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterCustomerType: string;
    setFilterCustomerType: React.Dispatch<React.SetStateAction<string>>;
    filterCustomerStatus: string;
    setFilterCustomerStatus: React.Dispatch<React.SetStateAction<string>>;
}

const ManageCustomerHeader: React.FC<ManageCustomerHeaderProps> = ({
    searchText,
    setSearchOn,
    handleSearch,
    filterCustomerType,
    setFilterCustomerType,
    filterCustomerStatus,
    setFilterCustomerStatus,
}) => {
    const handleFilterChange = (type: string, value: string) => {
        if (type === 'customerType') {
            setFilterCustomerType(value);
        } else {
            setFilterCustomerStatus(value);
        }
    };

    const shareMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                <div className="flex items-center gap-1 w-[100px]">
                    <MessageSquareMore
                        size={21}
                        strokeWidth={1}
                    />{' '}
                    SMS
                </div>
            </Menu.Item>
            <Menu.Item key="2">
                <div className="flex items-center gap-1 w-[100px]">
                    <Mail
                        size={21}
                        strokeWidth={1}
                    />{' '}
                    Email
                </div>
            </Menu.Item>
        </Menu>
    );

    const menu = (
        <Menu className="w-[160px]">
            <Menu.Item
                key="edit"
                onClick={() => handleEdit(record)}
            >
                <div className="flex items-center gap-1">
                    <Edit size={17} /> Edit
                </div>
            </Menu.Item>
            <Menu.Item
                key="delete"
                onClick={() => handleDelete(record.key)}
            >
                <div className="flex items-center gap-1">
                    <DeleteOutlined /> Delete
                </div>
            </Menu.Item>
        </Menu>
    );

    const handleMenuClick = e => {
        message.info('Click on menu item.');
    };

    return (
        <div className="flex items-center md:gap-2 gap-1 md:w-[85%] w-[90vw] justify-end">
            <SearchBar
                width="100%"
                searchText={searchText}
                handleSearch={handleSearch}
            />

            <Select
                className="!w-[120px] md:block hidden"
                placeholder="Type"
                value={filterCustomerType}
                onChange={value => handleFilterChange('customerType', value)}
            >
                <Option value="">All Types</Option>
                <Option value="Regular">Regular</Option>
                <Option value="Premium">Premium</Option>
            </Select>

            <Select
                className="!w-[120px] md:block hidden"
                placeholder="Status"
                value={filterCustomerStatus}
                onChange={value => handleFilterChange('customerStatus', value)}
            >
                <Option value="">All Status</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
            </Select>

            <Link
                className="!bg-[#3946d1] w-[65px] h-[40px] hidden md:flex items-center justify-center rounded-md !border-none !text-white text-nowrap text-sm"
                to={`create-customer`}
            >
                + Add
            </Link>

            <Link
                className="!bg-[#3946d1] w-[31px] h-[31px] md:hidden flex items-center justify-center rounded-full !border-none !text-white text-nowrap text-sm"
                to={`create-customer`}
            >
                <PlusOutlined style={{ fontSize: 14 }} />
            </Link>

            <Button
                className="!bg-[#3946d1] rounded-full md:hidden block !border-none !text-white"
                size="medium"
                shape={'circle'}
                type="primary"
                onClick={start}
                disabled={!hasSelected}
                loading={loading}
                icon={
                    <ReloadOutlined
                        className={`${loading ? 'rotate-45' : 'rotate-0'} duration-150`}
                    />
                }
            />
            <Button
                className="!bg-[#3946d1]  md:flex hidden items-center gap-1 py-[20px] !border-none !text-white"
                size="medium"
                shape={'default'}
                type="primary"
                onClick={start}
                disabled={!hasSelected}
                loading={loading}
            >
                Reload
            </Button>
            <Button
                onClick={() => setSearchOn(!searchOn)}
                className="!bg-[#3946d1] rounded-full md:hidden flex !border-none !text-white"
                size="medium"
                shape={'circle'}
                type="primary"
                icon={<SearchOutlined style={{ fontSize: 16 }} />}
            />

            <Dropdown
                overlay={shareMenu}
                trigger={['click']}
            >
                <Button
                    className="!bg-[#3946d1] h-[40px] !border-none !text-white"
                    size="middle"
                    type="primary"
                    icon={<ShareAltOutlined />}
                >
                    Share
                </Button>
            </Dropdown>

            <Button
                className="!bg-[#3946d1] !border-none h-[40px] flex gap-1 !text-white"
                size="middle"
                type="primary"
                icon={<FileUp size={17} />}
            >
                Import
            </Button>

            <Button
                className="!bg-[#3946d1] !border-none h-[40px] flex gap-1 !text-white"
                size="middle"
                type="primary"
                icon={<FileDown size={17} />}
            >
                Export
            </Button>
        </div>
    );
};

export default ManageCustomerHeader;
