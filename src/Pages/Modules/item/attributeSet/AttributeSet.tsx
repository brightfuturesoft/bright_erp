import { Button } from 'antd';
import DataTable from './components/DataTable';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';

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
