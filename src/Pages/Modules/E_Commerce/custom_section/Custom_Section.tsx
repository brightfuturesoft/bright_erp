'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import { CustomSectionType } from './Custom_Section_Type';
import { CustomSectionFilter } from './components/Table_Filter';
import CustomSectionDataTable from './components/Custom_Section_Data_Table';
import CustomSectionModal from './components/Custom_Section_Add_Modal';

const CustomSectionsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSection, setEditingSection] =
        useState<CustomSectionType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

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
            customSectionsData?.filter((section: CustomSectionType) => {
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
    const handleEditClick = (section: CustomSectionType) => {
        setEditingSection(section);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    // === Submit ===
    const handleSubmit = async (values: any) => {
        try {
            let imageUrl = editingSection?.image ?? '';
            const imageList = (values.image ?? []) as any[];
            const fileObj = imageList[0]?.originFileObj as File | undefined;
            if (fileObj) imageUrl = await uploadImage(fileObj);

            const sectionData: any = {
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
            let method: 'POST' | 'PATCH' = 'POST';
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
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save section');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Custom Sections"
                    sideComponent={
                        <div className="flex gap-2">
                            <Button
                                type="primary"
                                onClick={handleAddClick}
                            >
                                Add Section
                            </Button>
                        </div>
                    }
                >
                    <CustomSectionFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />
                    <CustomSectionDataTable
                        data={filteredSections}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <CustomSectionModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingSection={editingSection}
                />
            </div>
        </ConfigProvider>
    );
};

export default CustomSectionsPage;
