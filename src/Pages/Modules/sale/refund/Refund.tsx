import { Briefcase } from 'lucide-react';
import InfoCard from '../../common/components/InfoCard';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import TableController from '../../common/components/TableController';

const Refund = () => {
    return (
        <div>
            <Section
                title="Customer Debit"
                sideComponent={<HeaderComponent />}
            >
                <div className="flex flex-wrap gap-5">
                    <InfoCard
                        title="Total Refunded Amount"
                        amount={1234567.89}
                        icon={<Briefcase />}
                    />
                    <InfoCard
                        title="Total Refund Transactions"
                        amount={134}
                        icon={<Briefcase />}
                    />
                    <InfoCard
                        title="Customers Refunded"
                        amount={134}
                        icon={<Briefcase />}
                    />
                    <InfoCard
                        title="Pending Refunds"
                        amount={134}
                        icon={<Briefcase />}
                    />
                    <InfoCard
                        title="Reversed Refunds"
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

export default Refund;
