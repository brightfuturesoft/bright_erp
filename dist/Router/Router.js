import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import { createBrowserRouter } from 'react-router-dom';
// import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import { Bright_ERP_path } from './Bright_ERP_path';
import { Modules_path } from './Modules_path';
import PaymentLayout from '../layout/PaymentLayout';
// import About from '../Pages/BrightERP/About/About';
import NotFound from '../Pages/Error/NotFound';
// @ts-ignore
import ScrollToTop from '@/Hooks/ScrollTop';
// @ts-ignore
import MainLayout from '@/layout/MainLayout';
import { POS_path } from './POS_path';
import POS_layout from '@/layout/POS_layout';
import { Admin_path } from './Admin_path';
// import ScrollToTop from '@Hooks/ScrollTop';
const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(DashboardLayout, {})],
        }),
        children: Modules_path,
    },
    {
        path: '/',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(MainLayout, {})],
        }),
        children: Bright_ERP_path,
    },
    {
        path: '/payment',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(PaymentLayout, {})],
        }),
    },
    {
        path: '/direct-pos',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(POS_layout, {})],
        }),
        children: POS_path,
    },
    {
        path: '*',
        element: _jsx(NotFound, {}),
    },
    {
        path: '/admin',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(DashboardLayout, {})],
        }),
        children: Admin_path,
    },
]);
export default router;
