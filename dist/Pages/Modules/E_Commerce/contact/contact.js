'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import ContactModal from './components/ContactAddModal';
import ContactDataTable from './components/ContactDataTable';
const ContactsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { data: contactsData, refetch } = useQuery({
        queryKey: ['contactsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/contacts/get-contacts`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch contacts');
            const data = await res.json();
            return data.data;
        },
    });
    const filteredContacts = useMemo(() => {
        return (
            contactsData?.filter(contact => {
                return (
                    contact.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    contact.email
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    contact.phone
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    contact.message
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                );
            }) ?? []
        );
    }, [contactsData, searchValue]);
    const handleAddClick = () => {
        setEditingContact(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = contact => {
        setEditingContact(contact);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleSubmit = async values => {
        try {
            const contactData = {
                name: values.name ?? '',
                email: values.email ?? '',
                phone: values.phone ?? '',
                message: values.message ?? '',
                workspace_id: user.workspace_id,
            };
            let url = `${import.meta.env.VITE_BASE_URL}contacts/create-contact`;
            let method = 'POST';
            if (editingContact) {
                url = `${import.meta.env.VITE_BASE_URL}contacts/update-contact`;
                method = 'PATCH';
                contactData.id = editingContact._id;
            }
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingContact ? 'Contact updated' : 'Contact added'
                );
                setIsModalOpen(false);
                setEditingContact(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save contact');
        }
    };
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Contacts',
                    children: [
                        _jsx(TableController, {
                            searchValue: searchValue,
                            setSearchValue: setSearchValue,
                        }),
                        _jsx(ContactDataTable, {
                            data: filteredContacts,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(ContactModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingContact: editingContact,
                }),
            ],
        }),
    });
};
export default ContactsPage;
