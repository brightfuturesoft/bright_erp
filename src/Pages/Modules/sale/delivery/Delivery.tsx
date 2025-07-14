import Section from '@modules/common/components/Section';
import { DataTable, TableFilter } from '@modules/sale/delivery/components';
import TableController from '@modules/common/components/TableController';

const Delivery = () => {
    return (
        <div className="w-full overflow-x-scroll">
            <Section title="Sales Deliveries ">
                <TableFilter />
                <TableController />
                <DataTable />
            </Section>
        </div>
    );
};

export default Delivery;
