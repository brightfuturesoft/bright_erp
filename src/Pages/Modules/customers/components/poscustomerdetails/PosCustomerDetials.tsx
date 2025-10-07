import { useParams } from 'react-router-dom';
import FilterAction from '../customerdetails/FilterAction';
import { useCombinedCustomers } from '../data_get_api';
import { usePosOrdersData } from '@/Pages/Modules/Direct_POS/orders/components/data_get_api';
import CustomerShowcase from './componets/CustomerShowcase';
import CustomerInformation from './componets/CustomerInformation';

const PosCustomerDetials = () => {
    const { id } = useParams();
    const { pos_orders } = usePosOrdersData();
    const { posCusomers: apiCustomers } = useCombinedCustomers();
    const customer = apiCustomers?.find(c => c._id === id);
    const customerOrders = pos_orders?.filter(
        o => o.delivery_address?.customer_id === id
    );

    return (
        <div className="text-dark dark:text-light">
            <FilterAction />
            <CustomerShowcase orders={customerOrders} />
            <CustomerInformation
                customer={customer}
                customerOrders={customerOrders}
            />
        </div>
    );
};

export default PosCustomerDetials;
