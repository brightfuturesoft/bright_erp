import { Briefcase, LineChart, Percent, Plus } from 'lucide-react';
import InfoCard from '@modules/common/components/InfoCard';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import {
    HeaderComponent,
    TableFilter,
    DataTable,
} from '@modules/sale/directSale/components';

const DirectSale = () => {
    return (
        <Section
            title="Direct Sales"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <InfoCard
                    title="Sub Total Amount"
                    amount={726580462.54}
                    icon={<Briefcase />}
                />
                <InfoCard
                    title="Sub Tax Amount"
                    amount={19849348.95}
                    icon={<LineChart />}
                />
                <InfoCard
                    title="Total Discount Amount"
                    amount={612122.58}
                    icon={<Percent />}
                />
                <InfoCard
                    title="Grand Total Amount"
                    amount={747011557.31}
                    icon={<Plus />}
                />
            </div>

            <TableFilter />
            <TableController />
            <DataTable />
        </Section>
    );
};

export default DirectSale;
