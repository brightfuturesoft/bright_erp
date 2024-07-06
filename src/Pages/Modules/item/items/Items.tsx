import { useState } from 'react';
import AddSingleItemModal from './components/AddSingleItemModal';
import DataTable from './components/DataTable';
import ItemsFilter from './components/ItemsFilter';
import ItemsHeader from './components/ItemsHeader';
import TableController from './components/TableController';

const Items = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <ItemsHeader showModal={showModal} />
            <hr className="my-4" />
            <ItemsFilter />

            <TableController />
            <DataTable />
            <AddSingleItemModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </div>
    );
};

export default Items;
