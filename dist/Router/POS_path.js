import {
    jsx as _jsx,
    Fragment as _Fragment,
    jsxs as _jsxs,
} from 'react/jsx-runtime';
import ScrollToTop from '@/Hooks/ScrollTop';
import Direct_POS from '@/Pages/Modules/Direct_POS/Direct_POS';
export const POS_path = [
    {
        path: '',
        element: _jsxs(_Fragment, {
            children: [_jsx(ScrollToTop, {}), _jsx(Direct_POS, {})],
        }), // Redirect from default path to 'business'
    },
];
