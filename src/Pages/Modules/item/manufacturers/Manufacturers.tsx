import { Button } from 'antd';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import DataTable from '@modules/item/manufacturers/components/DataTable';

const AddManufacturerButton = () => {
    return <Button onClick={() => {}}>Add New</Button>;
};

const Manufacturers = () => {
    return (
        <div>
            <Section
                title="Manufacturers"
                sideComponent={<AddManufacturerButton />}
            >
                <TableController />
                <DataTable />
            </Section>
        </div>
    );
};

export default Manufacturers;
