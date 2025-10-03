import { Briefcase } from 'lucide-react';

import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import HeaderComponent from './components/HeaderComponent';
import TableFilter from './components/TableFilter';
import DataTable from './components/DataTable';
import StockCard from '../../common/components/StockCard';
import { useState } from 'react';

const Payment = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Section
            title="Payment Log"
            sideComponent={<HeaderComponent />}
        >
            <div className="flex flex-wrap gap-5">
                <StockCard
                    title="Total Paid Amount"
                    amount={96560887.52}
                    icon={<Briefcase />}
                />
                <StockCard
                    title="Total Discount Amount"
                    amount={171749.35}
                    icon={<Briefcase />}
                />
                <StockCard
                    title="Total Amount with Discount"
                    amount={96720078.63}
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

export default Payment;
