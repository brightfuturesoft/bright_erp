import InfoCard from '@modules/common/components/InfoCard';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import {
    HeaderComponent,
    TableFilter,
    DataTable,
} from '@modules/sale/quotation/components';
import { Briefcase } from 'lucide-react';

const Quotation = () => {
    return (
        <Section
            title="Quotations"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <InfoCard
                    title="Total Amount"
                    amount={42212558.0}
                    icon={<Briefcase />}
                />
            </div>
            <TableFilter />
            <TableController />
            <DataTable />
        </Section>
    );
};

export default Quotation;
