import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import {
    PlusOutlined,
    SearchOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
const ButtonAction = ({
    hasSelected,
    loading,
    start,
    setSearchOn,
    searchOn,
}) => {
    return _jsxs('div', {
        className: 'md:hidden flex items-center gap-1',
        children: [
            _jsx(Link, {
                className:
                    '!bg-[#3946d1] w-[32px] h-[32px] flex items-center justify-center rounded-full !border-none !text-white text-nowrap text-sm',
                to: `create-customer`,
                children: _jsx(PlusOutlined, { style: { fontSize: 14 } }),
            }),
            _jsx(Button, {
                className:
                    '!bg-[#3946d1] rounded-full !border-none !text-white',
                size: 'medium',
                shape: 'circle',
                type: 'primary',
                onClick: start,
                disabled: !hasSelected,
                loading: loading,
                icon: _jsx(ReloadOutlined, {
                    className: `${loading ? 'rotate-45' : 'rotate-0'} duration-150`,
                }),
            }),
            _jsx(Button, {
                className:
                    '!bg-[#3946d1] rounded-full !border-none !text-white',
                size: 'medium',
                shape: 'circle',
                type: 'primary',
                loading: loading,
                icon: _jsx(SearchOutlined, { style: { fontSize: 16 } }),
            }),
        ],
    });
};
export default ButtonAction;
