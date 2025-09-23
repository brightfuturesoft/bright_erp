import React from 'react';
import { useParams } from 'react-router-dom';
import FilterAction from './FilterAction';
import { useOrdersData } from '../../../Order/components/data_get_api';
import { useCustomersData } from '../data_get_api';
import CustomerInformation from './CustomerInfo';
import CustomerShowcase from './CustomerShowCase';

const CustomerDetails = () => {
    const { id } = useParams();
    const { orders } = useOrdersData();
    const { customers: apiCustomers } = useCustomersData();
    const customer = apiCustomers?.find(c => c._id === id);
    const customerOrders = orders?.filter(o => o.user_id === id);

    return (
        <div className="text-dark dark:text-light">
            <FilterAction />

            <CustomerShowcase orders={customerOrders} />

            <CustomerInformation customer={customer} />
        </div>
    );
};

export default CustomerDetails;
