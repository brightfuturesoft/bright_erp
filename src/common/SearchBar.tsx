import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const SearchBar = ({
    searchText,
    handleSearch,
    width = '300px',
    placeholder = 'Search....',
}) => {
    return (
        <div>
            <Input
                className="
                    border border-gray-200 dark:border-gray-600 
                    rounded-md px-3 h-[38px] py-0 
                    bg-white dark:bg-gray-700 
                    text-dark dark:text-white 
                    placeholder:text-gray-600 dark:placeholder:text-gray-300
                    flex overflow-hidden
                "
                placeholder={placeholder ?? 'Search...'}
                value={searchText}
                onChange={handleSearch}
                style={{ width }}
                suffix={
                    <Space>
                        <SearchOutlined className="dark:text-light text-dark" />
                    </Space>
                }
            />
        </div>
    );
};

export default SearchBar;
