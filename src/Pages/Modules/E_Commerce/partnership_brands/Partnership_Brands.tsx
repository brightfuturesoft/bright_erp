'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { BrandType } from './Partnership_Type';
import { BrandFilter } from './components/Table_Filter';
import BrandDataTable from './components/Partnership_Brands_Data_Table';
import BrandModal from './components/Partnership_Brands_Modal';
import uploadImage from '@/helpers/hooks/uploadImage';

const PartnershipBrandsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<BrandType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

    // Fetch brands
    const { data: brandsData, refetch } = useQuery({
        queryKey: ['brandsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/partnership_brands/get-brands`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch brands');
            const data = await res.json();
            return data.data;
        },
    });

    // Filter brands
    const filteredBrands = useMemo(() => {
        return (
            brandsData?.filter((brand: BrandType) => {
                const matchesName = filters.title
                    ? brand.title
                          .toLowerCase()
                          .includes(filters.title.toLowerCase())
                    : true;
                const matchesStatus = filters.status
                    ? brand.status.toLowerCase() ===
                      filters.status.toLowerCase()
                    : true;
                const matchesSearch = searchValue
                    ? brand.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;
                return matchesName && matchesStatus && matchesSearch;
            }) ?? []
        );
    }, [brandsData, filters, searchValue]);

    const handleAddClick = () => {
        setEditingBrand(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (brand: BrandType) => {
        setEditingBrand(brand);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    // ✅ Handle modal save
    const handleSubmit = async (values: any) => {
        try {
            let imageUrl = editingBrand?.image ?? '';
            const imageList = (values.image ?? []) as any[];
            const fileObj = imageList[0]?.originFileObj as File | undefined;
            if (fileObj) imageUrl = await uploadImage(fileObj);
            console.log(imageUrl);
            if (!imageUrl) {
                setErrorMsg('Image upload failed!');
                return;
            }
            console.log('imageUrl', imageUrl);
            const brandData: any = {
                title: values.title,
                description: values.description,
                cta: values.cta,
                image: imageUrl,
                url: values.url,
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                created_By: user?.name,
            };
            console.log('brandData', brandData);

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/partnership_brands/create-brand`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingBrand) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/partnership_brands/update-brand`;
                method = 'PATCH';
                brandData.id = editingBrand._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(brandData),
            });

            const result = await res.json();

            if (res.ok && !result.error) {
                message.success(
                    editingBrand
                        ? 'Brand updated successfully'
                        : 'Brand added successfully'
                );
                setIsModalOpen(false);
                setEditingBrand(null);
                setErrorMsg('');
                refetch();
            } else {
                setErrorMsg(result.message || 'Failed to save brand');
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save brand');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Partnership Brands"
                    sideComponent={
                        <Button
                            type="primary"
                            onClick={handleAddClick}
                        >
                            Add Brand
                        </Button>
                    }
                >
                    <BrandFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />
                    <BrandDataTable
                        data={filteredBrands}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <BrandModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingBrand={editingBrand}
                />
            </div>
        </ConfigProvider>
    );
};

export default PartnershipBrandsPage;
