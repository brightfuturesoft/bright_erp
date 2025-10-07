import { jsx as _jsx } from 'react/jsx-runtime';
import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const HeaderComponent = () => {
    return _jsx('div', {
        className: 'flex gap-2',
        children: _jsx(Tooltip, {
            title: 'export',
            children: _jsx(Button, {
                className: ' ',
                shape: 'circle',
                icon: _jsx(DownloadOutlined, { className: 'text-red-500' }),
            }),
        }),
    });
};
export default HeaderComponent;
