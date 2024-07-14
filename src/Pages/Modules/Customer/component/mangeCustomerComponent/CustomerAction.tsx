import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import DashboardTitle from '@modules/CommonComponents/DashboardTitle';
import { Button, Dropdown, Menu, MenuProps, Select, Space } from 'antd';
import {
    FileDown,
    FileUp,
    Filter,
    MoreVertical,
    Plus,
    Search,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../../../../common/SearchBar';
import DashboardContentHeader from '../../../../../wraper/DashboardContentHeader';

const { Option } = Select;

const CustomerAction: React.FC = ({
    searchText,
    handleSearch,
    filterCustomerType,
    handleFilterChange,
    filterCustomerStatus,
    start,
    loading,
    hasSelected,
    searchOn,
    setSearchOn,
    shareMenu,
    exportMenu,
    pageSize,
    handlePageSizeChange,
}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filterActionOn, setFilterActionOn] = useState(false);

    const handleMenuClick = (e: any) => {
        e.preventDefault();
        setDropdownVisible(true);
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <Link
                    className="flex items-center gap-1"
                    to="add-customer"
                    onClick={handleMenuClick}
                >
                    <Plus
                        size={16}
                        className={`${loading ? 'rotate-45' : 'rotate-0'} duration-150`}
                    />{' '}
                    Add Customer
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <button
                    className="flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none"
                    onClick={handleMenuClick}
                >
                    <ReloadOutlined
                        className={`${loading ? 'rotate-45' : 'rotate-0'} duration-150`}
                    />{' '}
                    Reload
                </button>
            ),
            key: '1',
        },
        {
            label: (
                <button
                    onClick={() => {
                        setSearchOn(!searchOn);
                        handleMenuClick;
                    }}
                    className="flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none"
                >
                    <Search size={15} />
                    Search
                </button>
            ),
            key: '2',
        },
        {
            label: (
                <div>
                    <Dropdown
                        overlay={shareMenu}
                        trigger={['click']}
                    >
                        <p
                            className="flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none"
                            onClick={handleMenuClick}
                        >
                            <ShareAltOutlined /> Share
                        </p>
                    </Dropdown>
                </div>
            ),
            key: '3',
        },
        {
            label: (
                <div>
                    <p
                        className="flex dark:!text-light !text-dark !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none"
                        onClick={handleMenuClick}
                    >
                        <FileUp size={17} /> Import
                    </p>
                </div>
            ),
            key: '4',
        },
        {
            label: (
                <div>
                    <Dropdown
                        overlay={exportMenu}
                        trigger={['click']}
                    >
                        <Button
                            className="flex dark:!text-light !text-dark !my-0 !py-0 !bg-transparent !px-0 !justify-start !text-start gap-1 w-full !items-center !border-none"
                            disabled={!hasSelected}
                            onClick={handleMenuClick}
                        >
                            <FileDown size={17} /> Export
                        </Button>
                    </Dropdown>
                </div>
            ),
            key: '5',
        },
    ];

    const exportMenuItems =
        exportMenu?.items?.map((item: any) => ({
            ...item,
            disabled: !hasSelected,
        })) || [];

    return (
        <div>
            <DashboardContentHeader>
                <DashboardTitle title="Manage Customer" />
                <div className="md:flex hidden items-center md:gap-2 gap-1 md:w-[85%] w-[90vw] justify-end">
                    <Link
                        className="!bg-[#3946d1] w-[65px] h-[40px] hidden md:flex items-center justify-center rounded-md !border-none !text-white text-nowrap text-sm"
                        to={`add-customer`}
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
                        size="middle"
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
                        className="!bg-[#3946d1] md:flex hidden items-center gap-1 py-[20px] !border-none !text-white"
                        size="middle"
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
                        size="middle"
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
                    <Dropdown
                        overlay={<Menu items={exportMenuItems} />}
                        trigger={['click']}
                    >
                        <Button
                            className="!bg-[#3946d1] !border-none h-[40px] flex gap-1 !text-white"
                            size="middle"
                            type="primary"
                            icon={<FileDown size={17} />}
                            disabled={!hasSelected}
                        >
                            Export
                        </Button>
                    </Dropdown>
                </div>

                <div className="md:hidden block">
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        visible={dropdownVisible}
                        onVisibleChange={setDropdownVisible}
                    >
                        <a onClick={e => e.preventDefault()}>
                            <Space>
                                <Button
                                    className="dark:!bg-gray-700 dark:text-light dark:border-none"
                                    shape="circle"
                                >
                                    <MoreVertical size={16} />
                                </Button>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </DashboardContentHeader>

            <div className="flex md:py-4 py-2 items-center justify-between">
                <h1 className="font-bold text-sm md:flex hidden items-center gap-1">
                    <Filter size={16} /> Filter
                </h1>
                <h1
                    onClick={() => setFilterActionOn(!filterActionOn)}
                    className="font-bold text-sm md:hidden flex items-center dark:bg-gray-700 px-3 py-1 rounded gap-1"
                >
                    <Filter size={16} /> Filter
                </h1>
                {/* filter action large */}
                <div className="flex items-center gap-2">
                    <div className="md:block hidden relative">
                        <SearchBar
                            width="100%"
                            searchText={searchText}
                            handleSearch={handleSearch}
                        />
                    </div>
                    <Select
                        className="!w-[120px] md:block hidden"
                        placeholder="Type"
                        value={filterCustomerType}
                        onChange={value =>
                            handleFilterChange('customerType', value)
                        }
                    >
                        <Option value="">All Types</Option>
                        <Option value="Regular">Regular</Option>
                        <Option value="Premium">Premium</Option>
                    </Select>
                    <Select
                        className="!w-[120px] md:block hidden"
                        placeholder="Status"
                        value={filterCustomerStatus}
                        onChange={value =>
                            handleFilterChange('customerStatus', value)
                        }
                    >
                        <Option value="">All Status</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                    <Select
                        className="!w-[80px] md:block hidden"
                        placeholder="Page Size"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={15}>15</Option>
                    </Select>
                </div>
            </div>
            {/* filter action small */}
            {filterActionOn && (
                <div className="flex overflow-hidden flex-wrap items-center gap-2">
                    <Select
                        className="!w-[110px] md:hidden block"
                        placeholder="Type"
                        value={filterCustomerType}
                        onChange={value =>
                            handleFilterChange('customerType', value)
                        }
                    >
                        <Option value="">All Types</Option>
                        <Option value="Regular">Regular</Option>
                        <Option value="Premium">Premium</Option>
                    </Select>
                    <Select
                        className="!w-[110px] md:hidden block"
                        placeholder="Status"
                        value={filterCustomerStatus}
                        onChange={value =>
                            handleFilterChange('customerStatus', value)
                        }
                    >
                        <Option value="">All Status</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                    <Select
                        className="!w-[80px] md:hidden block"
                        placeholder="Page Size"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={15}>15</Option>
                    </Select>
                </div>
            )}
        </div>
    );
};

export default CustomerAction;
