import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import StockCard from '../../common/components/StockCard';
import TableController from '../../common/components/TableController';
import { useState } from 'react';

const Quotation = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Section
            title="Quotations"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Total Amount"
                    amount={42212558.0}
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
    );
};

export default Quotation;
