import { jsx as _jsx } from 'react/jsx-runtime';
const DashboardHeader = ({ children }) => {
    return _jsx('div', {
        className:
            'flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-md',
        children: children,
    });
};
export default DashboardHeader;
