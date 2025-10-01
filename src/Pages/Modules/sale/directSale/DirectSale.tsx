import { Briefcase, LineChart, Percent, Plus } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import InfoCard from '../../common/components/InfoCard';
import TableController from '../../common/components/TableController';
import StockCard from '../../common/components/StockCard';

const DirectSale = () => {
    return (
        <Section
            title="Direct Sales"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Sub Total Amount"
                    amount={726580462.54}
                    icon={<Briefcase />}
                />
                <StockCard
                    title="Sub Tax Amount"
                    amount={19849348.95}
                    icon={<LineChart />}
                />
                <StockCard
                    title="Total Discount Amount"
                    amount={612122.58}
                    icon={<Percent />}
                />
                <StockCard
                    title="Grand Total Amount"
                    amount={747011557.31}
                    icon={<Plus />}
                />
            </div>

            <TableFilter />
            <DataTable />
        </Section>
    );
};

export default DirectSale;
