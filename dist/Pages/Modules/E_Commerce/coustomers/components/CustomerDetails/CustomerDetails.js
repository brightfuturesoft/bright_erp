import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
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
    return _jsxs('div', {
        className: 'text-dark dark:text-light',
        children: [
            _jsx(FilterAction, {}),
            _jsx(CustomerShowcase, { orders: customerOrders }),
            _jsx(CustomerInformation, { customer: customer }),
        ],
    });
};
export default CustomerDetails;
