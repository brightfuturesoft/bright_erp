import React from 'react';
import { CustomCollapse } from './CustomCollapse';

export const DeliveryServiceCollapse = () => (
    <CustomCollapse
        title="Delivery Service"
        defaultOpen={false}
    >
        <div className="text-sm text-gray-600 dark:text-gray-400">
            You can view the list of delivery services available for your region
            here.
        </div>
    </CustomCollapse>
);
