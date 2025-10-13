'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';

import uploadImage from '@/helpers/hooks/uploadImage';
import { AchievementType } from './Achivement_Type';
import AchievementsDataTable from './components/Achivements_Data_Table';
import AchievementModal from './components/Achivements_Add_Modal';
import { AchievementsFilter } from './components/Table_Filter';
import moment from 'moment';

const AchievementsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAchievement, setEditingAchievement] =
        useState<AchievementType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({}); // <-- use this state for all filters

    const { data: achievementsData, refetch } = useQuery({
        queryKey: ['achievementsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/achivements/get-achievements`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch achievements');
            const data = await res.json();
            return data.data;
        },
    });

    // Apply filters + search
    const filteredAchievements = useMemo(() => {
        return (
            achievementsData?.filter((ach: AchievementType) => {
                const matchesSearch =
                    !searchValue ||
                    ach.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    ach.link.toLowerCase().includes(searchValue.toLowerCase());

                const matchesStatus =
                    !filters.status || ach.status === filters.status;

                const matchesCreatedBy =
                    !filters.createdBy || ach.createdBy === filters.createdBy;

                const matchesTitle =
                    !filters.title ||
                    ach.title
                        .toLowerCase()
                        .includes(filters.title.toLowerCase());

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesCreatedBy &&
                    matchesTitle
                );
            }) ?? []
        );
    }, [achievementsData, searchValue, filters]);

    const handleAddClick = () => {
        setEditingAchievement(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (achievement: AchievementType) => {
        setEditingAchievement(achievement);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleSubmit = async (values: any) => {
        try {
            let imageUrl = editingAchievement?.image ?? '';
            const imageList = (values.image ?? []) as any[];
            const fileObj = imageList[0]?.originFileObj as File | undefined;
            if (fileObj) imageUrl = await uploadImage(fileObj);

            const achievementData: any = {
                title: values.title ?? '',
                image: imageUrl ?? '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                createdBy: editingAchievement?.createdBy ?? user.name,
                link: values.link ?? '',
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/achivements/create-achievement`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingAchievement) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/achivements/update-achievement`;
                method = 'PATCH';
                achievementData.id = editingAchievement._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(achievementData),
            });

            const result = await res.json();

            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingAchievement
                        ? 'Achievement updated'
                        : 'Achievement added'
                );
                setIsModalOpen(false);
                setEditingAchievement(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save achievement');
        }
    };

    const handleClearFilter = () => setFilters({});

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Achievements"
                    sideComponent={
                        <div className="flex gap-2">
                            <Button
                                type="primary"
                                onClick={handleAddClick}
                            >
                                Add Achievement
                            </Button>
                        </div>
                    }
                >
                    <AchievementsFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={handleClearFilter}
                    />
                    <AchievementsDataTable
                        data={filteredAchievements}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <AchievementModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingAchievement={editingAchievement}
                />
            </div>
        </ConfigProvider>
    );
};

export default AchievementsPage;
