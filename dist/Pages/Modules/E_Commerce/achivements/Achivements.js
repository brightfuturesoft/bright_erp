'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import AchievementsDataTable from './components/Achivements_Data_Table';
import AchievementModal from './components/Achivements_Add_Modal';
import { AchievementsFilter } from './components/Table_Filter';
const AchievementsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({}); // <-- use this state for all filters
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
            achievementsData?.filter(ach => {
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
    const handleEditClick = achievement => {
        setEditingAchievement(achievement);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleSubmit = async values => {
        try {
            let imageUrl = editingAchievement?.image ?? '';
            const imageList = values.image ?? [];
            const fileObj = imageList[0]?.originFileObj;
            if (fileObj) imageUrl = await uploadImage(fileObj);
            const achievementData = {
                title: values.title ?? '',
                image: imageUrl ?? '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                createdBy: editingAchievement?.createdBy ?? user.name,
                link: values.link ?? '',
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/achivements/create-achievement`;
            let method = 'POST';
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
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save achievement');
        }
    };
    const handleClearFilter = () => setFilters({});
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Achievements',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add Achievement',
                        }),
                    }),
                    children: [
                        _jsx(AchievementsFilter, {
                            filters: filters,
                            setFilters: setFilters,
                            onClear: handleClearFilter,
                        }),
                        _jsx(AchievementsDataTable, {
                            data: filteredAchievements,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(AchievementModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingAchievement: editingAchievement,
                }),
            ],
        }),
    });
};
export default AchievementsPage;
