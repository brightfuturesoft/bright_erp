'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import BlogCategoryDataTable from './components/Blog_Category_Data_Type';
import BlogCategoryModal from './components/Add_Blog_Category';
import uploadImage from '@/helpers/hooks/uploadImage';
const BlogCategoriesPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { data: categoriesData, refetch } = useQuery({
        queryKey: ['categoriesData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/blog-category/get-blog-categories`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data = await res.json();
            return data.data;
        },
    });
    const filteredCategories = useMemo(() => {
        return (
            categoriesData?.filter(cat => {
                return (
                    cat.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    cat.status
                        ?.toLowerCase()
                        .includes(searchValue.toLowerCase())
                );
            }) ?? []
        );
    }, [categoriesData, searchValue]);
    const handleAddClick = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = category => {
        setEditingCategory(category);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleSubmit = async values => {
        try {
            let imageUrl = editingCategory?.image ?? '';
            const imageList = values.image ?? [];
            const fileObj = imageList[0]?.originFileObj;
            if (fileObj) imageUrl = await uploadImage(fileObj);
            const generateSlug = name => {
                const slugBase = name
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                const randomNum = Math.floor(1000 + Math.random() * 9000);
                return `${slugBase}-${randomNum}`;
            };
            const categoryData = {
                name: values.name ?? '',
                slug: editingCategory
                    ? values.slug
                    : generateSlug(values.name ?? ''),
                description: values.description ?? '',
                image: imageUrl ?? '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/blog-category/create-blog-category`;
            let method = 'POST';
            if (editingCategory) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/blog-category/update-blog-category`;
                method = 'PATCH';
                categoryData.id = editingCategory._id;
            }
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingCategory ? 'Category updated' : 'Category added'
                );
                setIsModalOpen(false);
                setEditingCategory(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save category');
        }
    };
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Blog Categories',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add Blog Categorie',
                        }),
                    }),
                    children: [
                        _jsx(TableController, {
                            searchValue: searchValue,
                            setSearchValue: setSearchValue,
                        }),
                        _jsx(BlogCategoryDataTable, {
                            data: filteredCategories,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(BlogCategoryModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingCategory: editingCategory,
                }),
            ],
        }),
    });
};
export default BlogCategoriesPage;
