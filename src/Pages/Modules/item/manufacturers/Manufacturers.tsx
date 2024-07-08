import { Button } from 'antd';
import Section from '@modules/common/components/Section';
import TableController from '@modules/common/components/TableController';
import DataTable from './components/DataTable';

const Manufacturers = () => {
    return (
        <div>
            <Section
                title="Manufacturers"
                sideComponent={<Button onClick={() => {}}>Add New</Button>}
            >
                <TableController />
                <DataTable />
            </Section>
        </div>
    );
};

export default Manufacturers;
