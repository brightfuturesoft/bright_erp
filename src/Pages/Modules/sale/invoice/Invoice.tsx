import { Briefcase, CreditCard, FileText } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import StockCard from '../../common/components/StockCard';
import TableController from '../../common/components/TableController';
import { useState } from 'react';

const Invoice = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Section
            title="Sales Invoices"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Sub Total Amount"
                    amount={96560887.52}
                    icon={<Briefcase />}
                />
                <StockCard
                    title="Sub Total Tax"
                    amount={171749.35}
                    icon={<CreditCard />}
                />
                <StockCard
                    title="Grand Total Amount"
                    amount={96720078.63}
                    icon={<FileText />}
                />
            </div>
            <TableFilter />
            <TableController
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />{' '}
            <DataTable />
        </Section>
    );
};

export default Invoice;
