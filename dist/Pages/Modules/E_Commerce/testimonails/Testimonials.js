'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import uploadImage from '@/helpers/hooks/uploadImage';
import TestimonialModal from './components/Testimonials_Add_Modal';
import { TestimonialsFilter } from './components/Table_Filter';
import TestimonialsDataTable from './components/Testimonails_Data_Table';
const TestimonialsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState({}); // Filter state
    const { data: testimonialsData, refetch } = useQuery({
        queryKey: ['testimonialsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/testimonials/get-testimonials`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch testimonials');
            const data = await res.json();
            return data.data;
        },
    });
    // Apply filters + search
    const filteredTestimonials = useMemo(() => {
        return (
            testimonialsData?.filter(test => {
                const matchesSearch =
                    !searchValue ||
                    test.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    test.comment
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                const matchesStatus =
                    !filters.status || test.status === filters.status;
                const matchesCreatedBy =
                    !filters.createdBy || test.createdBy === filters.createdBy;
                const matchesName =
                    !filters.name ||
                    test.name
                        .toLowerCase()
                        .includes(filters.name.toLowerCase());
                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesCreatedBy &&
                    matchesName
                );
            }) ?? []
        );
    }, [testimonialsData, searchValue, filters]);
    const handleAddClick = () => {
        setEditingTestimonial(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = testimonial => {
        setEditingTestimonial(testimonial);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleSubmit = async values => {
        try {
            let imageUrl = editingTestimonial?.image ?? '';
            const imageList = values.image ?? [];
            const fileObj = imageList[0]?.originFileObj;
            if (fileObj) imageUrl = await uploadImage(fileObj);
            const testimonialData = {
                name: values.name ?? '',
                comment: values.comment ?? '',
                image: imageUrl ?? '',
                status: values.status ?? 'Active',
                workspace_id: user.workspace_id,
                createdBy: editingTestimonial?.createdBy ?? user.name,
            };
            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/testimonials/create-testimonial`;
            let method = 'POST';
            if (editingTestimonial) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/testimonials/update-testimonial`;
                method = 'PATCH';
                testimonialData.id = editingTestimonial._id;
            }
            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testimonialData),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingTestimonial
                        ? 'Testimonial updated'
                        : 'Testimonial added'
                );
                setIsModalOpen(false);
                setEditingTestimonial(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Failed to save testimonial');
        }
    };
    const handleClearFilter = () => setFilters({});
    return _jsx(ConfigProvider, {
        children: _jsxs('div', {
            className: 'min-h-screen space-y-6 mt-4 dark:bg-gray-900',
            children: [
                _jsxs(Section, {
                    title: 'Testimonials',
                    sideComponent: _jsx('div', {
                        className: 'flex gap-2',
                        children: _jsx(Button, {
                            type: 'primary',
                            onClick: handleAddClick,
                            children: 'Add Testimonial',
                        }),
                    }),
                    children: [
                        _jsx(TestimonialsFilter, {
                            filters: filters,
                            setFilters: setFilters,
                            onClear: handleClearFilter,
                        }),
                        _jsx(TestimonialsDataTable, {
                            data: filteredTestimonials,
                            onEditClick: handleEditClick,
                            refetch: refetch,
                        }),
                    ],
                }),
                _jsx(TestimonialModal, {
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen,
                    handleAddSave: handleSubmit,
                    error_message: errorMsg,
                    set_error_message: setErrorMsg,
                    editingTestimonial: editingTestimonial,
                }),
            ],
        }),
    });
};
export default TestimonialsPage;
