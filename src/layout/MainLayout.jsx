import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <h1>My App</h1>
            <Outlet /> {/* This will render the matching child route component */}
        </div>
    );
};

export default MainLayout;
