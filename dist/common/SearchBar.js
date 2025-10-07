import { jsx as _jsx } from 'react/jsx-runtime';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const SearchBar = ({
    searchText,
    handleSearch,
    width = '300px',
    placeholder = 'Search....',
}) => {
    return _jsx('div', {
        children: _jsx(Input, {
            className:
                '\n                    border border-gray-200 dark:border-gray-600 \n                    rounded-md px-3 h-[38px] py-0 \n                    bg-white dark:bg-gray-700 \n                    text-dark dark:text-white \n                    placeholder:text-gray-600 dark:placeholder:text-gray-300\n                    flex overflow-hidden\n                ',
            placeholder: placeholder ?? 'Search...',
            value: searchText,
            onChange: handleSearch,
            style: { width },
            suffix: _jsx(Space, {
                children: _jsx(SearchOutlined, {
                    className: 'dark:text-light text-dark',
                }),
            }),
        }),
    });
};
export default SearchBar;
