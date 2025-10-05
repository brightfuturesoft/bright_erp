import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';
const ItemsHeader = () => {
    return _jsxs('div', {
        className: 'flex flex-wrap justify-between items-center gap-2',
        children: [
            _jsx('div', {
                className: 'flex justify-between items-center',
                children: _jsx(DashboardTitle, { title: 'All Items' }),
            }),
            _jsxs('div', {
                className: 'flex gap-2',
                children: [
                    _jsx(Tooltip, {
                        title: 'export',
                        children: _jsx(Button, {
                            shape: 'circle',
                            icon: _jsx(DownloadOutlined, {}),
                            className:
                                '!bg-gray-200 !hover:bg-gray-500 dark:!bg-gray-800 dark:!hover:bg-gray-700 !border-none',
                        }),
                    }),
                    _jsx(Tooltip, {
                        title: 'import',
                        children: _jsx(Button, {
                            shape: 'circle',
                            icon: _jsx(UploadOutlined, {}),
                            className:
                                '!bg-blue-600 !hover:bg-blue-500 dark:!bg-blue-800 dark:!hover:bg-blue-700 !border-none',
                        }),
                    }),
                    _jsx(Link, {
                        to: 'create_item',
                        children: _jsx(Button, {
                            className:
                                '!bg-blue-600 !text-white !hover:bg-gray-500 dark:!bg-gray-800 dark:!text-white dark:!hover:bg-gray-700 !border-none',
                            children: 'Add Single Item',
                        }),
                    }),
                ],
            }),
        ],
    });
};
export default ItemsHeader;
