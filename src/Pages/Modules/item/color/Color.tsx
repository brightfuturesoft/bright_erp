import { Button } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import DataTable from './components/DataTable';
import { useState } from 'react';

const AddColorButton = () => {
    return <Button onClick={() => {}}>Add New</Button>;
};

const Color = () => {
    const [searchValue, setSearchValue] = useState('');
    return (
        <Section
            title="Colors"
            sideComponent={<AddColorButton />}
        >
            <TableController
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <DataTable />
        </Section>
    );
};

export default Color;
