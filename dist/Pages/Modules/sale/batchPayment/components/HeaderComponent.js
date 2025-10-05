import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const HeaderComponent = () => {
    return _jsxs('div', {
        className: 'flex gap-2',
        children: [
            _jsx(Tooltip, {
                title: 'export',
                children: _jsx(Button, {
                    shape: 'circle',
                    icon: _jsx(DownloadOutlined, { color: 'red' }),
                }),
            }),
            _jsx(Button, { children: 'Make Batch Payment' }),
        ],
    });
};
export default HeaderComponent;
