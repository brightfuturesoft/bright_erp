import React from 'react';

const DashboardTitle = ({ title }) => {
    return (
        <h1 className='text-xl font-semibold dark:text-gray-300 text-light-dark'>
            {title}
        </h1>
    );
};

export default DashboardTitle;