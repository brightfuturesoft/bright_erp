import { Briefcase } from 'lucide-react';
import InfoCard from '@modules/common/components/InfoCard';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import {
    HeaderComponent,
    TableFilter,
    DataTable,
} from '@modules/sale/return/components';

const Return = () => {
    return (
        <Section
            title="Returns"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <InfoCard
                    title="Sub Total Returned"
                    amount={96560887.52}
                    icon={<Briefcase />}
                />
            </div>
            <TableFilter />
            <TableController />
            <DataTable />
        </Section>
    );
};

export default Return;
