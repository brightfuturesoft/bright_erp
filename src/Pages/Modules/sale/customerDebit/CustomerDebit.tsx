import { Briefcase } from 'lucide-react';
import InfoCard from '../../common/components/InfoCard';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import TableController from '../../common/components/TableController';

const CustomerDebit = () => {
    return (
        <div>
            <Section
                title="Customer Debit"
                sideComponent={<HeaderComponent />}
            >
                <div className="flex flex-wrap gap-5">
                    <InfoCard
                        title="Total Debit Amount"
                        amount={1234567.89}
                        icon={<Briefcase />}
                    />
                    <InfoCard
                        title="Total Customers Owing"
                        amount={134}
                        icon={<Briefcase />}
                    />
                </div>
                <TableFilter />
                <TableController />
                <DataTable />
            </Section>
        </div>
    );
};

export default CustomerDebit;
