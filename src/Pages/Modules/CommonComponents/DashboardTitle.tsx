import React from 'react';

interface DashboardTitleProps {
    title: string;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ title }) => {
    return (
        <h1 className="font-semibold text-light-dark md:text-xl text-sm whitespace-nowrap gap-2 dark:text-gray-300">
            {title}
        </h1>
    );
};

export default DashboardTitle;
