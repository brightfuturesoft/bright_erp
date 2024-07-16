import { Briefcase } from 'lucide-react';
import InfoCard from '@modules/common/components/InfoCard';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import {
    DataTable,
    TableFilter,
    HeaderComponent,
} from '@modules/sale/batchPayment/components';

const BatchPayment = () => {
    return (
        <Section
            title="Batch Payments Log"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <InfoCard
                    title="Total Paid Amount"
                    amount={96560887.52}
                    icon={<Briefcase />}
                />
                <InfoCard
                    title="Total Discount Amount"
                    amount={171749.35}
                    icon={<Briefcase />}
                />
                <InfoCard
                    title="Total Amount with Discount"
                    amount={96720078.63}
                    icon={<Briefcase />}
                />
            </div>
            <TableFilter />
            <TableController />
            <DataTable />
        </Section>
    );
};

export default BatchPayment;
