import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import CategoryDashboard from './CategoryDashboard';
const Category = () => {
    return _jsxs('div', {
        className: 'mx-auto mt-3 text-black dark:text-white',
        children: [
            _jsx('div', {
                className: 'flex justify-between items-center',
                children: _jsx(DashboardTitle, { title: 'All Category' }),
            }),
            _jsx(CategoryDashboard, {}),
        ],
    });
};
export default Category;
