import {
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import DashboardTitle from '@modules/CommonComponents/DashboardTitle';
import { Button, Dropdown, Input, Select } from 'antd';
import { FileDown, FileUp, Filter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../../../../common/SearchBar';
import DashboardContentHeader from '../../../../../wraper/DashboardContentHeader';

const CustomerAction = ({
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
    pageSizeMenu,
    pageSize,
    handlePageSizeChange,
}) => {
    return (
        <div>
            <DashboardContentHeader>
                <DashboardTitle title="Manage Customer" />

                <div className="flex items-center md:gap-2 gap-1 md:w-[85%] w-[90vw] justify-end">
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
                        className="!bg-[#3946d1]  md:flex hidden items-center gap-1 py-[20px] !border-none !text-white"
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
                        overlay={exportMenu}
                        trigger={['click']}
                    >
                        <Button
                            className="!bg-[#3946d1] !border-none h-[40px] flex gap-1 !text-white"
                            size="middle"
                            type="primary"
                            icon={<FileDown size={17} />}
                            disabled={hasSelected ? false : true}
                        >
                            Export
                        </Button>
                    </Dropdown>
                </div>
            </DashboardContentHeader>

            <div className="flex py-2 items-center justify-between">
                <h1 className="font-bold text-sm flex items-center gap-1">
                    <Filter size={16} /> Filter
                </h1>
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
                        onChange={handlePageSizeChange} // Update here
                    >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={15}>15</Option>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default CustomerAction;
