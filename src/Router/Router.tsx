import { createBrowserRouter } from 'react-router-dom';
// import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import { Bright_ERP_path } from './Bright_ERP_path';
import { Modules_path } from './Modules_path';
import PaymentLayout from '../layout/PaymentLayout';
// import About from '../Pages/BrightERP/About/About';
import NotFound from '../Pages/Error/NotFound';
import ScrollToTop from '@/Hooks/ScrollTop';
import MainLayout from '@/layout/MainLayout';

// import ScrollToTop from '../Hooks/ScrollTop';

const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: (
            <>
                <ScrollToTop />
                <DashboardLayout />
            </>
        ),
        children: Modules_path,
    },
    {
        path: '/',
        element: (
            <>
                <ScrollToTop />
                <MainLayout />
            </>
        ),
        children: Bright_ERP_path,
    },

    {
        path: '/payment',
        element: (
            <>
                <ScrollToTop />
                <PaymentLayout />
            </>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
