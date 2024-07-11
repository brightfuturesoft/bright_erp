import Section from '@modules/common/components/Section';
import { DataTable, TableFilter } from '@modules/sale/delivery/components';
import TableController from '@modules/common/components/TableController';

const Delivery = () => {
    return (
        <Section title="Sales Deliveries">
            <TableFilter />
            <TableController />
            <DataTable />
        </Section>
    );
};

export default Delivery;
