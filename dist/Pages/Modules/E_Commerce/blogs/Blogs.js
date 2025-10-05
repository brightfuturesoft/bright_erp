'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import BlogModal from './components/Add_Blog';
import uploadImage from '@/helpers/hooks/uploadImage';
import BlogDataTable from './components/Blog_Data_Table';
import moment from 'moment';
import { BlogFilter } from './components/Table_Filter';
const BlogsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({});
    const { data: blogsData, refetch } = useQuery({
        queryKey: ['blogsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/blogs/get-blogs`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch blogs');
            const data = await res.json();
            return data.data;
        },
    });
    const filteredBlogs = useMemo(() => {
        return (
            blogsData?.filter(blog => {
                const blogDate = moment(blog.createdAt);
                return (
                    (!filters.title ||
                        blog.title
                            .toLowerCase()
                            .includes(filters.title.toLowerCase())) &&
                    (!filters.category ||
                        blog.category
                            .toLowerCase()
                            .includes(filters.category.toLowerCase())) &&
                    (!filters.status ||
                        blog.status.toLowerCase() ===
                            filters.status.toLowerCase()) &&
                    (!filters.createdBy ||
                        (blog.created_By || 'Unknown')
                            .toLowerCase()
                            .includes(filters.createdBy.toLowerCase())) &&
                    (!filters.dateRange ||
                        (blogDate.isSameOrAfter(filters.dateRange[0], 'day') &&
                            blogDate.isSameOrBefore(
                                filters.dateRange[1],
                                'day'
                            )))
                );
            }) ?? []
        );
    }, [blogsData, filters]);
    const handleAddClick = () => {
        setEditingBlog(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = blog => {
        setEditingBlog(blog);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleSubmit = async values => {
        try {
            let imageUrl = editingBlog?.image ?? '';
            const imageList = values.image ?? [];
            const fileObj = imageList[0]?.originFileObj;
            if (fileObj) imageUrl = await uploadImage(fileObj);
            const generateSlug = title => {
                const slugBase = title
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');
                const randomNum = Math.floor(1000 + Math.random() * 9000);
                return `${slugBase}-${randomNum}`;
            };
            const blogData = {
                title: values.title ?? '',
                slug: editingBlog
                    ? values.slug
                    : generateSlug(values.title ?? ''),
                description: values.description ?? '',
                content: values.content ?? '',
                category: values.category,
                image: imageUrl,
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                created_By: user?.name,
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/blogs/create-blog`;
            let method = 'POST';
            if (editingBlog) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/blogs/update-blog`;
                method = 'PATCH';
                blogData.id = editingBlog._id;
            }
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingBlog
                        ? 'Blog updated successfully'
                        : 'Blog added successfully'
                );
                setIsModalOpen(false);
                setEditingBlog(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save blog');
        }
    };
    const handleClearFilter = () => {
        setFilters({});
    };
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Blogs',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add Blog',
                        }),
                    }),
                    children: [
                        _jsx(BlogFilter, {
                            filters: filters,
                            setFilters: setFilters,
                            onClear: () => setFilters({}),
                        }),
                        _jsx(BlogDataTable, {
                            data: filteredBlogs,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(BlogModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingBlog: editingBlog,
                }),
            ],
        }),
    });
};
export default BlogsPage;
