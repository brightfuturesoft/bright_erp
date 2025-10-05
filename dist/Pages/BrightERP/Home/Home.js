import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import HomeHero from './HomeComponents/HomeHero';
import Features from './HomeComponents/Features';
import Modules from './HomeComponents/Modules';
import ShortHeader from './HomeComponents/ShortHeader';
import Banefits from './HomeComponents/Benifits';
import BuildIndustry from './HomeComponents/BuildIndustry';
import Faq from './HomeComponents/Faq';
const Home = () => {
    return _jsxs('div', {
        children: [
            _jsx(HomeHero, {}),
            _jsxs('div', {
                className: 'bg-gray-100 dark:bg-light-dark',
                children: [
                    _jsx(ShortHeader, {}),
                    _jsx(Modules, {}),
                    _jsx(Features, {}),
                    _jsx(Banefits, {}),
                    _jsx(BuildIndustry, {}),
                    _jsx(Faq, {}),
                ],
            }),
        ],
    });
};
export default Home;
