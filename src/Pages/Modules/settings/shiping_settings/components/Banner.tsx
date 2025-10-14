import React from 'react';

export const Banner: React.FC = () => (
    <div className="relative w-full h-32 sm:h-48 rounded-xl overflow-hidden shadow-lg mb-6 dark:shadow-none">
        <img
            src="https://merchant.zatiqeasy.com/assets/rx-zatiq-banner.jpeg"
            alt="Delivery Service Promotion"
            className="w-full h-full object-cover"
        />
    </div>
);
