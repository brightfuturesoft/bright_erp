import { jsx as _jsx } from 'react/jsx-runtime';
const DashboardTitle = ({ title }) => {
    return _jsx('h1', {
        className:
            'font-semibold text-light-dark md:text-xl text-sm whitespace-nowrap gap-2 dark:text-gray-300',
        children: title,
    });
};
export default DashboardTitle;
