import { Briefcase, CreditCard, FileText } from 'lucide-react';
import InfoCard from '@modules/common/components/InfoCard';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import {
    HeaderComponent,
    TableFilter,
    DataTable,
} from '@modules/sale/invoice/components';

const Invoice = () => {
    return (
        <Section
            title="Sales Invoices"
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
                    icon={<CreditCard />}
                />
                <InfoCard
                    title="Grand Total Amount"
                    amount={96720078.63}
                    icon={<FileText />}
                />
            </div>
            <TableFilter />
            <TableController />
            <DataTable />
        </Section>
    );
};

export default Invoice;
