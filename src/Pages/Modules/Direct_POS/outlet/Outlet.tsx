'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import OutletDataTable, { OutletType } from './components/Outlet_Data_Table';
import OutletModal from './components/Outlet_Add_Modal';
import { OutletFilter } from './components/Table_Filter';

const OutletsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOutlet, setEditingOutlet] = useState<OutletType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

    // Fetch outlets
    const { data: outletsData, refetch } = useQuery({
        queryKey: ['outletsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}direct-pos/outlets/get-outlets`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch outlets');
            const data = await res.json();
            return data.data;
        },
    });

    // Filter logic
    const filteredOutlets = useMemo(() => {
        return (
            outletsData?.filter((outlet: OutletType) => {
                const matchesName = filters.name
                    ? outlet.name
                          .toLowerCase()
                          .includes(filters.name.toLowerCase())
                    : true;

                const matchesStatus = filters.status
                    ? outlet.status.toLowerCase() ===
                      filters.status.toLowerCase()
                    : true;

                const matchesSearch = searchValue
                    ? outlet.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase()) ||
                      outlet.address
                          ?.toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;

                return matchesName && matchesStatus && matchesSearch;
            }) ?? []
        );
    }, [outletsData, filters, searchValue]);

    // Add button
    const handleAddClick = () => {
        setEditingOutlet(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    // Edit button
    const handleEditClick = (outlet: OutletType) => {
        setEditingOutlet(outlet);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    // Submit form (add/update)
    const handleSubmit = async (values: any) => {
        try {
            const outletData: any = {
                name: values.name,
                address: values.address,
                contact: values.contact,
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                created_By: user?.name,
            };

            let url = `${import.meta.env.VITE_BASE_URL}direct-pos/outlets/create-outlet`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingOutlet) {
                url = `${import.meta.env.VITE_BASE_URL}direct-pos/outlets/update-outlet`;
                method = 'PATCH';
                outletData.id = editingOutlet._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(outletData),
            });

            const result = await res.json();

            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingOutlet
                        ? 'Outlet updated successfully'
                        : 'Outlet added successfully'
                );
                setIsModalOpen(false);
                setEditingOutlet(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save outlet');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section
                    title="Outlets"
                    sideComponent={
                        outletsData && outletsData.length >= 1 ? null : (
                            <div className="flex gap-2">
                                <Button
                                    type="primary"
                                    onClick={handleAddClick}
                                >
                                    Add Outlet
                                </Button>
                            </div>
                        )
                    }
                >
                    <OutletFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />

                    <TableController
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />

                    <OutletDataTable
                        data={filteredOutlets}
                        onEditClick={handleEditClick}
                        refetch={refetch}
                    />
                </Section>

                <OutletModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    handleAddSave={handleSubmit}
                    error_message={errorMsg}
                    set_error_message={setErrorMsg}
                    editingOutlet={editingOutlet}
                />
            </div>
        </ConfigProvider>
    );
};

export default OutletsPage;
