import { Button } from 'antd';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import DataTable from '@modules/item/brand/components/DataTable';

const BrandAddButton = () => {
    return <Button onClick={() => {}}>Add New</Button>;
};

const Brand = () => {
    return (
        <div>
            <Section
                title="Brands"
                sideComponent={<BrandAddButton />}
            >
                <TableController />
                <DataTable />
            </Section>
        </div>
    );
};

export default Brand;
