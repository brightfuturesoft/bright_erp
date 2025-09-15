import ScrollToTop from '@/Hooks/ScrollTop';
import Buisness from '@/Pages/Modules/dashboard/business/Buisness';
import Direct_POS from '@/Pages/Modules/direct_pos/Direct_POS';
import { Navigate } from 'react-router-dom';

export const POS_path = [
    {
        path: '',
        element: (
            <>
                <ScrollToTop />
                <Direct_POS />
            </>
        ), // Redirect from default path to 'business'
    },
];
