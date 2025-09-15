import React from 'react';

interface DashboardHeaderProps {
    children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ children }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
            {children}
        </div>
    );
};

export default DashboardHeader;
