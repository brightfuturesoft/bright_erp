import ScrollToTop from '@/Hooks/ScrollTop';
import Manage_store from '@/Pages/Admin/All_shop/Manage_Store';
import Admin_dashboard from '@/Pages/Admin/Dashboard/Admin_dashboard';
import Add_subscription from '@/Pages/Admin/Subcription/Add_subcription';
import Manage_subscription from '@/Pages/Admin/Subcription/Manage_subscription';

export const Admin_path = [
    {
        path: 'dashboard',
        element: (
            <>
                <ScrollToTop />
                <Admin_dashboard />
            </>
        ),
    },
    {
        path: 'manage-shop',
        element: (
            <>
                <ScrollToTop />
                <Manage_store />
            </>
        ),
    },
    // manage - subscription
    {
        path: 'manage-subscription',
        element: (
            <>
                <ScrollToTop />
                <Manage_subscription />
            </>
        ),
    },
    {
        path: 'manage-subscription/add-subscription',
        element: (
            <>
                <ScrollToTop />
                <Add_subscription />
            </>
        ),
    },
];
