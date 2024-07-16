import { Children } from 'react';

const DashboardContentHeader = ({ children }) => {
    return (
        <div className="flex justify-between items-center border-gray-100 dark:border-gray-700 pb-3 border-b">
            {children}
        </div>
    );
};

export default DashboardContentHeader;
