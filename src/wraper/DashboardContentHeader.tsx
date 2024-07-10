import { Children } from 'react';

const DashboardContentHeader = ({ children }) => {
    return (
        <div className="flex items-center border-b border-gray-100 pb-3 justify-between ">
            {children}
        </div>
    );
};

export default DashboardContentHeader;
