import { useState } from 'react';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import AddNewAccountModal from './AddNewAccountModal';

const ChatOfAccounting: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (values: any) => {
        console.log('Form submitted:', values);
        setIsModalOpen(false);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center border-gray-200 dark:border-gray-700 mt-2 pb-3 border-b">
                <DashboardTitle title={'Chart Of Accounting'} />
                <button
                    onClick={showModal}
                    className="dark:border-gray-700 bg-gray-100 hover:bg-blue-600 dark:hover:bg-light-dark dark:bg-transparent px-4 py-2 border rounded text-gray-800 hover:text-white dark:text-light duration-200"
                >
                    Add a new account
                </button>
                <AddNewAccountModal
                    entity="expense"
                    isModalOpen={isModalOpen}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                />
            </div>
        </div>
    );
};

export default ChatOfAccounting;
