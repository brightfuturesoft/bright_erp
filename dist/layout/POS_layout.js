import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Header from '@/Pages/Modules/Direct_POS/components/Pos_head';
import { Outlet } from 'react-router-dom';
const POS_layout = () => {
    return _jsx('div', {
        className: 'bg-dark-gray',
        children: _jsxs('div', {
            className: 'bg-dark-gray',
            children: [_jsx(Header, {}), _jsx(Outlet, {})],
        }),
    });
};
export default POS_layout;
