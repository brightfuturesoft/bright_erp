'use client';

import React, { useState, useMemo, useEffect, useRef, useContext } from 'react';
import { ConfigProvider, message } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import uploadImage from '@/helpers/hooks/uploadImage';
import { useQuery } from '@tanstack/react-query';
import Category_stats_cards from './components/Category_stats_cards';
import Category_filters from './components/Category_filters';
import Category_bulk_actions from './components/Category_bulk_actions';
import Category_tree_view from './components/Category_tree_view';
import Category_table from './components/Category_table';
import Category_edit_modal from './components/Category_edit_modal';
import Category_add_modal from './components/Category_add_modal';

export interface Category {
    _id: string;
    code: string;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'draft';
    parentId?: string;
    level: number;
    path: string;
    itemCount: number;
    createdAt: string;
    updatedAt: string;
    created_by: string;
    image?: string;
}

const statusColors = {
    active: 'green',
    inactive: 'red',
    draft: 'gold',
};

export default function CategoryDashboard() {
    const { user, workspace } = useContext(Erp_context);

    console.log(workspace, 'workspace', user);
    // Fetch categories
    const {
        data: categories,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/category/get-category`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            return data.data;
        },
    });

    // State
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [levelFilter, setLevelFilter] = useState<string>('all');
    const [currentView, setCurrentView] = useState<'tree' | 'table'>('tree');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null
    );
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addParentCategory, setAddParentCategory] = useState<Category | null>(
        null
    );
    const [error_message, set_error_message] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Filtered categories
    const filteredCategories = useMemo(() => {
        return categories?.length > 0
            ? categories?.filter((cat: Category) => {
                  const matchesSearch =
                      cat.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      cat.code
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      cat.path
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                      cat.description
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase());
                  const matchesStatus =
                      statusFilter === 'all' || cat.status === statusFilter;
                  const matchesLevel =
                      levelFilter === 'all' ||
                      cat.level.toString() === levelFilter;
                  return matchesSearch && matchesStatus && matchesLevel;
              })
            : [];
    }, [categories, searchTerm, statusFilter, levelFilter]);

    // Statistics
    const stats = useMemo(() => {
        const total = categories?.length;
        const active = categories?.filter(
            cat => cat.status === 'active'
        )?.length;
        const inactive = categories?.filter(
            cat => cat.status === 'inactive'
        )?.length;
        const draft = categories?.filter(cat => cat.status === 'draft')?.length;
        const totalItems = categories?.reduce(
            (sum, cat) => sum + Number(cat.itemCount),
            0
        );
        return { total, active, inactive, draft, totalItems };
    }, [categories]);

    // Edit Handlers
    function handleEdit(category: Category) {
        setEditingCategory(category);
        setIsEditModalOpen(true);
    }

    async function handleEditSave(values: Partial<Category>) {
        if (!editingCategory) return;
        const imageList = (values.image ?? []) as any[];
        let imageUrl = editingCategory.image as any as string;
        if (imageList.length) {
            const f = imageList[0];
            if (f.originFileObj) {
                imageUrl = await uploadImage(f.originFileObj as File);
            } else if (typeof f.url === 'string') {
                imageUrl = f.url;
            }
        }
        const updatedCategory: Category = {
            ...editingCategory,
            ...values,
            image: imageUrl,
        };
        fetch(
            `${import.meta.env.VITE_BASE_URL}items/category/update-category`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify(updatedCategory),
            }
        )
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    message.success(data.message);
                    setIsEditModalOpen(false);
                    setEditingCategory(null);
                    refetch();
                }
            })
            .catch(error => {
                console.error('Error updating category:', error);
            });
    }

    function handleDelete(category: Category) {
        fetch(
            `${import.meta.env.VITE_BASE_URL}items/category/delete-category`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: category._id }),
            }
        )
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    message.success(data.message);
                    refetch();
                }
            })
            .catch(error => {
                console.error('Error deleting category:', error);
            });
    }

    function handleAddSubcategory(parent: Category) {
        setAddParentCategory(parent);
        setIsAddModalOpen(true);
    }

    function handleAddRootCategory() {
        setAddParentCategory(null);
        setIsAddModalOpen(true);
    }

    async function handleAddSave(values: Partial<Category>) {
        let level = 0;
        let path = values.code || '';
        let parentId: string | undefined = undefined;
        if (addParentCategory) {
            level = addParentCategory.level + 1;
            path = `${addParentCategory.path} > ${values.code}`;
            parentId = addParentCategory._id;
        }
        const imageList = (values.image ?? []) as any[];
        const fileObj = imageList[0]?.originFileObj as File | undefined;
        const newCat: any = {
            image: fileObj ? await uploadImage(fileObj) : '',
            code: values.code ?? '',
            name: values.name ?? '',
            description: values.description ?? '',
            status: (values.status as any) ?? 'draft',
            parentId,
            level,
            path,
        };
        fetch(
            `${import.meta.env.VITE_BASE_URL}items/category/create-category`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify(newCat),
            }
        )
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    message.success('Category added successfully');
                    setIsAddModalOpen(false);
                    setAddParentCategory(null);
                    refetch();
                } else {
                    set_error_message(data.message);
                }
            });
    }

    // EXPORT/IMPORT
    function handleExport(allOrSelected: 'all' | 'selected') {
        let dataToExport: Category[] =
            allOrSelected === 'all'
                ? categories
                : categories.filter((cat: Category) =>
                      selectedCategories.includes(cat._id)
                  );
        const jsonStr = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download =
            allOrSelected === 'all'
                ? 'categories_export.json'
                : 'categories_selected_export.json';
        a.click();
        URL.revokeObjectURL(url);
        message.success('Exported categories as JSON');
    }

    function handleImportClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            try {
                const json = JSON.parse(ev.target?.result as string);
                if (Array.isArray(json)) {
                    message.success('Imported categories');
                    console.log('Imported:', json);
                } else {
                    message.error('Invalid file format');
                }
            } catch {
                message.error('Failed to parse JSON file');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    return (
        <ConfigProvider>
            <input
                type="file"
                accept=".json,application/json"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className={`min-h-screen space-y-6 mt-4 dark:bg-gray-900`}>
                <Category_stats_cards stats={stats} />
                <Category_filters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    levelFilter={levelFilter}
                    setLevelFilter={setLevelFilter}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    handleExport={handleExport}
                    handleImportClick={handleImportClick}
                    handleAddRootCategory={handleAddRootCategory}
                    disableExportSelected={selectedCategories.length === 0}
                />
                <Category_bulk_actions
                    selectedCategories={selectedCategories}
                    categories={categories}
                    handleDelete={handleDelete}
                    setSelectedCategories={setSelectedCategories}
                />
                <div className="rounded-t border dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
                    {currentView === 'tree' ? (
                        <Category_tree_view
                            categories={filteredCategories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            handleEdit={handleEdit}
                            handleAddSubcategory={handleAddSubcategory}
                            handleDelete={handleDelete}
                            statusColors={statusColors}
                        />
                    ) : (
                        <Category_table
                            categories={filteredCategories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            handleEdit={handleEdit}
                            handleAddSubcategory={handleAddSubcategory}
                            handleDelete={handleDelete}
                            statusColors={statusColors}
                        />
                    )}
                </div>
                <Category_edit_modal
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                    editingCategory={editingCategory}
                    setEditingCategory={setEditingCategory}
                    handleEditSave={handleEditSave}
                    error_message={error_message}
                    set_error_message={set_error_message}
                />
                <Category_add_modal
                    isOpen={isAddModalOpen}
                    setIsOpen={setIsAddModalOpen}
                    addParentCategory={addParentCategory}
                    setAddParentCategory={setAddParentCategory}
                    handleAddSave={handleAddSave}
                    error_message={error_message}
                    set_error_message={set_error_message}
                    user={user}
                />
            </div>
        </ConfigProvider>
    );
}
