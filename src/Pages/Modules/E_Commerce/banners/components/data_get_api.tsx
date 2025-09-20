import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';

export const useBannersData = (_id?: string) => {
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();
    const fetcher = async (url: string, params?: Record<string, any>) => {
        let queryString = '';
        if (params) {
            const query = new URLSearchParams(
                params as Record<string, string>
            ).toString();
            queryString = `?${query}`;
        }
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}${url}${queryString}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: user._id,
                    workspace_id: user.workspace_id,
                },
            }
        );
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const data = await res.json();
        return data.data;
    };

    const mutateFetcher = async (url: string, method: string, body: any) => {
        const isFormData = body instanceof FormData;

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
            method,
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                Authorization: user._id,
                workspace_id: user.workspace_id,
            },
            body: isFormData ? body : JSON.stringify(body),
        });

        if (!res.ok) throw new Error(`Failed to ${method} ${url}`);
        const data = await res.json();
        queryClient.invalidateQueries();
        return data;
    };

    // --- Queries ---
    const bannerQuery = useQuery({
        queryKey: ['banners', _id],
        queryFn: () =>
            fetcher(
                'ecommerce/banners/get-banners',
                _id ? { id: _id } : undefined
            ),
    });
    // --- Banner Mutations ---
    const addBanner = (payload: any) =>
        mutateFetcher('ecommerce/banners/create-banner', 'POST', payload);
    const editBanner = (payload: any) =>
        mutateFetcher('ecommerce/banners/update-banner', 'PATCH', payload);
    const deleteBanner = (id: string) =>
        mutateFetcher('ecommerce/banners/delete-banner', 'DELETE', { id });

    return {
        banners: bannerQuery.data,
        isLoading: bannerQuery.isLoading,
        isError: bannerQuery.isError,
        refetch: () => {
            bannerQuery.refetch();
        },
        addBanner,
        editBanner,
        deleteBanner,
    };
};
