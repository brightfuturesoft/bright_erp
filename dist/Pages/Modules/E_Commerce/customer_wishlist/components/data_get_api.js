// src/Pages/Modules/Wishlist/components/data_get_api.ts
import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
export const useWishlistData = customerId => {
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();
    const fetcher = async (url, params) => {
        let queryString = '';
        if (params) {
            const query = new URLSearchParams(params).toString();
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
    const mutateFetcher = async (url, method, body) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: user._id,
                workspace_id: user.workspace_id,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`Failed to ${method} ${url}`);
        const data = await res.json();
        queryClient.invalidateQueries();
        return data;
    };
    // Wishlist query
    const wishlistQuery = useQuery({
        queryKey: ['wishlist', customerId || 'all'],
        queryFn: () =>
            fetcher(
                'ecommerce/wishlist/get-wishlist',
                customerId ? { customerId } : undefined
            ),
        enabled: !!user,
    });
    const addWishlistItem = payload =>
        mutateFetcher(
            'ecommerce/wishlist/create-wishlist-item',
            'POST',
            payload
        );
    const updateWishlistItem = payload =>
        mutateFetcher(
            'ecommerce/wishlist/update-wishlist-item',
            'PATCH',
            payload
        );
    const deleteWishlistItem = id =>
        mutateFetcher('ecommerce/wishlist/delete-wishlist-item', 'DELETE', {
            id,
        });
    return {
        wishlist: wishlistQuery.data,
        isLoading: wishlistQuery.isLoading,
        isError: wishlistQuery.isError,
        refetch: () => wishlistQuery.refetch(),
        addWishlistItem,
        updateWishlistItem,
        deleteWishlistItem,
    };
};
