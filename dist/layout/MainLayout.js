import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Outlet } from 'react-router-dom';
import HomeNav from '../Pages/BrightERP/Home/HomeComponents/HomeNav';
import Footer from '../Pages/BrightERP/Home/HomeComponents/Footer';
export default function MainLayout() {
    return _jsxs('div', {
        children: [
            _jsx(HomeNav, {}),
            _jsx('div', {
                className: 'mt-12 dark:bg-dark',
                children: _jsx(Outlet, {}),
            }),
            _jsx(Footer, {}),
        ],
    });
}
