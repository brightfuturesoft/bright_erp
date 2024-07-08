import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Assuming you create a CSS file for styling

const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Use smooth scrolling behavior
            });
        };

        scrollToTop();
    }, [pathname]);

    return null;
};

export default ScrollToTop;
