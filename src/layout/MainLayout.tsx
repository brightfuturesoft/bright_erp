import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeNav from '../Pages/BrightERP/Home/HomeComponents/HomeNav';
import Footer from '../Pages/BrightERP/Home/HomeComponents/Footer';

export default function MainLayout() {
    return (
        <div>
            <HomeNav />
            <div className="mt-12">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
