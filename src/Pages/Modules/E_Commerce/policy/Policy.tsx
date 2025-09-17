'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { PolicyType } from './Policy_Type';
import { PolicyFilter } from './components/Table_Filter';
import PolicyDataTable from './components/Policy_Data_Table';
import PolicyModal from './components/Policy_Add_Modal';

const PoliciesPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState<PolicyType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});
    const { data: policiesData, refetch } = useQuery({
        queryKey: ['policiesData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/policy/get-policies`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch policies');
            const data = await res.json();
            return data.data;
        },
    });

    const filteredPolicies = useMemo(() => {
        return (
            policiesData?.filter(policy => {
                const matchesTitle = filters.title
                    ? policy.title
                          .toLowerCase()
                          .includes(filters.title.toLowerCase())
                    : true;
                const matchesStatus = filters.status
                    ? policy.status.toLowerCase() ===
                      filters.status.toLowerCase()
                    : true;
                const matchesSearch = searchValue
                    ? policy.title
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                      policy.description
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;
                return matchesTitle && matchesStatus && matchesSearch;
            }) ?? []
        );
    }, [policiesData, filters, searchValue]);

    const handleAddClick = () => {
        setEditingPolicy(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (policy: PolicyType) => {
        setEditingPolicy(policy);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleSubmit = async (values: any) => {
        try {
            const policyData: any = {
                title: values.title,
                description: values.description,
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                created_By: user?.name,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/policy/create-policy`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingPolicy) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/policy/update-policy`;
                method = 'PATCH';
                policyData.id = editingPolicy._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(policyData),
            });

            const result = await res.json();

            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingPolicy
                        ? 'Policy updated successfully'
                        : 'Policy added successfully'
                );
                setIsModalOpen(false);
                setEditingPolicy(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save policy');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Policies"
                    sideComponent={
                        policiesData && policiesData.length >= 1 ? null : (
                            <div className="flex gap-2">
                                <Button
                                    type="primary"
                                    onClick={handleAddClick}
                                >
                                    Add Policy
                                </Button>
                            </div>
                        )
                    }
                >
                    <PolicyFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />

                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />

                    <PolicyDataTable
                        data={filteredPolicies}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <PolicyModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingPolicy={editingPolicy}
                />
            </div>
        </ConfigProvider>
    );
};

export default PoliciesPage;
