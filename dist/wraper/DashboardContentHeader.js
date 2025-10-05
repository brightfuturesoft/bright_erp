import { jsx as _jsx } from 'react/jsx-runtime';
// @ts-ignore
const DashboardContentHeader = ({ children }) => {
    return _jsx('div', {
        className:
            'flex justify-between items-center border-gray-100 dark:border-gray-700 pb-3 border-b',
        children: children,
    });
};
export default DashboardContentHeader;
