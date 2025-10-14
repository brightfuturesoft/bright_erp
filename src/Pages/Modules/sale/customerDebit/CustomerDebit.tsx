import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import TableController from '../../common/components/TableController';
import StockCard from '../../common/components/StockCard';
import { useState } from 'react';

const CustomerDebit = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div>
            <Section
                title="Customer Debit"
                sideComponent={<HeaderComponent />}
            >
                <div className="flex flex-wrap gap-5">
                    <StockCard
                        title="Total Debit Amount"
                        amount={1234567.89}
                        icon={<Briefcase />}
                    />
                    <StockCard
                        title="Total Customers Owing"
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

export default CustomerDebit;
