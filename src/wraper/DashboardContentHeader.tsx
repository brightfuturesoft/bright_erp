import { Children } from 'react';

const DashboardContentHeader = ({ children }) => {
    return (
        <div className="flex items-center border-b dark:border-gray-700 border-gray-100 pb-3 justify-between ">
            {children}
        </div>
    );
};

export default DashboardContentHeader;
