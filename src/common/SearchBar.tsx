import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';

const SearchBar = ({
    searchText,
    handleSearch,
    width = '300px',
    placeholder = 'Search....',
}) => {
    return (
        <div>
            <Input
                className="dar:!border-red-600 border-gray-200 flex overflow-hidden bg-transparent px-3 py-0 !border rounded-md dark:text-white text-dark placeholder:text-gray-600"
                placeholder={placeholder ?? 'Search...'}
                value={searchText}
                onChange={handleSearch}
                style={{ width: `${width}` }}
                suffix={
                    <Space>
                        <SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Space>
                }
            />
        </div>
    );
};

export default SearchBar;
