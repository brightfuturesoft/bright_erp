import { Briefcase } from 'lucide-react';
import Section from '../../common/components/Section';
import { DataTable, HeaderComponent, TableFilter } from './components';
import StockCard from '../../common/components/StockCard';
import { useState } from 'react';
import TableController from '../../common/components/TableController';

const Return = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Section
            title="Returns"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Sub Total Returned"
                    amount={96560887.52}
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

export default Return;
