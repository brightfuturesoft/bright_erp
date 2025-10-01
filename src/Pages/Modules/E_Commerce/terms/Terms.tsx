'use client';

import React, { useState, useContext } from 'react';
import { Button, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { TermType } from './Terms_Type';
import TermEditor from './components/Terms_Compo';
import TermModal from './components/TermsAddModal';

const TermsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTerm, setEditingTerm] = useState<TermType | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const { data: termsData, refetch } = useQuery({
        queryKey: ['termsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/terms/get-terms`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch terms');
            const data = await res.json();
            return data.data;
        },
    });

    const handleAddClick = () => {
        setEditingTerm(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (updatedTerm: TermType) => {
        refetch();
    };

    const firstTerm = termsData && termsData.length > 0 ? termsData[0] : null;

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Terms & Conditions"
                    sideComponent={
                        termsData && termsData.length >= 1 ? null : (
                            <div className="flex gap-2">
                                <Button
                                    type="primary"
                                    onClick={handleAddClick}
                                >
                                    Add Term
                                </Button>
                            </div>
                        )
                    }
                >
                    {firstTerm ? (
                        <TermEditor
                            term={firstTerm}
                            onSave={handleEditClick}
                        />
                    ) : (
                        <div className="text-gray-500 dark:text-gray-400">
                            No terms available. Click "Add Term" to create one.
                        </div>
                    )}
                </Section>
                <TermModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={() => refetch()}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingTerm={editingTerm}
                />
            </div>
        </ConfigProvider>
    );
};

export default TermsPage;
