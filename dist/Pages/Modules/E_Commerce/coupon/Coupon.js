'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { CouponFilter } from './components/Table_Filter';
import CouponDataTable from './components/Coupon_Data_Table';
import CouponModal from './components/Coupon_Add_Modal';
const CouponsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({});
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
            couponsData?.filter(coupon => {
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
    const handleEditClick = coupon => {
        setEditingCoupon(coupon);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleSubmit = async values => {
        try {
            const couponData = {
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
            let method = 'POST';
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
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save coupon');
        }
    };
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Coupons',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add Coupon',
                        }),
                    }),
                    children: [
                        _jsx(CouponFilter, {
                            filters: filters,
                            setFilters: setFilters,
                            onClear: () => setFilters({}),
                        }),
                        _jsx(CouponDataTable, {
                            data: filteredCoupons,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(CouponModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingCoupon: editingCoupon,
                }),
            ],
        }),
    });
};
export default CouponsPage;
