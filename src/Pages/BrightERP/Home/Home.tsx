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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum mollitia nobis excepturi voluptas unde optio hic esse, quos praesentium itaque culpa aut eligendi repellat asperiores sapiente molestias voluptatibus accusamus sed deleniti saepe maxime deserunt. In explicabo, ducimus nesciunt eius quae non. Repellendus, expedita vitae minus atque incidunt eius earum maiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint a, sed saepe facilis, fugit eum ipsum corporis praesentium inventore, libero nam eveniet doloremque asperiores autem repudiandae harum in nostrum expedita est consequatur. Possimus ab sunt consectetur ipsam molestias veniam nemo corrupti recusandae natus! Odio officia fugit, culpa ipsam omnis ad harum obcaecati perspiciatis cupiditate nihil molestias explicabo animi nisi? Itaque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ex dolore nisi, itaque asperiores, cupiditate impedit consequatur reprehenderit illum possimus, nemo consectetur minus quibusdam tempora. Cum, possimus unde quaerat accusantium quibusdam veniam quam nihil, ex ut minus deleniti voluptatum sint officia culpa vero laudantium consequatur dignissimos reiciendis eveniet obcaecati eius. Praesentium quas, facilis eius enim recusandae cum amet adipisci voluptatibus aperiam numquam sunt necessitatibus et expedita itaque aut in voluptate totam. Aspernatur ex omnis illum quam dolorum ab doloremque voluptatum aut obcaecati, sunt tempora mollitia deleniti explicabo laboriosam voluptas voluptatem? Autem repudiandae magni excepturi quis expedita assumenda quae atque ab.
            </div>
        </div>
    );
};

export default Home;