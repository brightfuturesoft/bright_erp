import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import { Bright_ERP_path } from './Bright_ERP_path';
import { Modules_path } from './Modules_path';
import PaymentLayout from '../layout/PaymentLayout';
import About from '../Pages/BrightERP/About/About';
import NotFound from '../Pages/Error/NotFound';
import SIgnUp from '../Pages/Registation/SIgnUp';
import SignIn from '../Pages/Registation/SignIn';
import Pricing from '../Pages/BrightERP/Pricing/Pricing';

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
    },
    {
        path: '/payment',
        element: <PaymentLayout />,
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/signup',
        element: <SIgnUp />
    },
    {
        path: '/signin',
        element: <SignIn />
    }
]);

export default router;
