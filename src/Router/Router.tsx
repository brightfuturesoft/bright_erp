import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import { Bright_ERP_path } from './Bright_ERP_path';
import { Modules_path } from './Modules_path';
import PaymentLayout from '../layout/PaymentLayout';

const router = createBrowserRouter([
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: Modules_path
    },
    {
        path: '/',
        element: <MainLayout />,
        children: Bright_ERP_path
    }, {
        path: '/pricing/payment',
        element: <PaymentLayout />
    }
]);

export default router;
