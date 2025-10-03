import { useState } from 'react';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { DataTable, TableFilter } from './components';

const Delivery = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="w-full overflow-x-scroll">
            <Section title="Sales Deliveries ">
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

export default Delivery;
