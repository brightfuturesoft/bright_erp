import DataTable from './components/DataTable';
import ItemsFilter from './components/ItemsFilter';
import ItemsHeader from './components/ItemsHeader';
import TableController from '../../common/components/TableController';

const Items = () => {
    return (
        <div>
            <ItemsHeader />
            <hr className="my-4" />
            <ItemsFilter />
            {/* @ts-ignore */}
            <TableController />
            <DataTable />
        </div>
    );
};

export default Items;
