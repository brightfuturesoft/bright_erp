import ItemsHeader from './components/ItemsHeader';
import ItemsFilterTable from './components/ItemsFilter';

const Items = () => {
    return (
        <div>
            <ItemsHeader />
            <hr className="my-4" />
            <ItemsFilterTable />
        </div>
    );
};

export default Items;
