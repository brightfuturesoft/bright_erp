import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import ScrollToTop from '@/Hooks/ScrollTop';
import Manage_store from '@/Pages/Admin/All_shop/Manage_Store';
import Admin_dashboard from '@/Pages/Admin/Dashboard/Admin_dashboard';
import Add_subscription from '@/Pages/Admin/Subcription/Add_subcription';
import Manage_subscription from '@/Pages/Admin/Subcription/Manage_subscription';
export const Admin_path = [
    {
        path: 'dashboard',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Admin_dashboard, {})],
        }),
    },
    {
        path: 'manage-shop',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Manage_store, {})],
        }),
    },
    // manage - subscription
    {
        path: 'manage-subscription',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Manage_subscription, {})],
        }),
    },
    {
        path: 'manage-subscription/add-subscription',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Add_subscription, {})],
        }),
    },
];
