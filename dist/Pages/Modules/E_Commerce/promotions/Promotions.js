'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import { PromotionFilter } from './components/Table_Filter';
import PromotionDataTable from './components/Promotions_Table';
import PromotionModal from './components/Promotions_Add_Modal';
const PromotionsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({});
    const { data: promotionsData, refetch } = useQuery({
        queryKey: ['promotionsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/get-promotion`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch promotions');
            const data = await res.json();
            return data.data;
        },
    });
    const filteredPromotions = useMemo(() => {
        return (
            promotionsData?.filter(promo => {
                return (
                    (!filters.title ||
                        promo.title
                            .toLowerCase()
                            .includes(filters.title.toLowerCase())) &&
                    (!filters.button_text ||
                        promo.button_text
                            .toLowerCase()
                            .includes(filters.button_text.toLowerCase())) &&
                    (!filters.createdBy ||
                        (promo.createdBy || 'Unknown')
                            .toLowerCase()
                            .includes(filters.createdBy.toLowerCase()))
                );
            }) ?? []
        );
    }, [promotionsData, filters]);
    const handleAddClick = () => {
        setEditingPromotion(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = promo => {
        setEditingPromotion(promo);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleSubmit = async values => {
        try {
            let imageUrl = editingPromotion?.image ?? '';
            const imageList = values.image ?? [];
            const fileObj = imageList[0]?.originFileObj;
            if (fileObj) imageUrl = await uploadImage(fileObj);
            const promoData = {
                title: values.title ?? '',
                description: values.description ?? '',
                button_text: values.button_text ?? '',
                url: values.url ?? '',
                image: imageUrl,
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                createdBy: user?.name,
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/create-promotion`;
            let method = 'POST';
            if (editingPromotion) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/promotions/update-promotion`;
                method = 'PATCH';
                promoData.id = editingPromotion._id;
            }
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(promoData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingPromotion
                        ? 'Promotion updated successfully'
                        : 'Promotion added successfully'
                );
                setIsModalOpen(false);
                setEditingPromotion(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save promotion');
        }
    };
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Promotions',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add Promotion',
                        }),
                    }),
                    children: [
                        _jsx(PromotionFilter, {
                            filters: filters,
                            setFilters: setFilters,
                            onClear: () => setFilters({}),
                        }),
                        _jsx(PromotionDataTable, {
                            data: filteredPromotions,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(PromotionModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingPromotion: editingPromotion,
                }),
            ],
        }),
    });
};
export default PromotionsPage;
