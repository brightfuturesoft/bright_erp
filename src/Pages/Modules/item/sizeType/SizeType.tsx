import { Button } from 'antd';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import DataTable from '@modules/item/sizeType/components/DataTable';

const AddBrandButton = () => {
    return <Button onClick={() => {}}>Add New</Button>;
};
const SizeType = () => {
    return (
        <div>
            <Section
                title="Item Sizes"
                sideComponent={<AddBrandButton />}
            >
                <TableController />
                <DataTable />
            </Section>
        </div>
    );
};

export default SizeType;
