import { Button } from 'antd';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import DataTable from '@modules/item/attributeSet/components/DataTable';

const AddAttributeSetButton = () => {
    return <Button onClick={() => {}}>Add New</Button>;
};

const AttributeSet = () => {
    return (
        <div>
            <Section
                title="Item Attributes"
                sideComponent={<AddAttributeSetButton />}
            >
                <TableController />
                <DataTable />
            </Section>
        </div>
    );
};

export default AttributeSet;
