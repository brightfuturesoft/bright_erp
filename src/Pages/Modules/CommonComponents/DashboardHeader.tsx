import React, { FC } from 'react';

const DashboardHeader: FC = ({ children }) => {
    return (
        <div className="pb-4 mt-1 px-2 border-b dark:border-gray-800 border-gray-200 flex items-center justify-between">
            {children}
        </div>
    );
};

export default DashboardHeader;
