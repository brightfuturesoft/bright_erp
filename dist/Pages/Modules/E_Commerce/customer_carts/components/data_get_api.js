import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
export const useCartData = customerId => {
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
    const cartQuery = useQuery({
        queryKey: ['cart', customerId || 'all'],
        queryFn: () =>
            fetcher(
                'ecommerce/carts/get-cart',
                customerId ? { customerId } : undefined
            ),
        enabled: !!user,
    });
    const addCartItem = payload =>
        mutateFetcher('ecommerce/carts/create-cart-item', 'POST', payload);
    const updateCartItem = payload =>
        mutateFetcher('ecommerce/carts/update-cart-item', 'PATCH', payload);
    const deleteCartItem = id =>
        mutateFetcher('ecommerce/carts/delete-cart-item', 'DELETE', { id });
    return {
        cart: cartQuery.data,
        isLoading: cartQuery.isLoading,
        isError: cartQuery.isError,
        refetch: () => cartQuery.refetch(),
        addCartItem,
        updateCartItem,
        deleteCartItem,
    };
};
