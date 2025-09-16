'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { CouponFilter } from './components/Table_Filter';
import CouponDataTable from './components/Coupon_Data_Table';
import CouponModal from './components/Coupon_Add_Modal';

export type CouponType = {
    _id?: string;
    code: string;
    name: string;
    type: 'fixed' | 'percentage';
    price: number;
    usageLimitPerUser: number;
    userLimit: number;
    startDateTime?: string;
    endDateTime?: string;
    status: 'Active' | 'Inactive';
    workspace_id: string;
    created_By?: string;
};

const CouponsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<CouponType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

    const { data: couponsData, refetch } = useQuery({
        queryKey: ['couponsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/coupon/get-coupons`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch coupons');
            const data = await res.json();
            return data.data;
        },
    });

    const filteredCoupons = useMemo(() => {
        return (
            couponsData?.filter((coupon: CouponType) => {
                const matchesSearch = searchValue
                    ? coupon.code
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                      coupon.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;

                const matchesFilters =
                    (!filters.code ||
                        coupon.code
                            .toLowerCase()
                            .includes(filters.code.toLowerCase())) &&
                    (!filters.type ||
                        coupon.type.toLowerCase() ===
                            filters.type.toLowerCase()) &&
                    (!filters.status ||
                        coupon.status.toLowerCase() ===
                            filters.status.toLowerCase()) &&
                    (!filters.createdBy ||
                        (coupon.created_By || 'Unknown')
                            .toLowerCase()
                            .includes(filters.createdBy.toLowerCase()));

                return matchesSearch && matchesFilters;
            }) ?? []
        );
    }, [couponsData, filters, searchValue]);

    const handleAddClick = () => {
        setEditingCoupon(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (coupon: CouponType) => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleSubmit = async (values: any) => {
        try {
            const couponData: any = {
                code: values.code,
                name: values.name,
                type: values.type,
                price: Number(values.price),
                usageLimitPerUser: Number(values.usageLimitPerUser),
                userLimit: Number(values.userLimit),
                startDateTime: values.startDateTime || '',
                endDateTime: values.endDateTime || '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                created_By: user?.name,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/coupon/create-coupon`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingCoupon) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/coupon/update-coupon`;
                method = 'PATCH';
                couponData.id = editingCoupon._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(couponData),
            });

            const result = await res.json();

            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingCoupon
                        ? 'Coupon updated successfully'
                        : 'Coupon added successfully'
                );
                setIsModalOpen(false);
                setEditingCoupon(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save coupon');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Coupons"
                    sideComponent={
                        <div className="flex gap-2">
                            <Button
                                type="primary"
                                onClick={handleAddClick}
                            >
                                Add Coupon
                            </Button>
                        </div>
                    }
                >
                    <CouponFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />

                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />

                    <CouponDataTable
                        data={filteredCoupons}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <CouponModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingCoupon={editingCoupon}
                />
            </div>
        </ConfigProvider>
    );
};

export default CouponsPage;
