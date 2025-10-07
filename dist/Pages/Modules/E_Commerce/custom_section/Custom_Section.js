'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import { CustomSectionFilter } from './components/Table_Filter';
import CustomSectionDataTable from './components/Custom_Section_Data_Table';
import CustomSectionModal from './components/Custom_Section_Add_Modal';
const CustomSectionsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({});
    // === Fetch Custom Sections ===
    const { data: customSectionsData, refetch } = useQuery({
        queryKey: ['customSectionsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/custom_section/get-section`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch custom sections');
            const data = await res.json();
            return data.data;
        },
    });
    // === Filtering ===
    const filteredSections = useMemo(() => {
        return (
            customSectionsData?.filter(section => {
                return (
                    (!filters.title ||
                        section.title
                            .toLowerCase()
                            .includes(filters.title.toLowerCase())) &&
                    (!filters.button_text ||
                        section.button_text
                            .toLowerCase()
                            .includes(filters.button_text.toLowerCase())) &&
                    (!filters.createdBy ||
                        (section.createdBy || 'Unknown')
                            .toLowerCase()
                            .includes(filters.createdBy.toLowerCase()))
                );
            }) ?? []
        );
    }, [customSectionsData, filters]);
    // === Add ===
    const handleAddClick = () => {
        setEditingSection(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    // === Edit ===
    const handleEditClick = section => {
        setEditingSection(section);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    // === Submit ===
    const handleSubmit = async values => {
        try {
            let imageUrl = editingSection?.image ?? '';
            const imageList = values.image ?? [];
            const fileObj = imageList[0]?.originFileObj;
            if (fileObj) imageUrl = await uploadImage(fileObj);
            const sectionData = {
                title: values.title ?? '',
                description: values.description ?? '',
                button_text: values.button_text ?? '',
                url: values.url ?? '',
                image: imageUrl,
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                createdBy: user?.name,
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/custom_section/create-section`;
            let method = 'POST';
            if (editingSection) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/custom_section/update-section`;
                method = 'PATCH';
                sectionData.id = editingSection._id;
            }
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sectionData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingSection
                        ? 'Section updated successfully'
                        : 'Section added successfully'
                );
                setIsModalOpen(false);
                setEditingSection(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save section');
        }
    };
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Custom Sections',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add Section',
                        }),
                    }),
                    children: [
                        _jsx(CustomSectionFilter, {
                            filters: filters,
                            setFilters: setFilters,
                            onClear: () => setFilters({}),
                        }),
                        _jsx(CustomSectionDataTable, {
                            data: filteredSections,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(CustomSectionModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingSection: editingSection,
                }),
            ],
        }),
    });
};
export default CustomSectionsPage;
