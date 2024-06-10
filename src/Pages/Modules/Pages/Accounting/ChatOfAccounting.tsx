import React, { useState } from 'react';
import DashboardTitle from '../CommonComponents/DashboardTitle';
import AddNewAccountModal from './AddNewAccountModal';

const ChatOfAccounting: React.FC = () => {
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
            <div className="flex items-center mt-2 justify-between pb-3 border-b dark:border-gray-700 border-gray-200">
                <DashboardTitle title={'Chart Of Accounting'} />
                <button onClick={showModal} className="border dark:bg-transparent bg-gray-100 hover:bg-blue-600 duration-200 hover:text-white dark:hover:bg-light-dark  dark:border-gray-700 dark:text-light text-gray-800 px-4 py-2 rounded">Add a new account</button>
                <AddNewAccountModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
            </div>
        </div>
    );
};

export default ChatOfAccounting;