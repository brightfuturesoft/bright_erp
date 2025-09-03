import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import InfoCard from '../../common/components/InfoCard';
import { useContext, useEffect, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';

const PosOrder = () => {
    const { user, workspace } = useContext(Erp_context);
    // Fetch orders data
    const {
        data: orders_data,
        isLoading: customerLoading,
        isError: isCustomerError,
        refetch: customerRefetch,
    } = useQuery({
        queryKey: ['ordersData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}orders/get-orders`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch customers');
            const data = await response.json();
            return data.data;
        },
    });

    const [orders, setOrders] = useState([]);
    console.log(orders);
    useEffect(() => {
        setOrders(orders_data);
    }, [orders_data]);

    return (
        <Section
            title="POS Orders"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <InfoCard
                    title="Sub Total Amount"
                    amount={96560887.52}
                    icon={<Briefcase />}
                />
                <InfoCard
                    title="Sub Total Tax"
                    amount={171749.35}
                    icon={<LineChart />}
                />
                <InfoCard
                    title="Grand Total Amount"
                    amount={96720078.63}
                    icon={<Plus />}
                />
            </div>
            {/* <div className="flex items-center gap-3 my-3">
                <p>Order Type : </p>
                <div className="flex items-center gap-2">
                    <Radio.Group
                        defaultValue="Standard"
                        buttonStyle="solid"
                    >
                        <Radio.Button value="Standard">Standard</Radio.Button>
                        <Radio.Button value="Ecommerce">Ecommerce</Radio.Button>
                    </Radio.Group>
                </div>
            </div> */}
            <TableFilter />
            <DataTable orders={orders} />
        </Section>
    );
};

export default PosOrder;
