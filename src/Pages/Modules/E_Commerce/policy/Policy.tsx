'use client';

import React, { useState, useContext } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { PolicyType } from './Policy_Type';
import PolicyModal from './components/Policy_Add_Modal';
import PolicyEditor from './components/Policy_Data_Table';

const PoliciesPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState<PolicyType | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

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

    const handleAddClick = () => {
        setEditingPolicy(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (updatedPolicy: PolicyType) => {
        // parent e update korte chaile
        refetch();
    };

    const firstPolicy =
        policiesData && policiesData.length > 0 ? policiesData[0] : null;

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
                    {firstPolicy ? (
                        <PolicyEditor
                            policy={firstPolicy}
                            onSave={handleEditClick}
                        />
                    ) : (
                        <div className="text-gray-500 dark:text-gray-400">
                            No policy available. Click "Add Policy" to create
                            one.
                        </div>
                    )}
                </Section>

                <PolicyModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={() => refetch()}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingPolicy={editingPolicy}
                />
            </div>
        </ConfigProvider>
    );
};

export default PoliciesPage;
