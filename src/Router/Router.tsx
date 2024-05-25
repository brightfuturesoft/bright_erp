import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: 'home',
                element: <>ngbjhgfhgtf</>,
            },
        ],
    },
]);

export default router;
