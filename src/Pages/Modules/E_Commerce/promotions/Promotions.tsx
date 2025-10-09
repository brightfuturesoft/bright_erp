'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import { PromotionType } from './Promotions_Type';
import { PromotionFilter } from './components/Table_Filter';
import PromotionDataTable from './components/Promotions_Table';
import { Link, useNavigate } from 'react-router-dom';

const PromotionsPage = () => {
    const { user } = useContext(Erp_context);
    const navigate = useNavigate();
    const [filters, setFilters] = useState<any>({});

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
            promotionsData?.filter((promo: PromotionType) => {
                return (
                    (!filters.name ||
                        promo.name
                            .toLowerCase()
                            .includes(filters.name.toLowerCase())) &&
                    (!filters.createdBy ||
                        (promo.createdBy || 'Unknown')
                            .toLowerCase()
                            .includes(filters.createdBy.toLowerCase())) &&
                    (!filters.status || promo.status === filters.status)
                );
            }) ?? []
        );
    }, [promotionsData, filters]);

    const handleEditClick = (promo: PromotionType) => {
        navigate('/dashboard/e-commerce/promotions/update-promotions', {
            state: { editingPromotion: promo },
        });
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Promotions"
                    sideComponent={
                        <div className="flex gap-2">
                            <Button type="primary">
                                <Link
                                    to={
                                        '/dashboard/e-commerce/promotions/create-promotions'
                                    }
                                >
                                    {' '}
                                    Add Promotion
                                </Link>
                            </Button>
                        </div>
                    }
                >
                    <PromotionFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />
                    <PromotionDataTable
                        data={filteredPromotions}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>
            </div>
        </ConfigProvider>
    );
};

export default PromotionsPage;
