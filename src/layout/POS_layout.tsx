import HomeNav from '@/Pages/BrightERP/Home/HomeComponents/HomeNav';
import Header from '@/Pages/Modules/Direct_POS/components/Pos_head';
import React from 'react';
import { Outlet } from 'react-router-dom';

const POS_layout = () => {
    return (
        <div className="bg-dark-gray">
            <div className="bg-dark-gray">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default POS_layout;
