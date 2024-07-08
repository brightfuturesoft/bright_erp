import { Button } from 'antd';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import DataTable from '@modules/item/color/components/DataTable';

const AddColorButton = () => {
    return <Button onClick={() => {}}>Add New</Button>;
};

const Color = () => {
    return (
        <Section
            title="Colors"
            sideComponent={<AddColorButton />}
        >
            <TableController />
            <DataTable />
        </Section>
    );
};

export default Color;
