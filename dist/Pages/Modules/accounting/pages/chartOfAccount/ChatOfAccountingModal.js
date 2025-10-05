import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import AddNewAccountModal from './AddNewAccountModal';
const ChatOfAccounting = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleSubmit = async values => {
        console.log('Form submitted:', values);
        setIsModalOpen(false);
    };
    const handleClose = () => {
        setIsModalOpen(false);
    };
    return _jsx('div', {
        children: _jsxs('div', {
            className:
                'flex justify-between items-center border-gray-200 dark:border-gray-700 mt-2 pb-3 border-b',
            children: [
                _jsx(DashboardTitle, { title: 'Chart Of Accounting' }),
                _jsx('button', {
                    onClick: showModal,
                    className:
                        'dark:border-gray-700 bg-gray-100 hover:bg-blue-600 dark:hover:bg-light-dark dark:bg-transparent px-4 py-2 border rounded text-gray-800 hover:text-white dark:text-light duration-200',
                    children: 'Add a new account',
                }),
                _jsx(AddNewAccountModal, {
                    entity: 'expense',
                    isModalOpen: isModalOpen,
                    onSubmit: handleSubmit,
                    onClose: handleClose,
                }),
            ],
        }),
    });
};
export default ChatOfAccounting;
