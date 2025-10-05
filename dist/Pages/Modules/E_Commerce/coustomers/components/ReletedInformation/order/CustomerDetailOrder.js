import { jsx as _jsx } from 'react/jsx-runtime';
import StanderdOrder from './StandOrder/StandOrder';
import { useOrdersData } from '@/Pages/Modules/E_Commerce/Order/components/data_get_api';
const CustomerDetailOrders = ({ customerId }) => {
    const { orders } = useOrdersData();
    // customer specific orders
    const customerOrders = orders?.filter(o => o.user_id === customerId);
    return _jsx('div', {
        children: _jsx(StanderdOrder, {
            orders: customerOrders,
            customerId: customerId,
        }),
    });
};
export default CustomerDetailOrders;
