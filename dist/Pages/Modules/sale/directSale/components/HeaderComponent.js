import { jsx as _jsx } from 'react/jsx-runtime';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
const HeaderComponent = () => {
    return _jsx('div', {
        className: 'flex gap-2',
        children: _jsx(Link, {
            to: 'direct-sale-create',
            children: _jsx(Button, { children: 'Add Direct Sale' }),
        }),
    });
};
export default HeaderComponent;
