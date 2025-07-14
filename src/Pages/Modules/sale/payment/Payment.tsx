import { Briefcase } from 'lucide-react';

import Section from '../../common/components/Section';
import InfoCard from '../../common/components/InfoCard';
import TableController from '../../common/components/TableController';
import HeaderComponent from './components/HeaderComponent';
import TableFilter from './components/TableFilter';
import DataTable from './components/DataTable';

const Payment = () => {
    return (
        <Section
            title="Payment Log"
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

export default Payment;
