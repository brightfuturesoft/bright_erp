import { Radio } from 'antd';
import { Briefcase, LineChart, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import {
    DataTable,
    HeaderComponent,
    TableFilter,
} from '../batchPayment/components';
import StockCard from '../../common/components/StockCard';

const Order = () => {
    return (
        <Section
            title="Sales Orders"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Sub Total Amount"
                    amount={96560887.52}
                    icon={<Briefcase />}
                />
                <StockCard
                    title="Sub Total Tax"
                    amount={171749.35}
                    icon={<LineChart />}
                />
                <StockCard
                    title="Grand Total Amount"
                    amount={96720078.63}
                    icon={<Plus />}
                />
            </div>
            <div className="flex items-center gap-3 my-3">
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
            </div>
            <TableFilter />
            <DataTable />
        </Section>
    );
};

export default Order;
