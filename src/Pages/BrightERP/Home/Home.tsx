import React, { useState } from 'react';
import HomeHero from './HomeComponents/HomeHero';
import Features from './HomeComponents/Features';
import Modules from './HomeComponents/Modules';
import ShortHeader from './HomeComponents/ShortHeader';
import Banefits from './HomeComponents/Benifits';
import ThemeToggle from '../../../Hooks/ThemeToggle';
import BuildIndustry from './HomeComponents/BuildIndustry';
import Faq from './HomeComponents/Faq';

const Home = () => {
    return (
        <div>
            <HomeHero />

            <div className="bg-gray-100 dark:bg-light-dark">
                <ShortHeader />
                <Modules />
                <Features />
                <Banefits />
                <BuildIndustry />
                <Faq />
            </div>
        </div>
    );
};

export default Home;
