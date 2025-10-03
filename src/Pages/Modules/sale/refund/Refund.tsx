import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import TableController from '../../common/components/TableController';
import StockCard from '../../common/components/StockCard';
import { useState } from 'react';

const Refund = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div>
            <Section
                title="Customer Debit"
                sideComponent={<HeaderComponent />}
            >
                <div className="flex flex-wrap gap-5">
                    <StockCard
                        title="Total Refunded Amount"
                        amount={1234567.89}
                        icon={<Briefcase />}
                    />
                    <StockCard
                        title="Total Refund Transactions"
                        amount={134}
                        icon={<Briefcase />}
                    />
                    <StockCard
                        title="Customers Refunded"
                        amount={134}
                        icon={<Briefcase />}
                    />
                    <StockCard
                        title="Pending Refunds"
                        amount={134}
                        icon={<Briefcase />}
                    />
                    <StockCard
                        title="Reversed Refunds"
                        amount={134}
                        icon={<Briefcase />}
                    />
                </div>
                <TableFilter />
                <TableController
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />{' '}
                <DataTable />
            </Section>
        </div>
    );
};

export default Refund;
