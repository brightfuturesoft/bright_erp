'use client';

import React, { useState, useContext, useMemo } from 'react';
import { Button, message, ConfigProvider } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import ReviewDataTable from './components/Review_Table_Data';
import { ReviewFilter } from './components/Table_Filter';

export interface ReviewType {
    _id: string;
    reviewText: string;
    rating: number;
    images: string[];
    workspace_id: string;
    product_id: string;
    created_at: string;
}

const ReviewsPage = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<ReviewType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<any>({});

    const { data: reviewsData, refetch } = useQuery({
        queryKey: ['reviewsData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/reviews/get-review`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch reviews');
            const data = await res.json();
            return data.data;
        },
    });

    const filteredReviews = useMemo(() => {
        return (
            reviewsData?.filter(review => {
                const matchesText = filters.reviewText
                    ? review.reviewText
                          .toLowerCase()
                          .includes(filters.reviewText.toLowerCase())
                    : true;
                const matchesRating = filters.rating
                    ? review.rating === filters.rating
                    : true;
                const matchesWorkspace = filters.workspace_id
                    ? review.workspace_id === filters.workspace_id
                    : true;
                const matchesProduct = filters.product_id
                    ? review.product_id === filters.product_id
                    : true;
                const matchesSearch = searchValue
                    ? review.reviewText
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                    : true;

                return (
                    matchesText &&
                    matchesRating &&
                    matchesWorkspace &&
                    matchesProduct &&
                    matchesSearch
                );
            }) ?? []
        );
    }, [reviewsData, filters, searchValue]);

    const handleAddClick = () => {
        setEditingReview(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (review: ReviewType) => {
        setEditingReview(review);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleSubmit = async (values: any) => {
        try {
            const reviewData: any = {
                reviewText: values.reviewText,
                rating: values.rating,
                images: values.images ?? [],
                workspace_id: values.workspace_id || user.workspace_id,
                product_id: values.product_id,
                created_By: user?.name,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/reviews/create-review`;
            let method: 'POST' | 'PATCH' = 'POST';

            if (editingReview) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/reviews/update-review`;
                method = 'PATCH';
                reviewData.id = editingReview._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            const result = await res.json();

            if (result.error) {
                setErrorMsg(result.message);
            } else {
                message.success(
                    editingReview
                        ? 'Review updated successfully'
                        : 'Review added successfully'
                );
                setIsModalOpen(false);
                setEditingReview(null);
                setErrorMsg('');
                refetch();
            }
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to save review');
        }
    };

    return (
        <ConfigProvider>
            <div className="min-h-screen space-y-6 mt-4 dark:bg-gray-900">
                <Section title="Reviews">
                    <ReviewFilter
                        filters={filters}
                        setFilters={setFilters}
                        onClear={() => setFilters({})}
                    />
                    <ReviewDataTable
                        data={filteredReviews}
                        refetch={refetch}
                    />
                </Section>
            </div>
        </ConfigProvider>
    );
};

export default ReviewsPage;
